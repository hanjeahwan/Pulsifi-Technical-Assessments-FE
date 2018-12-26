<template>
    <div class="my-4 p-4 bg-white shadow-sm">
        <el-dialog :visible.sync="previewVisible">
            <preview-job @close="togglePreview" :details="activeItem" v-if="previewVisible"></preview-job>
            <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="previewVisible = false">Close</el-button>
        </span>
        </el-dialog>
        <div class="d-flex justify-content-between mb-4 flex-column flex-md-row">
            <div class="mb-2 mb-md-0">
                <el-button type="primary" @click="$router.push('/job/form')"><i class="el-icon-plus mr-2"></i>Create Job</el-button>
            </div>
            <div>
                <el-input class="w-auto mr-3 mb-2 mb-md-0" v-model.lazy="searchValue" @change="handleFilter" placeholder="Enter Job title" clearable>
                    <i slot="suffix" class="el-input__icon el-icon-search"></i>
                </el-input>
                <el-select v-model="filterValue" placeholder="Filter Options" @change="handleFilter" clearable filterable>
                    <el-option :label="label" :value="key" :key="key" v-for="label, key in $opt.status"></el-option>
                </el-select>
            </div>
        </div>
        <el-table class="job-table mb-3" :data="job" style="width: 100%" v-loading="loading">
            <el-table-column prop="id" label="Id" min-width="60">
            </el-table-column>
            <el-table-column prop="title" label="Title" min-width="180">
            </el-table-column>
            <el-table-column prop="location" label="Location" min-width="200">
            </el-table-column>
            <el-table-column prop="status" label="Status" min-width="120">
                <template slot-scope="scope">
                    <span class="status-dot mr-2" :class="[scope.row.status === 0 ? 'default' : scope.row.status === 1 ? 'success' : 'terminate']"></span>{{ $opt.status[scope.row.status]}}
                </template>
            </el-table-column>
            <el-table-column prop="created" label="Date" min-width="120">
                <template slot-scope="scope">
                    {{ scope.row.created | formatDateTime('DD-MM-YYYY')}}
                </template>
            </el-table-column>
            <el-table-column prop="updated" label="Last Update" min-width="120">
                <template slot-scope="scope">
                    {{ scope.row.updated | relativeTime}}
                </template>
            </el-table-column>
            <el-table-column label="Action" width="140" min-width="140">
                <template slot-scope="scope">
                    <el-button type="text" @click="$router.push({path: '/job/form', query: {id: scope.row.id}})">Edit</el-button>
                    <span class="text-black-50 mx-2">|</span>
                    <el-button type="text" @click="togglePreview(true, scope.row)">Preview</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="text-right" v-if="total > 10">
            <el-pagination background layout="prev, pager, next" :total="total" :current-page.sync="page" @current-change="fetchData">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import PreviewJob from '@/components/PreviewJob';
import { $filterURLQuery, $relativeTime, $formatDateTime } from '@/utils'

export default {
    name: 'JobList',
    components: {
        PreviewJob
    },
    data() {
        return {
            loading: false,
            job: [],
            page: 1,
            total: 0,
            filterValue: '',
            searchValue: '',
            activeItem: {},
            previewVisible: false
        };
    },
    computed: {
        paginateSkip() {
            return this.page * 10 - 10
        }
    },
    created() {
        this.fetchData()
    },
    watch: {
        '$route'() {
            this.fetchData()
        },
    },
    methods: {
        async fetchData() {

            this.searchValue = this.$route.query.keywords || ''
            this.filterValue = this.$route.query.status || ''

            /* Default params when dont have any query in url */
            let params = {
                keywords: this.searchValue,
                status: this.filterValue,
                skip: this.paginateSkip
            }

            try {
                this.loading = true

                const { results, total } = await this.$axios({
                    url: 'job',
                    method: 'get',
                    params: $filterURLQuery(params)
                })
                this.job = results
                this.total = total
            } catch (err) {

            } finally {
                this.loading = false
            }
        },
        togglePreview(visible, data) {
            this.activeItem = visible ? data : {}
            this.previewVisible = visible
        },
        handleFilter(val) {
            let query = {
                status : this.filterValue,
                keywords : this.searchValue
            }
            this.page = 1
            this.$router.push({ query: $filterURLQuery(query) })
        }
    },
    filters: {
        relativeTime: (date) => $relativeTime(date),
        formatDateTime: (date, format) => $formatDateTime(date, format)
    }
};
</script>
<style lang="scss" scoped>
.job-table /deep/ {
    thead {
        color: $body-color;
    }

    th {
        background: #fafafa;
        padding: 14px 0;
    }

    .cell {
        padding: 0 16px;
        line-height: 1.25;
    }
}
</style>
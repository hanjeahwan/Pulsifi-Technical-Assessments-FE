<template>
    <div class="wrapper d-flex flex-column" :class='[ previewVisible ? "preview-open" : ""]'>
        <div class="main-content">
            <el-header>
                <div class="menu-logo">
                    <img width="90" src="https://pulsifi.me/media/2017/06/logo-svg.svg" alt="pulsifi">
                </div>
                    <div>
                        <router-link class="text-info" to="/job">
                            <a>Recruiter</a>
                        </router-link>
                        <el-button v-if="$store.state.token" class="ml-3" type="primary" @click="$store.dispatch('logout')" round><i class="fas fa-sign-out-alt mr-2"></i>Logout</el-button>
                    </div>
            </el-header>
            <div class="container flex-fill my-4">
                <div class="d-flex justify-content-between align-items-end p-3 mb-4 bg-white shadow-sm">
                    <div>
                        <label class="mr-2">Seach :</label>
                        <el-input class="d-inline-block w-auto" v-model="keywords" placeholder="Enter Job title" clearable>
                            <i slot="suffix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                    </div>
                    <div>
                        <el-button type="primary" @click="handleFilter()">Find Job</el-button>
                    </div>
                </div>
                <div class="d-flex flex-wrap" v-if="loading">
                    <div class="job-block d-flex flex-column mb-4" v-for="n in 6">
                        <content-loader :height="160" :speed="1" primaryColor="#dee2e6" secondaryColor="#e4e7ed">
                        </content-loader>
                    </div>
                </div>
                <div class="d-flex flex-wrap" v-else>
                    <div class="job-block d-flex flex-column mb-4 p-4 bg-white shadow-sm" v-for="item in job">
                        <h6 class="font-weight-bold text-info mb-3">{{item.title}}</h6>
                        <div class="media mb-2">
                            <i class="el-icon-location mr-2"></i>
                            <div class="media-body">
                                {{item.location}}
                            </div>
                        </div>
                        <div class="media mb-2">
                            <i class="el-icon-time mr-2"></i>
                            <div class="media-body">
                                {{item.created_at | relativeTime}}
                            </div>
                        </div>
                        <div class="media mb-2">
                            <i class="el-icon-news mr-2"></i>
                            <div class="media-body text-truncate-line">
                                {{item.breif || 'N/A'}}</div>
                        </div>
                        <div class="text-right mt-auto">
                            <el-button type="text" @click="togglePreview(true, item)">More</el-button>
                        </div>
                    </div>
                    <div class="p-4" v-if="job.length === 0">
                        <p class="mb-4">The search keywords did not match any jobs.</p>
                        <div>
                            <p><b>Search suggestions:</b></p>
                            <ul>
                                <li>Try more general keywords</li>
                                <li>Check your spelling</li>
                                <li>Replace abbreviations with the entire word</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="text-right" v-if="job.length > 0">
                    <el-pagination background layout="prev, pager, next" :total="total" :current-page.sync="page" @current-change="fetchData">
                    </el-pagination>
                </div>
            </div>
            <div class="close-layer visible" v-if="previewVisible" @click="togglePreview(false)"></div>
        </div>
        <div class="preview-side-bar px-4 py-2">
            <el-button type="text" class="mb-3" @click="togglePreview(false)"><i class="el-icon-back mr-2"></i>Back</el-button>
            <preview-job @close="togglePreview" :details="activeItem" v-if="previewVisible"></preview-job>
        </div>
    </div>
</template>
<script>
// import JOBS from '../graphql/Job.gql';
import { ContentLoader } from "vue-content-loader"
import PreviewJob from '@/components/PreviewJob'
import { $relativeTime, $filterURLQuery } from '@/utils'

export default {
    name: 'Home',
    components: {
        ContentLoader,
        PreviewJob
    },
    data() {
        return {
            job: [],
            page: 1,
            total: 0,
            keywords: '',
            loading: false,
            previewVisible: false,
            activeItem: {}
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
            this.page = 1
            this.fetchData()
        },
    },
    methods: {
        handleFilter(val) {
            let query = {
                keywords: this.keywords
            }
            this.$router.push({ query: $filterURLQuery(query) })
        },
        async fetchData() {

            this.searchValue = this.$route.query.keywords || ''

            /* Default params when dont have any query in url */
            let params = {
                keywords: this.searchValue,
                status: 1,
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
            visible ? document.querySelector('body').classList.add("hidden-scroll") : document.querySelector('body').classList.remove("hidden-scroll")
        },

    },
    filters: {
        relativeTime: (date) => $relativeTime(date),
    }
};
</script>
<style lang="scss" src="@/styles/index.scss" scoped></style>
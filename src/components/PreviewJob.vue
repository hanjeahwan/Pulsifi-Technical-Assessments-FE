<template>
    <div class="">
        <div class="mb-4">
            <h5 class="font-weight-bold text-info mb-3" ref="title">{{details.title}}</h5>
            <div class="media mb-2">
                <i class="el-icon-location mr-2"></i>
                <div class="media-body">
                    <span ref="location">{{details.location}}</span>
                </div>
            </div>
            <div class="media mb-2">
                <i class="el-icon-time mr-2"></i>
                <div class="media-body">
                    <span ref="created_at">{{details.created | formatDateTime('DD-MM-YYYY')}} ({{details.updated | relativeTime}})</span>
                </div>
            </div>
        </div>
        <div class="mb-4">
            <h5 class="font-weight-bold mb-3">Job Breif</h5>
            <p ref="breif">{{details.breif }}</p>
        </div>
        <h5 class="font-weight-bold mb-3">Job Description</h5>
        <div ref="description" class="style-reset" v-html="details.description"></div>
    </div>
</template>
<script>
import { $relativeTime, $formatDateTime } from '@/utils'

export default {
    name: 'PreviewJob',
    props: {
        details: {
            type: Object,
            required: true
        }
    },
    data() {
        return {};
    },
    computed: {},
    created() {},
    methods: {},
    filters: {
        relativeTime: (date) => $relativeTime(date),
        formatDateTime: (date, format) => $formatDateTime(date, format)
    }
};
</script>
<style lang="scss" scoped>
.style-reset /deep/ {
    p {
        margin-bottom: .5rem;
    }
}

.el-icon-location,
.el-icon-time {
    margin-top: 4px;
}
</style>
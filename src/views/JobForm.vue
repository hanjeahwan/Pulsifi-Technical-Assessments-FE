<template>
    <div class="m-4 px-4 bg-white shadow-sm">
        <div class="row justify-content-center">
            <div class="col-24 py-3">
                <el-button type="text" @click="$router.go(-1)"><i class="el-icon-back mr-2"></i>Back</el-button>
            </div>
            <div class="col-lg-18 col-xl-14 py-3">
                <el-form v-loading="loading" :model="jobForm.input" label-position="right" :rules="jobRules" ref="jobForm" label-width="120px">
                    <el-form-item label="Title :" prop="title">
                        <el-input v-model="jobForm.input.title" placeholder="Job title"></el-input>
                    </el-form-item>
                    <el-form-item label="Location :" prop="location">
                        <gmap-autocomplete class="gmap-autocomplete" placeholder="Job Location" @change.native="updateLocation" :value="jobForm.input.location" @place_changed="setPlace"></gmap-autocomplete>
                        <el-input v-model="jobForm.input.location" class="d-none"></el-input>
                    </el-form-item>
                    <el-form-item label="Breif :" prop="breif">
                        <el-input type="textarea" v-model="jobForm.input.breif" placeholder="Job breif"></el-input>
                    </el-form-item>
                    <el-form-item label="Description :" prop="description">
                        <quill-editor :options="editorToolbar" v-model="jobForm.input.description"></quill-editor>
                        <el-input v-model="jobForm.input.description" class="d-none"></el-input>
                    </el-form-item>
                    <el-form-item label="Status :" prop="status">
                        <el-select v-model="jobForm.input.status" placeholder="Job Status">
                            <el-option :label="label" :value="parseInt(key)" :key="key" v-for="label, key in $opt.status" v-if="!isEditJob ? parseInt(key) !== 2 : true"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="text-center text-md-left">
                        <el-button @click="resetForm('jobForm')" class="mt-3">Clear</el-button>
                        <el-button type="primary" class="mt-3" @click="submitForm('jobForm')" :loading="submitLoading">{{isEditJob ? 'Update' : 'Create'}}</el-button>
                        <el-button type="info" class="mt-3" @click="autoFill()">Auto Fill</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
import faker from 'faker'
export default {
    name: 'JobForm',

    data() {
        return {
            loading: false,
            submitLoading: false,
            editorToolbar: {
                placeholder: "Job Description",
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline'],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                        ['clean']
                    ]
                }
            },
            jobForm: {
                input: {
                    location: '',
                    status: '',
                    title: '',
                    // description: null,
                    // breif: null,
                    description: '<ul><li>Develop and manage SEO and PPC strategies</li><li>Create and manage link building strategies, content marketing strategies and social media presences</li><li>Innovate and recommend new marketing platforms and strategies for lead generation campaign</li><li>Forecast marketing campaign growth and ROI for marketing campaigns</li><li>Use Google Analytics, AdWords and other relevant sites to prepare performance tracking report on campaigns.</li><li>Keep abreast of new social media sites, web technologies and digital marketing trends; implement these new technologies in developing campaigns.&nbsp;</li><li>Provide accurate reports and analysis to management on effective return on investment (ROI) on running campaigns</li></ul><p><br></p>',
                    breif: '',
                },
                id: null
            },
            jobRules: {
                location: [
                    { required: true, message: 'Job location is required.', trigger: 'change' },
                ],
                status: [
                    { required: true, message: 'Job status is required.', trigger: 'change' },
                ],
                title: [
                    { required: true, message: 'Job title is required.', trigger: 'change' },
                ],
                description: [
                    { required: true, message: 'Job description is required.', trigger: 'change' },
                ],
                breif: [
                    { required: true, message: 'Job breif is required.', trigger: 'change' },
                ]
            },
        };
    },
    computed: {
        isEditJob() {
            return !!this.$route.query.id
        }
    },
    created() {
        if (this.isEditJob) {
            this.fetchJobDetails(this.$route.query.id)
        }
    },
    methods: {
        autoFill() {
            this.jobForm.input.location = faker.address.streetAddress()
            this.jobForm.input.status = faker.random.number({ min: 0, max: this.isEditJob ? 2 : 1 })
            this.jobForm.input.title = faker.name.jobTitle()
            this.jobForm.input.description = '<ul><li>Develop and manage SEO and PPC strategies</li><li>Create and manage link building strategies, content marketing strategies and social media presences</li><li>Innovate and recommend new marketing platforms and strategies for lead generation campaign</li><li>Forecast marketing campaign growth and ROI for marketing campaigns</li><li>Use Google Analytics, AdWords and other relevant sites to prepare performance tracking report on campaigns.</li><li>Keep abreast of new social media sites, web technologies and digital marketing trends; implement these new technologies in developing campaigns.&nbsp;</li><li>Provide accurate reports and analysis to management on effective return on investment (ROI) on running campaigns</li></ul><p><br></p>'
            this.jobForm.input.breif = faker.lorem.sentences()
        },
        async fetchJobDetails(id) {
            try {
                this.loading = true
                const res = await this.$axios({
                    url: `job/${id}`,
                    method: 'get',
                })
                for (let key in this.jobForm.input) {
                    this.jobForm.input[key] = res[key]
                }
                this.jobForm.id = res.id
            } catch (err) {

            } finally {
                this.loading = false
            }
        },
        updateLocation(ev) {
            this.jobForm.input.location = ev.target.value
        },
        setPlace(place) {
            this.jobForm.input.location = place.formatted_address
        },
        submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    const reqOptions = {
                        update: {
                            url: `job/${this.jobForm.id}`,
                            method: 'put',
                            data: this.jobForm.input,

                        },
                        save: {
                            url: 'job',
                            method: 'post',
                            data: this.jobForm.input
                        }
                    }

                    try {
                        this.submitLoading = true
                        const res = await this.$axios(this.isEditJob ? reqOptions.update : reqOptions.save)
                        this.$notify({
                            title: 'Success',
                            message: `Job has been ${this.isEditJob ? 'updated' : 'saved'} successfully.`,
                            type: 'success',
                        })
                        this.$router.push('/job/list')
                    } catch (err) {

                    } finally {
                        this.submitLoading = false
                    }
                } else {
                    return false;
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
        },
    }
};
</script>
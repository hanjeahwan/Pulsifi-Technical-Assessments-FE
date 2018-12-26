<template>
    <div class="signin-container">
        <div class="container signin-form">
            <div class="col-22 col-md-18 col-lg-14 col-xl-8 px-0 ml-auto mr-auto">
                <transition name="el-fade-in-linear" appear>
                    <div class="card border-0 shadow">
                        <div class="card-header text-center border-0">
                            <h5 class="font-weight-bold">Sign In</h5>
                            <p class="text-muted mb-0">Sign in to continue your action</p>
                        </div>
                        <div class="card-body">
                            <el-form class="w-100" :model="loginForm" ref="loginForm" label-width="120px" label-position="top">
                                <el-form-item prop="email" :rules="[{ required: true, message: '* Email address is required', trigger: 'blur' },{ type: 'email', message: '* Invalid email address', trigger: 'blur' }]">
                                    <el-input name="email" type="text" v-model="loginForm.email" autoComplete="on" placeholder="Email address">
                                        <i class="fa fa-user" slot="prefix"></i>
                                    </el-input>
                                </el-form-item>
                                <el-form-item prop="password" :rules="[{ required: true, message: '* Password is required', trigger: 'blur' }]">
                                    <el-input name="password" :type="passwordType" v-model="loginForm.password" autoComplete="on" placeholder="Password">
                                        <i class="fa fa-lock" slot="prefix"></i>
                                        <i class="fa" :class="{'fa-eye': !showPassword, 'fa-eye-slash': showPassword}" slot="suffix" @click="showPassword = !showPassword"></i>
                                    </el-input>
                                </el-form-item>
                                <el-form-item class="mb-0 text-center">
                                    <el-button type="primary" round class="my-2 py-2" :loading="loading" @click="userLogin()"><i class="fas fa-sign-in-alt mr-2"></i>Sign In</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Login',

    data() {
        return {
            loading: false,
            loginForm: {
                email: '',
                password: ''
            },
            showPassword: false
        };
    },
    computed: {
        passwordType() {
            return this.showPassword ? 'text' : 'password'
        }
    },
    created() {

    },
    watch: {},
    methods: {
        userLogin() {
            this.$refs['loginForm'].validate(async (valid) => {
                if (valid) {
                    this.loading = true
                    this.$store.dispatch('login', this.loginForm).then(token => {
                        this.loading = false
                    })
                }
            })
        }
    },
};
</script>
<style lang="scss" src="@/styles/login.scss" scoped></style>
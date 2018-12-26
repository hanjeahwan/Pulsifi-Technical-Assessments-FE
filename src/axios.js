import axios from 'axios'
import { MessageBox } from 'element-ui'
import store from '@/store'
import router from './router'

// create an axios instance
const service = axios.create({
    baseURL: process.env.BASE_API || 'http://localhost:3001/',
})

// request interceptor
service.interceptors.request.use((config) => {
    // Do something before request is sent
    // if (store.state.user.token) {
    // config.headers['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NDU4MjI3MDEsImV4cCI6MTU0NTgyNjMwMX0.-7Z0D2rfvhMWCZZZUu59pM1cspdwmGzg84ovFx6lmvI`

    return config;
}, (error) => {
    // Do something with request error
    return Promise.reject(error);
});


// response interceptor
service.interceptors.response.use((response) => {
    // Do something with response data
    return response.data;
}, (error) => {
    const { data: { errors }, status } = error.response

    if (status === 401) {
        // const isLoginRequest = error.response.config.url.includes('auth/login')
        // const errorMsg = isLoginRequest ? 'Invalid email address or password.' : 'Session expired. Please login again.'

        MessageBox.confirm('Your session has expired. Please relogin.', 'Authentication Failed', {
            showCancelButton: false,
            showConfirmButton: false,
            type: 'error'
        }).then(() => {
            // store.commit('RESET_SYNC_STATE')
            router.push('/login')
        }).catch(() => {
            // store.commit('RESET_SYNC_STATE')
            router.push('/login')
        })
    }
    console.error(data)
    // Do something with response error
    return Promise.reject(data);
});

export default service
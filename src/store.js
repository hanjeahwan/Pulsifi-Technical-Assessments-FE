import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import service from './axios'
import router from './router'
import { Notification } from 'element-ui'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: Cookies.get('token') || null
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
            Cookies.set('token', token)
        },
        REMOVE_TOKEN: (state) => {
            state.token = ''
            Cookies.remove('token')
        }
    },
    actions: {
        async login({ commit, dispatch }, input) {
            try {

                const token = await service({
                    method: 'post',
                    url: 'auth/login',
                    data: input
                })
                commit('SET_TOKEN', token)
                router.replace('/job')
                return token
            } catch (err) {
                Notification({
                    title: 'Authentication Failed',
                    message: 'Your email or password is incorrect. Please try agian.',
                    type: 'error',
                })
                return null
            }
        },
        logout({ commit }) {
            commit('REMOVE_TOKEN')
            Notification({
                title: 'Logout',
                message: 'You have successfully logout.',
                type: 'success',
            })
            router.replace('/')
        }
    }
})
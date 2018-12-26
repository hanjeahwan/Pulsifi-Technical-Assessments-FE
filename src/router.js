import Vue from 'vue';
import Router from 'vue-router';
import Index from './views/Index.vue';
import store from '@/store'

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'Home',
            component: Index,
            children: [],
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('./views/Login.vue'),
            beforeEnter: (to, from, next) => {
                if (store.state.token) {
                    next('/job')
                } else {
                    next()
                }
            },
        },
        {
            path: '/job',
            name: 'Job',
            icon: 'el-icon-edit-outline',
            redirect: '/job/list',
            component: () => import('./views/Job.vue'),
            beforeEnter: (to, from, next) => {
                if (store.state.token) {
                    next()
                } else {
                    next('/login')
                }
            },
            children: [{
                    path: '/job/list',
                    name: 'Job List',
                    component: () => import('./views/JobList.vue'),
                },
                {
                    path: '/job/form',
                    name: 'Job Form',
                    component: () => import('./views/JobForm.vue'),
                },
            ],
        }
    ],
});
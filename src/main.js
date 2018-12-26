import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import service from './axios'
import './registerServiceWorker'
import VueQuillEditor from 'vue-quill-editor'
import * as VueGoogleMaps from 'vue2-google-maps'
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import 'element-ui/lib/theme-chalk/index.css';
import './styles/element-ui/element-ui.scss';
import './styles/bootstrap/bootstrap.scss';
import './styles/main.scss';


Vue.use(VueQuillEditor)
Vue.use(ElementUI, { locale, size: 'medium' })
Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyAV9ftqOniBePyoSl6HMCmebqeAedSNJgI',
        libraries: 'places',
    }
})

Vue.prototype.$opt = {
    status: {
        0: "Draft",
        1: "Publish",
        2: "Terminated"
    }
}
Vue.prototype.$axios = service
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
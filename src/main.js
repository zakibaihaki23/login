import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import axios from 'axios'

require('./store/subscriber')

axios.defaults.baseURL = 'http://10.10.0.38:8083'
axios.defaults.headers.common['Authorization'] =
  'Bearer' + localStorage.getItem('token')

Vue.config.productionTip = false
store.dispatch('auth/attempt', localStorage.getItem('token')).then(() => {
  new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
  }).$mount('#app')
})

export default axios

import Vue from 'vue'

import ElementUI from 'element-ui'
import 'normalize.css'

import '@/styles/element-variables.scss'
import '@/styles/index.scss'

import App from '@/App.vue'
import '@/icons/components'
import '@/permission'
import router from '@/router'
import store from '@/store'


import FormItemGroup from '@/components/formGenerator/FormItemGroup/index.vue'
import VList from '@/components/VList/index.vue';
import VListItem from '@/components/VList/VListItem/index.vue';
import VModalBox from '@/components/VModalBox/index.vue';
import SvgIcon from 'vue-svgicon'

Vue.use(ElementUI)
Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})


Vue.component('v-list', VList);
Vue.component('v-list-item', VListItem);
Vue.component('v-modal-box', VModalBox)
Vue.component('form-item-group', FormItemGroup)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')

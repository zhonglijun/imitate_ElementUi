import Vue from 'vue';
import entry from './app.vue';
import VueRouter from 'vue-router';
import routes from './route.config';
import MainHeader from '../examples/pages/components/header.vue';
import demoBlock from '../examples/pages/components/demo-block.vue';

// 引入自己的element-ui
import Element from '../lib/element-ui.common.js';
import '../lib/theme-chalk/index.css';
Vue.use(Element);


Vue.use(VueRouter);
Vue.component('main-header', MainHeader);
Vue.component('demo-block', demoBlock);

const router = new VueRouter({
  mode: 'hash',
  base: __dirname, 
  routes
});

new Vue({
  ...entry,
  router
}).$mount('#app');
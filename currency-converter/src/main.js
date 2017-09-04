import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import Home from './components/Homepage.vue'
import Latestrates from './components/LatestRates.vue'
import Historicalrates from './components/HistoricalRates.vue'
import Simpleconversion from './components/SimpleConversion.vue'
import {store} from './myStore/store'

Vue.config.productionTip = false
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueResource);

Vue.http.options.root = "http://api.fixer.io";

const routes = [
  {path : '/' , component : Home},
  {path : '/latestRates' , component : Latestrates},
  {path : '/historicalRates' , component : Historicalrates},
  {path : '/conversion' , component : Simpleconversion}
];

const router = new VueRouter({
  routes ,
  mode : 'history'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})

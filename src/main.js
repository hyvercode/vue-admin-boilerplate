import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/store";
import 'sweetalert2/dist/sweetalert2.min.css';
import $ from 'jquery';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-vue/dist/bootstrap-vue.css';
import "bootstrap";
import './App.scss'
import retina from 'retinajs';
import VueRetina from 'vue-retina';
import Popper from 'vue-popperjs';
import 'vue-popperjs/dist/vue-popper.css';
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue';
import VueMoment from 'vue-moment';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import VueSweetalert2 from 'vue-sweetalert2';
// import '/src/assets/js/volt';
import Notify from 'vue-notifyjs';
import moment from 'moment-timezone';
import VueCookies from 'vue-cookies'
import VueJwtDecode from 'vue-jwt-decode';
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "jspdf/dist/polyfills.es.js";

Vue.use(VueJwtDecode)
Vue.use(VueCookies)
Vue.use(Notify)
Vue.use(VueSweetalert2);
Vue.use(Loading, {
    // props
    color: "#34C759",
    height: 70,
    zIndex: 999999999
}, {
    // slots
})

Vue.use(VueMoment, {
    moment,
})

moment.locale('id');

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
window.$ = $;
Vue.use(Popper);
Vue.use(VueRetina, {retina})
Vue.config.productionTip = false

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    localStorage.setItem('__coordinate',position.coords.latitude + ',' + position.coords.longitude);
}

getLocation();

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");

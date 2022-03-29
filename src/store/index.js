import Vue from "vue";
import Vuex from "vuex";
import {auth} from "./auth.module";
import {nav} from "./nav.module";
import notification from "./notification.module";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        notification,
        nav,
        auth,
    },
});

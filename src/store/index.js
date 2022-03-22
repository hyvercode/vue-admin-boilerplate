import Vue from "vue";
import Vuex from "vuex";
import {auth} from "./auth.module";
import {nav} from "./nav.module";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        nav,
        auth,
    },
});

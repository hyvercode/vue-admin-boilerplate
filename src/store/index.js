import Vue from "vue";
import Vuex from "vuex";
import {auth} from "./auth.module";
import employee from "./employee.module";
import user from "./user.module";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        employee,
        user,
        auth,
    }
});
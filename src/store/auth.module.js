import AuthService from '../services/auth.service';
import VueCookies from "vue-cookies";

const authUser = JSON.parse(JSON.stringify(VueCookies.get('_PICKERSSESSIONID')));
const initialState = authUser
    ? {status: {loggedIn: true}, auth: authUser}
    : {status: {loggedIn: false}, auth: null};

export const auth = {
    namespaced: true,
    authLogin: null,
    state: initialState,
    actions: {
        login({commit}, user) {
            return AuthService.login(user).then(
                user => {
                    commit('loginSuccess', user);
                    return Promise.resolve(user);
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },

        refresh({commit}) {
            return AuthService.refreshToken().then(
                user => {
                    commit('loginSuccess', user);
                    return Promise.resolve(user);
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },

        logout({commit}) {
            AuthService.logout();
            commit('logoutSuccess');
        },
    },
    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.authLogin = user.data;
        },

        loginFailure(state) {
            state.status.loggedIn = false;
            state.authLogin = null;
        },

        logoutSuccess(state) {
            state.status.loggedIn = false;
            state.authLogin = null;
        }
    }
};
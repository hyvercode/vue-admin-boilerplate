import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

const user = {
    namespaced: true,
    state: {
        data: {},
    },
    actions: {
        getProfile({commit}) {
            return UserService.getProfile().then((response) => {
                if (response.code === 200) {
                    commit('SET_RECORD', response.data);
                    return Promise.resolve(response.data);
                } else {
                    AuthService.logout();
                }

            })
        }
    },
    mutations: {
        SET_RECORD(state, data) {
            state.data.profile = data;
        },
    },
};

export default user;

export const nav = {
    namespaced: true,
    state: {
        toggle:true
    },
    actions: {
        toggle({commit}, hide) {
            commit('TOGGLE', hide);
        }
    },
    mutations: {
        TOGGLE(state, hide) {
            state.toggle = hide;
        }
    }
};
import MenuService from "../services/menu.service";

const menus = {
    namespaced: true,
    state: {
        menus: []
    },
    actions: {
        getMenu({commit}) {
            return MenuService.getMenu().then((response) => {
                commit('SET_MENU', response.data);
                return Promise.resolve(response.data);
            })
        }
    },
    mutations: {
        SET_MENU(state, data) {
            state.menus = data;
        }
    }
};

export default menus;
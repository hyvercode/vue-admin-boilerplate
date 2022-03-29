import NotificationsService from "../services/notification.service";

const notification = {
    namespaced: true,
    state: {
        count: 0,
        inboxs: []
    },
    actions: {
        getCounts({commit}) {
            return NotificationsService.getCount().then((response) => {
                commit('SET_COUNT', response.data);
                return Promise.resolve(response.data);
            })
        },
        getInboxs({commit}, payload) {
            return NotificationsService.getPaginate(payload).then((response) => {
                commit('SET_INBOXS', response.data);
                return Promise.resolve(response.data);
            })
        }
    },
    mutations: {
        SET_COUNT(state, data) {
            state.count = data.total;
        },
        SET_INBOXS(state, data) {
            state.inboxs = data;
        }
    }
};

export default notification;
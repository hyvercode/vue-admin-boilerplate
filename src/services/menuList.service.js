import Host from '@/api/host'
import Api from "../api/Api";

class MenuListService {
    getAll() {
        return Api.doGet(Host.API_V1 + `/menu-list`);
    }

    getPaginate(payload) {
        return Api.doGet(Host.API_V1 + '/menu-list/paginate?', payload);
    }

    postCreate(payload) {
        return Api.doPost(Host.API_V1 + `/menu-list/create`, payload);
    }

    postUpdate(id, payload) {
        return Api.doPost(Host.API_V1 + `/menu-list/update/${id}`, payload);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/menu-list/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/menu-list/delete/${id}`);
    }

    getMenu() {
        return Api.doGet(Host.API_V1 + `/menu-list/menu`);
    }
}

export default new MenuListService();
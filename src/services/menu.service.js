import Host from '@/api/host'
import Api from "../api/Api";


class MenuService {
    getAll() {
        return Api.doGet(Host.API_V1 + `/menus`);
    }

    getPaginate(payload) {
        return Api.doGet(Host.API_V1 + '/menus/paginate?', payload);
    }

    postCreate(payload) {
        return Api.doPost(Host.API_V1 + `/menus/create`, payload);
    }

    postUpdate(id, payload) {
        return Api.doPost(Host.API_V1 + `/menus/update/${id}`, payload);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/menus/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/menus/delete/${id}`);
    }

    getMenu() {
        return Api.doGet(Host.API_V1 + `/menus/menu`);
    }
}

export default new MenuService();
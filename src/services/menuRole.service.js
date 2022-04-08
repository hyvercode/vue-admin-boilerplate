import Host from '@/api/host'
import Api from "../api/Api";

class MenuRoleService {
    getAll() {
        return Api.doGet(Host.API_V1 + `/menu-role`);
    }

    getPaginate(payload) {
        return Api.doGet(Host.API_V1 + '/menu-role/paginate?', payload);
    }

    postCreate(payload) {
        return Api.doPost(Host.API_V1 + `/menu-role/create`, payload);
    }

    postUpdate(id, payload) {
        return Api.doPost(Host.API_V1 + `/menu-role/update/${id}`, payload);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/menu-role/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/menu-role/delete/${id}`);
    }

    getMenu() {
        return Api.doGet(Host.API_V1 + `/menu-role/menu`);
    }
}

export default new MenuRoleService();
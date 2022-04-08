import Host from '@/api/host'
import Api from "../api/Api";

class RoleService {
    getAll() {
        return Api.doGet(Host.API_V1 + `/roles`);
    }

    getPaginate(payload) {
        return Api.doGet(Host.API_V1 + '/roles/paginate?', payload);
    }

    postCreate(payload) {
        return Api.doPost(Host.API_V1 + `/roles/create`, payload);
    }

    postUpdate(id, payload) {
        return Api.doPost(Host.API_V1 + `/roles/update/${id}`, payload);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/roles/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/roles/delete/${id}`);
    }

    getMenu() {
        return Api.doGet(Host.API_V1 + `/roles/menu`);
    }
}

export default new RoleService();
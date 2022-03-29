import Host from '@/api/host'
import Api from "../api/Api";

class UserService {
    getAll() {
        return Api.doGet(Host.API_V1 + `/users`);
    }

    getPaginate(payload) {
        return Api.doGet(Host.API_V1 + '/users/paginate?', payload);
    }

    postCreate(payload) {
        return Api.doPost(Host.API_V1 + `/users/create`, payload);
    }

    postUpdate(id, payload) {
        return Api.doPost(Host.API_V1 + `/users/update/${id}`, payload);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/users/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/users/delete/${id}`);
    }
}

export default new UserService();
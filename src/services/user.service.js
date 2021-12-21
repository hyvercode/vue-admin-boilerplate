import Host from '@/api/host'
import Api from "../api/index";

class UserService {
    getPaginate(params) {
        return Api.doGet(Host.API_V1 + '/users/partner/paginate?', params);
    }

    postCreate(params) {
        return Api.doPost(Host.API_V1 + `/users/create`, params);
    }

    postUpdate(id, params) {
        return Api.doPost(Host.API_V1 + `/users/update/${id}`, params);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/users/partner/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/users/delete/${id}`);
    }

    getProfile() {
        return Api.doGet(Host.API_V1 + '/users/profile');
    }
}

export default new UserService();
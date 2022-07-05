import Host from '@/api/host'
import Api from "../api/Api";

class ContactService {
    getAll() {
        return Api.doGet(Host.API_V1 + "/contact");
    }

    getPaginate(params) {
        return Api.doGet(Host.API_V1 + "/contact/paginate?", params);
    }

    postCreate(params) {
        return Api.doPost(Host.API_V1 + `/contact/create`, params);
    }

    postUpdate(id, params) {
        return Api.doPost(Host.API_V1 + `/contact/update/${id}`, params);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/contact/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/contact/delete/${id}`);
    }
}

export default new ContactService();

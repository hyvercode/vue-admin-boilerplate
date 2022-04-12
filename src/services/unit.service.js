import Host from '@/api/host'
import Api from "../api/Api";

class UnitService {
    getAll() {
        return Api.doGet(Host.API_V1 + "/units");
    }

    getPaginate(params) {
        return Api.doGet(Host.API_V1 + "/units/paginate?", params);
    }

    postCreate(params) {
        return Api.doPost(Host.API_V1 + `/units/create`, params);
    }

    postUpdate(id, params) {
        return Api.doPost(Host.API_V1 + `/units/update/${id}`, params);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/units/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/units/delete/${id}`);
    }
}

export default new UnitService();

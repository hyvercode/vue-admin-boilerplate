import Host from '@/api/host'
import Api from "../api/Api";

class UnitService {
    getAll() {
        return Api.doGet(Host.API_V1 + "/unit-members");
    }

    getPaginate(params) {
        return Api.doGet(Host.API_V1 + "/unit-members/paginate/member?", params);
    }

    postCreate(params) {
        return Api.doPost(Host.API_V1 + `/unit-members/create`, params);
    }

    postUpdate(id, params) {
        return Api.doPost(Host.API_V1 + `/unit-members/update/${id}`, params);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/unit-members/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/unit-members/delete/${id}`);
    }
}

export default new UnitService();

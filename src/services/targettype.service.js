import Host from '@/api/host'
import Api from "../api/Api";

class TargetTypeService {
    getAll() {
        return Api.doGet(Host.API_V1 + "/target-types");
    }

    getPaginate(params) {
        return Api.doGet(Host.API_V1 + "/target-types/paginate?", params);
    }

    postCreate(params) {
        return Api.doPost(Host.API_V1 + `/target-types/create`, params);
    }

    postUpdate(id, params) {
        return Api.doPost(Host.API_V1 + `/target-types/update/${id}`, params);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/target-types/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/target-types/delete/${id}`);
    }
}

export default new TargetTypeService();

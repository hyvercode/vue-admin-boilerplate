import Host from '@/api/host'
import Api from "../api/Api";

class MeasurementService {
    getAll() {
        return Api.doGet(Host.API_V1 + "/measurements");
    }

    getPaginate(params) {
        return Api.doGet(Host.API_V1 + "/measurements/paginate?", params);
    }

    postCreate(params) {
        return Api.doPost(Host.API_V1 + `/measurements/create`, params);
    }

    postUpdate(id, params) {
        return Api.doPost(Host.API_V1 + `/measurements/update/${id}`, params);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/measurements/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/measurements/delete/${id}`);
    }

    getUnit(unit_id) {
        return Api.doGet(Host.API_V1 + `/measurements/units/${unit_id}`);
    }
}

export default new MeasurementService();

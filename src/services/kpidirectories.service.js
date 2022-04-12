import Host from '@/api/host'
import Api from "../api/Api";

class KpiDirectoriesService {
    getAll() {
        return Api.doGet(Host.API_V1 + "/kpi-directories");
    }

    getPaginate(params) {
        return Api.doGet(Host.API_V1 + "/kpi-directories/paginate?", params);
    }

    postCreate(params) {
        return Api.doPost(Host.API_V1 + `/kpi-directories/create`, params);
    }

    postUpdate(id, params) {
        return Api.doPost(Host.API_V1 + `/kpi-directories/update/${id}`, params);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/kpi-directories/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/kpi-directories/delete/${id}`);
    }
}

export default new KpiDirectoriesService();
import Host from '@/api/host'
import Api from "../api/Api";


class KpiDirectoriesService {
    getAll() {
        return Api.doGet(Host.API_V1 + "/kpi-groups");
    }

    getPaginate(params) {
        return Api.doGet(Host.API_V1 + "/kpi-groups/paginate?", params);
    }

    postCreate(params) {
        return Api.doPost(Host.API_V1 + `/kpi-groups/create`, params);
    }

    postUpdate(id, params) {
        return Api.doPost(Host.API_V1 + `/kpi-groups/update/${id}`, params);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/kpi-groups/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/kpi-groups/delete/${id}`);
    }
}

export default new KpiDirectoriesService();

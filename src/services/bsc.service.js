import Host from '@/api/host'
import Api from "../api/Api";


class KpiDirectoriesService {
    getAll() {
        return Api.doGet(Host.API_V1 + "/bsc");
    }

    getPaginate(params) {
        return Api.doGet(Host.API_V1 + "/bsc/paginate?", params);
    }

    postCreate(params) {
        return Api.doPost(Host.API_V1 + `/bsc/create`, params);
    }

    postUpdate(id, params) {
        return Api.doPost(Host.API_V1 + `/bsc/update/${id}`, params);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/bsc/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/bsc/delete/${id}`);
    }
}

export default new KpiDirectoriesService();

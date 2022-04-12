import Host from '@/api/host'
import Api from "../api/Api";

class KpiDirectoriesService {
    getAll() {
        return Api.doGet(Host.API_V1 + "/families");
    }

    getPaginate(params) {
        return Api.doGet(Host.API_V1 + "/families/paginate?", params);
    }

    postCreate(params) {
        return Api.doPost(Host.API_V1 + `/families/create`, params);
    }

    postUpdate(id, params) {
        return Api.doPost(Host.API_V1 + `/families/update/${id}`, params);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/families/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/families/delete/${id}`);
    }
}

export default new KpiDirectoriesService();

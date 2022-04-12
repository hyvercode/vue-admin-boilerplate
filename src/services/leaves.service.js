import Host from '@/api/host'
import Api from "../api/Api";


class LeavesService {
    getAll() {
        return Api.doGet(Host.API_V1 + "/leaves");
    }

    getPaginate(params) {
        return Api.doGet(Host.API_V1 + "/leaves/paginate?", params);
    }

    postCreate(params) {
        return Api.doPost(Host.API_V1 + `/leaves/create`, params);
    }

    postUpdate(id, params) {
        return Api.doPost(Host.API_V1 + `/leaves/update/${id}`, params);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/leaves/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/leaves/delete/${id}`);
    }
}

export default new LeavesService();

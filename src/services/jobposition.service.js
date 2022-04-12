import Host from '@/api/host'
import Api from "../api/Api";


class JobPositionService {
    getAll() {
        return Api.doGet(Host.API_V1 + "/job-positions");
    }

    getPaginate(params) {
        return Api.doGet(Host.API_V1 + "/job-positions/paginate?", params);
    }

    postCreate(params) {
        return Api.doPost(Host.API_V1 + `/job-positions/create`, params);
    }

    postUpdate(id, params) {
        return Api.doPost(Host.API_V1 + `/job-positions/update/${id}`, params);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/job-positions/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/job-positions/delete/${id}`);
    }
}

export default new JobPositionService();

import Host from '@/api/host'
import Api from "../api/Api";


class ProjectService {
    getAll() {
        return Api.doGet(Host.API_V1 + "/projects");
    }

    getPaginate(params) {
        return Api.doGet(Host.API_V1 + "/projects/paginate?", params);
    }

    postCreate(params) {
        return Api.doPost(Host.API_V1 + `/projects/create`, params);
    }

    postUpdate(id, params) {
        return Api.doPost(Host.API_V1 + `/projects/update/${id}`, params);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/projects/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/projects/delete/${id}`);
    }
}

export default new ProjectService();

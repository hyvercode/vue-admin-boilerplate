import Host from '@/api/host'
import Api from "../api/Api";


class ProjectTaskTypesService {
    getAll() {
        return Api.doGet(Host.API_V1 + "/projects/types/");
    }

    getPaginate(params) {
        return Api.doGet(Host.API_V1 + "/projects/types/paginate?", params);
    }

    postCreate(params) {
        return Api.doPost(Host.API_V1 + `/projects/types/create`, params);
    }

    postUpdate(id, params) {
        return Api.doPost(Host.API_V1 + `/projects/types/update/${id}`, params);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/projects/types/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/projects/types/delete/${id}`);
    }
}

export default new ProjectTaskTypesService();

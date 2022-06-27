import Host from '@/api/host'
import Api from "../api/Api";


class ProjectTaskService {
    getAll() {
        return Api.doGet(Host.API_V1 + "/projects/task/");
    }

    getPaginate(params) {
        return Api.doGet(Host.API_V1 + "/projects/task/paginate?", params);
    }

    postCreate(params) {
        return Api.doPost(Host.API_V1 + `/projects/task/create`, params);
    }

    postUpdate(id, params) {
        return Api.doPost(Host.API_V1 + `/projects/task/update/${id}`, params);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/projects/task/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/projects/task/delete/${id}`);
    }
}

export default new ProjectTaskService();

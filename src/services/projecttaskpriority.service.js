import Host from '@/api/host'
import Api from "../api/Api";


class ProjecttaskpriorityService {
    getAll() {
        return Api.doGet(Host.API_V1 + "/projects/priority/");
    }

    getPaginate(params) {
        return Api.doGet(Host.API_V1 + "/projects/priority/paginate?", params);
    }

    postCreate(params) {
        return Api.doPost(Host.API_V1 + `/projects/priority/create`, params);
    }

    postUpdate(id, params) {
        return Api.doPost(Host.API_V1 + `/projects/priority/update/${id}`, params);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/projects/priority/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/projects/priority/delete/${id}`);
    }
}

export default new ProjecttaskpriorityService();

import Host from '@/api/host'
import Api from "../api/Api";


class ProjectTargetService {
    getAll() {
        return Api.doGet(Host.API_V1 + "/projects/target/");
    }

    getPaginate(params) {
        return Api.doGet(Host.API_V1 + "/projects/target/paginate?", params);
    }

    postCreate(params) {
        return Api.doPost(Host.API_V1 + `/projects/target/create`, params);
    }

    postUpdate(id, params) {
        return Api.doPost(Host.API_V1 + `/projects/target/update/${id}`, params);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/projects/target/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/projects/target/delete/${id}`);
    }

    postCreateTarget(params){
        return Api.doPost(Host.API_V1 + `/projects/create/project-target`, params)
    }
}

export default new ProjectTargetService();

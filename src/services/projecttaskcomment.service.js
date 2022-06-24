import Host from '@/api/host'
import Api from "../api/Api";


class ProjectTaskCommentService {
    getAll() {
        return Api.doGet(Host.API_V1 + "/projects/comment/");
    }

    getPaginate(params) {
        return Api.doGet(Host.API_V1 + "/projects/comment/paginate?", params);
    }

    postCreate(params) {
        return Api.doPost(Host.API_V1 + `/projects/comment/create`, params);
    }

    postUpdate(id, params) {
        return Api.doPost(Host.API_V1 + `/projects/comment/update/${id}`, params);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/projects/comment/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/projects/comment/delete/${id}`);
    }

    getAllById(id) {
        return Api.doGet(Host.API_V1 + `/projects/comment/getAllById/${id}`);
    }
}

export default new ProjectTaskCommentService();

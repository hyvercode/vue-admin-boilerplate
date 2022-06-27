import Host from '@/api/host'
import Api from "../api/Api";


class ProjectTaskCategoryService {
    getAll() {
        return Api.doGet(Host.API_V1 + "/projects/category/");
    }

    getPaginate(params) {
        return Api.doGet(Host.API_V1 + "/projects/category/paginate?", params);
    }

    postCreate(params) {
        return Api.doPost(Host.API_V1 + `/projects/category/create`, params);
    }

    postUpdate(id, params) {
        return Api.doPost(Host.API_V1 + `/projects/category/update/${id}`, params);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/projects/category/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/projects/category/delete/${id}`);
    }
}

export default new ProjectTaskCategoryService();

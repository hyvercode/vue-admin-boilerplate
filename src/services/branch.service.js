import Host from '@/api/host'
import Api from "../api/index";

class BranchService {
    getPaginate(params) {
        return Api.doGet(Host.API_V1 + '/backoffice/branch/paginate?', params);
    }

    postCreate(params) {
        return Api.doPost(Host.API_V1 + `/backoffice/branch/create`, params);
    }

    postUpdate(id, params) {
        return Api.doPost(Host.API_V1 + `/backoffice/branch/update/${id}`, params);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/backoffice/branch/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/backoffice/branch/delete/${id}`);
    }

    getByCompany(id) {
        return Api.doGet(Host.API_V1 + `/backoffice/branch/company/${id}`);
    }
}

export default new BranchService();
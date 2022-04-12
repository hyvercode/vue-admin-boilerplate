import Host from '@/api/host'
import Api from "../api/Api";


class CompaniesService {
    getAll() {
        return Api.doGet(Host.API_V1 + '/company');
    }

    getPaginate(params) {
        return Api.doGet(Host.API_V1 + '/company/paginate?', params);
    }

    postCreate(params) {
        return Api.doPost(Host.API_V1 + `/company/create`, params);
    }

    postUpdate(id, params) {
        return Api.doPost(Host.API_V1 + `/company/update/${id}`, params);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/company/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/company/delete/${id}`);
    }
}

export default new CompaniesService();
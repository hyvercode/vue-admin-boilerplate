import Host from '@/api/host'
import Api from "../api/index";

class CompaniesService {
    getAll() {
        return Api.doGet(Host.API_V1 + '/backoffice/companies/partner');
    }

    getPaginate(params) {
        return Api.doGet(Host.API_V1 + '/backoffice/companies/paginate?', params);
    }

    postUpdate(id, params) {
        return Api.doPost(Host.API_V1 + `/backoffice/companies/update/${id}`, params);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/backoffice/companies/show/${id}`);
    }
}

export default new CompaniesService();
import Host from '@/api/host'
import Api from "../api/Api";


class BusinessService {

    getAll() {
        return Api.doGet(Host.API_V1 + '/global/business');
    }

    getPaginate(params) {
        return Api.doPost(Host.API_V1 + '/global/business/paginate?', params);
    }

    postCreate(params) {
        return Api.doPost(Host.API_V1 + `/global/business/create`, params);
    }

    postUpdate(id, params) {
        return Api.doGet(Host.API_V1 + `/global/business/update/${id}`, params);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/global/business/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/global/business/delete/${id}`);
    }
}

export default new BusinessService();
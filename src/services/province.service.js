import Host from '@/api/host'
import Api from "../api/Api";

class ProvinceService {

    getAll() {
        return Api.doGet(Host.API_V1 + '/global/province');
    }

    getPaginate(params) {
        return Api.doPost(Host.API_V1 + '/global/province/paginate?', params);
    }

    postCreate(params) {
        return Api.doPost(Host.API_V1 + `/global/province/create`, params);
    }

    postUpdate(id, params) {
        return Api.doGet(Host.API_V1 + `/global/province/update/${id}`, params);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/global/province/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/global/province/delete/${id}`);
    }
}

export default new ProvinceService();
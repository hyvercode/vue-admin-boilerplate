import Host from '@/api/host'
import Api from "../api/Api";

class CitiesService {

    getAll() {
        return Api.doGet(Host.API_V1 + '/global/city');
    }

    getPaginate(params) {
        return Api.doGet(Host.API_V1 + '/global/city/paginate?', params);
    }

    postCreate(params) {
        return Api.doPost(Host.API_V1 + `/global/city/create`, params);
    }

    postUpdate(id, params) {
        return Api.doPost(Host.API_V1 + `/global/city/update/${id}`, params);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/global/city/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/global/city/delete/${id}`);
    }

    getCityByProvince(id) {
        return Api.doGet(Host.API_V1 + `/global/city/province/${id}`);
    }
}

export default new CitiesService();
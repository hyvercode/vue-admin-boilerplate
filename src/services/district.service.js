import Host from '@/api/host'
import Api from "../api/Api";


class DistrictService {

    getAll() {
        return Api.doGet(Host.API_V1 + '/global/district');
    }

    getPaginate(params) {
        return Api.doGet(Host.API_V1 + '/global/district/paginate?', params);
    }

    postCreate(params) {
        return Api.doPost(Host.API_V1 + `/global/district/create`, params);
    }

    postUpdate(id, params) {
        return Api.doPost(Host.API_V1 + `/global/district/update/${id}`, params);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/global/district/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/global/district/delete/${id}`);
    }

    getDistrictByCity(id) {
        return Api.doGet(Host.API_V1 + `/global/district/city/${id}`);
    }
}

export default new DistrictService();
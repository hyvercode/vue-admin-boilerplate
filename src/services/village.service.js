import Host from '@/api/host'
import Api from "../api/Api";

class VillageService {

    getAll() {
        return Api.doGet(Host.API_V1 + '/global/village');
    }

    getPaginate(params) {
        return Api.doGet(Host.API_V1 + '/global/village/paginate?', params);
    }

    postCreate(params) {
        return Api.doPost(Host.API_V1 + `/global/village/create`, params);
    }

    postUpdate(id, params) {
        return Api.doPost(Host.API_V1 + `/global/village/update/${id}`, params);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/global/village/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/global/village/delete/${id}`);
    }

    getVillageByDistrict(id) {
        return Api.doGet(Host.API_V1 + `/global/village/district/${id}`);
    }
}

export default new VillageService();
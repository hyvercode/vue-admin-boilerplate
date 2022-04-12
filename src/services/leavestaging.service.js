import Host from '@/api/host'
import Api from "../api/Api";


class LeavesStagingService {
    getAll() {
        return Api.doGet(Host.API_V1 + "/leaves/settings/stagings");
    }

    getPaginate(params) {
        return Api.doGet(Host.API_V1 + "/leaves/settings/stagings/paginate?", params);
    }

    postCreate(params) {
        return Api.doPost(Host.API_V1 + `/leaves/settings/stagings/create`, params);
    }

    postUpdate(id, params) {
        return Api.doPost(Host.API_V1 + `/leaves/settings/stagings/update/${id}`, params);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/leaves/settings/stagings/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/leaves/settings/stagings/delete/${id}`);
    }
}

export default new LeavesStagingService();

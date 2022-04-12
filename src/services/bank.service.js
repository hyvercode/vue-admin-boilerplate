import Host from '@/api/host'
import Api from "../api/Api";

class BannerService {
    getAll() {
        return Api.doGet(Host.API_V1 + "/global/bank");
    }

    getPaginate(params) {
        return Api.doGet(Host.API_V1 + "/global/bank/paginate?", params);
    }

    postCreate(params) {
        return Api.doPost(Host.API_V1 + `/global/bank/create`, params);
    }

    postUpdate(id, params) {
        return Api.doPost(Host.API_V1 + `/global/bank/update/${id}`, params);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/global/bank/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/global/bank/delete/${id}`);
    }
}

export default new BannerService();

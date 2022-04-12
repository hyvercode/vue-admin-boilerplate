import Host from '@/api/host'
import Api from "../api/Api";


class HalfdayService {
    getAll() {
        return Api.doGet(Host.API_V1 + "/leaves/settings/halfday");
    }

    getPaginate(params) {
        return Api.doGet(Host.API_V1 + "/leaves/settings/halfday/paginate?", params);
    }

    postCreate(params) {
        return Api.doPost(Host.API_V1 + `/leaves/settings/halfday/create`, params);
    }

    postUpdate(id, params) {
        return Api.doPost(Host.API_V1 + `/leaves/settings/halfday/update/${id}`, params);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/leaves/settings/halfday/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/leaves/settings/halfday/delete/${id}`);
    }
}

export default new HalfdayService();

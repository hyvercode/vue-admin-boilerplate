import Host from '@/api/host'
import Api from "../api/Api";


class BannerService {
    getAll() {
        return Api.doGet(Host.API_V1 + "/global/education");
    }

    getPaginate(params) {
        return Api.doGet(Host.API_V1 + "/global/education/paginate?", params);
    }

    postCreate(params) {
        return Api.doPost(Host.API_V1 + `/global/education/create`, params);
    }

    postUpdate(id, params) {
        return Api.doPost(Host.API_V1 + `/global/education/update/${id}`, params);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/global/education/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/global/education/delete/${id}`);
    }
}

export default new BannerService();

import Host from '@/api/host'
import Api from "../api/Api";


class BannerService {
    getAll() {
        return Api.doGet(Host.API_V1 + "/banners");
    }

    getPaginate(params) {
        return Api.doGet(Host.API_V1 + "/banners/paginate?", params);
    }

    postCreate(params) {
        return Api.doPost(Host.API_V1 + `/banners/create`, params);
    }

    postUpdate(id, params) {
        return Api.doPost(Host.API_V1 + `/banners/update/${id}`, params);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/banners/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/banners/delete/${id}`);
    }
}

export default new BannerService();

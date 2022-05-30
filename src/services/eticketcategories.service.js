import Host from '@/api/host'
import Api from "../api/Api";


class ETicketCategoriesService {
    getAll() {
        return Api.doGet(Host.API_V1 + "/eticket/categories");
    }

    getPaginate(params) {
        return Api.doGet(Host.API_V1 + "/eticket/categories/paginate?", params);
    }

    postCreate(params) {
        return Api.doPost(Host.API_V1 + `/eticket/categories/create`, params);
    }

    postUpdate(id, params) {
        return Api.doPost(Host.API_V1 + `/eticket/categories/update/${id}`, params);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/eticket/categories/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/eticket/categories/delete/${id}`);
    }
}

export default new ETicketCategoriesService();

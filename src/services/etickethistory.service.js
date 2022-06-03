import Host from '@/api/host'
import Api from "../api/Api";


class ETicketHistoryService {
    getAll() {
        return Api.doGet(Host.API_V1 + "/eticket/history");
    }

    getPaginate(params) {
        return Api.doGet(Host.API_V1 + "/eticket/history/paginate?", params);
    }

    postCreate(params) {
        return Api.doPost(Host.API_V1 + `/eticket/history/create`, params);
    }

    postUpdate(id, params) {
        return Api.doPost(Host.API_V1 + `/eticket/history/update/${id}`, params);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/eticket/history/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/eticket/history/delete/${id}`);
    }

    getAllById(id) {
        return Api.doGet(Host.API_V1 + `/eticket/history/getAllById/${id}`);
    }
}

export default new ETicketHistoryService();

import Host from '@/api/host'
import Api from "../api/Api";


class ETicketPriorityService {
    getAll() {
        return Api.doGet(Host.API_V1 + "/eticket/priority");
    }

    getPaginate(params) {
        return Api.doGet(Host.API_V1 + "/eticket/priority/paginate?", params);
    }

    postCreate(params) {
        return Api.doPost(Host.API_V1 + `/eticket/priority/create`, params);
    }

    postUpdate(id, params) {
        return Api.doPost(Host.API_V1 + `/eticket/priority/update/${id}`, params);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/eticket/priority/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/eticket/priority/delete/${id}`);
    }
}

export default new ETicketPriorityService();

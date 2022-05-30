import Host from '@/api/host'
import Api from "../api/Api";


class ETicketMilestoneService {
    getAll() {
        return Api.doGet(Host.API_V1 + "/eticket/milestone");
    }

    getPaginate(params) {
        return Api.doGet(Host.API_V1 + "/eticket/milestone/paginate?", params);
    }

    postCreate(params) {
        return Api.doPost(Host.API_V1 + `/eticket/milestone/create`, params);
    }

    postUpdate(id, params) {
        return Api.doPost(Host.API_V1 + `/eticket/milestone/update/${id}`, params);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/eticket/milestone/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/eticket/milestone/delete/${id}`);
    }
}

export default new ETicketMilestoneService();

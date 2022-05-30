import Host from '@/api/host'
import Api from "../api/Api";


class ETicketIssueTypeService {
    getAll() {
        return Api.doGet(Host.API_V1 + "/eticket/issue-type");
    }

    getPaginate(params) {
        return Api.doGet(Host.API_V1 + "/eticket/issue-type/paginate?", params);
    }

    postCreate(params) {
        return Api.doPost(Host.API_V1 + `/eticket/issue-type/create`, params);
    }

    postUpdate(id, params) {
        return Api.doPost(Host.API_V1 + `/eticket/issue-type/update/${id}`, params);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/eticket/issue-type/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/eticket/issue-type/delete/${id}`);
    }
}

export default new ETicketIssueTypeService();

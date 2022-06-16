import Host from '@/api/host'
import Api from "../api/Api";


class ETicketService {
    getAll() {
        return Api.doGet(Host.API_V1 + "/eticket/");
    }

    getPaginate(params) {
        return Api.doGet(Host.API_V1 + "/eticket/paginate?", params);
    }

    postCreate(params) {
        return Api.doPost(Host.API_V1 + `/eticket/create`, params);
    }

    postUpdate(id, params) {
        return Api.doPost(Host.API_V1 + `/eticket/update/${id}`, params);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/eticket/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/eticket/delete/${id}`);
    }

    getMyTicketPaginate(params) {
        return Api.doGet(Host.API_V1 + "/eticket/my/pagination?", params);
    }

    getMyKanban() {
        return Api.doGet(Host.API_V1 + "/eticket/my/kanban");
    }

    getKanbanAdmin(){
        return Api.doGet(Host.API_V1 + "/eticket/kanban");
    }
}

export default new ETicketService();

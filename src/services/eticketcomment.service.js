import Host from '@/api/host'
import Api from "../api/Api";


class ETicketCommentService {
    getAll() {
        return Api.doGet(Host.API_V1 + "/eticket/comment/");
    }

    getAllComment(id) {
        return Api.doGet(Host.API_V1 + `/eticket/comment/getAllById/${id}`);
    }

    getPaginate(params) {
        return Api.doGet(Host.API_V1 + "/eticket/comment/paginate?", params);
    }

    postCreate(params) {
        return Api.doPost(Host.API_V1 + `/eticket/comment/create`, params);
    }

    postUpdate(id, params) {
        return Api.doPost(Host.API_V1 + `/eticket/comment/update/${id}`, params);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/eticket/comment/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/eticket/comment/delete/${id}`);
    }
}

export default new ETicketCommentService();

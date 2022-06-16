import Host from '@/api/host'
import Api from "../api/Api";


class MeetingService {
    getAll() {
        return Api.doGet(Host.API_V1 + "/events/meeting/");
    }

    getPaginate(params) {
        return Api.doGet(Host.API_V1 + "/events/meeting/paginate?", params);
    }

    postCreate(params) {
        return Api.doPost(Host.API_V1 + `/events/meeting/create`, params);
    }

    postUpdate(id, params) {
        return Api.doPost(Host.API_V1 + `/events/meeting/update/${id}`, params);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/events/meeting/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/events/meeting/delete/${id}`);
    }

    getMeetingKanban(){
        return Api.doGet(Host.API_V1 + "/events/meeting/list");
    }
}

export default new MeetingService();

import Host from '@/api/host'
import Api from "../api/Api";

class NotificationService {

    getPaginate(payload) {
        return Api.doGet(Host.API_V1 + '/inboxs/paginate?', payload);
    }

    postRead(id) {
        return Api.doPost(Host.API_V1 + `/inboxs/read/${id}`);
    }

    getCount() {
        return Api.doGet(Host.API_V1 + `/inboxs/count`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/inboxs/delete/${id}`);
    }
}

export default new NotificationService();
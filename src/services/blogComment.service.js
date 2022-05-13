import Host from '@/api/host'
import Api from "../api/Api";

class BlogCommnetService {
    getAll() {
        return Api.doGet(Host.API_V1 + "/blogs/comments");
    }

    getPaginate(payloads) {
        return Api.doGet(Host.API_V1 + "/blogs/comments/paginate?", payloads);
    }

    postCreate(payloads) {
        return Api.doPost(Host.API_V1 + `/blogs/comments/create`, payloads);
    }

    postUpdate(id, payloads) {
        return Api.doPost(Host.API_V1 + `/blogs/comments/update/${id}`, payloads);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/blogs/comments/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/blogs/comments/delete/${id}`);
    }
}

export default new BlogCommnetService();

import Host from '@/api/host'
import Api from "../api/Api";

class BlogTagsService {
    getAll() {
        return Api.doGet(Host.API_V1 + "/blogs/tags");
    }

    getPaginate(payloads) {
        return Api.doGet(Host.API_V1 + "/blogs/tags/paginate?", payloads);
    }

    postCreate(payloads) {
        return Api.doPost(Host.API_V1 + `/blogs/tags/create`, payloads);
    }

    postUpdate(id, payloads) {
        return Api.doPost(Host.API_V1 + `/blogs/tags/update/${id}`, payloads);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/blogs/tags/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/blogs/tags/delete/${id}`);
    }
}

export default new BlogTagsService();

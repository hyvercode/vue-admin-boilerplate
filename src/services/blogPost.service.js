import Host from '@/api/host'
import Api from "../api/Api";

class BlogPostService {
    getAll() {
        return Api.doGet(Host.API_V1 + "/blogs/posts");
    }

    getPaginate(payloads) {
        return Api.doGet(Host.API_V1 + "/blogs/posts/paginate?", payloads);
    }

    postCreate(payloads) {
        return Api.doPost(Host.API_V1 + `/blogs/posts/create`, payloads);
    }

    postUpdate(id, payloads) {
        return Api.doPost(Host.API_V1 + `/blogs/posts/update/${id}`, payloads);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/blogs/posts/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/blogs/posts/delete/${id}`);
    }

    postPublished(id, payloads) {
        return Api.doPost(Host.API_V1 + `/blogs/posts/publish/${id}`, payloads);
    }

    postUpload(payloads) {
        return Api.doPost(Host.API_V1 + `/blogs/posts/upload`, payloads);
    }
}

export default new BlogPostService();

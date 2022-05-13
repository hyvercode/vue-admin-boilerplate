import Host from '@/api/host'
import Api from "../api/Api";

class BlogCategoriesService {
    getAll() {
        return Api.doGet(Host.API_V1 + "/blogs/categories");
    }

    getPaginate(payloads) {
        return Api.doGet(Host.API_V1 + "/blogs/categories/paginate?", payloads);
    }

    postCreate(payloads) {
        return Api.doPost(Host.API_V1 + `/blogs/categories/create`, payloads);
    }

    postUpdate(id, payloads) {
        return Api.doPost(Host.API_V1 + `/blogs/categories/update/${id}`, payloads);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/blogs/categories/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/blogs/categories/delete/${id}`);
    }
}

export default new BlogCategoriesService();

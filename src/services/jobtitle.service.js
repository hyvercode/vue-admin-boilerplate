import Host from '@/api/host'
import Api from "../api/Api";


class JobtitleService {
    getAll() {
        return Api.doGet(Host.API_V1 + "/job-titles");
    }

    getPaginate(params) {
        return Api.doGet(Host.API_V1 + "/job-titles/paginate?", params);
    }

    postCreate(params) {
        return Api.doPost(Host.API_V1 + `/job-titles/create`, params);
    }

    postUpdate(id, params) {
        return Api.doPost(Host.API_V1 + `/job-titles/update/${id}`, params);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/job-titles/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/job-titles/delete/${id}`);
    }
}

export default new JobtitleService();

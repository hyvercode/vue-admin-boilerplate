import Host from '@/api/host'
import Api from "../api/Api";


class DashboardService {
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

    getEticketOverview(){
        return Api.doGet(Host.API_V1 + "/dashboard/eticket");
    }
}

export default new DashboardService();

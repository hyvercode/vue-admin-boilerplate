import Host from '@/api/host'
import Api from "../api/Api";

class EGSService {
  getAll() {
    return Api.doGet(Host.API_V1 + "/egs");
  }

  getPaginate(params) {
    return Api.doGet(Host.API_V1 + "/egs/paginate?", params);
  }

  postCreate(params) {
    return Api.doPost(Host.API_V1 + `/egs/create`, params);
  }

  postUpdate(id, params) {
    return Api.doPost(Host.API_V1 + `/egs/update/${id}`, params);
  }

  getShowDetail(id) {
    return Api.doGet(Host.API_V1 + `/egs/detail/show/${id}`);
  }
  getShow(id) {
    return Api.doGet(Host.API_V1 + `/egs/show/${id}`);
  }

  delete(id) {
    return Api.doDelete(Host.API_V1 + `/egs/delete/${id}`);
  }

  getPaginateReports(params) {
    return Api.doGet(Host.API_V1 + "/egs/report/paginate?", params);
  }
}

export default new EGSService();

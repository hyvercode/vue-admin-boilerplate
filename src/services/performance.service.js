import Host from '@/api/host'
import Api from "../api/Api";

class PerformanceService {
  getAll() {
    return Api.doGet(Host.API_V1 + "/performance");
  }

  getPaginate(params) {
    return Api.doGet(Host.API_V1 + "/performance/paginate?", params);
  }
  postCreate(params) {
    return Api.doPost(Host.API_V1 + `/performance/review/create`, params);
  }

  postUpdate(id, params) {
    return Api.doPost(
      Host.API_V1 + `/performance/review/update/${id}`,
      params
    );
  }

  getShow(id) {
    return Api.doGet(Host.API_V1 + `/performance/review/show/${id}`);
  }

  delete(id) {
    return Api.doDelete(Host.API_V1 + `/performance/review/delete/${id}`);
  }
}

export default new PerformanceService();

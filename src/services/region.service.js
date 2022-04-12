import Host from '@/api/host'
import Api from "../api/Api";

class RegionService {
  getAll() {
    return Api.doGet(Host.API_V1 + "/backoffice/region");
  }
  getPaginate(params) {
    return Api.doGet(Host.API_V1 + "/backoffice/region/paginate?", params);
  }

  postCreate(params) {
    return Api.doPost(Host.API_V1 + `/backoffice/region/create`, params);
  }

  postUpdate(id, params) {
    return Api.doPost(
      Host.API_V1 + `/backoffice/region/update/${id}`,
      params
    );
  }

  getShow(id) {
    return Api.doGet(Host.API_V1 + `/backoffice/region/show/${id}`);
  }

  delete(id) {
    return Api.doDelete(Host.API_V1 + `/backoffice/region/delete/${id}`);
  }
}

export default new RegionService();

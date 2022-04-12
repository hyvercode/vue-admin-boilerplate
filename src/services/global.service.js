import Host from '@/api/host'
import Api from "../api/Api";


class GlobalService {
  getPaginate(params) {
    return Api.doGet(Host.API_V1 + "/backoffice/global/paginate?", params);
  }

  postCreate(params) {
    return Api.doPost(Host.API_V1 + `/backoffice/global/create`, params);
  }

  postUpdate(id, params) {
    return Api.doPost(Host.API_V1 + `/backoffice/global/update/${id}`, params);
  }

  getShow(id) {
    return Api.doGet(Host.API_V1 + `/backoffice/global/show/${id}`);
  }

  delete(id) {
    return Api.doDelete(Host.API_V1 + `/backoffice/global/delete/${id}`);
  }

  getByCompany(id) {
    return Api.doGet(Host.API_V1 + `/backoffice/global/company/${id}`);
  }

  getByParam(status) {
    return Api.doGet(Host.API_V1 + `/backoffice/global/param/${status}`);
  }
}

export default new GlobalService();

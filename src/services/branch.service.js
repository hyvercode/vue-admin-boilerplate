import Host from '@/api/host'
import Api from "../api/Api";

class BranchService {
  getAll() {
    return Api.doGet(Host.API_V1 + "/branches");
  }
  getPaginate(params) {
    return Api.doGet(Host.API_V1 + "/branches/paginate?", params);
  }

  postCreate(params) {
    return Api.doPost(Host.API_V1 + `/branches/create`, params);
  }

  postUpdate(id, params) {
    return Api.doPost(Host.API_V1 + `/branches/update/${id}`, params);
  }

  getShow(id) {
    return Api.doGet(Host.API_V1 + `/branches/show/${id}`);
  }

  delete(id) {
    return Api.doDelete(Host.API_V1 + `/branches/delete/${id}`);
  }

  getByCompany(id) {
    return Api.doGet(Host.API_V1 + `/branches/company/${id}`);
  }
}

export default new BranchService();

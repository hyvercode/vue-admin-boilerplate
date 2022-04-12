import Host from '@/api/host'
import Api from "../api/Api";


class EGSService {
  getAll() {
    return Api.doGet(Host.API_V1 + "/egs/detail");
  }

  getPaginate(params) {
    return Api.doGet(Host.API_V1 + "/egs/detail/paginate?", params);
  }

  postCreate(params) {
    return Api.doPost(Host.API_V1 + `/egs/detail/create`, params);
  }

  postUpdate(id, params) {
    return Api.doPost(Host.API_V1 + `/egs/detail/update/${id}`, params);
  }

  getShowDetail(id) {
    return Api.doGet(Host.API_V1 + `/egs/detail/show/${id}`);
  }
  getShow(id) {
    return Api.doGet(Host.API_V1 + `/egs/detail/show/${id}`);
  }

  delete(id) {
    return Api.doDelete(Host.API_V1 + `/egs/detail/delete/${id}`);
  }
}

export default new EGSService();

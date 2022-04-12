import Host from '@/api/host'
import Api from "../api/Api";

class ReviewService {
  getAll() {
    return Api.doGet(Host.API_V1 + "/performance/review");
  }
  getPaginate(params) {
    return Api.doGet(Host.API_V1 + "/performance/apprasial/paginate?", params);
  }

  postCreate(params) {
    return Api.doPost(Host.API_V1 + `/performance/review/create`, params);
  }

  
  postSubmit(id, params) {
    return Api.doPost(
      Host.API_V1 + `/performance/apprasial/submit/${id}`,
      params
    );
  }
  
  postUpdate(id, params) {
    return Api.doPost(
      Host.API_V1 + `/performance/apprasial/update/${id}`,
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

export default new ReviewService();

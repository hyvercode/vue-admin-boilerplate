import Host from '@/api/host'
import Api from "../api/Api";

class ProfileService {
  getShow(id) {
    return Api.doGet(Host.API_V1 + `/backoffice/employee/show/${id}`);
  }

  postUpdate(id, params) {
    return Api.doPost(
      Host.API_V1 + `/backoffice/employee/update/${id}`,
      params
    );
  }
}

export default new ProfileService();

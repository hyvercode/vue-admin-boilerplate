import Host from '@/api/host'
import Api from "../api/index";

class EmployeeService {
    getAll(id) {
        return Api.doGet(Host.API_V1 + `/backoffice/employee/partner/company/${id}`);
    }

    getPaginate(params) {
        return Api.doGet(Host.API_V1 + '/backoffice/employee/partner/paginate?', params);
    }

    postCreate(params) {
        return Api.doPost(Host.API_V1 + `/backoffice/employee/create`, params);
    }

    postUpdate(id, params) {
        return Api.doPost(Host.API_V1 + `/backoffice/employee/update/${id}`, params);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/backoffice/employee/delete/${id}`);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/backoffice/employee/show/${id}`);
    }
}

export default new EmployeeService();
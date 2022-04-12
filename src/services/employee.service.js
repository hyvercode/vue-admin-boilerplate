import Host from '@/api/host'
import Api from "../api/Api";


class EmployeeService {
    getAll() {
        return Api.doGet(Host.API_V1 + '/employees');
    }

    getPaginate(params) {
        return Api.doGet(Host.API_V1 + '/employees/paginate?', params);
    }

    postCreate(params) {
        return Api.doPost(Host.API_V1 + `/employees/create`, params);
    }

    postUpdate(id, params) {
        return Api.doPost(Host.API_V1 + `/employees/update/${id}`, params);
    }

    getEmployee() {
        return Api.doGet(Host.API_V1 + '/employees');
    }


    delete(id) {
        return Api.doDelete(Host.API_V1 + `/employees/delete/${id}`);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/employees/show/${id}`);
    }

    getByCompany(id) {
        return Api.doGet(Host.API_V1 + `/employees/company/${id}`);
    }
}

export default new EmployeeService();
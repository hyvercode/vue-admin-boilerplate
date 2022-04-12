import Host from '@/api/host'
import Api from "../api/Api";


class AttendanceService {
    getPaginate(params) {
        return Api.doGet(Host.API_V1 + '/attendance/paginate?', params);
    }

    getPaginateTmp(params) {
        return Api.doGet(Host.API_V1 + '/attendance/tmp/paginate?', params);
    }
}

export default new AttendanceService();
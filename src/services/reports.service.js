import Host from '@/api/host'
import Api from "../api/index";

class ReportsService {
    getPaginate(params) {
        return Api.doGet(Host.API_V1 + '/reports/orders?', params);
    }
}

export default new ReportsService();
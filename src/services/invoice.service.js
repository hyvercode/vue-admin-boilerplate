import Host from '@/api/host'
import Api from "../api/index";

class InvoiceService {
    getPaginate(params) {
        return Api.doGet(Host.API_V1 + '/backoffice/invoice/paginate/partner?', params);
    }

    getPaginateDetail(params) {
        return Api.doGet(Host.API_V1 + '/backoffice/invoice/paginate/detail?', params);
    }
}

export default new InvoiceService();
import Host from '@/api/host'
import Api from "../api/index";

class OrdersService {
    getPaginate(params) {
        return Api.doGet(Host.API_V1 + '/cms/partner/orders/paginate?', params);
    }
}

export default new OrdersService();
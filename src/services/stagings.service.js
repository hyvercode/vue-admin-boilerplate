import Host from '@/api/host'
import Api from "../api/Api";

class StagingsService {
    getAll(payload) {
        return Api.doGet(Host.API_V1 + "/stagings?", payload);
    }
}

export default new StagingsService();

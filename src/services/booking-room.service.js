import Host from '@/api/host'
import Api from "../api/Api";


class BookingRoomMeetingService {
    getAll() {
        return Api.doGet(Host.API_V1 + "/events/meeting/booking-room/");
    }

    getPaginate(params) {
        return Api.doGet(Host.API_V1 + "/events/meeting/booking-room/paginate?", params);
    }

    postCreate(params) {
        return Api.doPost(Host.API_V1 + `/events/meeting/booking-room/create`, params);
    }

    postUpdate(id, params) {
        return Api.doPost(Host.API_V1 + `/events/meeting/booking-room/update/${id}`, params);
    }

    getShow(id) {
        return Api.doGet(Host.API_V1 + `/events/meeting/booking-room/show/${id}`);
    }

    delete(id) {
        return Api.doDelete(Host.API_V1 + `/events/meeting/booking-room/delete/${id}`);
    }

    getListParticipant(id) {
        return Api.doGet(Host.API_V1 + `/events/meeting/booking-room/participant/${id}`);
    }
}

export default new BookingRoomMeetingService();

export default class RequestMeetingRoom {
    constructor(id, room_name, floor, descriptions, company_id, active) {
        this.id = id;
        this.room_name = room_name;
        this.floor = floor;
        this.descriptions = descriptions;
        this.company_id = company_id;
        this.active = active;
    }
}

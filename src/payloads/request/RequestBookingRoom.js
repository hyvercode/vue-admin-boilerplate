export default class RequestBookingRoom {
    constructor(id, meeting_room_id, start_meet, description, company_id, end_meet, link, title, participant) {
        this.id = id;
        this.meeting_room_id = meeting_room_id;
        this.start_meet = start_meet;
        this.description = description;
        this.end_meet = end_meet;
        this.link = link;
        this.company_id = company_id;
        this.title = title;
        this.participant = participant;
    }
}

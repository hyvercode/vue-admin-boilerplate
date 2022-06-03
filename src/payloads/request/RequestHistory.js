export default class RequestHistory {

    constructor(id,
                e_ticket_id,
                assignee_id,
                notes,
                status) {
        this.id = id;
        this.e_ticket_id = e_ticket_id;
        this.assignee_id = assignee_id;
        this.notes = notes;
        this.status = status;
    }


}

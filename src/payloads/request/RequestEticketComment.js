export default class RequestEticketComment {
    constructor(id,
                e_ticket_id,
                body,
                attachments,
                user_id,
                company_id
    ) {
        this.id = id;
        this.e_ticket_id = e_ticket_id;
        this.body = body;
        this.attachments = attachments;
        this.user_id = user_id;
        this.company_id = company_id;
    }

}

export default class RequestEticket {
    constructor(id,
                request_date,
                due_date,
                issue_type_id,
                parent_issue,
                cc_id,
                subject,
                body,
                e_ticket_priority_id,
                e_ticket_category_id,
                e_ticket_id,
                attachments,
                status,
                assignee_id,
                reviewer_id,
                approve_status,
                ) {
        this.id = id;
        this.request_date = request_date;
        this.due_date = due_date;
        this.issue_type_id = issue_type_id;
        this.parent_issue = parent_issue;
        this.cc_id = cc_id;
        this.subject = subject;
        this.body = body;
        this.e_ticket_priority_id = e_ticket_priority_id;
        this.e_ticket_category_id = e_ticket_category_id;
        this.e_ticket_id = e_ticket_id;
        this.attachments = attachments;
        this.status = status;
        this.assignee_id = assignee_id;
        this.reviewer_id = reviewer_id;
        this.approve_status = approve_status;
    }

}

export default class RequestProjectTaskComment {
    constructor(id,
                task_id,
                body,
                attachments,
                user_id) {
        this.id = id;
        this.task_id = task_id;
        this.body = body;
        this.attachments = attachments;
        this.user_id = user_id;
    }
}

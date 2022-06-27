export default class RequestProjectTask {
    constructor(id,
                project_id,
                task_number,
                task_name,
                body,
                start_date,
                due_date,
                task_type_id,
                task_priority_id,
                task_category_id,
                parent_task_id,
                assignee_id,
                assignee_cc_id,
                reviewer_id,
                milestone,
                attachments,
                status
    ) {
        this.id = id;
        this.project_id = project_id;
        this.task_number = task_number;
        this.task_name = task_name;
        this.body = body;
        this.start_date = start_date;
        this.due_date = due_date;
        this.task_type_id = task_type_id;
        this.task_priority_id = task_priority_id;
        this.task_category_id = task_category_id;
        this.parent_task_id = parent_task_id;
        this.assignee_id = assignee_id;
        this.assignee_cc_id = assignee_cc_id;
        this.reviewer_id = reviewer_id;
        this.milestone = milestone;
        this.attachments = attachments;
        this.status = status;
    }
}

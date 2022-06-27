export default class RequestProject {
    constructor(id,
                company_id,
                code,
                year,
                title,
                descriptions,
                project_owner_id,
                project_manager_id,
                client_id,
                client_contact_person,
                client_contact_number,
                client_contact_mail,
                project_start_date,
                project_due_date,
                project_progress,
                project_status,
                project_pic_id,
                project_picture,
                milestone,
                task_id,
                status,
                project_id,
                user_id,
                active) {
        this.id = id;
        this.company_id = company_id;
        this.code = code;
        this.year = year;
        this.title = title;
        this.descriptions = descriptions;
        this.project_owner_id = project_owner_id;
        this.project_manager_id = project_manager_id;
        this.client_id = client_id;
        this.client_contact_person = client_contact_person;
        this.client_contact_number = client_contact_number;
        this.client_contact_mail = client_contact_mail;
        this.project_start_date = project_start_date;
        this.project_due_date = project_due_date;
        this.project_progress = project_progress;
        this.project_status = project_status;
        this.project_pic_id = project_pic_id;
        this.project_picture = project_picture;
        this.milestone = milestone;
        this.task_id = task_id;
        this.status = status;
        this.project_id = project_id;
        this.user_id = user_id;
        this.active = active;
    }
}

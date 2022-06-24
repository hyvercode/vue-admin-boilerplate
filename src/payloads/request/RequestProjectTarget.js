export default class RequestProjectTarget {
    constructor(id,
                year_quarter,
                title,
                descriptions,
                amount_target,
                amount_revenue,
                attachments,
                project_target_id,
                quarter,
                active) {
        this.id = id;
        this.year = year_quarter;
        this.title = title;
        this.descriptions = descriptions;
        this.amount_target = amount_target;
        this.amount_revenue = amount_revenue;
        this.attachments = attachments;
        this.project_target_id = project_target_id;
        this.quarter = quarter;
        this.active = active;
    }
}

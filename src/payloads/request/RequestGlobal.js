export default class RequestGlobal {
    constructor(id, param,
                code,
                name,
                description,
                company_id,
                active) {
        this.id = id;
        this.param = param;
        this.code = code;
        this.name = name;
        this.description = description;
        this.company_id = company_id;
        this.active = active;
    }
}

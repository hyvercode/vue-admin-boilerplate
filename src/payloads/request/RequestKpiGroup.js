export default class RequestKpiGroup {
    constructor(id = null,
                active = null,
                kpi_group_name) {
        this.id = id;
        this.active = active;
        this.kpi_group_name = kpi_group_name;
    }
}

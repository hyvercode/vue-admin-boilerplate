export default class RequestKpiDirectories {
    constructor(id = null,
                active = null,
                kpi_code,
                kpi_name,
                bsc_id = null,
                kpi_group_id = null,
                target_type_id = null,
                definisi,
                branch_id = null,) {
        this.id = id;
        this.active = active;
        this.kpi_code = kpi_code;
        this.kpi_name = kpi_name;
        this.bsc_id = bsc_id;
        this.kpi_group_id = kpi_group_id;
        this.target_type_id = target_type_id;
        this.definisi = definisi;
        this.branch_id = branch_id;
    }
}

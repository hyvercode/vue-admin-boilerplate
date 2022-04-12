export default class RequestMeasurement {
    constructor(id = null,
                measurement_name = null,
                unit_id = null,
                target_type_id = null,
                active = null,) {
        this.id = id;
        this.measurement_name = measurement_name;
        this.unit_id = unit_id;
        this.target_type_id = target_type_id;
        this.active = active;
    }

}
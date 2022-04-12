export default class RequestFamily {
    constructor(id,
                company_id,
                employee_id,
                first_name,
                last_name,
                maritial_status,
                religion,
                identity_type,
                identity_number,
                npwp_number,
                family_card_number,
                bpjs_kesehatan_number,
                jkn_number,
                medical_facility_number,
                blood_type,
                birth_place,
                birth_date,
                gender,
                education,
                active = true) {
        this.company_id = company_id;
        this.employee_id = employee_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.maritial_status = maritial_status;
        this.religion = religion;
        this.identity_type = identity_type;
        this.identity_number = identity_number;
        this.npwp_number = npwp_number;
        this.family_card_number = family_card_number;
        this.bpjs_kesehatan_number = bpjs_kesehatan_number;
        this.jkn_number = jkn_number;
        this.medical_facility_number = medical_facility_number;
        this.blood_type = blood_type;
        this.birth_place = birth_place;
        this.birth_date = birth_date;
        this.gender = gender;
        this.education = education;
        this.active = active;
    }

}
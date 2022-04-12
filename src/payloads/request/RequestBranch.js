export default class RequestBranch {
    constructor(
        id,
        company_id = null,
        branch_code,
        branch_name,
        address,
        province_id = null,
        city_id = null,
        district_id = null,
        village_id = null,
        region_id = null,
        postal_code,
        phone_number,
        email,
        contact_person,
        contact_number,
        coordinate = null,
        active = null,
    ) {
        this.id = id;
        this.company_id = company_id;
        this.branch_code = branch_code;
        this.branch_name = branch_name;
        this.address = address;
        this.province_id = province_id;
        this.city_id = city_id;
        this.district_id = district_id;
        this.village_id = village_id;
        this.region_id = region_id;
        this.postal_code = postal_code;
        this.phone_number = phone_number;
        this.email = email;
        this.contact_person = contact_person;
        this.contact_number = contact_number;
        this.coordinate = coordinate;
        this.active = active;
    }
}

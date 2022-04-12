export default class RequestCompanies {
    constructor(
        id,
        company_code,
        company_name,
        company_alias,
        address,
        province_id,
        city_id,
        district_id,
        village_id,
        business_id,
        postal_code,
        billing_address,
        phone_number,
        email,
        contact_person,
        contact_number,
        invoice_pic,
        npwp_no,
        siup_no,
        npwp_path,
        siup_path,
        image,
        coordinate,
        active
    ) {
        this.id = id;
        this.company_code = company_code;
        this.company_name = company_name;
        this.company_alias = company_alias;
        this.address = address;
        this.province_id = province_id;
        this.city_id = city_id;
        this.district_id = district_id;
        this.village_id = village_id;
        this.business_id = business_id;
        this.postal_code = postal_code;
        this.billing_address = billing_address;
        this.phone_number = phone_number;
        this.email = email;
        this.contact_person = contact_person;
        this.contact_number = contact_number;
        this.invoice_pic = invoice_pic;
        this.npwp_no = npwp_no;
        this.siup_no = siup_no;
        this.npwp_path = npwp_path;
        this.siup_path = siup_path;
        this.image = image;
        this.coordinate = coordinate;
        this.active = active;
    }

}
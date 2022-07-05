export default class RequestContact {
    constructor(id, contact_name, description, phone_number, fax_number, email, website, address, tax_number, active) {
        this.id = id;
        this.contact_name = contact_name;
        this.description = description;
        this.phone_number = phone_number;
        this.fax_number = fax_number;
        this.email = email;
        this.website = website;
        this.address = address;
        this.tax_number = tax_number;
        this.active = active;
    }
}

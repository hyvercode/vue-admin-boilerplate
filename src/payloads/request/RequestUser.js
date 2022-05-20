export default class RequestUser {

    constructor(id,email,username,password,phone_number,menu_roles,active,company_id,employee_id,avatar) {
        this.id = id;
        this.email=email;
        this.username=username;
        this.password=password;
        this.phone_number=phone_number;
        this.menu_roles=menu_roles;
        this.active=active;
        this.company_id=company_id;
        this.employee_id=employee_id;
        this.avatar=avatar;
    }

}
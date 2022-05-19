export default class RequestRole {
    constructor(id,name,description,create,read,update,deletee,administration) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.create = create;
        this.read = read;
        this.update = update;
        this.delete = deletee;
        this.administration = administration;
    }
}
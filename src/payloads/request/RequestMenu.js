export default class RequestMenu {
    constructor(id,menu_id, name, href, slug, is_icon, icon, parent_id, active) {
        this.id = id;
        this.menu_id = menu_id;
        this.name = name;
        this.href = href;
        this.slug = slug;
        this.is_icon = is_icon;
        this.icon = icon;
        this.parent_id = parent_id;
        this.active = active;
    }
}
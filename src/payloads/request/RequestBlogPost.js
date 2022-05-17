export default class RequestBlogPost {
    constructor(id,title,thumbnail,slug,content,tag,category_id,published) {
        this.id = id;
        this.title= title;
        this.thumbnail = thumbnail;
        this.slug = slug;
        this.tag = tag;
        this.content = content;
        this.category_id = category_id;
        this.published = published;
    }
}

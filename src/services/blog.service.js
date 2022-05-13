import Host from '@/api/host'
import Api from "../api/Api";

class BlogService {
    getPosts(payloads) {
        return Api.doGet(Host.API_V1 + "/blog/posts?", payloads);
    }

    getPost(id) {
        return Api.doGet(Host.API_V1 + `/blog/post/show/${id}`);
    }

    getCategories() {
        return Api.doGet(Host.API_V1 + `/blog/categories`);
    }

    getArchives() {
        return Api.doGet(Host.API_V1 + `/blog/archives`);
    }

}

export default new BlogService();

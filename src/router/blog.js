import Pages from "@/helpers/Blog";
import Blog from "@/views/Blog";
export default [
    {
        path: Pages.BLOG_POSTS,
        name: "POST",
        component: Blog,
        children: [
            {
                path: "",
                name: "Post",
                component: () => import("../components/blogs/post/PostIndex.vue")
            },
            {
                path: Pages.BLOG_POST_CREATE,
                name: "Create",
                component: () => import("../components/company/Create.vue"),
            },
            {
                path: Pages.BLOG_POST_UPDATE,
                name: "Update",
                component: () => import("../components/company/Update.vue"),
            },
        ],
    }
]
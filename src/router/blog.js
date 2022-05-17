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
                component: () => import("../components/blogs/post/PostCreate.vue")
            },
            {
                path: Pages.BLOG_POST_UPDATE,
                name: "Update",
                component: () => import("../components/blogs/post/PostUpdate.vue"),
            },
        ],
    },
    {
        path: Pages.BLOG_CATEGORIES,
        name: "Category",
        component: Blog,
        children: [
            {
                path: "",
                name: "Category",
                component: () => import("../components/blogs/category/CategoryIndex.vue")
            }
        ],
    },
    {
        path: Pages.BLOG_TAGS,
        name: "Tag",
        component: Blog,
        children: [
            {
                path: "",
                name: "Tags",
                component: () => import("../components/blogs/tag/TagIndex.vue")
            }
        ],
    },
    {
        path: Pages.BLOG_COMMENTS,
        name: "Comment",
        component: Blog,
        children: [
            {
                path: "",
                name: "Tags",
                component: () => import("../components/blogs/comment/CommentIndex.vue")
            }
        ],
    }
]
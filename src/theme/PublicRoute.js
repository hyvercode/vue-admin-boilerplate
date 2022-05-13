export default [
    {
        path: "/",
        name: "Index",
        component: () => import("../../src/views/Index.vue"),
        children: [
            {
                path: "",
                name: "Main",
                component: () => import("../theme/pages/main/Main.vue"),
            },
            {
                path: "blog",
                name: "Blog",
                component: () => import("./pages/blog/Index"),
                children: [
                    {
                        path: "",
                        name: "Pots",
                        component: () => import("./pages/blog/Posts.vue"),
                    },
                    {
                        path: "/blog/post/:id/:slug",
                        name: "Post",
                        component: () => import("./pages/blog/Post.vue"),
                    },
                ]
            },
        ],
    }
]
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
                component: () => import("../theme/pages/blog/Blog"),
            },
        ],
    }
]
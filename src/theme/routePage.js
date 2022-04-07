export default [
    {
        path: "/",
        name: "Index",
        component: () => import("../../src/views/Index.vue"),
        children: [
            {
                path: "",
                name: "Index",
                component: () => import("../theme/index.vue"),
            },
        ],
    }
]
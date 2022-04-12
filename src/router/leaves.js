import Pages from "@/helpers/Leaves";
import Leaves from "@/views/Leaves";

export default [
    {
        path: Pages.LEAVE_LEAVES,
        name: "Leaves",
        component: Leaves,
        children: [
            {
                path: Pages.LEAVE_LEAVES,
                name: "Index",
                component: () => import("../components/leaves/Index.vue"),
            },
            {
                path: Pages.LEAVE_HALFDAY,
                name: "Index",
                component: () => import("../components/halfday/Index.vue"),
            },
            {
                path: Pages.LEAVE_STAGINGS,
                name: "Index",
                component: () => import("../components/leaves-staging/Index.vue"),
            }
        ],
    },
]
import Pages from "@/helpers/ETicket";
import ETicket from "@/views/ETicket";

export default [
    {
        path: Pages.ETICKETS,
        name: "ETicket",
        component: ETicket,
        children: [
            {
                path: "",
                name: "Post",
                component: () => import("../components/blogs/post/PostIndex.vue")
            }
        ],
    }
]
import Pages from "@/helpers/Event";
import Event from "@/views/Event";

export default [
    {
        path: Pages.MEETING,
        name: "Event",
        component: Event,
        children: [
            {
                path: "",
                name: "Index",
                component: () => import("../components/event/roomMeetings/Index.vue")
            },
        ],
    }
]

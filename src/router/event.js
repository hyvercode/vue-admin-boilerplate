import Pages from "@/helpers/Event";
import Event from "@/views/Event";

export default [
    {
        path: Pages.MEETING,
        name: "Event",
        component: Event,
        children: [
            {
                path: Pages.MEETING_EVENT,
                name: "Index",
                component: () => import("../components/event/roomMeetings/Index.vue")
            },
            {
                path: Pages.BOOKING_ROOM_MEETING,
                name: "Index",
                component: () => import("../components/event/bookingMeetingRooms/Index")
            },
            {
                path: Pages.MEETING_ROOM_PARTICIPANT,
                name: "Index",
                component: () => import("../components/event/meetingRoomParticipants/Index")
            }
        ],
    },
]

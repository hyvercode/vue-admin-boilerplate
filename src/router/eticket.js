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
                name: "Index",
                component: () => import("../components/etickets/tickets/Index.vue")
            },
            {
                path: Pages.ETICKET_CREATE,
                name: "Create",
                component: () => import("../components/etickets/tickets/Create.vue")
            },
            {
                path: Pages.ETICKET_UPDATE,
                name: "Update",
                component: () => import("../components/etickets/tickets/Update.vue")
            },
        ],
    },
    {
        path: Pages.ETICKET_CATEGORIES,
        name: "ETicket",
        component: ETicket,
        children: [
            {
                path: "",
                name: "IndexCategories",
                component: () => import("../components/etickets/categories/IndexCategories.vue")
            },
        ],
    },
    {
        path: Pages.ETICKET_MILESTONE,
        name: "ETicket",
        component: ETicket,
        children: [
            {
                path: "",
                name: "IndexMilestone",
                component: () => import("../components/etickets/milestone/IndexMilestone.vue")
            },
        ],
    },
    {
        path: Pages.ETICKET_ISSUETYPE,
        name: "ETicket",
        component: ETicket,
        children: [
            {
                path: "",
                name: "IndexIssueType",
                component: () => import("../components/etickets/issuetype/IndexIssueType.vue")
            },
        ],
    },
    {
        path: Pages.ETICKET_PRIORITY,
        name: "ETicket",
        component: ETicket,
        children: [
            {
                path: "",
                name: "IndexPriority",
                component: () => import("../components/etickets/priority/IndexPriority.vue")
            },
        ],
    },
    {
        path: Pages.ETICKET_REPORTING,
        name: "Reporting",
        component: ETicket,
        children: [
            {
                path: "",
                name: "Reporting",
                component: () => import("../components/etickets/reporting/Reporting.vue")
            },
        ],
    },
    {
        path: Pages.ETICKET_MYTICKETS,
        name: "MyTickets",
        component: ETicket,
        children: [
            {
                path: "",
                name: "MyTickets",
                component: () => import("../components/etickets/mytickets/MyTickets.vue")
            },
            {
                path: Pages.ETICKET_MYTICKETS_CREATE,
                name: "Create",
                component: () => import("../components/etickets/mytickets/Create.vue")
            },
            {
                path: Pages.ETICKET_MYTICKETS_UPDATE,
                name: "Update",
                component: () => import("../components/etickets/mytickets/Update.vue")
            },
        ],
    },
    {
        path: Pages.ETICKET_HISTORY,
        name: "History",
        component: ETicket,
        children: [
            {
                path: "",
                name: "History",
                component: () => import("../components/etickets/tickets/History.vue")
            },
        ],
    }
]

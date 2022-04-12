import Pages from "@/helpers/PerformanceManagement";
import Measurement from "@/views/Measurement";
import KpiDirectories from "@/views/KpiDirectories";
import performanceapprisial from "@/views/Performanceapprisial";
import Performancereview from "@/views/Performancereview";
import Bsc from "@/views/Bsc";
import KpiGroup from "@/views/KpiGroup";
import TargetType from "@/views/TargetType";
import Performance from "@/views/Performance";
import Egs from "@/views/Egs";

export default [
    {
        path: Pages.EGS,
        name: "egs",
        component: Egs,
        children: [
            {
                path: "",
                name: "Index EGS",
                component: () => import("../components/egs/Index.vue"),
            },
            {
                path: Pages.EGS_DETAIL,
                name: "EGS",
                component: () => import("../components/egs/Detail.vue"),
            },
            {
                path: Pages.EGS_REPORTS,
                name: "EGSReport",
                component: () => import("../components/egs/Report.vue"),
            },
            {
                path: Pages.EGS_STAGINGS,
                name: "EGSStaging",
                component: () => import("../components/egs/Stagings.vue"),
            },
        ],
    },
    {
        path: Pages.PERFORMANCE,
        name: "Performance",
        component: Performance,
        children: [
            {
                path: Pages.PERFORMANCE,
                name: "Perfomance Index",
                component: () => import("../components/performance/Index.vue"),
            },
        ],
    },
    {
        path: Pages.MEASUREMENTS,
        name: "Measurement",
        component: Measurement,
        children: [
            {
                path: "",
                name: "Index",
                component: () => import("../components/measurement/Index.vue"),
            },
        ],
    },
    {
        path: Pages.KPI_DIRECTORIES,
        name: "KpiDirectories",
        component: KpiDirectories,
        children: [
            {
                path: "",
                name: "Index",
                component: () => import("../components/kpiDirectories/Index.vue"),
            },
        ],
    },
    {
        path: Pages.PERFORMANCE_APPRAISAL,
        name: "Performanceapprisial",
        component: performanceapprisial,
        children: [
            {
                path: "",
                name: "Index",
                component: () =>
                    import("../components/performanceapprisial/Index.vue"),
            },
        ],
    },
    {
        path: Pages.PERFORMANCE_REVIEW,
        name: "Performanceriview",
        component: Performancereview,
        children: [
            {
                path: "",
                name: "Index",
                component: () =>
                    import("../components/performancereview/Index.vue"),
            },
        ],
    },
    {
        path: Pages.BSC,
        name: "Bsc",
        component: Bsc,
        children: [
            {
                path: "",
                name: "Index",
                component: () => import("../components/bsc/Index.vue"),
            },
        ],
    },
    {
        path: Pages.KPI_GROUP,
        name: "KpiGroup",
        component: KpiGroup,
        children: [
            {
                path: "",
                name: "Index",
                component: () => import("../components/kpiGroup/Index.vue"),
            },
        ],
    },
    {
        path: Pages.TARGET_TYPE,
        name: "TargetType",
        component: TargetType,
        children: [
            {
                path: "",
                name: "Index",
                component: () => import("../components/targetType/Index.vue"),
            },
        ],
    }
]
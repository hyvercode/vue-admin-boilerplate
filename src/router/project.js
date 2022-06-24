import Pages from "@/helpers/Project";
import Project from "@/views/Project";

export default [
    {
        path: Pages.PROJECT,
        name: "Project",
        component: Project,
        children: [
            {
                path: "",
                name: "Index",
                component: () => import("../components/project/project/Index")
            },
            {
                path: Pages.PROJECT_CREATE,
                name: "Index",
                component: () => import("../components/project/project/Create")
            },
            {
                path: Pages.PROJECT_UPDATE,
                name: "Index",
                component: () => import("../components/project/project/Update")
            },
            {
                path: Pages.PROJECT_TARGET,
                name: "Index",
                component: () => import("../components/project/projectTarget/Index")
            },
            {
                path: Pages.PROJECT_TASK,
                name: "Index",
                component: () => import("../components/project/projectTask/Index")
            },
            {
                path: Pages.PROJECT_TASK_UPDATE,
                name: "Index",
                component: () => import("../components/project/projectTask/Update")
            },
            {
                path: Pages.PROJECT_TASK_CREATE,
                name: "Index",
                component: () => import("../components/project/projectTask/Create")
            }
        ],
    },
]

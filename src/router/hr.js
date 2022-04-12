import Pages from "@/helpers/HR";
import Companies from "@/views/Companies";
import Employee from "@/views/Employee";
import Branch from "@/views/Branchs";
import JobPosition from "@/views/JobPosition";
import Unit from "@/views/Unit";
import Jobtitle from "@/views/Jobtitle";
import Attendances from "@/views/Attendances";

export default [
    {
        path: Pages.COMPANIES,
        name: "Company",
        component: Companies,
        children: [
            {
                path: "",
                name: "Index Company",
                component: () => import("../components/company/Index.vue"),
            },
            {
                path: Pages.COMPANY_CREATE,
                name: "Create Company",
                component: () => import("../components/company/Create.vue"),
            },
            {
                path: Pages.COMPANY_UPDATE,
                name: "Update Company",
                component: () => import("../components/company/Update.vue"),
            },
        ],
    },
    {
        path: Pages.EMPLOYEES,
        name: "Employees",
        component: Employee,
        children: [
            {
                path: "",
                name: "Index Employee",
                component: () => import("../components/employee/Index.vue"),
            },
            {
                path: Pages.EMPLOYEE_CREATE,
                name: "Create Employee",
                component: () => import("../components/employee/Create.vue"),
            },
            {
                path: Pages.EMPLOYEE_UPDATE,
                name: "Update Employee",
                component: () => import("../components/employee/Update.vue"),
            },
            {
                path: Pages.EMPLOYEES_FAMILY,
                name: "Family Employee",
                component: () => import("../components/employee/Family.vue"),
            },
        ],
    },
    {
        path: Pages.BRANCH,
        name: "Branch",
        component: Branch,
        children: [
            {
                path: "",
                name: "Index Branch",
                component: () => import("../components/branch/Index.vue"),
            },
            {
                path: Pages.BRANCH_CREATE,
                name: "Create Branch",
                component: () => import("../components/branch/Create.vue"),
            },
            {
                path: Pages.BRANCH_UPDATE,
                name: "Create Branch",
                component: () => import("../components/branch/Update.vue"),
            },
        ],
    },
    {
        path: Pages.UNIT,
        name: "Unit",
        component: Unit,
        children: [
            {
                path: "",
                name: "Index",
                component: () => import("../components/unit/Index.vue"),
            },
            {
                path: Pages.UNIT_MEMBER,
                name: "UnitMember",
                component: () => import("../components/unit/UnitMember.vue"),
            },
        ],
    },
    {
        path: Pages.JOB_POSITION,
        name: "JobPosition",
        component: JobPosition,
        children: [
            {
                path: "",
                name: "Index",
                component: () => import("../components/jobposition/Index.vue"),
            },
        ],
    },
    {
        path: Pages.JOB_TITLE,
        name: "JobTitle",
        component: Jobtitle,
        children: [
            {
                path: "",
                name: "Index",
                component: () => import("../components/jobtitle/Index.vue"),
            },
        ],
    },
    {
        path: Pages.ATTENDANCES,
        name: "Attendances",
        component: Attendances,
        children: [
            {
                path: Pages.ATTENDANCES,
                name: "Attendances",
                component: () => import("../components/attendances/Index.vue"),
            },
            {
                path: Pages.ATTENDANCE_TMP,
                name: "AttendancesTmp",
                component: () => import("../components/attendances/Tmp.vue"),
            },
        ],
    },
]
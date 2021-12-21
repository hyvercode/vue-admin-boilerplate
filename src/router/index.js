import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import VueCookies from "vue-cookies";
import Users from "../views/Users";
import Branch from "../views/Branchs";
import Pages from "../helpers/Pages";
import Orders from "../views/Orders";
import Invoice from "../views/Invoice";
import Employee from "../views/Employee";
import Reports from "../views/Reports";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Login",
        component: () => import("../views/Login.vue"),
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("../views/Login.vue"),
    },
    {
        path: Pages.HOME,
        name: "Home",
        component: Home,
        children: [
            {
                path: "",
                name: "dashboard",
                component: () => import("../components/orders/Index.vue"),
            },
            // master router
            {
                path: Pages.USERS,
                name: "user",
                component: Users,
                children: [
                    {
                        path: "",
                        name: "Index",
                        component: () => import("../components/user/Index.vue"),
                    },
                    {
                        path: Pages.USERS_CREATE,
                        name: "Create",
                        component: () => import("../components/user/Create.vue"),
                    },
                    {
                        path: `${Pages.USERS_UPDATE}:id`,
                        name: "Update",
                        component: () => import("../components/user/Update.vue"),
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
                        name: "Index",
                        component: () => import("../components/employee/Index.vue"),
                    },
                    {
                        path: Pages.EMPLOYEE_CREATE,
                        name: "Create",
                        component: () => import("../components/employee/Create.vue"),
                    },
                    {
                        path: `${Pages.EMPLOYEE_UPDATE}:id`,
                        name: "Update",
                        component: () => import("../components/employee/Update.vue"),
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
                        name: "Index",
                        component: () => import("../components/branch/Index.vue"),
                    },
                    {
                        path: "/branch/create",
                        name: "Create",
                        component: () => import("../components/branch/Create.vue"),
                    },
                ],
            },
            // daily operations
            {
                path: Pages.ORDERS,
                name: "Orders",
                component: Orders,
                children: [
                    {
                        path: "",
                        name: "Index",
                        component: () => import("../components/orders/Index.vue"),
                    }
                ],
            },
            {
                path: Pages.INVOICE,
                name: "Invoice",
                component: Invoice,
                children: [
                    {
                        path: "",
                        name: "Index",
                        component: () => import("../components/invoice/Index.vue"),
                    },
                    {
                        path: Pages.INVOICE_DETAIL,
                        name: "Detail",
                        component: () => import("../components/invoice/Detail.vue"),
                    }
                ],
            },
            {
                path: Pages.REPORTS,
                name: "Report",
                component: Reports,
                children: [
                    {
                        path: "",
                        name: "Index",
                        component: () => import("../components/reports/Index.vue"),
                    }
                ],
            }
        ],
    },
    {
        path: "*",
        name: "*",
        component: () => import("../views/404.vue"),
    }
];
const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    const publicPages = ["/login"];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = VueCookies.get("_PICKERSSESSIONID");

    if (authRequired && !loggedIn) {
        next(Pages.LOGIN);
    } else {
        next();
    }
});

export default router;

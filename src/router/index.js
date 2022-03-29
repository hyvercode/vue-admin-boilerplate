import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from "@/views/Dashboard";
import Login from "@/views/Login";
import Index from "../views/Index";
import Pages from "../helpers/Pages";
import VueCookies from "vue-cookies";
import Password from "../views/Password";
import Users from "../views/Users";
import UserIndex from "../components/users/UserIndex";

Vue.use(VueRouter);
const routes = [
    {
        path: Pages.LOGIN,
        name: 'Login',
        component: Login
    },
    {
        path: "password",
        name: "Password",
        component: Password,
        children: [
            {
                path: Pages.PASSWORD_FORGOT,
                name: "ForgotPassword",
                component: () => import("../components/password/ForgotPassword"),
            },
            {
                path: Pages.PASSWORD_OTP,
                name: "Otp",
                component: () => import("../components/password/Otp.vue"),
            },
            {
                path: Pages.PASSWORD_RESET,
                name: "ResetPassword",
                component: () => import("../components/password/ResetPassword.vue"),
            },
        ],
    },
    {
        path: '/',
        redirect: Pages.DASHBOARD,
        name: 'Index',
        component: Index,
        children: [
            {
                path: Pages.DASHBOARD,
                name: 'Dashboard',
                component: Dashboard
            },
            {
                path: Pages.USERS,
                name: 'Users',
                component: Users,
                children: [
                    {
                        path: "",
                        name: "Index",
                        component: UserIndex
                    },
                    {
                        path: Pages.USERS_CREATE,
                        name: 'UsersCreate',
                        component: Dashboard
                    }
                ]
            },
        ]
    },
    {
        path: '*',
        name: '*',
        component: Login
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    const publicPages = [
        Pages.LOGIN,
        Pages.PASSWORD_FORGOT,
        Pages.PASSWORD_OTP,
        Pages.PASSWORD_RESET,
    ];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = VueCookies.get("__PMS__SSESSIONID__");

    if (authRequired && !loggedIn) {
        next(Pages.LOGIN);
    } else {
        next();
    }
});

export default router;
import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from "@/views/Dashboard";
import Login from "@/views/Login";
import Index from "../views/Index";
import Pages from "../helpers/Pages";
import VueCookies from "vue-cookies";
import Password from "../views/Password";
import Home from "../views/Home";
import routeLandingPage from "../theme/routePage";
import PagesPerformanceManagement from "../helpers/PerformanceManagement";
import PM from "../views/PM";
import Pm from "./pm";
import PagesHR from "../helpers/HR";
import HR from "../views/HR";
import hr from "./hr";
import PagesLeaves from "../helpers/Leaves";
import leaves from "./leaves";
import Leaves from "../views/Leaves";
import PagesMaster from "../helpers/Master";
import master from "./master";
import Master from "../views/Master";

Vue.use(VueRouter);
const routes = [
    {
        path: "/",
        name: 'Index',
        component: Index,
        children: routeLandingPage
    },
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
        path: Pages.HOME,
        redirect: Pages.DASHBOARD,
        name: 'home',
        component: Home,
        children: [
            {
                path: Pages.DASHBOARD,
                name: 'Dashboard',
                component: Dashboard
            },
            {
                path: PagesMaster.MASTERS,
                name: "Master",
                component: Master,
                children: master
            },
            {
                path: PagesPerformanceManagement.PERFORMANCE,
                name: "PerformanceManagement",
                component: PM,
                children: Pm
            },
            {
                path: PagesHR.HR,
                name: "HR",
                component: HR,
                children: hr
            },
            {
                path: PagesLeaves.LEAVE,
                name: "Leaves",
                component: Leaves,
                children: leaves
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
        Pages.INDEX,
        Pages.BLOG,
        Pages.BLOG_SLUG,
        Pages.BLOG_POST,
        Pages.BLOG_ARCHIVE,
        Pages.BLOG_CATEGORY,
        Pages.LOGIN,
        Pages.PASSWORD_FORGOT,
        Pages.PASSWORD_OTP,
        Pages.PASSWORD_RESET,
    ];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = VueCookies.get("__MIH__BASE__SESSIONID__");

    if (authRequired && !loggedIn) {
        next(Pages.INDEX);
    } else {
        next();
    }
});

export default router;
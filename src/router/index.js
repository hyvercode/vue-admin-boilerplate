import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from "@/views/Dashboard";
import Login from "@/views/Login";
import Index from "../views/Index";
import VueCookies from "vue-cookies";
import Password from "../views/Password";
import Home from "../views/Home";
import PagesPM from "../helpers/PerformanceManagement";
import PM from "../views/PM";
import RoutePM from "./pm";
import PagesHR from "../helpers/HR";
import HR from "../views/HR";
import RouteHR from "./hr";
import PagesLeaves from "../helpers/Leaves";
import RouteLeaves from "./leaves";
import Leaves from "../views/Leaves";
import PagesMaster from "../helpers/Master";
import RouteMaster from "./master";
import Master from "../views/Master";
import PagesBlog from "../helpers/Blog";
import RouteBlog from "./blog";
import Blog from "../views/Blog";
import Pages from "../helpers/Pages";
import PublicPages from "../theme/PublicPages";
import PublicRoute from "../theme/PublicRoute";

//** E-Ticket **//
import PagesETicket from "../helpers/ETicket";
import RouteETicket from "./eticket";
import ETicket from "../views/ETicket";

//** EVENT **//
import PagesEvent from "../helpers/Event"
import Event from "../views/Event";
import RouteEvent from "./event";

//** PROJECT **//
import PagesProject from "../helpers/Project"
import Project from "../views/Project"
import RouterProject from "./project"

//** CONTACT **//
import PagesContact from "../helpers/Contact"
import Contact from "../views/Contact"
import RouterContact from "./contact"


Vue.use(VueRouter);
const routes = [
    {
        path: "/",
        name: 'Index',
        component: Login
    },
    {
        path: "/public",
        name: 'Index',
        component: Index,
        children: PublicRoute
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
                children: RouteMaster
            },
            {
                path: PagesPM.PERFORMANCE,
                name: "PerformanceManagement",
                component: PM,
                children: RoutePM
            },
            {
                path: PagesHR.HR,
                name: "HR",
                component: HR,
                children: RouteHR
            },
            {
                path: PagesLeaves.LEAVE,
                name: "Leaves",
                component: Leaves,
                children: RouteLeaves
            },
            {
                path: PagesBlog.BLOGS,
                name: "Blog",
                component: Blog,
                children: RouteBlog
            },
            {
                path: PagesBlog.BLOGS,
                name: "Blog",
                component: Blog,
                children: RouteBlog
            },
            {
                path: PagesETicket.ETICKETS,
                name: "ETicket",
                component: ETicket,
                children: RouteETicket
            },
            {
                path: PagesEvent.MEETING,
                name: "Event",
                component: Event,
                children: RouteEvent
            },
            {
                path: PagesProject.PROJECT,
                name: "Project",
                component: Project,
                children: RouterProject
            },
            {
                path: PagesContact.CONTACT,
                name: "Contact",
                component: Contact,
                children: RouterContact
            }
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
    const authRequired = !PublicPages.includes(to.path);
    const loggedIn = VueCookies.get("__MIH__BASE__SESSIONID__");

    if (authRequired && !loggedIn) {
        next(PublicPages);
    } else {
        next();
    }
});

export default router;

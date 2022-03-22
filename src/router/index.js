import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from "@/views/Dashboard";
import Login from "@/views/Login";
import Index from "../views/Index";
import Pages from "../helpers/Pages";

Vue.use(VueRouter);
const routes = [
    {
        path: Pages.LOGIN,
        name: 'Login',
        component: Login
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
    const publicPages = [Pages.LOGIN];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('ADMGM_SESSION');

    if (authRequired && !loggedIn) {
        next(Pages.LOGIN);
    } else {
        next();
    }
});

export default router;
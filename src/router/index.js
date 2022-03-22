import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from "@/views/Dashboard";
import Login from "@/views/Login";
import Index from "../views/Index";


Vue.use(VueRouter);
const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/',
        redirect: '/dashboard',
        name: 'Index',
        component: Index,
        children: [
            {
                path: '/dashboard',
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
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('ADMGM_SESSION');

    if (authRequired && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});

export default router;
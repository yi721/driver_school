import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


const routes = [
    {
        path: "*",
        redirect: "404",
    },
    {
        path: "/",
        name: "home",
        component: () => import("../pages/Home.vue"),
    },
    {
        path: "/register",
        name: "register",
        component: () => import("../pages/Register.vue"),
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../pages/LoginIn.vue"),
    },
    {
        path: "/video",
        name: "video",
        component: () => import("../pages/video.vue"),
    },
    {
        path: "/excerise",
        name: "excerise",
        component: () => import("../pages/exerciseList.vue"),
    },
    {
        path: "/my",
        name: "my",
        component: () => import("../pages/my.vue"),
    },
    {
        path: "/search",
        name: "search",
        component: () => import("../pages/Search.vue"),
    },
]

const router = new VueRouter({
    routes
})
export default router
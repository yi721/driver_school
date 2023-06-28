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
        component: () => import("../pages/Home.vue"),//驾校管理
    },
    {
        path: "/register",
        name: "register",
        component: () => import("../pages/Register.vue"),//驾校管理
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../pages/LoginIn.vue"),//驾校管理
    },
    {
        path: "/study",
        name: "study",
        component: () => import("../pages/studyList.vue"),
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
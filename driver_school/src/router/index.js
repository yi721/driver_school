import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);



//驾校管理员
const schoolRoutes = [
    {
        path: "audit",
        name: "audit",
        component: () => import("../views/SchholAdmin/Audit.vue"),//报名资格审核
    },
    {
        path: "trainer",
        name: "trainer",
        component: () => import("../views/SchholAdmin/Trainer.vue"),//教练信息管理
    },
    {
        path: "student",
        name: "student",
        component: () => import("../views/SchholAdmin/Student.vue"),//学员信息管理
    },

];
//管理员
const adminRoutes = [
    {
        path: "school",
        name: "school",
        component: () => import("../views/Admin/School.vue"),//驾校管理
    },
    {
        path: "schooladmin",
        name: "schooladmin",
        component: () => import("../views/Admin/schooladmin.vue"),//驾校管理员审批
    },
    {
        path: "xueyuan",
        name: "xueyuan",
        component: () => import("../views/Admin/xueyuan.vue"),//驾校管理员审批
    },


];
//教练
const driverRoutes = [
    {
        path: "daka",
        name: "daka",
        component: () => import("../views/Driver/daka.vue"),//打卡信息
    },
    {
        path: "grade",
        name: "grade",
        component: () => import("../views/Driver/grade.vue"),//教练信息管理
    },

];
const routes = [
    {
        path: "/",
        redirect: "/home",
    },

    {
        path: "/main",
        name: "main",
        component: () => import("../views/Main"),
        children: [{
            path: "/home",
            component: () => import("../views/Home"),
            meta: { isPublic: true },
        },
        {
            path: "menulist",
            name: "menulist",
            component: () => import("../views/menulist.vue"),//驾校管理员审批
        },
        ...adminRoutes,
        ...schoolRoutes,
        ...driverRoutes,
        ],
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../views/Login.vue"),
    },
    {
        path: "/register",
        name: "register",
        component: () => import("../views/register.vue"),
    },
]

// 3.创建router实例
const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})

export default router
// 4. 创建和挂载根实例(main.js中)



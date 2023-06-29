<template>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
        :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <h3>{{ isCollapse ? '后台' : '驾校报名系统' }}</h3>
        <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.name" v-bind:index="item.name">
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title">{{ item.label }}</span>
        </el-menu-item>
        <!-- <el-submenu v-for="item in hasChildren" :key="item.label" v-bind:index="item.label">
            <template slot="title">
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{ item.label }}</span>
            </template>
            <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
                <el-menu-item @click="clickMenu(subItem)" :index="subItem.path">{{ subItem.label }}</el-menu-item>
            </el-menu-item-group> -->
        <!-- </el-submenu> -->
    </el-menu>
</template>
<script>
export default {
    data() {
        return {
            menuData: [
                {
                    path: "/",
                    name: "home",
                    label: "首页",
                    icon: "s-home",
                    url: "Home/Home",
                },
                {
                    path: "/main/audit",
                    name: "audit",
                    label: "报名资格审核",
                    icon: "success",
                    url: "Audit/Audit",
                },
                {
                    path: "/main/trainer",
                    name: "trainer",
                    label: "教练信息管理",
                    url: "/User/Trainer",
                },
                {
                    path: "/main/student",
                    name: "student",
                    label: "驾校学员信息管理",
                    url: "/User/Student",
                },
                {
                    path: "/main/schooladmin",
                    name: "schooladmin",
                    label: "驾校管理员信息管理",
                    url: "/User/schooladmin",
                },
                {
                    path: "/main/xueyuan",
                    name: "xueyuan",
                    label: "所有学员信息管理",
                    url: "/User/schooladmin",
                },
                {
                    path: "/main/xueyuan",
                    name: "xueyuan",
                    label: "所有学员信息管理",
                    url: "/User/schooladmin",
                },
                {
                    path: "/main/daka",
                    name: "daka",
                    label: "打卡",
                    url: "/Driver/daka",
                },
                {
                    path: "/main/grade",
                    name: "grade",
                    label: "成绩",
                    url: "/Driver/grade",
                },
            ]
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        //点击菜单
        clickMenu(item) {
            console.log(item)
            //当页面路由也跳转路由不一致时才允许跳转
            if (this.$route.path != item.path && !(this.$route.path === '/home' && item.path === '/')) {
                this.$router.push(item.path)
            }
            this.$store.commit('SelectMenu', item)

        }
    },
    computed: {
        //没有子菜单
        noChildren() {
            return this.menuData.filter(item => !item.children)
        },
        //有子菜单
        hasChildren() {
            return this.menuData.filter(item => item.children)
        },
        isCollapse() {
            return this.$store.state.tab.isCollapse
        }

    }
}
</script>
<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.el-menu {
    height: 100vh;
    border-right: none;

    h3 {
        color: #fff;
        text-align: center;
        line-height: 48px;
        font-size: 16px;
        font-weight: 400;
    }
}
</style>

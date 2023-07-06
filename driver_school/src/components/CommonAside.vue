<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <h3>{{ isCollapse ? "后台" : "驾校报名系统" }}</h3>
    <el-menu-item
      @click="clickMenu(item)"
      v-for="item in noChildren"
      :key="item.name"
      v-bind:index="item.name"
    >
      <i :class="`el-icon-${item.icon}`"></i>
      <!-- eslint-disable-next-line -->
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu
      v-for="item in hasChildren"
      :key="item.url"
      v-bind:index="item.url"
    >
      <!-- eslint-disable-next-line -->
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <!-- eslint-disable-next-line -->
        <span slot="title">{{ item.name }}</span>
      </template>
      <!-- <el-menu-item-group v-for="subItem in item.children" :key="subItem.url">
        <el-menu-item @click="clickMenu(subItem)" :index="subItem.url">{{
          subItem.label
        }}</el-menu-item>
      </el-menu-item-group> -->
    </el-submenu>
  </el-menu>
</template>

<script>
import Cookie from "js-cookie";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      menuData: [
        // {
        //     path: "/",
        //     name: "home",
        //     label: "首页",
        //     icon: "s-home",
        //     url: "Home/Home",
        // },
        // {
        //     path: "/main/audit",
        //     name: "audit",
        //     label: "考试信息审核",
        //     icon: "success",
        //     url: "Audit/Audit",
        // },
        // {
        //     path: "/main/trainer",
        //     name: "trainer",
        //     label: "教练信息管理",
        //     icon:"s-check",
        //     url: "/User/Trainer",
        // },
        // {
        //     path: "/main/school",
        //     name: "school",
        //     label: "驾校信息管理",
        //     icon:"edit-outline",
        //     url: "/User/school",
        // },
        // {
        //     path: "/main/student",
        //     name: "student",
        //     label: "教练学员信息管理",
        //     icon:"user-solid",
        //     url: "/User/Student",
        // },
        // {
        //     path: "/main/schooladmin",
        //     name: "schooladmin",
        //     label: "管理员审核",
        //     icon:"s-custom",
        //     url: "/User/schooladmin",
        // },
        // {
        //     path: "/main/xueyuan",
        //     name: "xueyuan",
        //     label: "所有学员信息管理",
        //     icon:"user",
        //     url: "/User/schooladmin",
        // },
        // {
        //     path: "/main/daka",
        //     name: "daka",
        //     label: "教练打卡信息",
        //     icon:"circle-check",
        //     url: "/User/daka",
        // },
        // {
        //     path: "/main/grade",
        //     name: "grade",
        //     label: "教练录入成绩",
        //     icon:"s-order",
        //     url: "/User/grade",
        // },
        // {
        //     path: "menulist",
        //     name: "menulist",
        //     label: "角色列表",
        //     icon:"s-management",
        //     url: "/User/menulist",
        // },
      ],
    };
    // return {};
  },
  mounted() {
    this.getMenu();
  },
  methods: {
    handleOpen(key, keyPath) {
      //   this.$router.push("/home");
      //   console.log(keyPath);
      this.$router.push(key);
      //当页面路由也跳转路由不一致时才允许跳转
      //     if (
      //       this.$route.path != keyPath &&
      //       !(this.$route.path === "/home" && keyPath === "/")
      //     ) {
      //       this.$router.push(keyPath);
      //     }
      //     // this.$store.commit("SelectMenu", item);
      //   console.log(key, keyPath);
    },
    // handleClose(key, keyPath) {
    //   console.log(key, keyPath);
    // },
    //点击菜单
    clickMenu(item) {
      console.log(item);
      //当页面路由也跳转路由不一致时才允许跳转
      if (
        this.$route.path != item.url &&
        !(this.$route.path === "/home" && item.url === "/")
      ) {
        this.$router.push(item.url);
      }
      this.$store.commit("SelectMenu", item);
    },
    async getMenu() {
      const res = await this.$http.get(`/role/get-menu?id=${this.roleId}`);
      this.menuData = res.data.data;
      // console.log(1111111111111);
      // console.log(">>>", this.userId);
      // console.log(this.menuData);
    },
  },
  computed: {
    ...mapGetters(["roleId"]),
    //没有子菜单
    noChildren() {
      return this.menuData.filter((item) => !item.children);
    },
    //有子菜单
    hasChildren() {
      return this.menuData.filter((item) => item.children);
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
  },
};
// console.log(">>>>", this.userId);
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

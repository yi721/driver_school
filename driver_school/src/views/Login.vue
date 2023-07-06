<template>
  <div class="login">
    <el-card class="box-card">
      <!-- eslint-disable-next-line -->
      <div slot="header" class="clearfix">
        <span>驾校报名系统</span>
      </div>
      <el-form :model="model" label-width="80px" :rules="rules" ref="loginForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="model.password" :type="flag ? 'text' : 'password'">
            <!-- eslint-disable-next-line -->
            <i
              slot="suffix"
              class="icon-style"
              :class="elIcon"
              autocomplete="auto"
              @click="flag = !flag"
            ></i>
          </el-input>
        </el-form-item>

        <el-form-item label="验证码" prop="validateCode">
          <el-row type="flex">
            <el-input v-model="model.validateCode"></el-input>
            <vertifyCode :validate-code.sync="validateCode"></vertifyCode>
          </el-row>
        </el-form-item>
        <el-form-item style="display: flex; justify-content: center">
          <el-button @click="submit" type="primary">登录</el-button>
          <el-button
            @click="$router.push('/register')"
            style="margin-left: 5rem"
            >注册</el-button
          >
        </el-form-item>
      </el-form>

      <div style="font-size: 0.8rem; display: flex; justify-content: end">
        <el-button type="text" @click="$router.push('/forget')">
          忘记密码
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { successMsg, errorMsg } from "@/utils/message";
import { mapGetters } from "vuex";
import Cookie from "js-cookie";
export default {
  components: {
    vertifyCode: () => import("@/components/VertifyCode"),
  },
  computed: {
    elIcon() {
      return this.flag ? "el-icon-minus" : "el-icon-view";
    },
  },
  data() {
    return {
      flag: false,
      validateCode: "",
      model: {
        username: "",
        password: "",
        validateCode: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        validateCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submit() {
      this.$refs["loginForm"].validate(async (result) => {
        if (result) {
          // 验证登录
          if (
            this.validateCode.toLowerCase() ===
            this.model.validateCode.toLowerCase()
          ) {
            let res = await this.$http
              .post("/user/login", this.model)
              .then(async (res) => {
                console.log(res);
                // if (res.data.data.userRole.id === 1) {
                //   window.localStorage.setItem("roles", "admin");
                // } else if (res.data.data.userRole.id === 2) {
                //   window.localStorage.setItem("roles", "instructor");
                // } else if (res.data.data.userRole.id === 8) {
                //   window.localStorage.setItem("roles", "schooladmin");
                // }

                this.$router.push("/main");
                console.log(res.data.data.userRole);
                console.log(res.data.data.userRole.id);
                successMsg("登录成功");

                this.$store.commit("setUserId", res.data.data.userInfo.id);
                this.$store.commit("setRoleId", res.data.data.userRole.id);
              });
          } else {
            errorMsg("验证码错误");
            return;
          }
        } else {
          errorMsg("检查填写！");
          return;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  position: absolute;
  background: url("../assets/login.jpg") center no-repeat;
  background-size: cover;

  .icon-style {
    margin-right: 8px;

    .el-card {
      background: #65768557;
    }
  }

  .box-card {
    width: 30rem;
    margin: 13rem auto;

    // color: #fff;
    .el-card__header {
      font-size: 30px;
    }

    // opacity: 0.9;
  }
}
</style>

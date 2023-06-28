<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>驾校报名系统</span>
      </div>
      <el-form :model="model" label-width="80px" :rules="rules" ref="registerForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <!-- <el-form-item label="用户名" prop="username">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="model.password" :type="flag ? 'text' : 'password'">
            <i
              slot="suffix"
              class="icon-style"
              :class="elIcon"
              autocomplete="auto"
              @click="flag = !flag"
            ></i>
          </el-input>
        </el-form-item> -->

        <el-form-item label="验证码" prop="validateCode">
          <el-row type="flex">
            <el-input v-model="model.validateCode"></el-input>
            <vertifyCode :validate-code.sync="validateCode"></vertifyCode>
          </el-row>
        </el-form-item>
        <el-form-item style="display: flex; justify-content: center">
          <el-button @click="submit" type="primary">登录</el-button>
          <el-button @click="$router.push('/register')" style="margin-left: 5rem">注册</el-button>
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
import { setToken } from "@/utils/setToken";
import { successMsg, errorMsg } from "@/utils/message";
import { nameRule, passRule } from "../utils/validate.js";
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
        // username: [
        //   { required: true, message: "请输入用户名", trigger: "blur" },
        // ],
        // password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        username: [{ validator: nameRule, trigger: "blur" }],
        password: [{ validator: passRule, trigger: "blur" }],
        validateCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submit() {
      this.$refs["registerForm"].validate(async (result) => {
        if (result) {
          // 验证登录
          if (
            this.validateCode.toLowerCase() ===
            this.model.validateCode.toLowerCase()
          ) {
            await this.$http
              .post("/user/login", this.model)
              .then(async (res) => {
                console.log(res);
                if (res.data.data.userRole.id === 4) {
                  errorMsg("无权限");
                  return;
                }
                setToken(res.data.data.tokenHead + " " + res.data.data.token);

                // console.log('userInfo:', res.data.data.userInfo);
                this.$store.commit("setUserInfo", res.data.data.userInfo);
                this.$store.commit("setUserRole", res.data.data.userRole);
                this.$router.push("/main");
                successMsg("登录成功");
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

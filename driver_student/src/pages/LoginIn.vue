<template>
    <div class="login-in">
        <login-logo />
        <div class="login">
            <div class="login-head">
                <span>帐号登录</span>
            </div>
            <el-form :model="model" status-icon :rules="rules" ref="loginForm" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input placeholder="用户名" v-model="model.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="model.password"
                        @keyup.enter.native="loginIn"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="validateCode">
                    <el-row type="flex">
                        <el-input v-model="model.validateCode"></el-input>
                        <vertifyCode :validate-code.sync="validateCode"></vertifyCode>
                    </el-row>
                </el-form-item>
                <div class="login-btn">
                    <el-button @click="goSignUp()">注册</el-button>
                    <el-button type="primary" @click="handleloginIn()">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>
    
<script>
import LoginLogo from '../components/LoginLogo.vue'
import vertifyCode from '../components/VertifyCode.vue'
import { successMsg, errorMsg } from '@/utils/message';
export default {
    components: {
        vertifyCode,
        LoginLogo
    },
    data() {
        return {
            validateCode: '',
            model: { // 登录用户名密码
                UserId: '',
                username: '',
                password: '',
                validateCode: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                validateCode: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ]
            }
        }
    },
    mounted() {
        this.changeIndex('登录')
    },
    methods: {
        changeIndex(value) {
            this.$store.commit('setActiveName', value)
        },
        handleloginIn() {
            this.$refs['loginForm'].validate(async (result) => {
                if (result) {
                    // 验证登录
                    if (this.validateCode.toLowerCase() === this.model.validateCode.toLowerCase()) {
                        await this.$http.post('/user/login', this.model).then(async res => {
                            console.log(res);
                            this.$router.push('/')
                            successMsg('登录成功')
                            // this.model.UserId=res.data.data.id;
                            // this.$store.commit('setLoginIn', true)
                        })
                    } else {
                        errorMsg('验证码错误')
                        return
                    }
                } else {
                    errorMsg('检查填写！')
                    return
                }

            });
        },
        goSignUp() {
            this.$router.push({ path: '/register' })
        }
    }
}
</script>
    
<style lang="scss" scoped>
@import '../assets/css/login-in.scss';
</style>
    
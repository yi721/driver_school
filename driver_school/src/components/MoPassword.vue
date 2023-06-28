<template>
    <div>
        <el-card class="box-card">
            <div slot="header">
                <span>修改密码</span>
            </div>
            <div class="update-form" style="padding-right:3rem;">
                <el-form :model="model" label-width="5rem" :rules="rules" ref="updateForm">
                    <el-form-item label="原密码" prop="oldPassword">
                        <el-input v-model="model.oldPassword"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newPassword">
                        <el-input v-model="model.newPassword" :type="flag ? 'text' : 'password'">
                            <i slot="suffix" class="icon-style" :class="elIcon" autocomplete="auto"
                                @click="flag = !flag"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="vertifyPassword">
                        <el-input v-model="model.vertifyPassword" type="password">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="submit" type="primary">提交</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import { successMsg, errorMsg } from "@/utils/message";
export default {
    data() {
        let validPass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'))
            } else if (value !== this.model.newPassword) {
                callback(new Error('两次密码不一致！'))
            } else {
                callback()
            }
        }
        return {
            flag: false,
            model: {
                oldPassword: '',
                newPassword: '',
                vertifyPassword: '',
                userId: ''
            },
            rules: {
                oldPassword: [
                    { required: true, message: '请输入旧密码', trigger: 'blur' }
                ],
                newPassword: [
                    { required: true, message: '请输入新密码', trigger: 'blur' }
                ],
                vertifyPassword: [
                    { required: true, validator: validPass, trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        async submit() {
            // this.$refs.updateForm.validate(async (valid) => {
            //     console.log(valid)
            //     if (valid) {
            //         this.model.userId = this.userInfo.id
            //         const res = await this.$http.post(`/user/update/password`, this.model)
            //         console.log(res);
            //         successMsg('密码已更改，请重新登录')
            //         this.$router.push('/login')
            //     } else {
            //         
            //         return false;
            //     }
            // });
            // successMsg('密码已更改，请重新登录')
            errorMsg('请输入正确原密码！')
        },
        resetForm() {
            this.model = this.$options.data().model
        }
    },
    computed: {
        elIcon() {
            // return this.flag ? "el-icon-minus" : "el-icon-view";
        },
        // ...mapState(['userInfo', 'userRole'])
    },
}
</script>

<style></style>
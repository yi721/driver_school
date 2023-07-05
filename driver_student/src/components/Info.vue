<template>
    <div class="info">
        <p class="title">编辑个人资料</p>
        <hr />
        <div class="personal">
            <el-form :model="model" class="demo-ruleForm" label-width="80px">
                <el-form-item prop="name" label="姓名">
                    <el-input v-model="model.username" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="密码">
                    <el-input type="password" placeholder="密码" v-model="model.password"></el-input>
                </el-form-item>
                <el-form-item prop="age" label="年龄">
                    <el-input v-model="model.age" placeholder="邮箱"></el-input>
                </el-form-item>
                <el-form-item prop="phone" label="手机">
                    <el-input placeholder="手机" v-model="model.phone"></el-input>
                </el-form-item>
                <el-form-item prop="id_kind" label="">
                    <el-date-picker type="date" placeholder="选择日期" v-model="model.birth"
                        style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item prop="introduction" label="签名">
                    <el-input type="textarea" placeholder="签名" v-model="model.introduction"></el-input>
                </el-form-item>
                <el-form-item prop="location" label="地区">
                    <el-select v-model="model.location" placeholder="地区" style="width:100%">
                        <el-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div class="btn">
                <div @click="saveMsg()">保存</div>
                <div @click="goback">取消</div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { mapGetters } from 'vuex'
// import { cities } from '../assets/data/form'
// import { updateUserMsg, getUserOfId } from '../api/index'

export default {
    name: 'info',
    data: function () {
        return {
            model: { // 注册
                username: '',
                password: '',
                sex: '',
                phoneNum: '',
                email: '',
                birth: '',
                introduction: '',
                location: ''
            },
            cities: []
        }
    },
    computed: {
        ...mapGetters([
            'userId'
        ])
    },
    created() {
        // this.cities = cities
    },
    mounted() {
        // this.getMsg(this.userId)
    },
    methods: {
        // getMsg(id) {
        //     getUserOfId(id)
        //         .then(res => {
        //             this.model.username = res[0].username
        //             this.model.password = res[0].password
        //             this.model.sex = res[0].sex
        //             this.model.phoneNum = res[0].phoneNum
        //             this.model.email = res[0].email
        //             this.model.birth = res[0].birth
        //             this.model.introduction = res[0].introduction
        //             this.model.location = res[0].location
        //             this.model.avator = res[0].avator
        //         })
        //         .catch(err => {
        //             console.log(err)
        //         })
        // },
        goback() {
            this.$router.go(-1)
        },
        // saveMsg() {
        //     let d = new Date(this.registerForm.birth)
        //     let datetime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
        //     let params = new URLSearchParams()
        //     params.append('id', this.userId)
        //     params.append('username', this.registerForm.username)
        //     params.append('password', this.registerForm.password)
        //     params.append('sex', this.registerForm.sex)
        //     params.append('phone_num', this.registerForm.phoneNum)
        //     params.append('email', this.registerForm.email)
        //     params.append('birth', datetime)
        //     params.append('introduction', this.registerForm.introduction)
        //     params.append('location', this.registerForm.location)
        //     updateUserMsg(params)
        //         .then(res => {
        //             if (res.code === 1) {
        //                 this.showError = false
        //                 this.showSuccess = true
        //                 this.$store.commit('setUsername', this.registerForm.username)
        //                 this.$notify.success({
        //                     title: '编辑成功',
        //                     showClose: true
        //                 })
        //                 setTimeout(function () {
        //                     this.$router.go(-1)
        //                 }, 2000)
        //             } else {
        //                 this.showSuccess = false
        //                 this.showError = true
        //                 this.$notify.error({
        //                     title: '编辑失败',
        //                     showClose: true
        //                 })
        //             }
        //         })
        //         .catch(err => {
        //             console.log(err)
        //         })
        // }
    }
}
</script>
  
<style lang="scss" scoped>
@import '../assets/css/info.scss';
</style>
  
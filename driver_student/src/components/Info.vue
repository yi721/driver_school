<template>
    <div class="info">
        <p class="title">编辑个人资料</p>
        <hr />
        <div class="personal">
            <el-form :model="model" class="demo-ruleForm" label-width="80px">
                <el-form-item v-show="show" label="学生Id" prop="userId">
                    <el-input v-model="model.id"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="model.name"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select v-model="model.sex" placeholder="请选择">
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="证件类别" prop="idkind">
                    <el-select v-model="model.idKind" placeholder="请选择">
                        <el-option label="居民身份证" value="居民身份证"></el-option>
                        <el-option label="护照" value="护照"></el-option>
                        <el-option label="港澳台通行证" value="港澳台通行证"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="证件号码" prop="idcard">
                    <el-input v-model="model.idCard"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="phone">
                    <el-input v-model="model.phone"></el-input>
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
import { successMsg } from '@/utils/message'
export default {
    name: 'info',
    data: function () {
        return {
            show: false,
            model: {
                id: '',
                name: '',
                sex: '',
                idKind: '',
                idCard: '',
                phone: ''
            },
            cities: []
        }
    },
    computed: {
        ...mapGetters([
            'userId'
        ])
    },
    mounted() {
        this.model.id = this.userId
    },
    methods: {

        goback() {
            this.$router.go(-1)
        },
        async saveMsg() {
            console.log(this.model)
            const res = await this.$http.post('/student/update', this.model)
            successMsg('修改成功！')

        }
    }
}
</script>
  
<style lang="scss" scoped>
@import '../assets/css/info.scss';
</style>
  
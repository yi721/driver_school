<template>
    <div>
        <h1>考试信息审核</h1>
        <el-table :data="AuditList" stripe style="width: 100%">
            <el-table-column prop="userId" label="用户id" width="180">
            </el-table-column>
            <el-table-column prop="driveschoolId" label="驾校id" width="180">
            </el-table-column>
            <el-table-column prop="roleId" label="角色id" width="180">
            </el-table-column>
            <el-table-column label="操作">
                <!-- eslint-disable-next-line -->
                <template slot-scope="scope">
                    <el-button size="mini" type="success" @click="handlePass(scope.row, 1)">通过</el-button>
                    <el-button size="mini" type="danger" @click="handlePass(scope.row, 0)">打回</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="审核申请" :visible.sync="AuditVisible">
            <el-form :rules="rules" label-position="top" label-width="5rem" :model="model" ref="form">
                <el-form-item  label="学院编号" prop="applyId">
                    <el-input :disabled="true" v-model="model.applyId"></el-input>
                </el-form-item>
                <el-form-item label="学院名称" prop="passed">
                    <el-input v-model="model.passed"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submit()">
                        提交
                    </el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { successMsg } from '@/utils/message'
export default {
    // inject: ['reload'],
    name: 'applyList',
    async mounted() {
        const res = await this.$http.get('/exam/applyList/{shId}')
        this.AuditList = res.data.data
    },
    data() {
        // return {
        //     AuditList: [],
        // }
        return {
            AuditList: [],
            AuditVisible: false,
            isEdit: false,
            model: {
                applyId: '',
                passed: '',
                userId:'',
                driveschoolId:'',
                roleId:'',
            },
            applyId: {
                applyId: [
                    { required: true, message: '请输入审核编号(2是教练,8是驾校管理员)', tirgger: 'blur' }
                ],
                passed: [
                    { required: true, message: '请输入是否通过(0是未通过,1是通过)', tirgger: 'blur' }
                ]
            }
        }
    },
 
    methods: {
        async handlePass(row, isPass) {
            const res = await this.$http.post(`/role/audit/{applyId}/{passed}${row.id}/${isPass}`)
            if (isPass === 1) {
                successMsg('操作成功')
            } else {
                successMsg('已打回')
            }
            this.reload()
        },

    },
}
</script>

<style></style>

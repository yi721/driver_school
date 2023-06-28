<template>
    <div>
        <h1>驾校教练信息列表</h1>
        <el-button size="small" type="primary" @click="addBtnOnClick()">添加</el-button>
        <div class="search-container">
            <el-input class="keyword-input" v-model="keyword" placeholder="请输入关键信息" size="small"></el-input>
        </div>
        <el-table :data="InstructorList" stripe style="width: 100%">
            <el-table-column prop="name" label="姓名" width="80">
            </el-table-column>
            <el-table-column prop="age" label="性别" width="80">
            </el-table-column>
            <el-table-column prop="Id" label="账号" width="80">
            </el-table-column>
            <el-table-column prop="phone" label="手机号码" width="120">
            </el-table-column>
            <el-table-column prop="region" label="省份" width="180">
            </el-table-column>
            <el-table-column prop="student" label="所管理学员" width="100">
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleEdit(row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDel(row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="教练信息" :visible.sync="InstuctorFormVisible">
            <el-form :rules="rules" label-position="top" label-width="5rem" :model="model" ref="form">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="model.name"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select v-model="model.sex" placeholder="请选择">
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="账号" prop="Id">
                    <el-input v-model="model.Id"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="phone">
                    <el-input v-model="model.phone"></el-input>
                </el-form-item>
                <el-form-item label="所管理学员" prop="student">
                    <el-input v-model="model.student"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">
                        提交
                    </el-button>
                    <el-button>重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>

import { successMsg } from "@/utils/message";
export default {
    // inject: ['reload'],
    data() {
        let validAge = (rule, value, callback) => {
            if (this.model.age === '') {
                return callback(new Error('请输入年龄'))
            } else {
                if (!(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/).test(value)) {
                    callback(new Error('请输入数字值'))
                } else {
                    callback()
                }
            }
        }
        let validId = (rule, value, callback) => {
            if (this.model.Id == '') {
                return callback(new Error('请输入账号'))
            } else {
                if (!(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/).test(value)) {
                    callback(new Error('请输入数字值'))
                } else {
                    callback()
                }
            }
        }
        return {
            model: {
                name: '',
                sex: '',
                Id: '',
                phone: '',
                student: ''

            },
            keyword: "",
            InstructorList: [],
            studentList: [],
            InstuctorFormVisible: false,
            isEdit: false,
            keyword: '',
            rules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                Id: [
                    { required: true, validator: validId, tirgger: 'blur' }
                ],
                sex: [
                    { required: true, message: '请输入性别', trigger: 'change' }
                ],
                idcard: [
                    { required: true, message: '请输入证件号码', trigger: 'blur' }
                ],
                idkind: [
                    { required: true, message: '请选择证件类型', trigger: 'change' }
                ],
                region: [
                    { required: true, message: '请输入省份', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        addBtnOnClick() {
            this.InstuctorFormVisible = true
            this.isEdit = false
            this.model = this.$options.data().model
        },
        resetForm() {
            this.model = this.$options.data().model
        },
        async handleEdit(row) {
            this.isEdit = true
            // this.model = row
            this.model = JSON.parse(JSON.stringify(row)) //避免引用传递，做一次数据拷贝
            this.InstuctorFormVisible = true
        }, async handleDel(row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                // const res = await this.$http.post(`/jwstudent/delete/${row.id}`)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.reload()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },

    },

}
</script>

<style lang="less" scoped>
.search-container {
    margin-top: 1rem;
    display: flex;
    width: 16rem;

    .keyword-input {
        margin-right: 1rem;
    }
}
</style>
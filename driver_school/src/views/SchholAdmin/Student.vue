<template>
    <div>
        <h1>驾校学员信息列表</h1>
        <el-button size="small" type="primary" @click="addBtnOnClick()">添加</el-button>
        <div class="search-container">
            <el-input class="keyword-input" v-model="keyword" placeholder="请输入关键信息" size="small"></el-input>
        </div>
        <el-table :data="studentList" stripe style="width: 100%">
            <el-table-column prop="name" label="姓名" width="80">
            </el-table-column>
            <el-table-column prop="age" label="性别" width="80">
            </el-table-column>
            <el-table-column prop="Id" label="账号" width="80">
            </el-table-column>
            <el-table-column prop="idkind" label="证件类型" width="80">
            </el-table-column>
            <el-table-column prop="idcard" label="证件号码" width="120">
            </el-table-column>
            <el-table-column prop="phone" label="手机号码" width="120">
            </el-table-column>
            <el-table-column prop="region" label="省份" width="180">
            </el-table-column>
            <el-table-column prop="entry" label="报名进度" width="100">
            </el-table-column>
            <el-table-column prop="degree" label="考试进度" width="120">
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleEdit(row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDel(row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="学生信息" :visible.sync="stuFormVisible">
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
                <el-form-item label="证件类别" prop="idkind">
                    <el-select v-model="model.idkind" placeholder="请选择">
                        <el-option label="居民身份证" value="居民身份证"></el-option>
                        <el-option label="护照" value="护照"></el-option>
                        <el-option label="港澳台通行证" value="港澳台通行证"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="证件号码" prop="idcard">
                    <el-input v-model="model.idcard"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="phone">
                    <el-input v-model="model.phone"></el-input>
                </el-form-item>
                <el-form-item label="省份" prop="region">
                    <el-cascader :options="options" v-model="model.selectedOptions">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="报名进度" prop="entry">
                    <el-select v-model="model.entry" placeholder="请选择">
                        <el-option label="已报名未缴费" value="已报名未缴费"></el-option>
                        <el-option label="已报名完成" value="已报名完成"></el-option>
                        <el-option label="未报名" value="未报名"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="考试进度" prop="degree">
                    <el-input v-model="model.degree"></el-input>
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
import { provinceAndCityData, CodeToText, TextToCode } from "element-china-area-data";
export default {
    // inject: ['reload'],
    data() {
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
                idcard: '',
                idkind: '',
                region: '',
                entry: '',
                degree: ''
            },
            keyword: "",
            studentList: [],
            selectedOptions: [],
            stuFormVisible: false,
            options: provinceAndCityData,
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
            this.stuFormVisible = true
            this.isEdit = false
            this.model = this.$options.data().model
        },
        resetForm() {
            this.model = this.$options.data().model
        },
        async submit() {
            this.$refs.form.validate(async (valid) => {
                console.log(valid)
                if (valid) {
                    if (this.isEdit) {
                        // 编辑
                        // 处理region
                        this.model.region = CodeToText[this.model.selectedOptions[0]]
                        // const res = await this.$http.post('/jwstudent/update', this.model)
                        successMsg('修改成功')
                        this.reload()
                    } else {
                        //添加表单
                        // 处理region
                        this.model.region = CodeToText[this.model.selectedOptions[0]]
                        // const res = await this.$http.post('/jwstudent/add', this.model)
                        successMsg('添加成功')
                        this.reload()
                    }
                } else {
                    errorMsg('检查填写')
                    return false;
                }
            });
        },
        async handleEdit(row) {
            this.isEdit = true
            // this.model = row
            this.model = JSON.parse(JSON.stringify(row)) //避免引用传递，做一次数据拷贝
            this.model.selectedOptions = [TextToCode['北京市'].code, TextToCode['北京市']['市辖区'].code]
            this.stuFormVisible = true
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
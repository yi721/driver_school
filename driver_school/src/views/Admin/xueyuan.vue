<template>
    <div>
        <h1>所有学员信息列表</h1>
        <!-- <el-button size="small" type="primary" @click="addBtnOnClick()">添加</el-button> -->
        <div class="search-container">
            <el-input class="keyword-input" v-model="keyword" placeholder="请输入关键信息" size="small"></el-input>
        </div>
        <el-table :data="studentList" stripe style="width: 100%">
            <el-table-column prop="name" label="姓名" width="80">
            </el-table-column>
            <el-table-column prop="age" label="性别" width="80">
            </el-table-column>
            <el-table-column prop="userId" label="账号" width="80">
            </el-table-column>
            <el-table-column prop="idKind" label="证件类型" width="80">
            </el-table-column>
            <el-table-column prop="idCard" label="证件号码" width="120">
            </el-table-column>
            <el-table-column prop="phone" label="手机号码" width="120">
            </el-table-column>
            <el-table-column prop="region" label="省份" width="180">
            </el-table-column>
            <el-table-column prop="entry" label="报名进度" width="100">
            </el-table-column>
            <el-table-column prop="exam" label="考试进度" width="120">
            </el-table-column>
            <el-table-column prop="instructorId" label="教练id" width="120">
            </el-table-column>
            <el-table-column prop="planA" label="科一题目进度" width="120">
            </el-table-column>
            <el-table-column prop="planB" label="科二进度" width="120">
            </el-table-column>
            <el-table-column prop="planC" label="科三进度" width="120">
            </el-table-column>
            <el-table-column prop="planD" label="科四题目进度" width="120">
            </el-table-column>
            <el-table-column prop="time" label="完成训练时间（可预约五天后的考试）" width="120">
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
                <el-form-item label="账号" prop="userId">
                    <el-input v-model="model.userId"></el-input>
                </el-form-item>
                <el-form-item label="证件类别" prop="idKind">
                    <el-select v-model="model.idKind" placeholder="请选择">
                        <el-option label="居民身份证" value="居民身份证"></el-option>
                        <el-option label="护照" value="护照"></el-option>
                        <el-option label="港澳台通行证" value="港澳台通行证"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="证件号码" prop="idCard">
                    <el-input v-model="model.idCard"></el-input>
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
                <el-form-item label="考试进度" prop="exam">
                    <el-input v-model="model.exam"></el-input>
                </el-form-item>
                <el-form-item label="教练id" prop="instructorId">
                    <el-input v-model="model.instructorId"></el-input>
                </el-form-item>
                <el-form-item label="科一题目进度" prop="planA">
                    <el-input v-model="model.planA"></el-input>
                </el-form-item>
                <el-form-item label="科二进度" prop="planB">
                    <el-input v-model="model.planB"></el-input>
                </el-form-item>
                <el-form-item label="科三进度" prop="planC">
                    <el-input v-model="model.planC"></el-input>
                </el-form-item>
                <el-form-item label="科四题目进度" prop="planD">
                    <el-input v-model="model.planD"></el-input>
                </el-form-item>
                <el-form-item label="完成训练时间（可预约五天后的考试）" prop="time">
                    <el-input v-model="model.time"></el-input>
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
// import { studentDel} from "@/api/api.js";
export default {
    // inject: ['reload'],
    data() {
        let validId = (rule, value, callback) => {
            if (this.model.userId == '') {
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
                userId: '',
                phone: '',
                idCard: '',
                idKind: '',
                region: '',
                entry: '',
                exam: '',
                instructorId:'',
                planA: '',
                planB: '',
                planC: '',
                planD: '',
                time: '',

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
                userId: [
                    { required: true, validator: validId, tirgger: 'blur' }
                ],
                sex: [
                    { required: true, message: '请输入性别', trigger: 'change' }
                ],
                idCard: [
                    { required: true, message: '请输入证件号码', trigger: 'blur' }
                ],
                idKind: [
                    { required: true, message: '请选择证件类型', trigger: 'change' }
                ],
                region: [
                    { required: true, message: '请输入省份', trigger: 'blur' }
                ],
                planA: [
                    { required: true, message: '科一题目进度', trigger: 'blur' }
                ],
                planB: [
                    { required: true, message: '科二进度', trigger: 'blur' }
                ],
                planC: [
                    { required: true, message: '科三进度', trigger: 'blur' }
                ],
                planD: [
                    { required: true, message: '科四题目进度', trigger: 'blur' }
                ],
                time: [
                    { required: true, message: '请输入完成训练时间(如2023:6:30)', trigger: 'blur' }
                ],
            }
        }
    },
    async mounted() {
        
        const res = await this.$http.get(`/student/stu-list`)
        console.log('res', res);
        this.studentList = res.data.data

        // console.log(this.studentList)
        // this.total = res.data.data.total
    },
    methods: {
        async inputChanged(keyword) {
            // const res = await this.$http.get(`/jwstudent/stu-page?keyword=${keyword}&pageSize=${this.pageSize}&pageNum=1`, this.model)
            const res = await this.$http.get(`/student/find/{id}`)
            this.studentList = res.data.data.list
            this.total = res.data.data.total
        },
        resetForm() {
            this.model = this.$options.data().model
        },
        // addBtnOnClick() {
        //     this.stuFormVisible = true
        //     this.isEdit = false
        //     this.model = this.$options.data().model
        // },
    
        async submit() {
            this.$refs.form.validate(async (valid) => {
                console.log(valid)
                if (valid) {
                    if (this.isEdit) {
                        // 编辑
                        // 处理region
                        this.model.region = CodeToText[this.model.selectedOptions[0]]
                        const res = await this.$http.post('/student/update', this.model)
                        successMsg('修改成功')
                        this.reload()
                    } else {
                        //添加表单
                        // 处理region
                        this.model.region = CodeToText[this.model.selectedOptions[0]]
                        const res = await this.$http.post('/student/insert', this.model)
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
            // studentDel(row.id).then(res => {
            //     console.log(res)
            // })
            this.model = JSON.parse(JSON.stringify(row)) //避免引用传递，做一次数据拷贝
            this.model.selectedOptions = [TextToCode['北京市'].code, TextToCode['北京市']['市辖区'].code]
            this.stuFormVisible = true
        }, async handleDel(row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const res = await this.$http.post(`/student/delete/{id}`)
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


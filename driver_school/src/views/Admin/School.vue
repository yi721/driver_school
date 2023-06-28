<template>
    <div>
        <h1>驾校信息列表</h1>
        <el-button size="small" type="primary" @click="addBtnOnClick()">添加</el-button>
        <div class="search-container">
            <el-input class="keyword-input" v-model="keyword" placeholder="请输入关键信息" size="small"></el-input>
        </div>
        <el-table :data="schoolList" stripe style="width: 100%">
            <el-table-column prop="id" label="驾校编号" width="80">
            </el-table-column>
            <el-table-column prop="name" label="驾校名称" width="80">
            </el-table-column>
            <el-table-column prop="region" label="省份" width="120">
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleEdit(row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDel(row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="驾校信息" :visible.sync="schoolFormVisible">
            <el-form :rules="rules" label-position="top" label-width="5rem" :model="model" ref="form">
                <el-form-item label="教学编号" prop="id">
                    <el-input v-model="model.name"></el-input>
                </el-form-item>
                <el-form-item label="驾校名称" prop="name">
                    <el-input v-model="model.Id"></el-input>
                </el-form-item>
                <el-form-item label="省份" prop="region">
                    <el-cascader :options="options" v-model="model.selectedOptions">
                    </el-cascader>
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
                id: '',
                region: ''
            },
            keyword: "",
            schoolList: [],
            selectedOptions: [],
            schoolFormVisible: false,
            options: provinceAndCityData,
            isEdit: false,
            keyword: '',
            rules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                id: [
                    { required: true, validator: validId, tirgger: 'blur' }
                ],
                region: [
                    { required: true, message: '请输入省份', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        addBtnOnClick() {
            this.schoolFormVisible = true
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
            this.schoolFormVisible = true
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
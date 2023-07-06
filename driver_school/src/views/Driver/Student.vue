<template>
    <div>
        <h1>教练学员信息列表</h1>
        <!-- <el-button size="small" type="primary" @click="addBtnOnClick()">添加</el-button> -->
        <!-- <div class="search-container">
            <el-input class="keyword-input" @change="inputChanged" v-model="keyword" placeholder="请输入关键信息"
                size="small"></el-input>
        </div> -->
        <el-table :data="studentList" stripe style="width: 100%">
            <el-table-column prop="name" label="姓名" width="80"> </el-table-column>
            <el-table-column prop="age" label="年龄" width="80"> </el-table-column>
            <el-table-column prop="userId" label="用户id" width="80"> </el-table-column>
            <el-table-column prop="idKind" label="证件类型" width="80">
            </el-table-column>
            <el-table-column prop="idCard" label="证件号码" width="120">
            </el-table-column>
            <el-table-column prop="phone" label="手机号码" width="120">
            </el-table-column>
            <el-table-column prop="instructorId" label="教练id" width="120">
            </el-table-column>
            <!-- <el-table-column prop="planA" label="科一成绩" width="80">
            </el-table-column>
            <el-table-column prop="planB" label="科二成绩" width="80">
            </el-table-column>
            <el-table-column prop="planC" label="科三成绩" width="80">
            </el-table-column>
            <el-table-column prop="planD" label="科四成绩" width="80">
            </el-table-column> -->

        </el-table>

    </div>
</template>

<script>

import { successMsg } from "@/utils/message";
import { provinceAndCityData, CodeToText, TextToCode } from "element-china-area-data";
import { mapGetters } from 'vuex';
export default {
    inject: ['reload'],
    async mounted() {
        const res = await this.$http.get(`/student/stu-list-by-instructorid/${this.userId}`);
        this.studentList = res.data.data
    },
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

            keyword: "",
            studentList: [],
            selectedOptions: [],
            stuFormVisible: false,
            // options: provinceAndCityData,
            isEdit: false,
            keyword: '',

        }
    },
    methods: {
        // addBtnOnClick() {
        //     this.stuFormVisible = true
        //     this.isEdit = false
        //     this.model = this.$options.data().model
        // },

        //  async handleDel(row) {
        //     this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        //         confirmButtonText: '确定',
        //         cancelButtonText: '取消',
        //         type: 'warning'
        //     }).then(async () => {
        //         // const res = await this.$http.post(`/jwstudent/delete/${row.id}`)
        //         this.$message({
        //             type: 'success',
        //             message: '删除成功!'
        //         });
        //         this.reload()
        //     }).catch(() => {
        //         this.$message({
        //             type: 'info',
        //             message: '已取消删除'
        //         });
        //     });
        // },

    },
    computed: {
        ...mapGetters([
            'userId'
        ]),
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
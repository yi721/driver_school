<template>
    <div>
        <h1>考试信息审核</h1>
        <el-table :data="AuditList" stripe style="width: 100%">
            <el-table-column prop="address" label="预约考试地点" width="180">
            </el-table-column>
            <el-table-column prop="idCard" label="学员身份证号" width="180">
            </el-table-column>
            <el-table-column prop="time" label="预约考试时间" width="180">
            </el-table-column>
            <el-table-column label="操作">
                <!-- eslint-disable-next-line -->
                <template slot-scope="scope">
                    <el-button size="mini" type="success" @click="handlePass(scope.row, 1)">通过</el-button>
                    <el-button size="mini" type="danger" @click="handlePass(scope.row, 0)">打回</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { successMsg } from '@/utils/message'
import { mapGetters } from 'vuex';
export default {
    // inject: ['reload'],
    name: 'applyList',
    async mounted() {
        const res = await this.$http.get(`/exam/applyList/${this.userId}`).catch(() => { });
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
            // model: {
            //     applyId: '',
            //     passed: '',
            //     userId: '',
            //     driveschoolId: '',
            //     roleId: '',
            // },
            // applyId: {
            //     applyId: [
            //         { required: true, message: '请输入审核编号(2是教练,8是驾校管理员)', tirgger: 'blur' }
            //     ],
            //     passed: [
            //         { required: true, message: '请输入是否通过(0是未通过,1是通过)', tirgger: 'blur' }
            //     ]
            // }
        }
    },

    methods: {
        async handlePass(row, isPass) {
            const res = await this.$http.post(`/exam/audit/${row.id}/${isPass}`).catch(() => { });
            if (isPass === 1) {
                successMsg('操作成功')
            } else {
                successMsg('已打回')
            }
        },

    },
    computed: {
        ...mapGetters([
            'userId'
        ]),
    },
}
</script>

<style></style>

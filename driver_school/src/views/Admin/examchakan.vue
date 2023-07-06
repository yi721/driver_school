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
        </el-table>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    // inject: ['reload'],
    name: 'applyList',
    async mounted() {
        const res = await this.$http.get(`/exam/exampassList`).catch(() => { });
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
        }
    },

    methods: {

    },
    computed: {
        ...mapGetters([
            'userId'
        ]),
    },
}
</script>

<style></style>

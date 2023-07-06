<template>
  <div>
    <h1>管理员角色审核</h1>
    <el-table :data="AuditList" stripe style="width: 100%">
      <el-table-column prop="id" label="申请id" width="180"> </el-table-column>
      <el-table-column prop="userId" label="用户id" width="180">
      </el-table-column>
      <el-table-column prop="driveschoolId" label="驾校id" width="180">
      </el-table-column>
      <el-table-column prop="roleId" label="角色id" width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handlePass(scope.row, 1)">通过</el-button>
          <el-button size="mini" type="danger" @click="handlePass(scope.row, 0)">打回</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { successMsg } from "@/utils/message";
export default {
  inject: ["reload"],
  name: "AuditList",
  async mounted() {
    const res = await this.$http.get("/role/applyList").catch(() => { });
    this.AuditList = res.data.data;
  },
  data() {
    return {
      AuditList: [],
    }

  },

  methods: {

    async handlePass(row, isPass) {
      const res = await this.$http.post(
        `/role/audit/${row.id}/${isPass}`
      ).catch(() => { });
      if (isPass === 1) {
        successMsg("操作成功");
      } else {
        successMsg("已打回");
      }
      this.reload();
    },


  },
};
</script>

<style></style>

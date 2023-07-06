<template>
  <div>
    <h1>驾校信息列表</h1>
    <el-button size="small" type="primary" @click="addBtnOnClick"
      >添加</el-button
    >
    <div class="search-container">
      <el-input
        class="keyword-input"
        @change="inputChanged"
        v-model="keyword"
        placeholder="请输入关键信息"
        size="small"
      ></el-input>
    </div>
    <el-table :data="schoolList" stripe style="width: 100%">
      <el-table-column prop="id" label="驾校编号" width="80"> </el-table-column>
      <el-table-column prop="name" label="驾校名称" width="180">
      </el-table-column>
      <el-table-column prop="address" label="驾校详细地址" width="280">
      </el-table-column>
      <el-table-column prop="phone" label="驾校联系方式" width="180">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <!-- eslint-disable-next-line -->
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" @click="handleDel(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="驾校信息"
      :visible.sync="schoolFormVisible"
      :append-to-body="true"
    >
      <!-- :visible.sync -->
      <el-form
        :rules="rules"
        label-position="top"
        label-width="5rem"
        :model="model"
        ref="form"
      >
        <el-form-item label="驾校编号" prop="id">
          <el-input v-model="model.id"></el-input>
        </el-form-item>
        <el-form-item label="驾校名称" prop="name">
          <el-input v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item label="驾校详细地址" prop="address">
          <el-input v-model="model.address"></el-input>
        </el-form-item>
        <el-form-item label="驾校联系方式" prop="phone">
          <el-input v-model="model.phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit"> 提交 </el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { successMsg } from "@/utils/message";
// import { provinceAndCityData, CodeToText, TextToCode } from "element-china-area-data";
export default {
  inject: ["reload"],
  async mounted() {
    const res = await this.$http.get(`/school/school-list`);
    console.log("res", res);
    this.schoolList = res.data.data;
  },
  data() {
    let validId = (rule, value, callback) => {
      if (this.model.id == "") {
        return callback(new Error("请输入账号"));
      } else {
        if (!/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value)) {
          callback(new Error("请输入数字值"));
        } else {
          callback();
        }
      }
    };
    return {
      model: {
        name: "",
        id: "",
        address: "",
        phone: "",
      },
      keyword: "",
      schoolList: [],
      selectedOptions: [],
      schoolFormVisible: false,
      // options: provinceAndCityData,
      isEdit: false,
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        id: [{ required: true, validator: validId, tirgger: "blur" }],
        address: [
          { required: true, message: "请输入驾校详细地址", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入驾校联系方式", trigger: "blur" },
        ],
      },
    };
  },

  methods: {
    async inputChanged(keyword) {
      // const res = await this.$http.get(`/academy/academy-studengt-by-acaid-page?id=${this.userRole.academyId}&keyword=${keyword}&pageSize=${this.pageSize}&pageNum=1`)
      const res = await this.$http
        .get(`/school/getSchListByName${keyword}`)
        .catch(() => {});
      this.schoolList = res.data.data;
      console.log("res");
      this.total = res.data.data.total;
    },
    addBtnOnClick() {
      this.schoolFormVisible = true;
      this.isEdit = false;
      this.model = this.$options.data().model;
    },
    resetForm() {
      this.model = this.$options.data().model;
    },

    async submit() {
      this.$refs.form.validate(async (valid) => {
        console.log(valid);
        if (valid) {
          if (this.isEdit) {
            // 编辑
            // 处理region
            // this.model.region = CodeToText[this.model.selectedOptions[0]]
            const res = await this.$http.post("/school/update", this.model);
            console.log("res");
            // successMsg('修改成功')
            this.$message({
              type: "info",
              message: "修改成功",
            });
            this.reload();
          } else {
            //添加表单
            // 处理region
            const res = await this.$http.post("/school/insert", this.model);
            successMsg("添加成功");
            this.reload();
          }
        } else {
          //   errorMsg("检查填写");
          this.$message({
            type: "warning",
            message: "检查填写",
          });
          return false;
        }
      });
    },
    async handleEdit(row) {
      this.isEdit = true;
      this.model = row;
      // this.model = JSON.parse(JSON.stringify(row)) //避免引用传递，做一次数据拷贝
      this.InstuctorFormVisible = true;
    },
    async handleDel(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$http.post(`/school/delete/${row.id}`);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.reload();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });

          this.reload();
        });
    },
  },
};
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

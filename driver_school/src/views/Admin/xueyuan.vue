<template>
  <div>
    <h1>所有学员信息列表</h1>
    <!-- <el-button size="small" type="primary" @click="addBtnOnClick()">添加</el-button> -->
    <div class="search-container">

      <el-input class="keyword-input" @change="inputChanged" v-model="keyword" placeholder="请输入关键信息" size="small">
      </el-input>
    </div>
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
      <el-table-column prop="planA" label="科一成绩" width="80">
      </el-table-column>
      <el-table-column prop="planB" label="科二成绩" width="80">
      </el-table-column>
      <el-table-column prop="planC" label="科三成绩" width="80">
      </el-table-column>
      <el-table-column prop="planD" label="科四成绩" width="80">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <!-- eslint-disable-next-line -->
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1"
        :page-sizes="[5, 10, 20, 100]" :page-size="5" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog title="学生信息" :visible.sync="stuFormVisible" :append-to-body="true">
      <el-form :rules="rules" label-position="top" label-width="5rem" :model="model" ref="form">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="model.age"></el-input>
        </el-form-item>
        <el-form-item label="用户id" prop="userId">
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
        <el-form-item label="教练id" prop="instructorId">
          <el-input v-model="model.instructorId"></el-input>
        </el-form-item>
        <el-form-item label="科一成绩" prop="planA">
          <el-input v-model="model.planA"></el-input>
        </el-form-item>
        <el-form-item label="科二成绩" prop="planB">
          <el-input v-model="model.planB"></el-input>
        </el-form-item>
        <el-form-item label="科三成绩" prop="planC">
          <el-input v-model="model.planC"></el-input>
        </el-form-item>
        <el-form-item label="科四成绩" prop="planD">
          <el-input v-model="model.planD"></el-input>
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
import { successMsg, errorMsg } from "@/utils/message";
export default {
  inject: ["reload"],
  async mounted() {
    const res = await this.$http.get(`/student/stu-page?keyword=&pageSize=5&pageNum=1`);
    console.log("res", res);
    this.studentList = res.data.data.list
    this.total = res.data.data.total
  },
  data() {
    let validId = (rule, value, callback) => {
      if (this.model.userId == "") {
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
        age: "",
        userId: "",
        phone: "",
        idCard: "",
        idKind: "",
        // region: "",
        // entry: "",
        // exam: "",
        instructorId: "",
        planA: "",
        planB: "",
        planC: "",
        planD: "",
        // time: "",
      },
      keyword: "",
      total: 0,
      pageSize: 5,
      studentList: [],
      selectedOptions: [],
      stuFormVisible: false,
      // options: provinceAndCityData,
      isEdit: false,
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        userId: [{ required: true, validator: validId, tirgger: "blur" }],
        sex: [{ required: true, message: "请输入年龄", trigger: "change" }],
        idCard: [
          { required: true, message: "请输入证件号码", trigger: "blur" },
        ],
        idKind: [
          { required: true, message: "请选择证件类型", trigger: "change" },
        ],
        // region: [{ required: true, message: "请输入省份", trigger: "blur" }],
        planA: [{ required: true, message: "科一成绩", trigger: "blur" }],
        planB: [{ required: true, message: "科二成绩", trigger: "blur" }],
        planC: [{ required: true, message: "科三成绩", trigger: "blur" }],
        planD: [{ required: true, message: "科四成绩", trigger: "blur" }],
      },
    };
  },
  methods: {
    // addBtnOnClick() {
    //     this.InstuctorFormVisible = true
    //     this.isEdit = false
    //     this.model = this.$options.data().model
    // },

    async inputChanged(keyword) {
      const res = await this.$http.get(`/student/getStuListByName`);
      this.studentList = res.data.data.list;
      this.total = res.data.data.total;
      this.pageSize = 5
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
            const res = await this.$http.post("/student/update", this.model);
            console.log("res");
            // successMsg('修改成功')
            this.$message({
              type: "info",
              message: "修改成功",
            });
            this.reload();
          }
        } else {
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
      this.stuFormVisible = true;
    },
    async handleDel(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$http.post(`/student/delete/${row.id}`);
          this.$message({
            type: "info",
            message: "已取消删除",
          });
          this.reload();
        })
        .catch(() => {

          this.$message({
            type: "success",
            message: "删除成功!",
          });
        });
    },
    async inputChanged(keyword) {
      const res = await this.$http.get(`/student/stu-page?keyword=${keyword}&pageSize=${this.pageSize}&pageNum=1`)
      this.studentList = res.data.data.list
      this.total = res.data.data.total
    },
    async handleSizeChange(val) {
      this.pageSize = val;
      const res = await this.$http.get(`/student/stu-page?keyword=&pageSize=${val}&pageNum=1`)
      console.log(res)
      console.log(`每页 ${val} 条`);
      this.dakaList = res.data.data.list;
    },
    async handleCurrentChange(val) {
      const res = await this.$http.get(`/student/stu-page?keyword=&pageSize=${this.pageSize}&pageNum=${val}`)
      console.log(res.data.data);
      console.log(`当前页: ${val}`);
      this.dakaList = res.data.data.list;
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


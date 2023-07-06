
<template>
    <div>
      <h1>成绩列表</h1>
      <el-table :data="gradeList" stripe style="width: 100%">
        <el-table-column prop="name" label="姓名" width="100"> </el-table-column>
        <el-table-column prop="age" label="年龄" width="100"> </el-table-column>
        <el-table-column prop="userId" label="学员id" width="100"> </el-table-column>
        <el-table-column prop="planA" label="科目一成绩" width="120">
        </el-table-column>
        <el-table-column prop="planB" label="科目二成绩" width="120">
        </el-table-column>
        <el-table-column prop="planC" label="科目三成绩" width="120">
        </el-table-column>
        <el-table-column prop="planD" label="科目四成绩" width="120">
        </el-table-column>
        <el-table-column label="操作" width="180">
        <!-- eslint-disable-next-line -->
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
      </el-table>
      <el-dialog @closed="reload" title="学员信息":visible.sync="gradeFormVisible">
        <el-form
          :rules="rules"
          label-position="top"
          label-width="5rem"
          :model="model"
          ref="form"
        >
        <el-form-item label="学员id" prop="userId">
            <el-input :disabled="true" v-model="model.userId"></el-input>
          </el-form-item>
          <el-form-item label="成绩" prop="plan">
            <el-input v-model="model.plan"></el-input>
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
  import { errorMsg, successMsg } from "@/utils/message";
  // import { provinceAndCityData, CodeToText, TextToCode } from "element-china-area-data";
  export default {
    inject: ["reload"],
    async mounted() {
      const res = await this.$http.get(`/student/stu-list`);
    console.log("res", res);
    this.gradeList = res.data.data;
    },
    data() {
      let validFirst = (rule, value, callback) => {
        if (this.model.plan === "") {
          return callback(new Error("请输入成绩"));
        } else {
          if (!/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value)) {
            callback(new Error("请输入整数"));
          } else {
            callback();
          }
        }
      };

      return {
        gradeList: [],
        gradeFormVisible: false,
        isEdit: false,
        // options: provinceAndCityData,
        // total: 1,
        // pageSize: 5,
        keyword: "",
        model: {
          // name: "",
          // age: "",
          // planA: "",
          // planB: "",
          // planC: "",
          // planD: "",
          userId:"",
      
          plan:"",
        },
        rules: {
          name: [{ required: true, message: "请输入id", trigger: "blur" }],
          stuId: [{ required: true, message: "请输入成绩", trigger: "blur" }]
        },
      };
    },
    methods: {
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
            const res = await this.$http.post("/student/getplan", this.model);
            console.log("res");
            // successMsg('修改成功')
            this.$message({
              type: "info",
              message: "修改成功",
            });
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
      this.gradeFormVisible = true;
    },
    
    },
  };
  </script>
  
  <style lang="less">
  .search-container {
    margin-top: 1rem;
    display: flex;
    width: 16rem;
  
    .keyword-input {
      margin-right: 1rem;
    }
  }
  </style>
  -->
  
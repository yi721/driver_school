<template>
    <div>
      <h1>打卡信息</h1>
      <!-- <div class="search-container">
            <el-input class="keyword-input" @change="inputChanged" v-model="keyword" placeholder="请输入关键信息"
                size="small"></el-input>
        </div> -->
      <el-table :data="dakaList" stripe style="width: 100%">
        <el-table-column prop="name" label="学员名称" width="150">
        </el-table-column>
        <el-table-column prop="userId" label="用户id" width="100"> </el-table-column>
        <el-table-column prop="entry" label="练习进度" width="100">
        </el-table-column>
        <el-table-column label="操作" width="180">
        <!-- eslint-disable-next-line -->
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)"
            >编辑</el-button>
        </template>
      </el-table-column>
      </el-table>
  
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-sizes="[5, 10, 20, 100]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
          <!-- :page-sizes="[5, 10, 20, 100]" :page-size="5" 
                   -->
        </el-pagination>
      </div>
      <el-dialog title="打卡" v-model="dakaFormVisible">
        <el-form
          :rules="rules"
          label-position="top"
          label-width="5rem"
          :model="model"
          ref="form"
        >
          <el-form-item label="用户id" prop="userId">
            <el-input v-model="model.userId"></el-input>
          </el-form-item>
          <el-form-item label="打卡时长（分钟）" prop="time">
            <el-input v-model="model.time"></el-input>
          </el-form-item>
          <el-form-item>
          <el-button type="primary" @click="submit"> 提交 </el-button>
          <el-button  @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import { successMsg } from "@/utils/message";
  export default {
    inject: ["reload"],
    async mounted() {
    const res = await this.$http.get(`/student/stu-list`);
    console.log("res", res);
    this.dakaList = res.data.data;
  },
  
    data() {
      let validSecond = (rule, value, callback) => {
        if (this.model.time === "") {
          return callback(new Error("请输入打卡时长（分钟）"));
        } else {
          if (!/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value)) {
            callback(new Error("请输入整数"));
          } else {
            callback();
          }
        }
      };
      let validStuId = (rule, value, callback) => {
        if (this.model.stuId == "") {
          return callback(new Error("请输入用户id"));
        } else {
          if (!/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value)) {
            callback(new Error("请输入数字值"));
          } else {
            callback();
          }
        }
      };
      return {
        // academyList: [
        //     {
        //         id: '1',
        //         name: '信息科学与技术学院'
        //     }
        // ],
        dakaList: [
        ],
        dakaFormVisible: false,
        isEdit: false,
        // options: provinceAndCityData,
        total: 1,
        pageSize: 5,
        keyword: "",
        model: {
          name: "",
          userId: "",
          entry: "",
          time:""
        },
        rules: {
          userId: [{ required: true, validator: validStuId, tirgger: "blur" }],
          time: [
            { required: true, message: "请输入打卡时长", trigger: "blur" },
          ],
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
            const res = await this.$http.post("/student/updateentry/{userId}/{time}", this.model);
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
      this.dakaFormVisible = true;
    },

      async handleSizeChange(val) {
        this.pageSize = val;
        // const res = await this.$http.get(`/jwstudent/stu-academy-page?keyword=&pageSize=${val}&pageNum=1`)
        console.log(`每页 ${val} 条`);
        this.dakaList = res.data.data.list;
      },
      async handleCurrentChange(val) {
        // const res = await this.$http.get(`/jwstudent/stu-academy-page?keyword=&pageSize=${this.pageSize}&pageNum=${val}`)
        console.log(res.data.data);
        console.log(`当前页: ${val}`);
        this.dakaList = res.data.data.list;
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
  
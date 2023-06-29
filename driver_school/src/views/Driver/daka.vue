<template>
    <div>
      <h1>打卡信息</h1>
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
      <el-table :data="dakaList" stripe style="width: 100%">
        <el-table-column prop="name" label="学员名称" width="350">
        </el-table-column>
        <el-table-column prop="stuId" label="学号" width="100"> </el-table-column>
        <el-table-column prop="second" label="科目二" width="100">
        </el-table-column>
        <el-table-column prop="third" label="科目三" width="100">
        </el-table-column>
        <el-table-column label="操作">
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
      <el-dialog title="打卡" :visible.sync="dakaFormVisible">
        <el-form
          :rules="rules"
          label-position="top"
          label-width="5rem"
          :model="model"
          ref="form"
        >
          <el-form-item  label="学员名称" prop="name">
            <el-input  v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="学号" prop="stuId">
            <el-input v-model="model.stuId"></el-input>
          </el-form-item>
          <el-form-item label="科目二" prop="second">
            <el-input v-model="model.second"></el-input>
          </el-form-item>
          <el-form-item label="科目三" prop="third">
            <el-input v-model="model.third"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit()"> 提交 </el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
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
        // const res = await this.$http.get(
        // `/jwstudent/stu-academy-page?keyword=&pageSize=5&pageNum=1`
      // );
      // console.log('res', res);
      // this.dakaList = res.data.data.list;
      // this.total = res.data.data.total;
      // const res2 = await this.$http.get(`/academy/academy-list`);
      // this.academyList = res2.data.data;
      // console.log(this.academyList);
      this.pageSize = 5;
      },
  
    data() {
      let validSecond = (rule, value, callback) => {
        if (this.model.second === "") {
          return callback(new Error("请输入科目二打卡时长（分钟）"));
        } else {
          if (!/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value)) {
            callback(new Error("请输入整数"));
          } else {
            callback();
          }
        }
      };
      let validThird = (rule, value, callback) => {
        if (this.model.third === "") {
          return callback(new Error("请输入科目三打卡时长（分钟）"));
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
          return callback(new Error("请输入学号"));
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
          {
            name: "张三",
            stuId: "63200701",
            second: "80",
            third: "60",
          },
          {
            name: "张圆",
            stuId: "63200702",
            second: "80",
            third: "60",
          },
          {
            name: "李丽",
            stuId: "63200703",
            second: "80",
            third: "60",
          },
          {
            name: "王勇",
            stuId: "63200704",
            second: "80",
            third: "60",
          },
          {
            name: "张章",
            stuId: "63200705",
            second: "80",
            third: "60",
          },
        ],
        dakaFormVisible: false,
        isEdit: false,
        // options: provinceAndCityData,
        total: 1,
        pageSize: 5,
        keyword: "",
        model: {
          name: "",
          stuId: "",
          second: "",
          third: "",
        },
        rules: {
          name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
          stuId: [{ required: true, validator: validStuId, tirgger: "blur" }],
          second: [
            { required: true, message: "请输入科目二打卡时长", trigger: "blur" },
          ],
          third: [
            { required: true, message: "请输入科目三打卡时长", trigger: "blur" },
          ],
        },
      };
    },
    methods: {
      async inputChanged(keyword) {
        // const res = await this.$http.get(`/jwstudent/stu-page?keyword=${keyword}&pageSize=${this.pageSize}&pageNum=1`, this.model)
        // const res = await this.$http.get(`/jwstudent/stu-academy-page?keyword=${keyword}&pageSize=${this.pageSize}&pageNum=1`)
        // this.studentList = res.data.data.list
        // this.total = res.data.data.total
      },
      resetForm() {
        this.model = this.$options.data().model;
      },
      addBtnOnClick() {
        this.dakaFormVisible = true;
        this.isEdit = false;
        this.model = this.$options.data().model;
      },
      async submit() {
        this.$refs.form.validate(async (valid) => {
          console.log(valid);
          if (valid) {
            if (this.isEdit) {
              // 编辑
              // 处理region
              // this.model.region = CodeToText[this.model.selectedOptions[0]];
              // const res = await this.$http.post('/jwstudent/update', this.model)
              successMsg("修改成功");
              this.reload();
            } else {
              //添加表单
              // 处理region
              // this.model.region = CodeToText[this.model.selectedOptions[0]];
              // const res = await this.$http.post('/jwstudent/add', this.model)
              successMsg("添加成功");
              this.reload();
            }
          } else {
            errorMsg("检查填写");
            return false;
          }
        });
      },
      async handleEdit(row) {
        this.isEdit = true;
        // this.model = row
        this.model = JSON.parse(JSON.stringify(row)); //避免引用传递，做一次数据拷贝
        //   this.model.selectedOptions = [
        //     TextToCode["北京市"].code,
        //     TextToCode["北京市"]["市辖区"].code,
        //   ];
        this.dakaFormVisible = true;
      },
      async handleDel(row) {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            // const res = await this.$http.post(`/jwstudent/delete/${row.id}`)
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.reload();
          })
          .catch(() => {
            // this.$message({
            //     type: 'info',
            //     // message: '已取消删除'
            // });
          });
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
  
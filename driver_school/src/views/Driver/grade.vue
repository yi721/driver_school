<!-- <template>
    <div>
        <h1>所有学员信息列表</h1>
        <el-button size="small" type="primary" @click="addBtnOnClick()">添加</el-button>
        <div class="search-container">
            <el-input class="keyword-input" v-model="keyword" placeholder="请输入关键信息" size="small"></el-input>
        </div>
        <el-table :data="studentList" stripe style="width: 100%">
            <el-table-column prop="name" label="姓名" width="80">
            </el-table-column>
            <el-table-column prop="age" label="性别" width="80">
            </el-table-column>
            <el-table-column prop="Id" label="账号" width="80">
            </el-table-column>
            <el-table-column prop="idkind" label="证件类型" width="80">
            </el-table-column>
            <el-table-column prop="idcard" label="证件号码" width="120">
            </el-table-column>
            <el-table-column prop="phone" label="手机号码" width="120">
            </el-table-column>
            <el-table-column prop="region" label="省份" width="180">
            </el-table-column>
            <el-table-column prop="entry" label="报名进度" width="100">
            </el-table-column>
            <el-table-column prop="degree" label="考试进度" width="120">
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleEdit(row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDel(row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="学生信息" :visible.sync="stuFormVisible">
            <el-form :rules="rules" label-position="top" label-width="5rem" :model="model" ref="form">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="model.name"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select v-model="model.sex" placeholder="请选择">
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="账号" prop="Id">
                    <el-input v-model="model.Id"></el-input>
                </el-form-item>
                <el-form-item label="证件类别" prop="idkind">
                    <el-select v-model="model.idkind" placeholder="请选择">
                        <el-option label="居民身份证" value="居民身份证"></el-option>
                        <el-option label="护照" value="护照"></el-option>
                        <el-option label="港澳台通行证" value="港澳台通行证"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="证件号码" prop="idcard">
                    <el-input v-model="model.idcard"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="phone">
                    <el-input v-model="model.phone"></el-input>
                </el-form-item>
                <el-form-item label="省份" prop="region">
                    <el-cascader :options="options" v-model="model.selectedOptions">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="报名进度" prop="entry">
                    <el-select v-model="model.entry" placeholder="请选择">
                        <el-option label="已报名未缴费" value="已报名未缴费"></el-option>
                        <el-option label="已报名完成" value="已报名完成"></el-option>
                        <el-option label="未报名" value="未报名"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="考试进度" prop="degree">
                    <el-input v-model="model.degree"></el-input>
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
                sex: '',
                Id: '',
                phone: '',
                idcard: '',
                idkind: '',
                region: '',
                entry: '',
                degree: ''
            },
            keyword: "",
            studentList: [],
            selectedOptions: [],
            stuFormVisible: false,
            options: provinceAndCityData,
            isEdit: false,
            keyword: '',
            rules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                Id: [
                    { required: true, validator: validId, tirgger: 'blur' }
                ],
                sex: [
                    { required: true, message: '请输入性别', trigger: 'change' }
                ],
                idcard: [
                    { required: true, message: '请输入证件号码', trigger: 'blur' }
                ],
                idkind: [
                    { required: true, message: '请选择证件类型', trigger: 'change' }
                ],
                region: [
                    { required: true, message: '请输入省份', trigger: 'blur' }
                ]
            }
        }
    },
    async mounted() {
        //const res = await this.$http.get(`/student/stu-list`)
        console.log('res', res);
        this.studentList = res.data.data.list
        console.log(this.studentList)
        this.total = res.data.data.total
    },
    methods: {
        addBtnOnClick() {
            this.stuFormVisible = true
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
            this.stuFormVisible = true
        }, async handleDel(row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                //const res = await this.$http.post(`/jwstudent/delete/${row.id}`)
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
</style>-->

<template>
    <div>
      <h1>教练列表</h1>
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
  
      <el-table :data="gradeList" stripe style="width: 100%">
        <el-table-column prop="name" label="姓名" width="100"> </el-table-column>
        <el-table-column prop="stuId" label="学号" width="100"> </el-table-column>
        <el-table-column prop="first" label="科目一成绩" width="180">
        </el-table-column>
        <el-table-column prop="second" label="科目二成绩" width="180">
        </el-table-column>
        <el-table-column prop="third" label="科目三成绩" width="180">
        </el-table-column>
        <el-table-column prop="four" label="科目四成绩" width="180">
        </el-table-column>
        <el-table-column label="操作" width="180">
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
        </el-pagination>
      </div>
      <el-dialog
        @closed="reload"
        title="学员信息"
        :visible.sync="gradeFormVisible"
      >
        <el-form
          :rules="rules"
          label-position="top"
          label-width="5rem"
          :model="model"
          ref="form"
        >
          <el-form-item label="姓名" prop="name">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="学号" prop="stuId">
            <el-input v-model="model.stuId"></el-input>
          </el-form-item>
          <el-form-item label="科目一" prop="first">
            <el-input v-model="model.first"></el-input>
          </el-form-item>
          <el-form-item label="科目二" prop="second">
            <el-input v-model="model.second"></el-input>
          </el-form-item>
          <el-form-item label="科目三" prop="third">
            <el-input v-model="model.third"></el-input>
          </el-form-item>
          <el-form-item label="科目四" prop="four">
            <el-input v-model="model.four"></el-input>
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
      const res = await this.$http.get(
        `/jwstudent/stu-academy-page?keyword=&pageSize=5&pageNum=1`
      );
      // console.log('res', res);
      this.gradeList = res.data.data.list;
      this.total = res.data.data.total;
      const res2 = await this.$http.get(`/academy/academy-list`);
      // this.academyList = res2.data.data;
      // console.log(this.academyList);
      this.pageSize = 5;
    },
    data() {
      let validFirst = (rule, value, callback) => {
        if (this.model.first === "") {
          return callback(new Error("请输入科目一成绩"));
        } else {
          if (!/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value)) {
            callback(new Error("请输入整数"));
          } else {
            callback();
          }
        }
      };
      let validSecond = (rule, value, callback) => {
        if (this.model.second === "") {
          return callback(new Error("请输入科目二成绩"));
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
          return callback(new Error("请输入科目三成绩"));
        } else {
          if (!/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value)) {
            callback(new Error("请输入整数"));
          } else {
            callback();
          }
        }
      };
      let validFour = (rule, value, callback) => {
        if (this.model.four === "") {
          return callback(new Error("请输入科目四成绩"));
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
        gradeList: [
          {
            name: "张三",
            stuId: "63200701",
            first: "90",
            second: "80",
            third: "60",
            four: "90",
          },
          {
            name: "张圆",
            stuId: "63200702",
            first: "90",
            second: "80",
            third: "60",
            four: "90",
          },
          {
            name: "李丽",
            stuId: "63200703",
            first: "90",
            second: "80",
            third: "60",
            four: "90",
          },
          {
            name: "王勇",
            stuId: "63200704",
            first: "90",
            second: "80",
            third: "60",
            four: "90",
          },
          {
            name: "张章",
            stuId: "63200705",
            first: "90",
            second: "80",
            third: "60",
            four: "90",
          },
        ],
        gradeFormVisible: false,
        isEdit: false,
        // options: provinceAndCityData,
        total: 1,
        pageSize: 5,
        keyword: "",
        model: {
          name: "",
          stuId: "",
          first: "",
          second: "",
          third: "",
          four: "",
        },
        rules: {
          name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
          stuId: [{ required: true, validator: validStuId, tirgger: "blur" }],
          first: [{ required: true, message: "请输入科目一成绩", trigger: "blur" }],
          second: [{ required: true, message: "请输入科目二成绩", trigger: "blur" }],
          third: [{ required: true, message: "请输入科目三成绩", trigger: "blur" }],
          four: [{ required: true, message: "请输入科目四成绩", trigger: "blur" }],
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
        this.gradeFormVisible = true;
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
        this.stuFormVisible = true;
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
        this.gradeList = res.data.data.list;
      },
      async handleCurrentChange(val) {
        // const res = await this.$http.get(`/jwstudent/stu-academy-page?keyword=&pageSize=${this.pageSize}&pageNum=${val}`)
        console.log(res.data.data);
        console.log(`当前页: ${val}`);
        this.studentList = res.data.data.list;
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
  
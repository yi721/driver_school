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
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="打卡" :visible.sync="dakaFormVisible">
      <el-form :rules="rules" label-position="top" label-width="5rem" :model="model" ref="form">
        <el-form-item label="用户id" prop="userId">
          <el-input v-model="model.userId"></el-input>
        </el-form-item>
        <el-form-item label="打卡时长（分钟）" prop="minute">
          <el-input v-model="model.minute"></el-input>
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
import { mapGetters } from 'vuex';
export default {
  inject: ["reload"],
  async mounted() {
    const res = await this.$http.get(`/student/stu-list-by-instructorid/${this.userId}`);
    this.dakaList = res.data.data
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
      dakaList: [],
      dakaFormVisible: false,
      isEdit: false,
      model: {
        userId: "",

        minute: ""
      },
      rules: {
        userId: [{ required: true, validator: validStuId, tirgger: "blur" }],
        minute: [
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
            const res = await this.$http.post(`/student/updateentry/${this.model.userId}/${this.model.minute}`);
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
      this.dakaFormVisible = true;
    },
  },
  computed: {
    ...mapGetters([
      'userId'
    ]),
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
  
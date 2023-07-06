<template>
  <div>
    <el-button
      style="margin-right: 20px"
      @click="handleMenu()"
      icon="el-icon-menu"
      size="mini"
    ></el-button>
    <el-col :span="2">
      <el-button
        ref="applyBtn"
        type="success"
        style="position: relative; left: 0; top: 0"
        @click="activeAccountFormVisible = true"
        :disabled="applyBtnDisabled"
        >激活</el-button
      >
    </el-col>
    <el-col :span="2">
      <el-button
        type="danger"
        style="position: relative; left: 5rem; top: 0"
        @click="exit"
        >退出</el-button
      >
    </el-col>
    <el-dialog title="账号激活" :visible.sync="activeAccountFormVisible">
      <el-tabs type="border-card">
        <el-tab-pane label="管理员">
          <el-form ref="applyForm" :model="model" :rules="rules">
            <div style="padding-right: 3rem">
              <el-form-item
                label="所属身份"
                prop="roleId"
                :label-width="formLabelWidth"
              >
                <el-select v-model="model.roleId" placeholder="请选择">
                  <el-option
                    v-for="item in roleList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="所属驾校"
                prop="schoolId"
                :label-width="formLabelWidth"
              >
                <el-select v-model="model.schoolId" placeholder="请选择">
                  <el-option
                    v-for="item in schoolList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-form>
          <div class="dialog-footer">
            <el-button type="primary" @click="submit">提 交</el-button>
            <el-button @click="activeAccountFormVisible = false"
              >取 消</el-button
            >
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      schoolList: [],
      roleList: [],
      rules: {
        schoolId: [
          { validator: checkAcademy, message: "请选择学院", trigger: "change" },
        ],
        roleId: [
          { validator: checkAcademy, message: "请选择角色", trigger: "change" },
        ],
      },
      model: {
        roleId: "",
        schoolId: "",
      },
      activeAccountFormVisible: false,
      formLabelWidth: "5rem",
      applyBtnDisabled: false,
    };
  },
  methods: {
    handleMenu() {
      this.$store.commit("collapseMenu");
    },
    submit() {
      this.$refs["applyForm"].validate(async (result) => {
        if (result) {
          await this.$http
            .post(
              `/role/apply/${userId}/${this.model.schoolId}/${this.model.roleId}`
            )
            .then((res) => {
              console.log(res);
              successMsg("已提交");
              this.applyBtnDisabled = true;
              this.activeAccountFormVisible = false;
            });
        } else {
          errorMsg("检查填写！");
          return;
        }
      });
    },
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),

    ...mapGetters(["userId"]),
  },
  mounted() {
    console.log(this.tags, "tags");
  },
};
</script>

<style lang="less" scoped>
.header-container {
  padding: 0 20px;
  background-color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .text {
    color: #fff;
    font-size: 14px;
    margin-left: 10px;
  }

  .r-content {
    .user {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }

  .l-content {
    display: flex;
    align-items: center;

    /deep/.el-breadcrumb__item {
      .el-breadcrumb__inner {
        font-weight: normal;

        &.is-link {
          color: #666;
        }
      }

      &:last-child {
        .el-breadcrumb__inner {
          color: #fff;
        }
      }
    }
  }
}
</style>

<template>
    <el-row>
        <el-dialog title="账号激活" :visible.sync="activeAccountFormVisible">
            <el-form ref="applyForm" :model="model" :rules="rules">
                <div style="padding-right: 3rem">
                    <el-form-item label="所属身份" prop="roleId">
                        <el-select v-model="model.roleId" placeholder="请选择">
                            <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属驾校" prop="schoolId">
                        <el-select v-model="model.schoolId" placeholder="请选择">
                            <el-option v-for="item in schoolList" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
            </el-form>
            <div class="dialog-footer">
                <el-button type="primary" @click="submit">提 交</el-button>
            </div>
        </el-dialog>
        <el-col :span="10" style="margin-left:28% ;margin-top: 10%;">
            <div class="grid-content bg-purple">
                <el-card class="box-card">
                    <div class="admin">
                        <img src="../assets/OIP-C.jpg">
                        <div class="admin-info">
                            <p class="name">{{ }}</p>
                            <p class="access">管理员</p>
                            <!-- {{this.userRole.schoolName}} -->
                        </div>
                    </div>
                    <div class="login-info">
                        <p>上次登录时间:<span>2021-7-19</span></p>
                    </div>
                </el-card>
                <!-- <div>
                    <mo-password></mo-password>
                </div> -->
            </div>
        </el-col>
        <el-col style="margin-left: 20rem;" :span="1">
            <el-button ref="applyBtn" type="success" style="position: relative; left: 0; top: 0"
                @click="activeAccountFormVisible = true" :disabled="applyBtnDisabled">激活</el-button>
        </el-col>
    </el-row>
</template> 
<script>
import { successMsg } from "@/utils/message";
import { mapGetters } from 'vuex';
export default {
    components: {

    },
    async mounted() {
        //获取驾校列表
        const res = await this.$http.get(`/school/school-list`)
        this.schoolList = res.data.data
        //根据role列表
        const res1 = await this.$http.get(`/role/role-list`)
        this.roleList = res1.data.data
        console.log(this.roleId)
        if (this.roleId == 1) {
            this.applyBtnDisabled = true
        }
    },
    data() {
        return {
            schoolList: [],
            roleList: [],
            rules: {
                schoolId: [
                    { required: true, message: "请选择学院", trigger: "change" },
                ],
                roleId: [
                    { required: true, message: "请选择角色", trigger: "change" },
                ],
            },
            model: {
                roleId: "",
                schoolId: "",
            },
            activeAccountFormVisible: false,
            applyBtnDisabled: false,
        };
    },
    methods: {
        submit() {
            this.$refs["applyForm"].validate(async (result) => {
                if (result) {
                    await this.$http
                        .post(
                            `/role/apply/${this.userId}/${this.model.schoolId}/${this.model.roleId}`
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
        ...mapGetters([
            'userId',
            'roleId'
        ]),
    },
}
</script> 
<style lang="less" scoped>
.admin {
    display: flex;
    align-items: center; //垂直居中
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;

    img {
        margin-right: 40px;
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }

    .admin-info {
        .name {
            font-size: 32px;
            margin-bottom: 10px;
        }

        .access {
            color: #999999;
        }
    }
}

.login-info {
    p {
        line-height: 28px;
        font-size: 14px;
        color: #999999;

        span {
            color: #666666;
            margin-left: 60px;
        }
    }
}
</style> 
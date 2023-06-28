<template>
    <el-row>
        <el-col :span="10" style="margin-left:28% ;">
            <div class="grid-content bg-purple">
                <el-card class="box-card">
                    <div class="admin">
                        <img src="../assets/OIP-C.jpg">
                        <div class="admin-info">
                            <p class="name">Admin</p>
                            <p class="access">管理员</p> -->
                            <!-- {{this.userRole.schoolName}} -->
                        </div>
                    </div>
                    <div class="login-info">
                        <p>上次登录时间:<span>2021-7-19</span></p>
                    </div>
                </el-card>
                <div>
                    <mo-password></mo-password>
                </div>
            </div>
        </el-col>
    </el-row>
</template> 
<script>
import MoPassword from '@/components/MoPassword.vue';
export default {
    data() {
        return {}
    },
    components: {
        MoPassword
    },
    mounted() {

    }
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
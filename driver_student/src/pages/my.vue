<template>
    <div class="my">
        <div class="album-slide">
            <div class="album-img">
                <img :src=attachImageUrl(avator) alt="">
            </div>
            <ul class="album-info">
                <li>姓名： {{ username }}</li>
                <li>性别： {{ userSex }}</li>
                <li>年龄: {{ age }}</li>
                <li>手机号码：{{ phone }}</li>
                <li>教练:{{ instructor }}</li>
            </ul>
        </div>

        <div class="album-content">
            <div class="pbody">
                <div class="content">
                    <h1 class="title">
                        <slot name="title">我的学习进度</slot>
                    </h1>
                    <hr>
                    <ul>
                        <li class="list-title">
                            <div class="song-item">
                                <span class="item-index"></span>
                                <span class="item-title">科目</span>
                                <span class="item-name">学习进度</span>
                                <span class="item-intro">当前可报名</span>
                            </div>
                        </li>
                        <li class="list-content">
                            <div class="song-item">
                                <span class="item-index"></span>
                                <span class="item-title">科一</span>
                                <span class="item-name">{{ plan_a }}</span>
                                <span class="item-intro">
                                    <el-button v-if="isNeed1" size="mini" type="primary" round plain @click="Baomin1()">
                                        报名考试
                                    </el-button>
                                </span>
                            </div>
                        </li>
                        <li class="list-content">
                            <div class="song-item">
                                <span class="item-index"></span>
                                <span class="item-title">科二</span>
                                <span class="item-name">{{ plan_b }}</span>
                                <span class="item-intro">
                                    <el-button v-if="isNeed2" size="mini" type="primary" round plain @click="Baomin2()">
                                        报名考试
                                    </el-button>
                                </span>
                            </div>
                        </li>
                        <li class="list-content">
                            <div class="song-item">
                                <span class="item-index"></span>
                                <span class="item-title">科三</span>
                                <span class="item-name">{{ plan_c }}</span>
                                <span class="item-intro">
                                    <el-button v-if="isNeed3" size="mini" type="primary" round plain @click="Baomin3()">
                                        报名考试
                                    </el-button>
                                </span>
                            </div>
                        </li>
                        <li class="list-content">
                            <div class="song-item">
                                <span class="item-index"></span>
                                <span class="item-title">科四</span>
                                <span class="item-name">{{ plan_d }}</span>
                                <span class="item-intro">
                                    <el-button v-if="isNeed4" size="mini" type="primary" round plain @click="Baomin4()">
                                        报名考试
                                    </el-button>
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { mixin } from '../mixins'
import { mapGetters } from 'vuex'
// import { getUserOfId } from '../api'

export default {
    components: {

    },
    mixins: [mixin],
    data() {
        return {
            FormVisible: true,
            isNeed1: true,
            isNeed2: true,
            isNeed3: true,
            isNeed4: true,
            avator: '',//头像
            username: '',
            userSex: '',
            age: '',
            instructor: '',//教练
            phone: '',
            plan_a: '',
            plan_b: '',
            plan_c: '',
            plan_d: '',
            model: {

            }
        }
    },
    computed: {
        ...mapGetters([
            'UserId'
        ])
    },
    mounted() {
        // this.getMsg(this.UserId);
    },
    methods: {
        //     async queryParam() {
        //         try {
        //             const param = {
        //                 name: 'taskNeedAudit'
        //             }
        //             const res = await paramsApi.getVal(param)
        //             if (res == 'true') {
        //                 this.isNeedAudit = true
        //             } else {
        //                 this.isNeedAudit = false
        //             }
        //             console.log('是否需要审核', this.isNeedAudit, typeof this.isNeedAudit)
        //         } catch (e) {
        //             this.Message(e, 'error')
        //         }
        // },
        getMsg(UserId) {
            getUserOfId(UserId).then(res => {
                this.avator = res.avator;
                this.username = res.username;
                this.userSex = res.userSex;
                this.age = res.age;
                this.instructor = res.instructor;
                this.phone = res.phone;
                this.plan_a = res.plan_a;
                this.plan_b = res.plan_b;
                this.plan_c = res.plan_c;
                this.plan_d = res.plan_d;
            })
        },
        Baomin1() {
            this.$confirm('当前报名科目为科目一, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                // const res = await this.$http.post(`/jwstudent/delete/${row.id}`)
                this.$message({
                    type: 'success',
                    message: '报名成功!'
                });
                this.reload()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消报名'
                });
            });
        },
        Baomin2() {
            this.$confirm('当前报名科目为科目二, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                // const res = await this.$http.post(`/jwstudent/delete/${row.id}`)
                this.$message({
                    type: 'success',
                    message: '报名成功!'
                });
                this.reload()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消报名'
                });
            });
        },
        Baomin3() {
            this.$confirm('当前报名科目为科目三, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                // const res = await this.$http.post(`/jwstudent/delete/${row.id}`)
                this.$message({
                    type: 'success',
                    message: '报名成功!'
                });
                this.reload()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消报名'
                });
            });
        },
        Baomin4() {
            this.$confirm('当前报名科目为科目四, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                // const res = await this.$http.post(`/jwstudent/delete/${row.id}`)
                this.$message({
                    type: 'success',
                    message: '报名成功!'
                });
                this.reload()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消报名'
                });
            });
        },
    }
}
</script>
  
<style lang="scss" scoped>
@import '../assets/css/my.scss';
@import '../assets/css/album-content.scss';
</style>
  
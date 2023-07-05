<template>
    <div class="my">
        <div class="album-slide">
            <div class="album-img">
                <img :src=attachImageUrl(avator) alt="">
            </div>
            <ul class="album-info">
                <li>姓名： {{ this.username }}</li>
                <li>年龄: {{ this.age }}</li>
                <li>手机号码：{{ this.phone }}</li>
                <li>教练:{{ this.instructor }}</li>
            </ul>
        </div>
        <div class="album-content">
            <div class="album-title">
                <li>当前进度：正处于{{ this.description }}：{{ entry }}%</li>
                <el-button style="margin-left: 520px;" @click="Baomin()">报名考试</el-button>
            </div>
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
                                <span class="item-intro">考试成绩</span>
                            </div>
                        </li>
                        <li class="list-content">
                            <div class="song-item">
                                <span class="item-index"></span>
                                <span class="item-title">科一</span>
                                <span class="item-intro">{{ plan_a }}</span>
                            </div>
                        </li>
                        <li class="list-content">
                            <div class="song-item">
                                <span class="item-index"></span>
                                <span class="item-title">科二</span>
                                <span class="item-intro">{{ plan_b }}</span>
                            </div>
                        </li>
                        <li class="list-content">
                            <div class="song-item">
                                <span class="item-index"></span>
                                <span class="item-title">科三</span>
                                <span class="item-intro">{{ plan_c }}</span>
                            </div>
                        </li>
                        <li class="list-content">
                            <div class="song-item">
                                <span class="item-index"></span>
                                <span class="item-title">科四</span>
                                <span class="item-intro">{{ plan_d }}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <el-dialog title="考试报名" :visible.sync="BaominFormVisible" :close-on-click-modal="false">
            <el-form label-position="top" label-width="5rem" :model="model" ref="form">
                <el-form-item style="margin-top: 2px;text-align: center;">
                    <li style="text-align: center;">当前报名科目是：{{ this.description }},是否继续报名?</li>
                </el-form-item>
                <el-form-item style="margin-top: 2px;text-align: center;">
                    <el-button @click="sumbit()">报名</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import { mixin } from '../mixins'
import { mapGetters } from 'vuex'
import { errorMsg } from '@/utils/message'
export default {
    components: {
    },
    mixins: [mixin],
    data() {
        return {
            BaominFormVisible: false,
            avator: '',//头像
            username: '',
            age: '',
            instructor: '',//教练
            instructorId: '',
            phone: '',
            entry: '',//进度
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
            'userId',
            'description'
        ])
    },
    async mounted() {
        try {
            console.log(this.description)
            const res = await this.$http.get(`/student/find/${this.userId}`)
            console.log(res)
            this.username = res.data.data.name
            this.age = res.data.data.age
            this.entry = res.data.data.entry
            this.phone = res.data.data.phone
            this.plan_a = res.data.data.planA
            this.plan_b = res.data.data.planB
            this.plan_c = res.data.data.planC
            this.plan_d = res.data.data.planD
            this.instructorId = res.data.data.instructorId
            // console.log(res.data.data.instructorId)
            const res1 = await this.$http.get(`/instructor/find/${this.instructorId}`)
            this.instructor = res1.data.data.name
        } catch (err) {
            console.log(err)
        }
    },
    methods: {
        async Baomin() {
            //审核没有报名资格
            const res = await this.$http.get(`/student/get-entry/${this.userId}`)
            console.log(res.data.data)
            if (res.data.data === 1) {
                this.BaominFormVisible = true
            }//审核可以报名
            else {
                errorMsg('当前没有资格报名！')
                return
            }


        },

        async handleDel(row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const res = await this.$http.post(`/jwstudent/delete/${row.id}`)
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
    }
}
</script>
  
<style lang="scss" scoped>
@import '../assets/css/my.scss';
@import '../assets/css/album-content.scss';
</style>
  
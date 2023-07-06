<template>
    <div class="my">
        <div class="album-slide">
            <div class="album-img">
                <img :src="`http://123.56.141.117:8081/user/icon/${this.userId}`" alt="avatar" :onerror="defaultImg">
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
                <el-button style="margin-left: 490px;" @click="Baomin()">报名考试</el-button>
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
            <div v-show="active == 0">
                <el-form label-position="top" label-width="5rem" :model="model" ref="form">
                    <el-form-item style="margin-top: 2px;text-align: center;">
                        <li style="text-align: center;">当前报名科目是：{{ this.description }},是否继续报名?</li>
                    </el-form-item>
                    <el-form-item style="margin-top: 2px;text-align: center;">
                        <el-button @click="next()">继续</el-button>
                    </el-form-item>
                </el-form>

            </div>
            <div v-show="active == 1">
                <el-form :rules="rules" label-position="top" label-width="5rem" :model="model" ref="form">
                    <li>姓名：{{ username }}</li>
                    <el-form-item v-show="show" label="账号" prop="stuid">
                        <el-input :disabled="true" v-model="model.stuid"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="证件类别" prop="idkind">
                        <el-select placeholder="请选择">
                            <el-option label="居民身份证" value="居民身份证"></el-option>
                            <el-option label="护照" value="护照"></el-option>
                            <el-option label="港澳台通行证" value="港澳台通行证"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="证件号码" prop="idcard">
                        <el-input v-model="model.idCard"></el-input>
                    </el-form-item>
                    <el-form-item label="考场选择" prop="digest">
                        <el-select v-model="model.address" placeholder="请选择">
                            <el-option v-for=" item  in  addressList " :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="考试时间(只能选择五天后的时间)" prop="time">
                        <el-date-picker v-model="model.time" type="date" :picker-options="pickerOptions"
                            placeholder="选择考试日期" format="yyyy年MM月dd日" value-format="yyyy-MM-dd hh:mm:ss">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="考试时间段" prop="duan">
                        <el-select v-model="duan" placeholder="请选择">
                            <el-option label="8:00-10:00" value="8:00-10:00"></el-option>
                            <el-option label="10:00-12:00" value="10:00-12:00"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="submit()">报名考试</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { mixin } from '../mixins'
import { mapGetters } from 'vuex'
import { errorMsg, successMsg } from '@/utils/message'
export default {
    components: {
    },
    mixins: [mixin],
    data() {
        return {
            defaultImg: 'this.src="' + require('../assets/img/汽车.png') + '"',//默认图地址
            addressList: [],
            BaominFormVisible: false,
            show: false,
            active: 0,
            pickerOptions: {
                disabledDate(time) {
                    let tempTime = 3600 * 1000 * 24 * 5
                    return time.getTime() < Date.now() + tempTime || time.getDay() === 0 || time.getDay() === 6;
                },
            },
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
            duan: '',
            model: {
                idCard: '',
                time: '',
                address: '',
                stuid: ''
            },
            rules: {
                idCard: [
                    { required: true, message: '请选择证件号码', trigger: 'blur' }
                ],
                time: [
                    { required: true, message: '请选择时间', trigger: 'change' }
                ],
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
            this.model.stuid = this.userId
            console.log(111)
            // console.log(this.model.userId)
            const res = await this.$http.get(`/student/find/${this.userId}`)
            // console.log(res)
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
            const res2 = await this.$http.get(`/exam/examroomList/${this.userId}`)
            console.log(res2)
            this.addressList = res2.data.data
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
        next() {
            if (this.active === 0) {

                this.active++

            } else {
                this.active = 0
            }
        },
        async submit() {
            this.$refs.form.validate(async (valid) => {
                console.log(valid)
                if (valid) {
                    console.log(this.model)
                    const res = await this.$http.post('/exam/apply', this.model)

                    successMsg('报名成功')
                    // this.reload()
                } else {
                    errorMsg('检查填写')
                    return false;
                }
            });
        },

    }
}
</script>
  
<style lang="scss" scoped>
@import '../assets/css/my.scss';
@import '../assets/css/album-content.scss';
</style>
  
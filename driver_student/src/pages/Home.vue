<template>
    <div class="home">
        <!--轮播图-->
        <swiper></swiper>
        <div class="section" v-for="(item, index) in paperList" :key="index">
            <!-- <div class="section-title">{{ item.name }}</div> -->
            <!-- <content-list :contentList="item.list"></content-list> -->
        </div>
        <el-dialog title="请尽快选择驾校" :visible.sync="xuanzheFormVisible" :close-on-click-modal="false">
            <div v-show="active == 0">
                <el-form :rules="rules" label-position="top" label-width="5rem" :model="model" ref="xinxiform">
                    <li>姓名：{{ username }}</li>
                    <el-form-item v-show="show" label="学生Id" prop="userId">
                        <el-input v-model="model.userId"></el-input>
                    </el-form-item>
                    <el-form-item label="证件类别" prop="idkind">
                        <el-select v-model="model.idKind" placeholder="请选择">
                            <el-option label="居民身份证" value="居民身份证"></el-option>
                            <el-option label="护照" value="护照"></el-option>
                            <el-option label="港澳台通行证" value="港澳台通行证"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="证件号码" prop="idcard">
                        <el-input v-model="model.idCard"></el-input>
                    </el-form-item>
                    <el-form-item label="驾校" prop="title">
                        <el-select v-model="model.schoolId" placeholder="请选择" @change="getSchoolChange">
                            <el-option v-for="item in schoolList" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="next()">下一步</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div v-show="active == 1">
                <el-form :rules="rules" label-position="top" label-width="5rem" :model="model" ref="baominform">
                    <li>{{ schoolname }}的教练如下：</li>
                    <el-form-item prop="digest">
                        <el-select v-model="model.instructorId" placeholder="请选择">
                            <el-option v-for="item in instructorList" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="报考类型" prop="digest">
                        <el-select v-model="model.typeId" placeholder="请选择">
                            <el-option v-for="item in typeList" :key="item.id" :label="item.typename" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item style="display: flex; justify-content: center;">
                        <el-button type="primary" style="margin-top: 12px;" @click="back">上一步</el-button>
                        <el-button type="primary" style="margin-top: 12px;" @click="submit">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Swiper from '../components/Swiper.vue'
import ContentList from '../components/ContentList.vue'
import { successMsg, errorMsg } from '@/utils/message'
import { mapGetters } from 'vuex'
export default {
    components: {
        Swiper,
        ContentList
    },
    async mounted() {
        try {
            //查找学生姓名和教练Id
            const res = await this.$http.get(`/student/find/${this.userId}`)
            // console.log(res.data.data.instructorId)
            this.username = res.data.data.name
            // let jiaolianId = res.data.data.instructorId
            //如果教练Id为0，尽快选择驾校和教练
            if (res.data.data.instructorId == 0) {
                this.xuanzheFormVisible = true
            }
            const res1 = await this.$http.get(`/school/school-list`)
            this.schoolList = res1.data.data
            const res0 = await this.$http.get(`/student/type-list`)
            this.typeList = res0.data.data
        } catch (err) {
            console.log(err)
        }
    },
    data() {
        return {
            show: false,
            active: 0,
            xuanzheFormVisible: false,
            schoolList: [],
            instructorList: [],
            typeList: [],
            username: '',
            schoolname: '',
            paperList: [
                {
                    name: "试题资料", list: [{
                        id: '1',
                        name: '科一试题',
                        pic: '',
                        url: '',
                    },
                    {
                        id: '2',
                        name: '科二试题',
                        pic: '',
                        url: '',
                    },
                    {
                        id: '3',
                        name: '科三试题',
                        pic: '',
                        url: '',
                    },
                    {
                        id: '4',
                        name: '科四试题',
                        pic: '',
                        url: '',
                    }
                    ]
                }
            ],
            model: {
                idKind: '',
                idCard: '',
                schoolId: '',
                instructorId: '',
                typeId: '',
                userId: ''
            },
            rules: {
                idKind: [
                    { required: true, message: '请选择证件类型', trigger: 'change' }
                ],
                idCard: [
                    { required: true, message: '请填写证件号码', trigger: 'blur' }
                ],
                schoolId: [
                    { required: true, message: '请选择驾校', trigger: 'change' }
                ],
                instructorId: [
                    { required: true, message: '请选择教练', trigger: 'change' }
                ],
                typeId: [
                    { required: true, message: '请选择报考类型', trigger: 'change' }
                ],
            }
        }
    },
    computed: {
        ...mapGetters([
            'userId',
        ])
    },
    methods: {
        //通过schoolId查询教练
        async getSchoolChange(val) {
            //学生Id
            this.model.userId = this.userId
            //驾校名称
            const res2 = await this.$http.get(`/school/find/${val}`)
            this.schoolname = res2.data.data.name
            console.log(res2)
            const res3 = await this.$http.get(`/instructor/find-by-school-id/${val}`)
            // console.log(res3)
            this.instructorList = res3.data.data
        },
        next() {
            if (this.active === 0) {
                this.$refs['xinxiform'].validate(async (valid) => {
                    if (valid) {
                        console.log(valid)
                        this.active++
                    } else {
                        errorMsg('请检查填写！');
                    }
                });
            } else {
                this.active = 0
            }
        },
        back() {
            if (this.active-- < 0) this.active = 0;
        },
        async submit() {
            this.$refs['baominform'].validate(async (valid) => {
                console.log(this.model.userId)
                if (valid) {
                    console.log(this.model)
                    const res = await this.$http.post(`/student/updateid`, this.model)
                    successMsg('修改成功')
                } else {
                    errorMsg('请检查填写！')
                    return false;
                }
            });
        }
    },
}

</script>
<style lang="scss" scoped>
@import '../assets/css/home.scss';
</style>

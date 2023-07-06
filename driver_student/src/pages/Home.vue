<template>
    <div class="home">
        <!--轮播图-->
        <swiper></swiper>
        <div class="section" v-for="(item, index) in paperList" :key="index">
            <div class="section-title">{{ item.name }}</div>
            <content-list :contentList="item.list"></content-list>
        </div>

        <el-dialog title="请选择驾校" :visible.sync="xuanzheFormVisible" :close-on-click-modal="false">
            <div v-show="active == 0">
                <el-form :rules="rules" label-position="top" label-width="5rem" :model="model" ref="form">
                    <el-form-item label="驾校" prop="title">
                        <el-select v-model="model.school" placeholder="请选择">
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
                <el-form :rules="rules" label-position="top" label-width="5rem" :model="model" ref="form">
                    <el-form-item label="教练" prop="digest">
                        <el-select v-model="model.instructor" placeholder="请选择">
                            <el-option v-for="item in instructorList" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submit()">
                            提交
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Swiper from '../components/Swiper.vue'
import ContentList from '../components/ContentList.vue'
import { mapGetters } from 'vuex'
export default {
    components: {
        Swiper,
        ContentList
    },
    async mounted() {
        try {
            // const res = await this.$http.get(`/instructor/find/?id=${this.instructorId}`)
            // let id = res.data.data.id
            // if (id == 0) {
            //     xuanzheFormVisible = true
            // }
            const res1 = await this.$http.get(`/school/school-list`)
            this.schoolList = res1.data.data
            console.log(res1.data.data)
            // const res2 = await this.$http.get(``)
        } catch (err) {
            console.log(err)
        }

    },
    data() {
        return {
            active: 0,
            xuanzheFormVisible: true,
            schoolList: [],
            instructorList: [],
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
                school: '',
                instructor: ''
            },
            rules: {
                school: [
                    { required: true, message: '请选择驾校', trigger: 'blur' }
                ],
                instructor: [
                    { required: true, message: '请选择教练', trigger: 'blur' }
                ],
            }
        }
    },
    computed: {
        ...mapGetters([
            'instructorId',
        ])
    },
    methods: {
        next() {
            if (this.active === 0) {
                this.$refs.form.validate(async (valid) => {
                    if (valid) {
                        this.active++
                    } else {
                        errorMsg('请选择驾校！');
                    }
                });
            } else {
                this.active = 0
            }
        }
    },
}

</script>
<style lang="scss" scoped>
@import '../assets/css/home.scss';
</style>

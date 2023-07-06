<template>
    <div class="home">
        <div class="section">
            <!-- 页面标题 -->
            <div class="VSTD_box" v-if="question.length !== 0">
                <h1 style="margin-bottom: 40px; text-align: center">
                    hhh{{ }}
                </h1>
                <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <!-- 循环后端给你的所有题 -->
                    <div class="VSTD_box_item" v-for="(item, index) in question" :key="item.id">
                        <!-- 1 单选 -->
                        <!-- 2 判断 -->
                        <!-- 3 多选 -->
                        <!-- 4 简答 -->
                        <div class="VSTD_box_item_title">
                            <!-- 题目的信息 -->
                            <p style="font-weight: 700">
                                第{{ index + 1 }}题：{{ item.stContent
                                }}<span>（{{ item.stScore }}分）</span>
                                <span v-if="item.questionType == 1">（单选）</span>
                                <span v-if="item.questionType == 2">（判断）</span>
                            </p>
                        </div>

                        <!-- 如果questionType 等于1 那么他是单选题 -->
                        <!-- 题目绑定的值是 每一项的 item.resource  -->

                        <div v-if="item.questionType == 1" class="VSTD_box_item_select">
                            <el-form-item label="" prop="resource">
                                <el-radio-group v-model="item.resource">
                                    <el-radio label="A">{{ item.stSelecta }}</el-radio>
                                    <el-radio label="B">{{ item.stSelectb }}</el-radio>
                                    <el-radio label="C">{{ item.stSelectc }}</el-radio>
                                    <el-radio label="D">{{ item.stSelectd }}</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </div>

                        <!-- 如果questionType 等于2 那么他是判断题 -->
                        <!-- 题目绑定的值是 每一项的 item.resource  -->

                        <div v-if="item.questionType == 2" class="VSTD_box_item_select">
                            <el-form-item label="" prop="resource">
                                <el-radio-group v-model="item.resource">
                                    <el-radio label="对">{{ item.stSelecta }}</el-radio>
                                    <el-radio label="错">{{ item.stSelectb }}</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </div>
                    </div>

                    <!-- 提交函数  -->

                    <el-form-item style="text-align: center">
                        <el-button type="primary" @click="submitForm()">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>

            <!-- 如果没题就提示没题 -->

            <div v-else>
                <div class="none" style="margin-left: 0px">
                    <div class="none_img"></div>
                    <h3>暂无试题</h3>
                </div>
            </div>

        </div>
    </div>
</template>
  
<script>
import { mixin } from '../mixins'
export default {
    mixins: [mixin],

    //数据定义

    data() {
        return {
            question: [
                {
                    "createTime": 1597030865000,
                    "delFlag": "0",
                    "id": 285,
                    "num": 0,
                    "questionType": "1",
                    "sjIntroduction": "计算机基本知识",
                    "stAnalysis": "JEIIXJIEJXIJIEXIJEIX",
                    "stAnswer": "B",
                    "stContent": "多数轿车更换发动机机油的周期里程为________km。",
                    "stScore": 10,
                    "stSelecta": "2000--3000",
                    "stSelectb": "5000--8000",
                    "stSelectc": "10000--12000",
                    "stSelectd": "14000--16000",
                    "stType": "1"
                },
                {
                    "createTime": 1597030865000,
                    "delFlag": "0",
                    "id": 286,
                    "num": 0,
                    "questionType": "1",
                    "sjIntroduction": "计算机基本知识",
                    "stAnalysis": "JEIIXJIEJXIJIEXIJEIX",
                    "stAnswer": "B",
                    "stContent": "关于镶套修理法，下面说法不正确的是（  ）",
                    "stScore": 10,
                    "stSelecta": "镶套后改变了零件的尺寸",
                    "stSelectb": "镶套材料应尽量与基体一致",
                    "stSelectc": "镶套采用了过盈配合",
                    "stSelectd": "配合表面要求加工精度较高",
                    "stType": "1"
                },
                {
                    "createTime": 1608101282000,
                    "delFlag": "0",
                    "id": 452,
                    "num": 0,
                    "questionType": "1",
                    "sjIntroduction": "计算机基本知识",
                    "stAnalysis": "无",
                    "stAnswer": "A,B,C",
                    "stContent": "对磁盘与驱动器中，叙述正确的有",
                    "stCteater": "1",
                    "stScore": 10,
                    "stSelecta": "密度",
                    "stSelectb": "扇区",
                    "stSelectc": "磁道",
                    "stSelectd": "光标本",
                    "stType": "1"
                },
                {
                    "createTime": 1608099445000,
                    "delFlag": "0",
                    "id": 443,
                    "num": 0,
                    "questionType": "1",
                    "sjIntroduction": "计算机基本知识",
                    "stAnalysis": "无",
                    "stAnswer": "A,C,B",
                    "stContent": "计算机的主要特点是",
                    "stCteater": "1",
                    "stScore": 10,
                    "stSelecta": "运算速度快",
                    "stSelectb": "精度高",
                    "stSelectc": "存储记忆",
                    "stSelectd": "自动编程",
                    "stType": "1"
                },
                {
                    "createTime": 1606957884000,
                    "delFlag": "0",
                    "id": 372,
                    "num": 0,
                    "questionType": "2",
                    "sjIntroduction": "计算机基本知识",
                    "stAnalysis": "JEIIXJIEJXIJIEXIJEIX",
                    "stAnswer": "错",
                    "stContent": "int是引用数据类型",
                    "stScore": 10,
                    "stSelecta": "对",
                    "stSelectb": "错",
                    "stType": "1"
                },
                {
                    "createTime": 1606957884000,
                    "delFlag": "0",
                    "id": 373,
                    "num": 0,
                    "questionType": "2",
                    "sjIntroduction": "计算机基本知识",
                    "stAnalysis": "JEIIXJIEJXIJIEXIJEIX",
                    "stAnswer": "错",
                    "stContent": "string是引用数据类型",
                    "stScore": 10,
                    "stSelecta": "对",
                    "stSelectb": "错",
                    "stType": "1"
                }
            ],					//保存后端返回题的数组，页面上需要用它来循环显示每一道题
        }
    },
    //逻辑
    created() {
        this.init()		//初始化函数
    },

    methods: {
        //初始化函数

        init() {
            msgApi
                .questionsList(this.id)
                .then((res) => {
                    if (res.data.code == 200) {
                        var json = res.data.returnObject.list
                        for (let i = 0; i < json.length; i++) {
                            json[i].resource = ''
                        }
                    }
                    this.question = json			//页面循环的题
                })
                .catch((err) => { })
        },


    }
}
</script>
  
<style lang="scss" scoped>
@import '../assets/css/home.scss';
</style>
  
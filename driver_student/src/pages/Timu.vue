<template>
    <div class="search">
        <!-- 页面标题 -->
        <div class="VSTD_box" v-if="question.length !== 0">
            <h1 style="margin-bottom: 40px; text-align: center">
                {{ iow.sjIntroduction }}
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
                            <span v-if="item.questionType == 3">（多选）</span>
                            <span v-if="item.questionType == 4">（简答）</span>
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

                    <!-- 如果questionType 等于3 那么他是多选题 -->
                    <!-- 题目绑定的值是  每一项的 item.resource  -->

                    <div v-if="item.questionType == 3" class="VSTD_box_item_select">
                        <el-form-item label="" prop="resource">
                            <el-checkbox-group @input="change($event)" v-model="item.resource">
                                <el-checkbox label="A">{{ item.stSelecta }}</el-checkbox>
                                <el-checkbox label="B">{{ item.stSelectb }}</el-checkbox>
                                <el-checkbox label="C">{{ item.stSelectc }}</el-checkbox>
                                <el-checkbox label="D">{{ item.stSelectd }}</el-checkbox>
                                <el-checkbox label="E">{{ item.stSelecte }}</el-checkbox>
                                <!-- <el-checkbox label="F">{{ item.stSelectf }}</el-checkbox> -->
                            </el-checkbox-group>
                        </el-form-item>
                    </div>

                    <!-- 如果questionType 等于4 那么他是简答题 -->
                    <!-- 题目绑定的值是  每一项的 item.resource  -->

                    <div v-if="item.questionType == 4" class="VSTD_box_item_select">
                        <el-form-item label="" prop="resource">
                            <!-- <el-form-item label="活动形式"> -->
                            <el-input type="textarea" v-model="item.resource"></el-input>
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
</template>
  
<script>
export default {
    components: {

    },
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>
  
<style lang="scss" scoped>
@import '../assets/css/search.scss';
</style>
  
<template>
    <div class="home">
        <div class="section">
            <div class="section-title">试卷</div>
            <content-list :contentList="paperList"></content-list>
        </div>
    </div>
</template>
<script>
import ContentList from '../components/ContentList.vue'
export default {
    components: {
        ContentList
    },
    async mounted() {
        const res = await this.$http.get(`/paper/paper-list`)
        console.log(res);
        this.paperList = res.data.data
        console.log(this.paperList);
    },
    data() {
        return {
            paperList: []
        }

    },
    methods: {
    }
}
</script>
<style lang="scss" scoped>
@import '../assets/css/home.scss';
</style>
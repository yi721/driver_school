<template>
    <div class="home">
        <div class="section" v-for="(item, index) in paperList" :key="index">
            <div class="section-title">{{ item.name }}</div>
            <content-list :contentList="item.list"></content-list>
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
        const res = await this.$http.get(``)
        console.log(res);
        this.paperList.list = res.data.list
        console.log(this.paperList);
    },
    data() {
        return {
            paperList: [
                {
                    name: "在线做题", list: []
                },
            ]
        }

    },
    methods: {
    }
}
</script>
<style lang="scss" scoped>
@import '../assets/css/home.scss';
</style>
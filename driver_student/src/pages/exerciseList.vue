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
    data() {
        return {
            paperList: [
                {
                    name: "在线学习", list: [{
                        id: '1',
                        name: '第一次在线做题',
                        pic: ''
                    },
                    {
                        id: '2',
                        name: '第一次在线做题',
                        pic: ''
                    },
                    {
                        id: '3',
                        name: '第一次在线做题',
                        pic: ''
                    },
                    {
                        id: '4',
                        name: '第一次在线做题',
                        pic: ''
                    },
                    {
                        id: '5',
                        name: '第一次在线做题',
                        pic: ''
                    },
                    {
                        id: '6',
                        name: '第一次在线做题',
                        pic: ''
                    },
                    {
                        id: '7',
                        name: '第一次在线做题',
                        pic: ''
                    },
                    {
                        id: '8',
                        name: '第一次在线做题',
                        pic: ''
                    }]
                },
                {
                    name: "在线做题", list: [
                        {
                            id: '1',
                            title: '第一次在线学习',
                            pic: ''
                        },
                        {
                            id: '2',
                            title: '第一次在线学习',
                            pic: ''
                        },
                        {
                            id: '3',
                            title: '第一次在线学习',
                            pic: ''
                        },
                        {
                            id: '4',
                            title: '第一次在线学习',
                            pic: ''
                        },
                        {
                            id: '5',
                            title: '第一次在线学习',
                            pic: ''
                        },
                        {
                            id: '6',
                            title: '第一次在线学习',
                            pic: ''
                        },
                        {
                            id: '7',
                            title: '第一次在线学习',
                            pic: ''
                        },
                        {
                            id: '8',
                            title: '第一次在线学习',
                            pic: ''
                        }
                    ]
                }
            ]
        }

    }
}
</script>
<style lang="scss" scoped>
@import '../assets/css/home.scss';
</style>
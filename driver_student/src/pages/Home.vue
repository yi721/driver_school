<template>
    <div class="home">
        <!--轮播图-->
        <swiper></swiper>
        <div class="section" v-for="(item, index) in paperList" :key="index">
            <div class="section-title">{{ item.name }}</div>
            <content-list :contentList="item.list"></content-list>
        </div>
    </div>
</template>

<script>
import Swiper from '../components/Swiper.vue'
import ContentList from '../components/ContentList.vue'
export default {
    components: {
        Swiper,
        ContentList
    },
    data() {
        return {
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
                },
                {
                    name: "视频资料", list: [
                        {
                            id: '1',
                            title: '科一视频资料',
                            pic: '',
                            url: '',
                        },
                        {
                            id: '2',
                            title: '科二视频资料',
                            pic: ''
                        },
                        {
                            id: '3',
                            title: '科三视频资料',
                            pic: '',
                            url: '',
                        },
                        {
                            id: '4',
                            title: '科四视频资料',
                            pic: '',
                            url: '',
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

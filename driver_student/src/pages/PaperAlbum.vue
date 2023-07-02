<template>
    <div class="singer-album">
        <div class="album-slide">
            <div class="singer-img">
                <img :src="attachImageUrl(singer.pic)" alt="">
            </div>
            <ul class="info">
                <li>资料名称：{{ }}</li>
                <li>{{ }}</li>
                <li>{{ }}</li>
            </ul>
        </div>
        <div class="album-content">
            <div class="intro">
                <h2>{{ }}</h2>
                <span>{{ }}</span>
            </div>
            <div class="content">
            </div>
        </div>
    </div>
</template>
  
<script>
import { mixin } from '../mixins'
import { mapGetters } from 'vuex'

export default {
    name: 'singer-album',
    components: {

    },
    mixins: [mixin],
    data() {
        return {
            singerId: '',
            singer: {}
        }
    },
    computed: {
        // ...mapGetters([
        //     'tempList',
        //     'listOfSongs'
        // ])
    },
    mounted() {
        // this.singerId = this.$route.params.id // 给歌单ID赋值
        // this.singer = this.tempList
        // this.getSongList()
    },
    methods: {
        // getSongList() {
        //     getSongOfSingerId(this.singerId)
        //         .then(res => {
        //             this.$store.commit('setListOfSongs', res)
        //         })
        //         .catch(err => {
        //             console.log(err)
        //         })
        // },
        // attachSex(value) {
        //     if (value === 0) {
        //         return '女'
        //     } else if (value === 1) {
        //         return '男'
        //     }
        // }
    }
}
</script>
  
<style lang="scss" scoped>
@import '../assets/css/singer-album.scss';
</style>
  
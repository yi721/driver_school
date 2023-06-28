<template>
    <div class="my">
        <div class="album-slide">
            <div class="album-img">
                <img :src=attachImageUrl(avator) alt="">
            </div>
            <ul class="album-info">
                <li>姓名： {{ username }}</li>
                <li>性别： {{ userSex }}</li>
                <li>生日： {{ birth }}</li>
                <li>故乡： {{ location }}</li>
            </ul>
        </div>

    </div>
</template>
  
<script>
import { mixin } from '../mixins'
// import { mapGetters } from 'vuex'
// import AlbumContent from '../components/AlbumContent'

export default {
    components: {
        // AlbumContent
    },
    mixins: [mixin],
    data() {
        return {
            avator: '',
            username: '',
            userSex: '',
            birth: '',
            location: '',
            introduction: '',
            collection: [], // 存放收藏的歌曲ID
            collectList: [] // 收藏的歌曲
        }
    },
    computed: {
    },
    mounted() {
    },
}
</script>
  
<style lang="scss" scoped>
@import '../assets/css/my.scss';
</style>
  
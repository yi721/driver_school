<template>
    <div class="singer-album">
        <div class="album-slide">
            <div class="singer-img">
                <img :src="attachImageUrl(ziliaoList.pic)" alt="">
            </div>
            <ul class="info">
                <li>资料名称：{{ }}</li>
                <li>{{ }}</li>
                <li>{{ }}</li>
            </ul>
        </div>
        <div class="album-content">
            <div class="intro">
                <h2>hhh{{ }}</h2>
                <span>hhh{{ }}</span>
            </div>
            <div class="content">
            </div>
        </div>
    </div>
</template>
  
<script>
import { mixin } from '../mixins'
export default {
    mixins: [mixin],
    data() {
        return {
            ziliaoList: [{
                id: '1',
                name: '科一试题',
                pic: '',
                title: '',
            }
            ]
        }
    },
    methods: {
    }
}
</script>
  
<style lang="scss" scoped>
@import '../assets/css/singer-album.scss';
</style>
  
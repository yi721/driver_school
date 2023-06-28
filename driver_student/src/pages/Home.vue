<template>
    <div class="home">
        <!--轮播图-->
        <swiper></swiper>

    </div>
</template>

<script>
import Swiper from '../components/Swiper.vue'
export default {
    components: {
        Swiper,
    },
    data() {
        return {

        }

    }
}
</script>
<style lang="scss" scoped>
@import '../assets/css/home.scss';
</style>

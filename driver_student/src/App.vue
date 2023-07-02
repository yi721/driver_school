<template>
    <div id="app">
        <!-- 测试 -->
        <!-- 路由出口 -->
        <!-- 路由匹配到的组件将渲染在这里11 -->
        <the-header></the-header>
        <router-view class="driver-content"></router-view>
        <scrool-top></scrool-top>
        <the-footer></the-footer>
    </div>
</template>
  
<script>
import ScroolTop from './components/ScroolTop.vue'
import TheFooter from './components/TheFooter.vue'
import TheHeader from './components/TheHeader.vue'
export default {
    name: 'App',
    components: {
        TheHeader,
        ScroolTop,
        TheFooter
    }
}
</script>
<style  lang="scss" scoped>
@import './assets/css/app.scss';
</style>
<template>
    <div class="search">
        <nav class="searchList-nav" ref="change">
            <span :class="{ isActive: toggle === 'study' }" @click="handleChangeView('study')">在线学习</span>
            <span :class="{ isActive: toggle === 'excerise' }" @click="handleChangeView('excerise')">在线做题</span>
        </nav>
        <component :is="currentView"></component>
    </div>
</template>
  
<script>
import Searchstudy from '../components/Search/Searchstudy.vue';
import Searchexcerise from '../components/Search/Searchexcerise.vue'
export default {
    components: {
        Searchstudy,
        Searchexcerise
    },
    data() {
        return {
            toggle: 'study',
            currentView: 'Searchstudy'
        }
    },
    methods: {
        //切换组件
        handleChangeView(component) {
            this.currentView = 'Search' + component;
            this.toggle = component;
        }
    }
}
</script>
  
<style lang="scss" scoped>
@import '../assets/css/search.scss';
</style>
  
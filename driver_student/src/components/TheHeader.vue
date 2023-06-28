<template>
    <div class="the-header">
        <!--图标-->
        <div class="header-logo" @click="goHome">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-car"></use>6t
            </svg>
            <span>驾校报名系统</span>
        </div>
        <ul class="navbar" ref="change">
            <li :class="{ active: item.name === activeName }" v-for="item in navMsg" :key="item.path"
                @click="goPage(item.path, item.name)">
                {{ item.name }}
            </li>

            <li>
                <div class="header-search">
                    <input type="text" placeholder="搜索" @keyup.enter="goSearch()" v-model="keywords">
                    <div class="search-btn" @click="goSearch()">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-sousuo"></use>
                        </svg>
                    </div>
                </div>
            </li>
            <!-- v-show="!loginIn" -->
            <li :class="{ active: item.name === activeName }" v-for="item in loginMsg" :key="item.path"
                @click="goPage(item.path, item.name)">
                {{ item.name }}
            </li>
        </ul>
    </div>
</template>
  
<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            //左侧导航栏
            navMsg: [
                { name: '首页', path: '/' },
                { name: '在线学习', path: '/study' },
                { name: '在线做题', path: '/excerise' },
                { name: '我的', path: '/my' },
            ],
            //右侧导航栏
            loginMsg: [
                { name: '登录', path: '/login' },
                { name: '注册', path: '/register' }
            ],
            //搜索关键字
            keywords: '',
        }
    },
    computed: {
        ...mapGetters([
            'activeName'
        ])
    },
    methods: {
        goHome() {
            this.$router.push({ path: '/' })
        },
        goPage(path, name) {
            this.$store.commit('setActiveName', name);
            this.$router.push({ path: path });
        },
        goSearch() {
            this.$router.push({ path: './search', query: { keyword: this.keywords } })
        }
    }

}
</script>
<style lang="scss" scoped>
@import '../assets/css/the-header.scss';
</style>
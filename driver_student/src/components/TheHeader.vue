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
            <li v-show="!loginIn" :class="{ active: item.name === activeName }" v-for="item in loginMsg" :key="item.path"
                @click="goPage(item.path, item.name)">
                {{ item.name }}
            </li>
        </ul>
        <!--设置-->
        <div class="header-right" v-show="loginIn">
            <div id="user">
                <img :src="attachImageUrl()" alt="">
            </div>
            <ul class="menu">
                <li v-for="(item, index) in menuList" :key="index" @click="goMenuList(item.path)">{{ item.name }}</li>
            </ul>
        </div>
    </div>
</template>
  
<script>
import { mapGetters } from 'vuex';
import { mixin } from '../mixins'
export default {
    mixins: [mixin],
    data() {
        return {
            //左侧导航栏
            navMsg: [
                { name: '首页', path: '/' },
                { name: '试题库', path: '/paper' },
                { name: '视频库', path: '/video' },
                { name: '我的', path: '/my' },
            ],
            //右侧导航栏
            loginMsg: [
                { name: '登录', path: '/login' },
                { name: '注册', path: '/register' }
            ],
            menuList: [
                { name: '设置', path: '/setting' },
                { name: '退出', path: 0 }
            ],
            //搜索关键字
            keywords: '',
        }
    },
    mounted() {
        document.querySelector('#user').addEventListener('click', function (e) {
            document.querySelector('.menu').classList.add('show')
            e.stopPropagation()// 关键在于阻止冒泡
        }, false)
        // 点击“菜单”内部时，阻止事件冒泡。(这样点击内部时，菜单不会关闭)
        document.querySelector('.menu').addEventListener('click', function (e) {
            e.stopPropagation()
        }, false)
        document.addEventListener('click', function () {
            document.querySelector('.menu').classList.remove('show')
        }, false)
    },
    computed: {
        ...mapGetters([
            'activeName',
            'loginIn',
            // 'avator'
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
        },
        goMenuList(path) {
            if (path === 0) {
                this.$store.commit('setIsActive', false)
            }
            document.querySelector('.menu').classList.remove('show')
            if (path) {
                this.$router.push({ path: path })
            } else {
                this.$store.commit('setLoginIn', false)
                this.$router.go(0)
            }
        },
        changeIndex(value) {
            this.$store.commit('setActiveName', value)
        },

    }

}
</script>
<style lang="scss" scoped>
@import '../assets/css/the-header.scss';
</style>
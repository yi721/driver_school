<template>
    <div class="header-container">
        <div class="l-content">
            <el-button style="margin-right: 20px;" @click="handleMenu()" icon="el-icon-menu" size="mini"></el-button>
            <!-- <span class="text">首页</span> -->
            <!--面包屑-->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{ item.label
                }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <svg t="1686039891918" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="4652" width="40px" height="40px">
                        <path
                            d="M129.57 648.133c-23.469-23.469-23.469-61.518 0-84.987l56.658-56.658c23.468-23.469 61.518-23.469 84.987 0 23.469 23.468 23.469 61.518 0 84.987l-56.658 56.658c-23.468 23.469-61.518 23.469-84.987 0zM894.43 648.133c-23.469 23.469-61.519 23.469-84.987 0l-56.658-56.658c-23.469-23.469-23.469-61.518 0-84.987 23.469-23.469 61.518-23.469 84.987 0l56.658 56.658c23.468 23.469 23.468 61.519 0 84.987zM512 502.854c-62.904 0-119.308-27.236-158.547-70.366a0.876 0.876 0 0 0-1.407 0.146c-15.583 27.069-24.646 58.363-24.646 91.84v177.705c0 101.537 78.223 190.476 179.727 193.091C611.305 897.954 696.6 814.304 696.6 710.733V524.474c0-33.477-9.063-64.771-24.646-91.84a0.876 0.876 0 0 0-1.407-0.146c-39.239 43.13-95.643 70.366-158.547 70.366z"
                            fill="#E0FFFF" p-id="4653"></path>
                        <path d="M512 288.321m-159.654 0a159.654 159.654 0 1 0 319.308 0 159.654 159.654 0 1 0-319.308 0Z"
                            fill="#E0FFFF" p-id="4654"></path>
                    </svg>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    data() {
        return {}
    },
    methods: {
        handleMenu() {
            this.$store.commit('collapseMenu')
        }
    },
    computed: {
        ...mapState({
            tags: state => state.tab.tabsList
        })
    },
    mounted() {
        console.log(this.tags, 'tags')
    }
}
</script>

<style lang="less" scoped>
.header-container {
    padding: 0 20px;
    background-color: #333;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .text {
        color: #fff;
        font-size: 14px;
        margin-left: 10px;
    }

    .r-content {
        .user {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }

    .l-content {
        display: flex;
        align-items: center;

        /deep/.el-breadcrumb__item {
            .el-breadcrumb__inner {
                font-weight: normal;

                &.is-link {
                    color: #666;
                }
            }

            &:last-child {
                .el-breadcrumb__inner {
                    color: #fff;
                }
            }
        }
    }
}
</style>
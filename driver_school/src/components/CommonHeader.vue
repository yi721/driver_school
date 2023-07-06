<template>
  <div class="header-container">
    <div class="r-content">
      <el-button style="margin-right: 20px" @click="handleMenu()" icon="el-icon-menu" size="mini"></el-button>
      <el-button style="margin-right: 20px" @click="exit()" size="mini">退出</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
    }
  },
  methods: {
    handleMenu() {
      this.$store.commit("collapseMenu");
    },
    exit() {
      // location.reload()
      localStorage.clear()
      window.sessionStorage.clear()
      this.$router.push('/login')

    },

  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
  mounted() {
    console.log(this.tags, "tags");
  },
};
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

import Vue from "vue";
import Vuex from "vuex";
import tab from "./tab";
//vuex数据持久化插件
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        tab
    },

  state: {
    userId:'',
    roleId:''
  },
  getters: {
    userId: state => {
        let userId = state.userId
        if (!userId) {
            userId = JSON.parse(window.localStorage.getItem('userId') || null)
        }
        return userId
    },
    roleId: state => {
      let roleId = state.roleId
      if (!roleId) {
        roleId = JSON.parse(window.localStorage.getItem('roleId') || null)
      }
      return roleId
  },
  },
  mutations: {
    setUserId: (state, userId) => {
        state.userId = userId
        window.localStorage.setItem('userId', JSON.stringify(userId))
    },
    setRoleId: (state, roleId) => {
      state.roleId = roleId
      window.localStorage.setItem('userId', JSON.stringify(roleId))
  },
  },
  actions: {},
  // 数据持久化配置
  plugins: [
    createPersistedState({
      // 存储方式：localStorage、sessionStorage、cookies
      storage: window.sessionStorage,
      // 存储的 key 的key值
      key: "store",
      render(state) {
        // 要存储的数据：本项目采用es6扩展运算符的方式存储了state中所有的数据
        return { ...state };
      },
    }),
  ],
});

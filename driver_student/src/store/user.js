
//vuex数据持久化插件
import createPersistedState from "vuex-persistedstate";
const user = ({
    state: {
        HOST: 'http://localhost:8888',
        userId: '',
        description: '',//当前科目
        avator: ''
    },
    getters: {
        userId: state => {
            let userId = state.userId
            if (!userId) {
                userId = JSON.parse(window.sessionStorage.getItem('userId') || null)
            }
            return userId
        },
        description: state => {
            let description = state.description
            if (!description) {
                description = JSON.parse(window.sessionStorage.getItem('description') || null)
            }
            return description
        },
        avator: state => {
            let avator = state.avator
            if (!userId) {
                avator = JSON.parse(window.sessionStorage.getItem('avator') || null)
            }
            return avator
        },
    },
    mutations: {
        setUserId: (state, userId) => {
            state.userId = userId
            window.localStorage.setItem('userId', JSON.stringify(userId))
        },
        setdescription: (state, description) => {
            state.description = description
            window.localStorage.setItem('description', JSON.stringify(description))
        },
        setAvator: (state, avator) => {
            state.avator = avator
            window.localStorage.setItem('avator', JSON.stringify(avator))
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
})
export default user


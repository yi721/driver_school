
const configure = ({
    state: {
        HOST: 'http://localhost:8888',//后台访问地址根目录
        activeName: '', // 菜单名
        loginIn: false,
    },
    getters: {
        activeName: state => {
            let activeName = state.activeName
            if (!activeName) {
                JSON.parse(window.sessionStorage.getItem('activeName'))
            }
            return activeName
        },
        loginIn: state => {
            let loginIn = state.loginIn
            if (!loginIn) {
                loginIn = JSON.parse(window.sessionStorage.getItem('loginIn') || null)
            }
            return loginIn
        },

    },
    mutations: {
        setActiveName: (state, activeName) => {
            state.activeName = activeName
            window.sessionStorage.setItem('activeName', JSON.stringify(activeName))
        },
        setLoginIn: (state, loginIn) => {
            state.loginIn = loginIn
            window.sessionStorage.setItem('loginIn', JSON.stringify(loginIn))
        },
    }
})

export default configure


const configure = ({
    state: {
        HOST: 'http://localhost:8888',//后台访问地址根目录
        activeName: '', // 菜单名
    },
    getters: {
        activeName: state => {
            let activeName = state.activeName
            if (!activeName) {
                JSON.parse(window.sessionStorage.getItem('activeName'))
            }
            return activeName
        }

    },
    mutations: {
        setActiveName: (state, activeName) => {
            state.activeName = activeName
            window.sessionStorage.setItem('activeName', JSON.stringify(activeName))
        }
    }
})

export default configure

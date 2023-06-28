export default {
    state: {
        isCollapse: false,//用于控制菜单的展开与收起
        tabsList: [
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home",
            }
        ]//面包屑
    },
    mutations: {
        //修改菜单展开与收起的方法
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        //更新面包屑
        SelectMenu(state, val) {
            console.log(val, 'val')
            //判断添加的数据是否为首页
            if (val.name !== 'home') {
                const index = state.tabsList.findIndex(item => item.name === val.name)
                //如果不存在
                if (index === -1) {
                    state.tabsList.push(val)
                }
            }
        }
    }
}
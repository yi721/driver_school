
import router from "@/router"
import Cookie from "js-cookie"

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
        ],//面包屑
        // UserId:[]
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
        },
        //设置menu的数据
        // setmenu(state,val){
        //     state.menu = val
        //     Cookie.set('menu',JSON.stringify(val))
        // },
        //动态注册路由
        // addmenu(state,val){
        //     //判断缓存中是否有数据
        //     if(!this.Cookie.get('menu')) return
        //     const UserId = JSON.parse(this.Cookie.get('menu'))
        //     state.UserId = UserId
        //     //组装动态路由的数据
        //     const UserIdArray = []
        //     UserId.forEach(item => {
        //         if(item){
        //             //item.children = item.children.UserId(item =>
        //             item= item.UserId(item =>{
        //                 // item.component = () => import('@/views/${item.url}')
        //                 item.component  =  resolve => require([`@/${url}.vue`], resolve)

        //                 return item
        //             })
        //             menuArray.push(...item.children)
        //         }else{
        //             // item.component =()=> import('../views/$(item.url)')
        //             item.component = resolve => require([`@/${url}.vue`], resolve)

        //             menuArray.push(item)
        //         }
                
        //     });
        //     console.log(UserIdArray,'menuArray')
        //     //动态路由的添加
        //     UserIdArray.forEach(item => {
        //         router.addRoute('Main',item)
        //     })
        // }
    }
}
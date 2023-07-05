<template>
    <div>
        <h1>角色列表</h1>
        <el-table :data="roleList" stripe style="width: 100%">
            <el-table-column prop="id" label="编号" width="180">
            </el-table-column>
            <el-table-column prop="name" label="角色名" width="180">
            </el-table-column>
            <el-table-column prop="description" label="描述" width="380">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="success" @click="handleMenuBtn(scope.row, 1)">菜单</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 获取角色列表 -->
        <!-- 查看菜单 -->
        <el-dialog @closed="reload" title="菜单管理" :visible.sync="menuFormVisible">
            <el-tree ref="tree" default-expand-all :data="menuList" show-checkbox node-key="id"
                :default-checked-keys="defaultCheckedList" :props="defaultProps">
            </el-tree>
            <el-button @click="submit" style="margin-top: 1rem;margin-left: 1rem;" size="small"
                type="primary">保存</el-button>
        </el-dialog>

    </div>
</template>

<script>
import { successMsg } from '@/utils/message'
import { mapState } from 'vuex'
export default {
    inject: ['reload'],
    async mounted() {
        let res = await this.$http.get(`/menu/get-menu`)
        this.menuList = res.data.data
        // 获取角色列表信息
        res = await this.$http.get(`/role/role-list`)
        this.roleList = res.data.data

    },
    data() {
        return {
            defaultProps: {
                label: "name"
            },
            roleList: [],
            menuList: [],
            nowMenu: [],
            menuFormVisible: false,
            selectedRoleId: '',
            selectedRoleMenuList: []
        }
    },
    methods: {
        async handleMenuBtn(row) {
            // const res = await this.$http.get(`/user/getMenuList?id=${row.id}`)
            this.selectedRoleId = row.id
            const res = await this.$http.get(`http://123.56.141.117:8081/role/get-menu?id=${this.selectedRoleId}`)
            this.selectedRoleMenuList = res.data.data
            console.log('selList', this.selectedRoleMenuList);
            this.menuFormVisible = true
        },
        async submit() {
            const newMenuList = this.$refs.tree.getCheckedNodes(false, true)
            const res = await this.$http.post(`/role/add-role-menu-relation?id=${this.selectedRoleId}`, newMenuList)
            successMsg('修改成功')
            this.reload()
            // console.log('updateMenu', res);
        }

    },
    computed: {
        ...mapState(['userInfo', 'userRole']),
        defaultCheckedList() {
            let arr = []
            this.selectedRoleMenuList.forEach(element => {
                element.children.forEach(item => {
                    arr.push(item.id)
                })
            });
            return arr
        }
    }

}
</script>

<style></style>
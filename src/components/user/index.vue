<template>
    <div>
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button type="primary" @click="$router.push('/user/add')">添加</el-button>
        <el-table :data="arr" border stripe>
            <el-table-column label="编号" prop="id"></el-table-column>
            <el-table-column label="所属角色" prop="rolename"></el-table-column>
            <el-table-column label="管理员名称" prop="username"></el-table-column>
            <el-table-column label="状态">
                <template slot-scope="item">
                    <el-tag v-if="item.row.status == 1">启用</el-tag>
                    <el-tag v-else>禁用</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作"  width="150">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="$router.push('/user/'+scope.row.uid)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="del(scope)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 
            el-pagination
                backgorund 页码按钮背景颜色
                total 总条目数据
                layout 分页展示形式
                current-change 分页页码当前点击事件
         -->
        <el-pagination 
            background
            :total="total" :page-size="2" 
            layout="prev, pager, next"
            @current-change="pageChange"
        ></el-pagination>
    </div>
</template>

<script>
export default {
    data(){
        return{
            arr:[], total:0, page:1
        }
    },
    mounted(){
        //获取管理员总数
        this.axios({
            url:'/api/usercount'
        }).then(res=>{
            if(res.data.code === 200){
                this.total = res.data.list[0].total
            }
        })
        this.getPageList();
    },
    methods:{
        //获取分页数据
        getPageList(){
            this.axios({
                url:'/api/userlist',
                params:{size:2,page:this.page},
            }).then(res=>{
                this.arr = res.data.list;
            })
        },
        //分页页码点击
        pageChange(n){
            this.page = n;
            this.getPageList();
        },
        //删除管理员方法
        del(obj){
            this.$confirm('此操作将永久删除该管理员, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.axios.post('/api/userdelete',{uid:obj.row.uid,size:2,page:this.page}).then(res=>{
                    if(res.data.code === 200){
                        // this.arr = res.data.list
                        this.arr.splice(obj.$index,1)
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        }); 
                    }else{
                        this.$message({
                            type: 'info',
                            message: res.data.msg
                        });  
                    }
                })
            }).catch(()=>{})
        }
    }
}
</script>

<style>

</style>
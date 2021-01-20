<template>
    <div>
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品规格管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button type="primary" @click="$router.push('/specs/add')">添加</el-button>
        <el-table :data="arr" border stripe>
            <el-table-column label="编号" prop="id"></el-table-column>
            <el-table-column label="规格名称" prop="specsname"></el-table-column>
            <el-table-column label="规格属性">
                <template slot-scope="item">
                    <el-tag v-for="(attritem,index) of item.row.attrs" :key="index">{{ attritem }}&nbsp;</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="状态">
                <template slot-scope="item">
                    <el-tag v-if="item.row.status == 1">启用</el-tag>
                    <el-tag v-else>禁用</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作"  width="150">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="$router.push('/specs/'+scope.row.id)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="del(scope)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data(){
        return{
            arr:[]
        }
    },
    mounted(){
        this.axios.get('/api/specslist').then(res=>{
            this.arr = res.data.list;
        })
    },
    methods:{
        //删除商品规格方法
        del(obj){
            this.$confirm('此操作将永久删除该商品规格, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.axios.post('/api/specsdelete',{id:obj.row.id}).then(res=>{
                    if(res.data.code === 200){
                        this.arr = res.data.list
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
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
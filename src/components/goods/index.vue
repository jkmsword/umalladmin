<template>
    <div>
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button type="primary" @click="$router.push('/goods/add')">添加</el-button>
        <el-table :data="goodsarr" border stripe>
            <el-table-column label="编号" prop="id"></el-table-column>
            <el-table-column label="一级分类" prop="firstcatename" width="150"></el-table-column>
            <el-table-column label="二级分类" prop="secondcatename" width="150"></el-table-column>
            <el-table-column label="商品名称" prop="goodsname" width="300"></el-table-column>
            <el-table-column label="价格" prop="price" width="200"></el-table-column>
            <el-table-column label="市场价格" prop="market_price" width="200"></el-table-column>
            <el-table-column label="是否新品">
                <template slot-scope="item">
                    <el-tag effect="dark" v-if="item.row.isnew==1" type="success">是</el-tag>
                    <el-tag effect="dark" v-else type="danger">否</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="是否热卖">
                <template slot-scope="item">
                    <el-tag effect="dark" v-if="item.row.ishot==1" type="success">是</el-tag>
                    <el-tag effect="dark" v-else type="danger">否</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="状态">
                <template slot-scope="item">
                    <el-tag effect="dark" v-if="item.row.status==1" type="success">上架</el-tag>
                    <el-tag effect="dark" v-else type="danger">下架</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="200" fixed="right">
                <template slot-scope="item">
                    <el-button type="primary" @click="$router.push('/goods/'+item.row.id)">编辑</el-button>
                    <el-button type="danger" @click="del(item.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination 
            layout="prev,pager,next" background
            :total="total" :page-size="size" 
            @current-change="pageChange"
        ></el-pagination>
        
    </div>
</template>

<script>
export default {
    data(){
        return{
            goodsarr:[],
            size:4,
            page:1,
            total:0
        }
    },
    mounted(){
        this.axios.get('/api/goodscount').then(res=>{
            if(res.data.code === 200){
                this.total = res.data.list[0].total
            }
        });
        this.getPage();
    },
    methods:{
        pageChange(n){
            this.page = n;
            this.getPage();
        },
        getPage(){
            this.axios.get('/api/goodslist',{ params:{size:this.size,page:this.page} }).then(res=>{
                if(res.data.code === 200){
                    this.goodsarr = res.data.list
                }
            })
        }
    }
}
</script>

<style>

</style>
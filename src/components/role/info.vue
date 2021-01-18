<template>
    <div>
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path:'/role' }">角色管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色{{ tip }}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :model="info" :rules="rules" ref="form" style="width:400px;" label-width="80px">
            <el-form-item label="角色名称" prop="rolename">
                <el-input placeholder="请输入角色名称" v-model="info.rolename"></el-input>
            </el-form-item>
            <el-form-item label="角色权限">
                <!-- 
                    el-tree属性 
                        data 要展示的树形结构的数据
                        props 树形结构数据的默认属性
                        show-checkbox 显示复选框
                        node-key 选中节点的value值的字段名
                        default-expanded-keys 默认展示的节点-数组
                -->
                <el-tree 
                    :data="menusarr" 
                    :props="defaultProps"
                    show-checkbox
                    node-key="id"
                    ref="mytree"
                    :default-expanded-keys="checkedKeys"
                    check-strictly
                ></el-tree>
            </el-form-item>
            <el-form-item label="状态">
                <el-switch v-model="info.status" :active-value="1" :inactive-value="2"></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data(){
        // 定义角色的初始数据
        return{
            tip:'添加',
            info:{
                rolename:'',
                menus:'',
                status:1
            },
            rules:{
                rolename:[
                    { required:true,message:'请填写角色名称' },
                    { min:3,max:20,message:'角色名称应该在3-20个字符之间' }
                ]
            },
            menusarr:[],
            checkedKeys:[],
            defaultProps: {
                children: 'children',
                label: 'title'
            }
        }
    },
    mounted(){
        if(this.$route.params.id){
            this.tip = '编辑'
            this.axios.get('/api/roleinfo',{ params:{id:this.$route.params.id} }).then(result=>{
                this.info = result.data.list
                this.checkedKeys = this.info.menus.split(',').map(d=>parseInt(d));
                //setCheckedKeys 设置选中的节点
                this.$refs.mytree.setCheckedKeys(this.checkedKeys)
            })
        }
        this.axios.get('/api/menulist?istree=true').then(result=>{
            this.menusarr = result.data.list;
        })
    },
    methods:{
        submit(){
            this.$refs['form'].validate((val)=>{
                if(val){
                    var url = '/api/roleadd'
                    if(this.$route.params.id){
                        url = '/api/roleedit'
                        this.info.id = this.$route.params.id
                    }
                    //把选中的节点数组转换成字符串，并赋值给对象
                    // getCheckedKeys 获取选中节点的id属性
                    this.info.menus = this.$refs.mytree.getCheckedKeys().join(',');
                    this.axios.post(url,this.info).then(res=>{
                        if(res.data.code === 200){
                            this.$router.push('/role')
                        }
                    })
                }
            })
        }
    }
}
</script>

<style>

</style>
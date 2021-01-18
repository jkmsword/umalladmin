<template>
    <div>
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path:'/user' }">管理员管理</el-breadcrumb-item>
            <el-breadcrumb-item>管理员{{ tip }}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :model="info" :rules="rules" ref="form" style="width:400px;" label-width="80px">
            <el-form-item label="所属角色" prop="roleid">
                <el-select v-model="info.roleid">
                    <!-- 调用角色列表接口，把已添加的角色信息展示在下拉菜单的选项中 -->
                    <el-option v-for="roleitem of rolearr" :key="roleitem.id" 
                        :label="roleitem.rolename" :value="roleitem.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
                <el-input placeholder="请输入用户名" v-model="info.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" placeholder="请输入密码" v-model="info.password"></el-input>
                <span v-if="$route.params.id">密码留空则不修改</span>
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
        // 定义管理员的初始数据
        return{
            tip:'添加',
            info:{
                roleid:'',//角色编号
                username:'',//用户名
                password:'',//密码
                status:1//状态
            },
            rules:{
                roleid:[
                    { required:true,message:'请选择角色' }
                ],
                username:[
                    { required:true,message:'请填写用户名' },
                    { min:2,max:20,message:'用户名应该在2-20个字符之间' }
                ]
            },
            rolearr:[]
        }
    },
    mounted(){
        //获取到已添加的所有角色信息
        this.axios({
            url:'/api/rolelist',
            method:'get'//请求方式，默认是get
        }).then(result=>{
            this.rolearr = result.data.list
        })
        if(this.$route.params.id){
            this.tip = '编辑'
            this.axios({
                url:'/api/userinfo',
                params:{uid:this.$route.params.id}
            }).then(result=>{
                this.info = result.data.list;
                //为了实现密码留空则不修改的效果，此处把密码置为空
                this.info.password = ''
            })
        }
    },
    methods:{
        submit(){
            this.$refs['form'].validate((val)=>{
                if(val){
                    var url = '/api/useradd'
                    if(this.$route.params.id){
                        url = '/api/useredit'
                        this.info.id = this.$route.params.id
                    }
                    this.axios({
                        url,
                        method:'post',
                        data:this.info
                    }).then(res=>{
                        if(res.data.code === 200){
                            this.$router.push('/user')
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
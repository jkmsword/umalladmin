<template>
    <div class="page">
        <el-form class="form" :model="info" :rules="rules" ref="login">
            <h2>登录页面</h2>
            <el-form-item prop="username">
                <el-input placeholder="请输入用户名" v-model="info.username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" placeholder="请输入密码" v-model="info.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="dologin">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            info:{ username:'', password:'' },
            rules:{
                username:[
                    { required:true,message:'请输入用户名' },
                    { min:2,max:15,message:'用户名长度在2-15之间' }
                ],
                password:[
                    { required:true,message:'请输入密码' },
                    { min:2,max:15,message:'密码长度在2-15之间' }
                ]
            }
        }
    },
    methods:{
        dologin(){
            this.$refs.login.validate(value=>{
                if(value){
                    //执行登录操作
                    this.axios({
                        url:'/api/userlogin',
                        method:'post',
                        data:this.info
                    }).then(res=>{
                        if(res.data.code===200){
                            //调用仓库中的mutation来修改数据
                            this.$store.commit('setUserInfo',res.data.list)
                            this.$router.replace('/')//跳转到首页
                        }
                    })
                }
            })
        }
    }

}
</script>
<style scoped>
.page{
    width:100vw;height: 100vh;
    background-color:rgba(0,0,0,0.5);
    position:fixed;
}
.form{
    width:500px;height: 300px;
    background-color: #fff;margin:150px auto;
    text-align: center;border-radius: 16px;
}
.el-form-item{ margin-left:50px;margin-right:50px;}
.el-button{ width:100%;}
h2{ padding:20px 0;}
</style>
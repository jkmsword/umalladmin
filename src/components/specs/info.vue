<template>
    <div>
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path:'/specs' }">商品规格管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品规格{{ tip }}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form label-width="80px" style="width:400px;" ref="form" :model="info" :rules="rules">
            <el-form-item label="规格名称" prop="specsname">
                <el-input placeholder="请输入规格名称" v-model="info.specsname"></el-input>
            </el-form-item>
            <el-form-item label="规格属性" v-for="(item,index) of attrArr" :key="index">
                <div class="attritem">
                    <el-input placeholder="请输入规格属性" v-model="item.value"></el-input>
                    <el-button v-if="index==0" type="primary" @click="addattr">增加属性</el-button>
                    <el-button v-else type="danger" @click="delattr(index)">删除</el-button>
                </div>
                
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
        return{
            tip:'添加',
            info:{
                specsname:'',
                attrs:'',
                status:1
            },
            rules:{
                specsname:[
                    { required:true,message:'请填写规格名称' }
                ]
            },
            attrArr:[{value:''}]
        }
    },
    mounted(){
        if(this.$route.params.id){
            this.tip = '编辑'
            this.axios({
                url:'/api/specsinfo',
                params:{id:this.$route.params.id}
            }).then(res=>{
                this.info = res.data.list[0]
                this.attrArr = [];
                this.info.attrs.map(d=>{
                    this.attrArr.push({ value : d});
                })
            })
        }
    },
    methods:{
        addattr(){//添加规格属性
            this.attrArr.push({value:''})
        },
        delattr(n){//删除规格属性
            this.attrArr.splice(n,1)
        },
        submit(){
            var url = '/api/specsadd'
            if(this.$route.params.id){
                url = '/api/specsedit'
                this.info.id = this.$route.params.id
            }
            //把规格属性的数组转换成字符串
            var temparr = []
            this.attrArr.map(item=>{
                temparr.push(item.value)
            })
            this.info.attrs = temparr.join(',');
            this.$refs.form.validate(val=>{
                if(val){
                    this.axios.post(url,this.info).then(res=>{
                    if(res.data.code===200){
                            this.$router.push('/specs')
                        }
                    })
                }
            })
            
        }
    }
}
</script>

<style scoped>
.attritem{
    display: flex;
}
</style>
<template>
    <div>
        <h1>商品规格管理</h1>
        <el-button @click="$router.push('/specs/add')">添加</el-button>
    </div>
</template>

<script>
export default {
    mounted(){
        this.axios.get('/api/specslist').then(res=>{
            console.log(res)
        })
    }
}
</script>

<style>

</style>
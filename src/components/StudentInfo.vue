<template>
    <div>
        <h1>学生信息页面</h1>
        <el-form style="width:400px;" label-width="80px">
            <el-form-item label="姓名">
                <el-input placeholder="请输入姓名" v-model="info.name"></el-input>
            </el-form-item>
            <el-form-item label="所学科目">
                <!-- 如果需要让下拉菜单选中某个值，添加v-model双向绑定即可。 -->
                <!-- multiple下拉菜单多选，多选时，绑定的数据类型为数组 -->
                <el-select v-model="info.xueke" multiple>
                    <!-- 
                        el-option 
                            label要展示选项名称 
                            value选项选中后的值
                        -->
                    <el-option label="web前端" value="web前端"></el-option>
                    <el-option label="java" value="java"></el-option>
                    <el-option label="ui" value="ui"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            info:{
                name:'',
                // xueke:'web前端'
                xueke:['web前端','ui']
            }
        }
    }
}
</script>

<style>

</style>
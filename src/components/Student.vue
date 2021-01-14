<template>
	<div>
		<h1>学生管理页面</h1>
        <el-button type="primary" @click="$router.push('/student/add')">添加</el-button>
		<el-table :data="tableData" stripe border>
			<el-table-column label="姓名" prop="name"></el-table-column>
			<el-table-column label="日期" prop="date"></el-table-column>
			<el-table-column label="地址" prop="address"></el-table-column>
			<el-table-column label="操作">
                <!-- 自定义列模板 -->
				<template slot-scope="item">
					<el-button size="mini" type="primary" @click="handleEdit(item)">编辑</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(item.$index)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
export default {
    methods:{
        handleEdit(data){
            console.log(data)
        },
        // 根据下标删除数据
        handleDelete(n){
            this.tableData.splice(n,1)
        },
    },
	data() {
		return {
			tableData: [{
				date: '2016-05-02',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄'
			}, {
				date: '2016-05-04',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1517 弄'
			}, {
				date: '2016-05-01',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1519 弄'
			}, {
				date: '2016-05-03',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1516 弄'
			}]
		}
	}
}
</script>

<style>
</style>
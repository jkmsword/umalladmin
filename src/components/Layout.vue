<template>
	<el-container class="page">
		<el-header>
            <span class="fl">
                小U商城后台管理系统
                <el-button type="primary" size="mini" @click="iscollapse=!iscollapse">
                    <i :class="{'el-icon-s-fold':!iscollapse,'el-icon-s-unfold':iscollapse}"></i>
                </el-button>
            </span>
            <span class="fr">
                欢迎：{{ $store.state.userinfo ? $store.state.userinfo.username:'' }}
                <a href="javascript:void(0);" @click="logout">退出</a>
            </span>
        </el-header>
		<el-container>
			<el-aside :style="styleA">
                <!-- 
                    el-menu属性
                        default-active 激活的菜单
                        text-color 菜单文字颜色
                        active-text-color 激活菜单的颜色
                        router 启用路由模式
                 -->
				<el-menu
					:default-active="defaultActive"
					class="el-menu-vertical-demo"
					background-color="#545c64"
					text-color="#fff"
					active-text-color="#ffd04b"
                    router
                    unique-opened
                    :collapse="iscollapse"
				>
                    <el-menu-item index="/">
                        <i class="el-icon-s-home"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                    <!-- 调用仓库中的用户信息，用来实现不同的角色展示不同的菜单 -->
					<el-submenu v-for="item of menus" :key="item.id" :index="item.title">
						<template slot="title">
							<i :class="item.icon"></i>
							<span>{{ item.title }}</span>
						</template>
						<el-menu-item v-for="subitem of item.children" :key="subitem.id" :index="subitem.url">{{ subitem.title }}</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-aside>
			<el-main>
                <router-view></router-view>
            </el-main>
		</el-container>
	</el-container>
</template>

<script>
export default {
    data(){
        return{
            menus:[],
            defaultActive:'',
            iscollapse:false,
            styleA:{width:150}
        }
    },
    mounted(){
        //页面刷新时，读取路由元信息，控制左侧哪个菜单选中
        this.defaultActive = this.$route.meta.selected;
        this.menus = this.$store.state.userinfo.menus;
    },
    watch:{
        //当路由地址变化时，读取路由元信息，控制左侧哪个菜单选中
        $route(newVal){
            this.defaultActive = newVal.meta.selected;
        }
    },
    methods:{
        logout(){
            this.$store.commit('setUserInfo',null)
            this.$router.replace('/login')
        }
    }
}
</script>

<style scoped>
.page {
	width: 100vw;
	height: 100vh;
}
.el-header {
	background-color: skyblue;
}
.el-submenu .el-menu-item{
    min-width: 150px;
}
.el-menu{
    height:100%;
}
.el-menu:not(.el-menu--collapse){
    width:149px;
}
.el-header{
    line-height: 60px;
}
.fr{
    position: absolute;
    right:10px;
}
</style>
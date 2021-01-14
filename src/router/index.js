import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        { 
            path:'/',
            component:()=>import('../components/Layout'),
            children:[
                { path:'student',component:()=>import('../components/Student') },
                { path:'student/add',component:()=>import('../components/StudentInfo') },
                { path:'course',component:()=>import('../components/Course') },
            ]
        }
    ]
})

import { createRouter,createWebHashHistory } from "vue-router";
import GuestLayout from "../components/GuestLayout.vue";
import AuthLayout from "../components/AuthLayout.vue";
import store  from "../store";

const routes = [
    {
        path:'/',
        name:'Guest',
        component:GuestLayout,
        redirect:'/welcome',
        meta:{isQuest:true},
        children:[
            {
                path:'/sign-in',name:'SignIn',component: () => import('@/views/guest/SignIn.vue')
            },
            {
                path:'/sign-up',name:'SignUp',component: () => import('@/views/guest/SignUp.vue')
            },
            {
                path:'/welcome',name:'Welcome',component: () => import('@/views/guest/WelcomeView.vue')
            },
         ]
    },
    {
        path:'/auth',
        name:'Auth',
        component:AuthLayout,
        redirect:'/dashboard',
        meta:{requiresAuth:true},
        children:[
            {
                path:'/dashboard',name:'DashboardView',component: () => import('@/views/DashboardView.vue')
            },
            // HR 
            {
                path:'/staff',name:'StaffView',component: () => import('@/views/users/StaffView.vue')
            },
             
            {
                path:'/staff-list',name:'StaffList',component: () => import('@/views/users/StaffList.vue')
            },
            // hr end here
            {
                path:'/department',name:'DepartmentView',component: () => import('@/views/department/DepartmentView.vue')
            },
            {
                path:'/task',name:'TaskView',component: () => import('@/views/task/TaskView.vue')
            },
            {
                path: '/task-detail',
                component: () => import('@/views/task/TaskDetail.vue')
            },
            {
                path:'/appraisal-title',name:'AppraisalTitle',component: () => import('@/views/appraisal/AppraisalTitle.vue')
            },
            {
                path:'/appraisal-section',name:'AppraisalSection',component: () => import('@/views/appraisal/AppraisalSection.vue')
            },
            {
                path:'/appraisal-section-kpi',name:'AppraisalSectionKpi',component: () => import('@/views/appraisal/AppraisalSectionKpi.vue')
            },
            {
                path:'/appraisal',name:'AppraisalView',component: () => import('@/views/appraisal/AppraisalView.vue')
            },
            // appraisal end here 
            {
                path:'/leave',name:'LeaveView',component: () => import('@/views/leave/LeaveView.vue')
            },
            {
                path:'/leave-request',name:'LeaveRequest',component: () => import('@/views/leave/LeaveRequest.vue')
            },
            {
                path:'/request',name:'RequestView',component: () => import('@/views/request/RequestView.vue')
            },
            {
                path:'/memo',name:'MemoView',component: () => import('@/views/memo/MemoView.vue')
            },
            {
                path:'/attendance',name:'AttendanceView',component: () => import('@/views/attendance/AttendanceView.vue')
            },
            {
                path:'/payroll',name:'PayrollView',component: () => import('@/views/payroll/PayrollView.vue')
            },
            
           
            // Receptionisht 

            {
                path:'/schedule',name:'ScheduleView',component: () => import('@/views/schedule/ScheduleView.vue')
            },
            {
                path:'/log',name:'VisitorLog',component: () => import('@/views/schedule/VisitorLog.vue')
            },
            {
                path:'/visitor-out-time',name:'VisitorOutTime',component: () => import('@/views/schedule/VisitorOutTime.vue')
            },
            {
                path:'/anouncement',name:'AnouncementView',component: () => import('@/views/schedule/AnouncementView.vue')
            },
            // engineering 
            {
                path:'/workers',name:'WorkersView',component: () => import('@/views/workers/WorkersView.vue')
            },
            {
                path:'/tools',name:'ToolsView',component: () => import('@/views/tools/ToolsView.vue')
            },
            {
                path:'/assemble',name:'AssembleView',component: () => import('@/views/assemble/AssembleView.vue')
            },
            
            // Inventory 
            {
                path:'/cr-in',name:'CrInView',component: () => import('@/views/inventory/CrInView.vue')
            },
            {
                path:'/cr-out',name:'CrOutView',component: () => import('@/views/inventory/CrOutView.vue')
            },
            

            
         ]
    },
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

router.beforeEach((to,from,next)=>{ 
    
    if (to.meta.requiresAuth && !store.state.user.token){
        next({name:'SignIn'})
    } 
    else if (store.state.user.token && to.meta.isGuest){
        next({ name: 'DashboardView' })
    }
    else{
        next()
    }
})
export default router;
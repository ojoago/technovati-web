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
            {
                path:'/staff-detail',name:'StaffDetails',component: () => import('@/views/users/StaffDetails.vue')
            },
            // hr end here
            {
                path:'/department',name:'DepartmentView',component: () => import('@/views/department/DepartmentView.vue')
            },
            {
                path:'/task',name:'TaskView',component: () => import('@/views/task/TaskView.vue')
            },
            {
                path: '/task-detail', component: () => import('@/views/task/TaskDetail.vue')
            },
            {
                path:'/appraisal-title',name:'AppraisalTitle',component: () => import('@/views/appraisal/AppraisalTitle.vue')
            },
            {
                path:'/appraisal-type',name:'AppraisalTypeView',component: () => import('@/views/appraisal/AppraisalTypeView.vue')
            },
            {
                path:'/appraisal-kpi',name:'AppraisalKpi',component: () => import('@/views/appraisal/AppraisalKpi.vue')
            },
            {
                path:'/initiate-appraisal',name:'InitiateAppraisal',component: () => import('@/views/appraisal/InitiateAppraisal.vue')
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
                path:'/shift-config',name:'ShiftConfig',component: () => import('@/views/attendance/ShiftConfig.vue')
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
                path:'/announcement',name:'AnouncementView',component: () => import('@/views/schedule/AnouncementView.vue')
            },
            // engineering 
            {
                path:'/workers',name:'WorkersView',component: () => import('@/views/workers/WorkersView.vue')
            },
            {
                path:'/team',name:'TeamView',component: () => import('@/views/workers/TeamView.vue')
            },
            {
                path:'/tools',name:'ToolsView',component: () => import('@/views/tools/ToolsView.vue')
            },
            {
                path:'/work-sheet',name:'WorkSheetView',component: () => import('@/views/work-sheet/WorkSheetView.vue')
            },
            
            // logistics 
            {
                path:'/driver',name:'DriverView',component: () => import('@/views/logistics/DriverView.vue')
            },
            {
                path:'/vehicle',name:'VehicleView',component: () => import('@/views/logistics/VehicleView.vue')
            },
            {
                path:'/vehicle-detail',name:'VehicleDetailView',component: () => import('@/views/logistics/VehicleDetailView.vue')
            },
           
            
            // Inventory 
            {
                path:'/cr-in',name:'CrInView',component: () => import('@/views/inventory/CrInView.vue')
            },
            {
                path:'/items',name:'ItemView',component: () => import('@/views/inventory/ItemView.vue')
            },
            {
                path:'/cr-out',name:'CrOutView',component: () => import('@/views/inventory/CrOutView.vue')
            },
            // item request 
            {
                path:'/item-request',name:'ItemRequestView',component: () => import('@/views/inventory/ItemRequestView.vue')
            },
            {
                path:'/items',name:'ItemView',component: () => import('@/views/inventory/ItemView.vue')
            },
            {
                path:'/cr-out',name:'CrOutView',component: () => import('@/views/inventory/CrOutView.vue')
            },
            {
                path:'/cr-out-request',name:'CrOutRequestView',component: () => import('@/views/inventory/CrOutRequestView.vue')
            },
            {
                path:'/way-bill-receipt',name:'WayBillReceiptView',component: () => import('@/views/inventory/WayBillReceiptView.vue')
            },

            // raw materials 
            {
                path:'/raw-material',name:'RawMaterialView',component: () => import('@/views/materials/RawMaterialView.vue')
            },
            {
                path:'/raw-material-list',name:'RawMaterialListView',component: () => import('@/views/materials/RawMaterialListView.vue')
            },
            {
                path:'/consignments',name:'ConsignmentView',component: () => import('@/views/materials/ConsignmentView.vue')
            },

            // material request  

            {
                path:'/material-request',name:'MaterialRequestView',component: () => import('@/views/materials/MaterialRequestView.vue')
            },
            {
                path:'/my-request',name:'MyRequestView',component: () => import('@/views/materials/MyRequestView.vue')
            },
            {
                path:'/raw-material-request-details',name:'RawMaterialRequestDetails',component: () => import('@/views/materials/RawMaterialRequestDetails.vue')
            },
            {
                path:'/process-raw-material-request',name:'ProcessMaterialRequestView',component: () => import('@/views/materials/ProcessMaterialRequestView.vue')
            },


            // suppliers 
            {
                path:'/suppliers',name:'SupplierView',component: () => import('@/views/customer/SupplierView.vue')
            },
            {
                path:'/supplier-detail',name:'SupplierDetail',component: () => import('@/views/customer/SupplierDetail.vue')
            },
            {
                path:'/customers',name:'CustomerView',component: () => import('@/views/customer/CustomerView.vue')
            },
            {
                path:'/customer-detail',name:'CustomerDetail',component: () => import('@/views/customer/CustomerDetail.vue')
            },
            // payroll 
            // {
            //     path:'/salary-steps',name:'SalaryStepView',component: () => import('@/views/payroll/SalaryStepView.vue')
            // },
            {
                path:'/salary-grade',name:'SalaryGradeView',component: () => import('@/views/payroll/SalaryGradeView.vue')
            },
            {
                path:'/salary-structure',name:'SalaryStructureView',component: () => import('@/views/payroll/SalaryStructureView.vue')
            },

            // allowance 
            {
                path:'/allowance-name',name:'AllowanceNameView',component: () => import('@/views/payroll/allowance/AllowanceNameView.vue')
            },
            {
                path:'/unit-allowance',name:'UnitAllowanceView',component: () => import('@/views/payroll/allowance/UnitAllowanceView.vue')
            },
            {
                path:'/allowance-exclusion',name:'AllowanceExclusionView',component: () => import('@/views/payroll/allowance/AllowanceExclusionView.vue')
            },
            {
                path:'/nontaxable-allowance',name:'NontaxableAllowanceView',component: () => import('@/views/payroll/allowance/NontaxableAllowanceView.vue')
            },

            // deduction 
            {
                path:'/deduction-name',name:'DeductionName',component: () => import('@/views/payroll/deduction/DeductionName.vue')
            },
            {
                path:'/deduction-account',name:'DeductionAccount',component: () => import('@/views/payroll/deduction/DeductionAccountView.vue')
            },
            {
                path:'/unit-deduction',name:'UnitDeduction',component: () => import('@/views/payroll/deduction/UnitDeductionView.vue')
            },
            {
                path:'/over-payment',name:'OverPayment',component: () => import('@/views/payroll/deduction/OverPaymentView.vue')
            },
            {
                path:'/deduction-exclusion',name:'DeductionExclusion',component: () => import('@/views/payroll/deduction/DeductionExclusionView.vue')
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
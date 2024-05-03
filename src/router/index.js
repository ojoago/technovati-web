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
                path:'/welcome',name:'Welcome',component: () => import('@/views/guest/SignIn.vue')
            },
            // Catch-all route for unknown paths
            { path: '/:pathMatch(.*)*',name:'404', component: () => import('@/views/errors/_404.vue') },
         ]
    },
    {
        path:'/auth',
        name:'Auth',
        component:AuthLayout,
        redirect:'/dashboard',
        meta:{requiresAuth:true},
        children:[
             // Catch-all route for unknown paths
            { path: '/:pathMatch(.*)*',name:'ForohFor', component: () => import('@/views/errors/_404.vue') },
            {
                path:'/dashboard',name:'DashboardView',component: () => import('@/views/DashboardView.vue')
            },

            {  path:'/self-service',name:'SelfDashboard',component: () => import('@/views/dashboard/SelfDashboard.vue')  },
            {  path:'/self-service',name:'HodDashboard',component: () => import('@/views/dashboard/SelfDashboard.vue')  },
            {  path:'/self-service',name:'SupervisorDashboard',component: () => import('@/views/dashboard/SelfDashboard.vue')  },
            {  path:'/self-service',name:'CooDashboard',component: () => import('@/views/dashboard/SelfDashboard.vue')  },
            {  path:'/self-service',name:'GmDashboard',component: () => import('@/views/dashboard/SelfDashboard.vue')  },
            {  path:'/self-service',name:'AdminDashboard',component: () => import('@/views/dashboard/SelfDashboard.vue')  },
            // self services 
            
            // HR 
            {
                path:'/hr-dashboard',name:'HrDashboard',component: () => import('@/views/dashboard/HrDashboard.vue')
            },
            // md 
            {
                path:'/md-dashboard',name:'MdDashboard',component: () => import('@/views/dashboard/MdDashboard.vue')
            },
            // md 
            {   path:'/receptionist-dashboard',name:'ReceptionistDashboard',component: () => import('@/views/dashboard/ReceptionistDashboard.vue') },
            
            {   path:'/store-dashboard',name:'StoreDashboard',component: () => import('@/views/dashboard/StoreDashboard.vue') },

            {   path:'/logistic-dashboard',name:'LogisticsDashboard',component: () => import('@/views/dashboard/LogisticsDashboard.vue') },

            {   path:'/secretary-dashboard',name:'SecretaryDashboard',component: () => import('@/views/dashboard/SecretaryDashboard.vue') },

            {   path:'/accountant-dashboard',name:'AccountantDashboard',component: () => import('@/views/dashboard/AccountantDashboard.vue') },

            {   path:'/engineer-dashboard',name:'EngineerDashboard',component: () => import('@/views/dashboard/EngineerDashboard.vue') },

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
            
            
            {
                path:'/appraisal-list',name:'AppraisalListView',component: () => import('@/views/appraisal/AppraisalListView.vue')
            },
            {  path:'/self-appraisal',name:'SelfAppraisalView',component: () => import('@/views/appraisal/SelfAppraisalView.vue') },
            
            {
                path:'/staff-appraisal-list',name:'StaffAppraisalListView',component: () => import('@/views/appraisal/StaffAppraisalListView.vue')
            },
            
            {
                path:'/staff-appraisal-records',name:'StaffAppraisalRecords',component: () => import('@/views/appraisal/StaffAppraisalRecords.vue')
            },

            {
                path:'/self-appraisal-hr-comment',name:'SelfAppraisalHrComment',component: () => import('@/views/appraisal/SelfAppraisalHrComment.vue')
            },

            {
                path:'/supervisor-appraisal-list',name:'SupervisorAppraisalListView',component: () => import('@/views/appraisal/SupervisorAppraisalListView.vue')
            },
            {
                path:'/supervisor-appraisal',name:'SupervisorAppraisal',component: () => import('@/views/appraisal/SupervisorAppraisal.vue')
            },

            // appraisal end here 
            {
                path:'/leave',name:'LeaveView',component: () => import('@/views/leave/LeaveView.vue')
            },
            {
                path:'/leave-request',name:'LeaveRequest',component: () => import('@/views/leave/LeaveRequest.vue')
            },
            {
                path:'/my-leave-request',name:'MyLeaveRequest',component: () => import('@/views/leave/MyLeaveRequest.vue')
            },
            {
                path:'/line-manager-view-leave-request',name:'LineManagerViewLeaveRequest',component: () => import('@/views/leave/LineManagerViewLeaveRequest.vue')
            },
            {
                path:'/request',name:'RequestView',component: () => import('@/views/request/InventoryItemRequestView.vue')
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
                path:'/staff-attendance',name:'StaffAttendance',component: () => import('@/views/attendance/StaffAttendance.vue')
            },

            {
                path:'/payroll',name:'PayrollView',component: () => import('@/views/payroll/PayrollView.vue')
            },
           
            // Travel request 

            {
                path:'/travel-request',name:'TravelRequestView',component: () => import('@/views/travel/TravelRequestView.vue')
            },
            {
                path:'/staff-travel-request',name:'StaffTravelRequest',component: () => import('@/views/travel/StaffTravelRequest.vue')
            },
            {   path:'/travel-request-detail',name:'TravelRequestDetailView',component: () => import('@/views/travel/TravelRequestDetailView.vue')  },
            {   path:'/travel-request-detail-hr-view',name:'TravelRequestDetailHrView',component: () => import('@/views/travel/TravelRequestDetailHrView.vue')  },


            // Receptionisht 

            {
                path:'/view-schedule',name:'ViewSchedule',component: () => import('@/views/schedule/ViewSchedule.vue')
            },
            {
                path:'/schedule',name:'ScheduleView',component: () => import('@/views/schedule/ScheduleView.vue')
            },
            {
                path:'/view-log',name:'ViewVisitorLog',component: () => import('@/views/schedule/ViewVisitorLog.vue')
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

            {  path:'/team',name:'TeamView',component: () => import('@/views/workers/TeamView.vue') },
            {  path:'/team-detail',name:'TeamDetail',component: () => import('@/views/workers/TeamDetail.vue') },

            {
                path:'/tools',name:'ToolsView',component: () => import('@/views/tools/ToolsView.vue')
            },
            {   path:'/daily-record',name:'DailyRecordView',component: () => import('@/views/work-sheet/DailyRecordView.vue') },
            {   path:'/work-sheet',name:'WorkSheetView',component: () => import('@/views/work-sheet/WorkSheetView.vue') },
            {   path:'/staff-record',name:'StaffRecordView',component: () => import('@/views/work-sheet/StaffRecordView.vue') },
            
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
            {   path:'/stores',name:'StoreView',component: () => import('@/views/inventory/store/StoreView.vue') },
            {   path:'/items',name:'ItemView',component: () => import('@/views/inventory/ItemView.vue') },
            {   path:'/store-item',name:'ItemItem',component: () => import('@/views/inventory/store/StoreItemView.vue') },
            {   path:'/damaged-items',name:'DamagedItemView',component: () => import('@/views/inventory/store/DamagedItemView.vue') },
            {   path:'/cr-in',name:'CrInView',component: () => import('@/views/inventory/CrInView.vue') },
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
                path:'/inventory-item-request',name:'InventoryItemRequestView',component: () => import('@/views/request/InventoryItemRequestView.vue')
            },

            {
                path:'/my-raw-material-request',name:'MyRawMaterialRequestView',component: () => import('@/views/materials/MyRawMaterialRequestView.vue')
            },
            {   path:'/my-request',name:'MyRequestView',component: () => import('@/views/request/MyRequestView.vue')  },
            {   path:'/my-request-details',name:'MyRequestDetails',component: () => import('@/views/request/MyRequestDetails.vue')  },

            {
                path:'/raw-material-request-details',name:'RawMaterialRequestDetails',component: () => import('@/views/materials/RawMaterialRequestDetails.vue')
            },
            {   path:'/pending-raw-material-request',name:'PendingMaterialRequestView',component: () => import('@/views/materials/PendingMaterialRequestView.vue')      },
            {   path:'/processed-raw-material-request',name:'ProcessedMaterialRequestView',component: () => import('@/views/materials/ProcessedMaterialRequestView.vue')      },


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
            {   path:'/basic-salary',name:'BasicSalaryView',component: () => import('@/views/payroll/BasicSalaryView.vue') },
            // {   path:'/basic-salary-config',name:'BasicSalaryConfig',component: () => import('@/components/forms/BasicSalaryConfig.vue') },
            {
                path:'/compute-salaries',name:'ComputeSalaryView',component: () => import('@/views/payroll/ComputeSalaryView.vue')
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
    // console.log(store.state.user.token);
    // alert(store.state.user.token);
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
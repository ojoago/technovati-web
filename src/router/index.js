import { createRouter,createWebHashHistory } from "vue-router";
import GuestLayout from "../components/GuestLayout.vue";
import AuthLayout from "../components/AuthLayout.vue";

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
                path:'/sign-up',name:'SignUn',component: () => import('@/views/guest/SignUp.vue')
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
            
           
         ]
    },
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

router.beforeEach((to,from,next)=>{ 
    
    // if (to.meta.requiresAuth && !store.state.user.token){
    //     next({name:'LoginPage'})
    // } 
    // else if (store.state.user.token && to.meta.isGuest){
    //     next({ name: 'DashboardPage' })
    // }
    // else{
        next()
    // }
})
export default router;
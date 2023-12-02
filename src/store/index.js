import { createStore } from "vuex";
import axiosClient from '@/axios'

const store = createStore({
    state:{
        user:{
            token: localStorage.getItem('TVATI_TOKEN') == 'null' ? null :localStorage.getItem('TVATI_TOKEN'),
            data: localStorage.getItem('TVATI_USERDATA') ? JSON.parse(localStorage.getItem('TVATI_USERDATA')) : 'null'
        },
        spinnerLoader:false,
        notification: {
            status: false,
            message: 'success',
            type: 'success'
        },
        dynamicModal:{
            state:false,
            type:'Modal',
            initialBreakPoint:1
        },
        skeleton:{
            spin:false,
            animate:true,
            message:''
        },
        loadingProcess:false,
    },
    actions:{
        signIn({commit},user){
            // return fetch('http://localhost:8000/api/register',{
            //     headers:{
            //         "Content-Type":"application/json",
            //         Accept:"application/json"
            //     },
            //     method:"POST",
            //     body:JSON.stringify(user),
            // }).then((res)=>res.json()).then((res)=>{
            //     commit("setUser",res);
            //     return res;
            // });
            return axiosClient.post('/sign-in',user)
                                .then(({data})=>{
                                    if(data.status === 200){
                                        commit('setUser', data.data)
                                    }
                                    return data;  
                                })
        },
        logout({commit}){
            return axiosClient.get('sign-out').then((res=>{
                localStorage.setItem('TOKEN',null)
                commit('logout');
                return res
            })).catch(e=>{
                console.log(e.response);
                sessionStorage.setItem('TOKEN', null)
                commit('logout');
            })
        },
    },
    mutations:{
        setUser:(state,userData)=>{
            state.user.token = userData.token,
            sessionStorage.setItem('USERDATA', JSON.stringify(userData.user,null,2)),
            localStorage.setItem('TVATI_USERDATA', JSON.stringify(userData.user,null,2)),
            localStorage.setItem('TVATI_TOKEN', userData.token)
        },
        setProfile:(state,user)=>{
            state.user.data = user,
            sessionStorage.setItem('USERDATA', JSON.stringify(user,null,2))
        },

        logout: state =>{
            state.user.token = null,
            state.user.data = ''
            localStorage.setItem('TVATI_USERDATA','')
        },
         
        setModal: (state, {spin=false}) => {
            state.dynamicModal.state = spin;
        },
        setSpinner: (state,spin) =>{
            state.spinnerLoader = spin;
        },
        notify: (state, { message, type }) => {
            state.notification.status = true;
            state.notification.type = type;
            state.notification.message = message;
            setTimeout(() => {
                state.notification.status = false;
            }, 5000)
        },
         
         
    },
    getters:{},
    modules:{}
});

export default store;

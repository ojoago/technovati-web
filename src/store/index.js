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
        // auth begin
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
        // end of auth 
        // create new department 
          createDepartment({commit},data){
            return axiosClient.post('/create-department',data)
                                .then(({data})=>{
                                  if(data.status == 201){
                                    commit('notify',{message:data.message})
                                }else{
                                      commit('notify',{message:data.message,type:'danger'})
                                  }
                                    return data;  
                                })
        },
        // load departments 
        loadDepartment(){
            return axiosClient.get('load-departments')
                                .then(({data})=>{
                                    console.log(data);
                                    return data;  
                                })
        },

        // department ends here 
        // on bowarding start here 
         createUser({commit},data){
            return axiosClient.post('/create-staff',data)
                .then(({data})=>{
                    if(data.status == 201){
                    commit('notify',{message:data.message})
                }else{
                        commit('notify',{message:data.message,type:'danger'})
                    }
                    return data;  
                })
            },
         nextOfKin({commit},data){
            return axiosClient.post('/add-next-of-kin',data)
                .then(({data})=>{
                    if(data.status == 201){
                    commit('notify',{message:data.message})
                }else{
                        commit('notify',{message:data.message,type:'danger'})
                    }
                    return data;  
                })
            },
         addQualifiaction({commit},data){
            return axiosClient.post('/add-qualification',data)
                .then(({data})=>{
                    if(data.status == 201){
                    commit('notify',{message:data.message})
                }else{
                        commit('notify',{message:data.message,type:'danger'})
                    }
                    return data;  
                })
            },
         bankDetail({commit},data){
            return axiosClient.post('/add-bank-detail',data)
                .then(({data})=>{
                    if(data.status == 201){
                    commit('notify',{message:data.message})
                }else{
                        commit('notify',{message:data.message,type:'danger'})
                    }
                    return data;  
                })
            },

            // end of onboarding
            //load staff  
            loadStaff({commit}){
                return axiosClient.get('/load-staff')
                    .then(({data})=>{
                        if(data.status == 200){
                        commit('notify',{message:data.message})
                    }else{
                            commit('notify',{message:data.message,type:'danger'})
                        }
                        return data;  
                    })
            },
            //load staff  
            getMethod({commit},{url}){
                return axiosClient.get(url)
                    .then(({data})=>{
                        if(data.status == 200){
                        commit('notify',{message:data.message})
                    }else{
                            commit('notify',{message:data.message,type:'danger'})
                        }
                        return data;  
                    })
            },
            //load staff  
            postMethod({commit},{url,param}){
                return axiosClient.post(url,param)
                    .then(({data})=>{
                        if(data.status == 201){
                            commit('notify',{message:data.message})
                        }
                        else if(data.status == 422){
                            commit('notify',{message:data.message,type:'warning'})
                        }else{
                            commit('notify',{message:data.message,type:'danger'})
                        }
                        return data;  
                    })
            },
            deleteMethod({commit},{url,param}){
                return axiosClient.delete(url,param)
                    .then(({data})=>{
                        if(data.status == 201){
                            commit('notify',{message:data.message})
                        }
                        else if(data.status == 422){
                            commit('notify',{message:data.message,type:'warning'})
                        }else{
                            commit('notify',{message:data.message,type:'danger'})
                        }
                        return data;  
                    })
            },

            // load dropdown 
            loadDropdown({_},url){
            console.log(_);
            return axiosClient.get('/dropdown-'+url)
                                .then(({data})=>{
                                    if(data.status==200){
                                        return data;
                                    }else{
                                        return [];
                                    }
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
        notify: (state, { message, type='success' }) => {
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

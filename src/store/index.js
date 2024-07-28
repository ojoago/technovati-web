import { createStore } from "vuex";
import axiosClient from '@/axios'
import router from "@/router";

const store = createStore({
    state:{
        user:{
            token: localStorage.getItem('TVATI_TOKEN') == 'null' ? null :localStorage.getItem('TVATI_TOKEN'),
            data: localStorage.getItem('TVATI_USERDATA') ? JSON.parse(localStorage.getItem('TVATI_USERDATA')) : 'null' ,
            roles: localStorage.getItem('TVATI_USER_ROLES') ? JSON.parse(localStorage.getItem('TVATI_USER_ROLES')) : 'null'
        },
        activeRole: localStorage.getItem('TVATI_ACTIVE_ROLE'),
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
        units:['pieces', 'measurement' , 'carton' , 'packet'],
        memoStatus:['','General','Selected Departments','Selected Staff'],
        // memoStatus:['','General','Selected Departments','Selected Staff'],
    },
    actions:{
        // auth begin
        signIn({commit},user){
            store.commit('setSpinner', true)
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
                                    store.commit('setSpinner', false)
                                    if(data?.status === 200){
                                        commit('setUser', data.data)
                                        // console.log(data.data.roles);
                                        commit('setActiveRole',data?.data?.roles[0])
                                        commit('notify',{message:data.message})
                                    }else if(data?.status != 422){
                                        commit('notify',{message:data.message,type:'danger'})
                                    }
                                    return data;  
                                })
        },
        logout({commit}){
            store.commit('setSpinner', true)
            return axiosClient.get('sign-out').then((res=>{
                store.commit('setSpinner', false)
                localStorage.setItem('TOKEN',null)
                commit('logout');
                commit('notify',{message:res?.message})
                localStorage.clear()
                return res
            })).catch(e=>{
                store.commit('setSpinner', false)
                console.log(e?.response);
                sessionStorage.setItem('TOKEN', null)
                commit('logout');
                if(e?.response?.status == 401){
                    router.push({ name: 'SignIn' })
                }
            })
        },
        // end of auth 
        // create new department 
          createDepartment({commit},data){
            return axiosClient.post('/create-department',data)
                                .then(({data})=>{
                                  if(data?.status == 201){
                                    commit('notify',{message:data.message})
                                }else{
                                      commit('notify',{message:data.message,type:'danger'})
                                  }
                                    return data;  
                                })
        },
        // load departments 
      

        // department ends here 
        // on bowarding start here 
         createUser({commit},data){
            return axiosClient.post('/create-staff',data)
                .then(({data})=>{
                    if(data?.status == 201){
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
                    if(data?.status == 201){
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
                    if(data?.status == 201){
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
                    if(data?.status == 201){
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
                        if(data?.status == 200){
                        commit('notify',{message:data.message})
                    }else{
                            commit('notify',{message:data.message,type:'danger'})
                        }
                        return data;  
                    })
            },
            //load staff  
            getMethod({commit},{url}){
                commit('setSpinner', true)
                return axiosClient.get(url)
                    .then(({data})=>{
                    //     if(data?.status == 200){
                    //     commit('notify',{message:data?.message})
                    // }else{
                    //         commit('notify',{message:data?.message,type:'danger'})
                    //     }
                        commit('setSpinner', false)
                        return data;  
                    }).catch(e => {
                        commit('setSpinner', false)
                        console.log(e);
                        if(e?.response?.status == 401){
                            // commit('logout');
                            router.push({ name: 'SignIn' })

                        }
                        // alert('weting be this')
                    })
            },
            //load staff  
            postMethod({commit},{url,param,form=null}){
                commit('setSpinner', true)
                return axiosClient.post(url,param)
                    .then(({data})=>{
                        if(data?.status == 201){
                            commit('notify',{message:data.message})
                            if(form != null){
                                form.reset()
                            }
                        }
                        else if(data?.status == 422){
                            commit('notify',{message:data.message,type:'warning'})
                        }else{
                            commit('notify',{message:data.message,type:'danger'})
                        }
                        commit('setSpinner', false)
                        return data;  
                    }).catch(e => {
                        commit('setSpinner', false)
                        if(e?.response?.status == 401){
                            router.push({ name: 'SignIn' })
                        }
                        console.log(e);
                        alert('weting be this')
                    })
            },

            deleteMethod({commit},{url,prompt = 'are you sure, you want to delete this ?', param = null}){
                if(prompt != null){
                    if(!confirm(prompt)){
                        return false
                    }
                }
                 commit('setSpinner', true)
                return axiosClient.delete(url,param)
                    .then(({data})=>{
                        if(data?.status == 201){
                            commit('notify',{message:data.message})
                        }
                       else{
                            commit('notify',{message:data.message,type:'danger'})
                        }
                        commit('setSpinner', false)
                        return data;  
                    }).catch(e => {
                        commit('setSpinner', false)
                        if(e?.response?.status == 401){
                            router.push({ name: 'SignIn' })
                        }
                        console.log(e);
                    })
               
            },

            putMethod({commit},{url,prompt = null, param = null}){
                if(prompt != null){
                    if(!confirm(prompt)){
                        return false
                    }
                }
                commit('setSpinner', true)
                return axiosClient.put(url,param)
                    .then(({data})=>{
                        if(data?.status == 201){
                            commit('notify',{message:data.message})
                        }
                       else{
                            commit('notify',{message:data.message,type:'danger'})
                        }
                        commit('setSpinner', false)
                        return data;  
                    }).catch(e => {
                        commit('setSpinner', false)
                        if(e?.response?.status == 401){
                            router.push({ name: 'SignIn' })
                        }
                        console.log(e);
                    })
            },

            // load dropdown 
            loadDropdown({_},url){
            console.log(_);
            return axiosClient.get('/dropdown-'+url)
                                .then(({data})=>{
                                    if(data?.status==200){
                                        return data;
                                    }else{
                                        return [];
                                    }
                                })
            
        },

            
    },
    mutations:{
        setUser:(state,userData)=>{
            state.user.token = userData?.token;
            state.user.data = userData?.user;
            state.user.roles = userData?.roles;
            sessionStorage.setItem('USERDATA', JSON.stringify(userData?.user,null,2));
            localStorage.setItem('TVATI_USERDATA', JSON.stringify(userData?.user,null,2));
            localStorage.setItem('TVATI_USER_ROLES', JSON.stringify(userData?.roles,null,2));
            localStorage.setItem('TVATI_TOKEN', userData?.token);
            
        },
        setProfile:(state,user)=>{
            state.user.data = user
            sessionStorage.setItem('USERDATA', JSON.stringify(user,null,2))
        },
        setActiveRole:(state,role) => {
            state.activeRole = role
            localStorage.setItem('TVATI_ACTIVE_ROLE', role)
        },
        logout: ({commit},state) =>{
            state.user.token = null
            state.user.data = ''
            localStorage.setItem('TVATI_USERDATA','')
            localStorage.setItem('TVATI_USER_ROLES','')
            commit('setActiveRole','')
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
    getters:{
         // global functions 
        numberFormat(number, point = 2) {
            return number.toFixed(point).replace(/\d(?=(\d{3})+\.)/g, '$&,')
        }
    },
    modules:{}
});

export default store;

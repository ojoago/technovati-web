<template>
    <div>
        <div class="container-fluid mt-2">
           <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Staff Onboarding    <router-link to="/staff-list" class="nav-link"><i class="bi bi-arrow-down-left-square-fill"></i></router-link></h5>

                  <!-- Default Tabs -->
                  <ul class="nav nav-tabs d-flex" id="myTabjustified" role="tablist">
                    <li class="nav-item flex-fill" role="presentation">
                      <button class="nav-link w-100 active" id="personal-tab" data-bs-toggle="tab" data-bs-target="#personal" type="button" role="tab" aria-controls="personal" aria-selected="true">Personal</button>
                    </li>
                    <li class="nav-item flex-fill" role="presentation">
                      <button class="nav-link w-100" id="next-tab" data-bs-toggle="tab" data-bs-target="#next" type="button" role="tab" aria-controls="next" aria-selected="false">Next of Kin</button>
                    </li>
                    <li class="nav-item flex-fill" role="presentation">
                      <button class="nav-link w-100" id="qualification-tab" data-bs-toggle="tab" data-bs-target="#qualification" type="button" role="tab" aria-controls="qualification" aria-selected="false">Qualification</button>
                    </li>
                    <li class="nav-item flex-fill" role="presentation">
                      <button class="nav-link w-100" id="bank-tab" data-bs-toggle="tab" data-bs-target="#bank" type="button" role="tab" aria-controls="bank" aria-selected="false">Bank Details</button>
                    </li>
                  </ul>
                  <div class="tab-content pt-2" id="myTabjustifiedContent">
                    <div class="tab-pane fade show active" id="personal" role="tabpanel" aria-labelledby="personal-tab">
                         <fieldset class="border rounded-3 p-2 m-1">
                            <legend class="float-none w-auto px-2">Persoanl Information</legend>
                            <form >
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label">Email <span class="text-danger">*</span></label>
                                            <input type="text" v-model="user.email" class="form-control" placeholder="e.g aminu@technovati.com.ng">
                                            <p class="text-danger " v-if="errors?.email">{{ errors?.email[0] }}</p>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label">Username</label>
                                            <input type="text" v-model="user.username" class="form-control" placeholder="e.g musa.isah ">
                                            <p class="text-danger " v-if="errors?.username">{{ errors?.username[0] }}</p>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label">Phone Number <span class="text-danger">*</span></label>
                                            <input type="text" v-model="user.gsm" maxlength="11" class="form-control" placeholder="e.g 080xxxxxxxx">
                                            <p class="text-danger " v-if="errors?.gsm">{{ errors?.gsm[0] }}</p>
                                        </div>
                                    </div>
                                </div>
    
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label">Firstname <span class="text-danger">*</span></label>
                                            <input type="text" v-model="user.firstname" class="form-control" placeholder="e.g Aminu">
                                            <p class="text-danger " v-if="errors?.firstname">{{ errors?.firstname[0] }}</p>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label">Lastname <span class="text-danger">*</span></label>
                                            <input type="text" v-model="user.lastname" class="form-control" placeholder="e.g Sanusi ">
                                            <p class="text-danger " v-if="errors?.lastname">{{ errors?.lastname[0] }}</p>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label">Othername</label>
                                            <input type="text" v-model="user.othername" class="form-control" placeholder="null">
                                            <p class="text-danger " v-if="errors?.othername">{{ errors?.othername[0] }}</p>
                                        </div>
                                    </div>
                                </div>
        
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label">gender <span class="text-danger">*</span></label>
                                            <input type="text" v-model="user.gender" class="form-control" placeholder="e.g aminu@technovati.com.ng">
                                            <p class="text-danger " v-if="errors?.gender">{{ errors?.gender[0] }}</p>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label">religion <span class="text-danger">*</span></label>
                                            <input type="text" v-model="user.religion" class="form-control" placeholder="e.g musa.isah ">
                                            <p class="text-danger " v-if="errors?.religion">{{ errors?.religion[0] }}</p>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label">marital status <span class="text-danger">*</span></label>
                                            <input type="text" v-model="user.marital_status" class="form-control" placeholder="e.g 080xxxxxxxx">
                                            <p class="text-danger " v-if="errors?.marital_status">{{ errors?.marital_status[0] }}</p>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="form-label">Bload Group <span class="text-danger">*</span></label>
                                                <input type="text" v-model="user.marital_status" class="form-control" placeholder="e.g 080xxxxxxxx">
                                                <p class="text-danger " v-if="errors?.marital_status">{{ errors?.marital_status[0] }}</p>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="form-label">Geno Type <span class="text-danger">*</span></label>
                                                <input type="text" v-model="user.marital_status" class="form-control" placeholder="e.g 080xxxxxxxx">
                                                <p class="text-danger " v-if="errors?.marital_status">{{ errors?.marital_status[0] }}</p>
                                            </div>
                                        </div>
                               
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label">Date Of Birth <span class="text-danger">*</span></label>
                                            <input type="date" v-model="user.dob" class="form-control" placeholder="e.g aminu@technovati.com.ng">
                                            <p class="text-danger " v-if="errors?.dob">{{ errors?.dob[0] }}</p>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label">Place of Birth</label>
                                            <input type="text" v-model="user.pob" class="form-control" placeholder="e.g Jos North ">
                                            <p class="text-danger " v-if="errors?.pob">{{ errors?.pob[0] }}</p>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label">state of origin <span class="text-danger">*</span></label>
                                            <input type="text" v-model="user.state_of_origin" class="form-control" placeholder="e.g 080xxxxxxxx">
                                            <p class="text-danger " v-if="errors?.state_of_origin">{{ errors?.state_of_origin[0] }}</p>
                                        </div>
                                    </div>
                                </div>
                                 

                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label">LGA of Origin <span class="text-danger">*</span></label>
                                            <input type="text" v-model="user.lga_of_origin" class="form-control" placeholder="e.g aminu@technovati.com.ng">
                                            <p class="text-danger " v-if="errors?.lga_of_origin">{{ errors?.lga_of_origin[0] }}</p>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label">state of residence <span class="text-danger">*</span></label>
                                            <input type="text" v-model="user.state_of_residence" class="form-control" placeholder="e.g musa.isah ">
                                            <p class="text-danger " v-if="errors?.state_of_residence">{{ errors?.state_of_residence[0] }}</p>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label">LGA of residence <span class="text-danger">*</span></label>
                                            <input type="text" v-model="user.lga_of_residence" class="form-control" placeholder="e.g 080xxxxxxxx">
                                            <p class="text-danger " v-if="errors?.lga_of_residence">{{ errors?.lga_of_residence[0] }}</p>
                                        </div>
                                    </div>

                                  
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="form-label">address <span class="text-danger">*</span> </label>
                                            <textarea type="text" v-model="user.address" class="form-control" placeholder="e.g Zaria road"></textarea>
                                            <p class="text-danger " v-if="errors?.address">{{ errors?.address[0] }}</p>
                                        </div>
                                    </div>

                                </div>
                                <button type="button" class="btn btn-success btn-sm mt-2" @click="createStaff">Submit</button>
                            </form>
                        </fieldset>
                      
                    </div>
                    <div class="tab-pane fade" id="next" role="tabpanel" aria-labelledby="next-tab">
                         <fieldset class="border rounded-3 p-2 m-1">
                                <legend class="float-none w-auto px-2">Next Of Kin</legend>
                                <form >
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="form-label">Fullname <span class="text-danger">*</span></label>
                                                <input type="text" v-model="next.fullname" class="form-control" placeholder="e.g aminu@technovati.com.ng">
                                                <p class="text-danger " v-if="nex_errors?.fullname">{{ nex_errors?.fullname[0] }}</p>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="form-label">Email</label>
                                                <input type="text" v-model="next.email" class="form-control" placeholder="e.g musa.isah ">
                                                <p class="text-danger " v-if="nex_errors?.email">{{ nex_errors?.email[0] }}</p>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="form-label">Phone Number <span class="text-danger">*</span></label>
                                                <input type="text" v-model="next.gsm" maxlength="11" class="form-control" placeholder="e.g 080xxxxxxxx">
                                                <p class="text-danger " v-if="nex_errors?.gsm">{{ nex_errors?.gsm[0] }}</p>
                                            </div>
                                        </div>
                                    </div>
    
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="form-label">Gender <span class="text-danger">*</span></label>
                                                <input type="text" v-model="next.gender" class="form-control" placeholder="e.g Aminu">
                                                <p class="text-danger " v-if="nex_errors?.gender">{{ nex_errors?.gender[0] }}</p>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="form-label">religion <span class="text-danger">*</span></label>
                                                <input type="text" v-model="next.religion" class="form-control" placeholder="e.g Sanusi ">
                                                <p class="text-danger " v-if="nex_errors?.religion">{{ nex_errors?.religion[0] }}</p>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="form-label">relationship</label>
                                                <input type="text" v-model="next.relationship" class="form-control" placeholder="null">
                                                <p class="text-danger " v-if="nex_errors?.relationship">{{ nex_errors?.relationship[0] }}</p>
                                            </div>
                                        </div>
                                    </div>
        
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Address <span class="text-danger">*</span></label>
                                                <textarea v-model="next.address" class="form-control" placeholder="e.g aminu@technovati.com.ng"></textarea>
                                                <p class="text-danger " v-if="nex_errors?.address">{{ nex_errors?.address[0] }}</p>
                                            </div>
                                        </div>
                                        
                                    </div>

                                    <button type="button" class="btn btn-success btn-sm mt-2" @click="staffNextofKin">Submit</button>
                                </form>
                            </fieldset>
                    </div>

                    <div class="tab-pane fade" id="qualification" role="tabpanel" aria-labelledby="qualification-tab">
                       <fieldset class="border rounded-3 p-2 m-1">
                            <legend class="float-none w-auto px-2">Qualification</legend>
                            <form>
                                <fieldset class="border rounded-3">
                                    <template v-for="(inst, loop) in qualification.institutions" :key="loop">
                                        
                                        <fieldset class="border rounded-3 p-2 m-1">
                                            <div class="row">
                                                <div class="float-end">
                                                    <button type="button" class="btn btn-danger btn-sm" @click="removeQualification(loop)"> <i class="bi bi-patch-minus"></i> </button>
                                                </div>
                                            </div>
                                            <!-- {{ q_errors+'.'+loop }} -->
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="form-label">institution <span class="text-danger">*</span></label>
                                                        <input type="text" v-model="inst.institution" maxlength="250" class="form-control" placeholder="e.g ABU Zaria">
                                                        <!-- <p class="text-danger " v-if="q_errors?.institutions?.institution">{{ 'q_errors?.institutions?[loop]?.institution[loop]' }}</p> -->
                                                    </div>
                                                </div>
                                           
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="form-label">Field/Course of Study </label>
                                                        <input type="text" v-model="inst.field" maxlength="100" class="form-control" placeholder="e.g electrical engineering">
                                                        <!-- <p class="text-danger " v-if="q_errors?.field">{{ q_errors?.loop?.field[0] }}</p> -->
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label class="form-label">Year <span class="text-danger">*</span></label>
                                                            <input type="text" v-model="inst.year" class="form-control" placeholder="e.g 2018 ">
                                                            <!-- <p class="text-danger " v-if="q_errors?.degree">{{ q_errors?.loop?.degree[0] }}</p> -->
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label class="form-label">Degree <span class="text-danger">*</span></label>
                                                            <input type="text" v-model="inst.degree" class="form-control" placeholder="e.g BSC ">
                                                            <!-- <p class="text-danger " v-if="q_errors?.degree">{{ q_errors?.loop?.degree[0] }}</p> -->
                                                        </div>
                                                    </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Grade </label>
                                                        <input type="text" v-model="inst.grade" class="form-control" placeholder="e.g 2.1">
                                                        <!-- <p class="text-danger " v-if="q_errors?.loop?.grade">{{ q_errors?.loop?.grade[0] }}</p> -->
                                                    </div>
                                                </div>
                                                
                                                
                                            </div>

                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label class="form-label">Address <span class="text-danger">*</span></label>
                                                        <textarea v-model="inst.address" class="form-control" placeholder="e.g Zaira, Kaduna, kaduna state"></textarea>
                                                        <!-- <p class="text-danger " v-if="q_errors?.address">{{ q_errors?.loop?.address[0] }}</p> -->
                                                    </div>
                                                </div>
                                
                                            </div>
                                        </fieldset>
                                    </template>
                                    <div class="float-end p-2">
                                        <button type="button" class="btn btn-success btn-sm mt-2" @click="addQualification"> <i class="bi bi-patch-plus-fill"></i> </button>
                                    </div>
                                </fieldset>
                                 
                                <button type="button" class="btn btn-success btn-sm mt-2" @click="staffQualification">Submit</button>
                            </form>
                        </fieldset>
                    </div>

                    <div class="tab-pane fade" id="bank" role="tabpanel" aria-labelledby="bank-tab">
                       <fieldset class="border rounded-3 p-2 m-1">
                                    <legend class="float-none w-auto px-2">Bank</legend>
                                    <form >
                                        <div class="row">
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label">Bank Name <span class="text-danger">*</span></label>
                                                    <input type="text" v-model="bank.bank" class="form-control" placeholder="e.g intercontinental bank plc ">
                                                    <p class="text-danger " v-if="b_errors?.bank">{{ b_errors?.bank[0] }}</p>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label">Account Name <span class="text-danger">*</span></label>
                                                    <input type="text" v-model="bank.account_name" class="form-control" placeholder="e.g tripleseventh ltd ">
                                                    <p class="text-danger " v-if="b_errors?.account_name">{{ b_errors?.account_name[0] }}</p>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label">Account Number </label>
                                                    <input type="text" v-model="bank.account_number" maxlength="10" class="form-control" placeholder="e.g xxxxxxxxxx">
                                                    <p class="text-danger " v-if="b_errors?.account_number">{{ b_errors?.account_number[0] }}</p>
                                                </div>
                                            </div>

                                        </div>
    
                                        <div class="row">
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label">BVN </label>
                                                    <input type="text" v-model="bank.bvn" maxlength="11" class="form-control" placeholder=" xxxxxxxxxx">
                                                    <p class="text-danger " v-if="b_errors?.bvn">{{ b_errors?.bvn[0] }}</p>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label">account Type </label>
                                                    <input type="text" v-model="bank.account_type" class="form-control" placeholder="e.g Aminu">
                                                    <p class="text-danger " v-if="b_errors?.account_type">{{ b_errors?.account_type[0] }}</p>
                                                </div>
                                               
                                            </div>
                                            <div class="col-md-4">
                                               
                                                <div class="form-group">
                                                    <label class="form-label">sort code </label>
                                                    <input type="text" v-model="bank.sort_code" class="form-control" placeholder="e.g Aminu">
                                                    <p class="text-danger " v-if="b_errors?.sort_code">{{ b_errors?.sort_code[0] }}</p>
                                                </div>
                                            </div>

                                        </div>
                                     

                                        <button type="button" class="btn btn-success btn-sm mt-2" @click="staffBankDetail">Submit</button>
                                    </form>
                                </fieldset>
                    </div>
                  </div>
                  <!-- End  Tabs -->

                </div>
              </div>

        </div>
    </div>
</template>

<script setup>
    
    import store from "@/store";
    import { onMounted, ref } from "vue";
    import { useRouter } from 'vue-router';
    const router = useRouter()
    let query = {}
    router.push({ query: query })
    const errors = ref({});
    const nex_errors = ref({});
    const user_pid = ref(null);

    const user = ref({
        'email':'',
        'username':'',
        'gsm':'', 
        'group':'',
        'firstname':'',
        'othername':'',
        'marital_status':'',
        'gender':'',
        'religion':'',
        'pob':'',
        'dob':'',
        'state_of_origin':'',
        'lga_of_origin':'',
        'state_of_residence':'',
        'lga_of_residence':'',
        'address':'',
        'user_pid':user_pid ,
    });
    
    const next = ref({
        'fullname':'',
        'gsm':'',
        'email':'',
        'gender':'',
        'religion':'',
        'relationship':'',
        'address':'',
        'user_pid': user_pid,

    });

    const b_errors = ref({});
    const bank = ref({
        'bank':'',
        'account_name':'',
        'sort_code':'',
        'account_number':'',
        'bvn':'',
        'account_type':'',
        'user_pid': user_pid,
    });
    
    function createStaff() {
        store.commit('setSpinner', true)
        errors.value = []
        store.dispatch('createUser', user.value).then((data) => {
            if(data.status == 422){
                errors.value = data.data
            }else if(data.status == 201 ){
                
                query = { tab: 'next-tab', 'id': data?.data?.user_pid }
                localStorage.setItem('TVATI_ONBOARD_TAB', JSON.stringify(query,null,2))
                errors.value = []
                user.value = [];
                currentTab()
            }
            store.commit('setSpinner', false)
        }).catch(e => {
            store.commit('setSpinner', false)
            console.log(e);
        })
    }


    function staffNextofKin() {
        store.commit('setSpinner', true)
        nex_errors.value = []
        store.dispatch('nextOfKin', next.value).then((data) => {
            if(data.status == 422){
                nex_errors.value = data.data
            }else if(data.status ==201){
                nex_errors.value = []
                query = { tab: 'qualification-tab', 'id': data?.data?.user_pid }
                localStorage.setItem('TVATI_ONBOARD_TAB', JSON.stringify(query, null, 2))
                next.value = [];
                currentTab()
            }
            store.commit('setSpinner', false)
        }).catch(e => {
            store.commit('setSpinner', false)
            console.log(e);
        })
    }
    
    const q_errors = ref({});

     const qualification = ref({
        'institutions': [{
            'institution': '',
            'degree': '',
            'year': '',
            'field': '',
            'grade': '',
            'address': '',
        }],
        'user_pid': user_pid,
    });
    const addQualification = ()=>{
        qualification.value.institutions.push({
        'institution': '',
        'degree': '',
        'year': '',
        'field': '',
        'grade': '',
        'address': '',
    })
    }
    const removeQualification = (i)=>{
        let len = qualification.value.institutions.length;
        if (len === 1) {
            store.commit('notify', { message: 'Qualification requires at least one instituion' ,type:'warning'})
            return;
        }
        qualification.value.institutions.splice(i, 1);
    }


    function staffQualification() {
        store.commit('setSpinner', true)
        q_errors.value = []
        store.dispatch('addQualifiaction', qualification.value).then((data) => {
            if(data.status == 422){
                q_errors.value = data.data
                console.log(data.data);
                console.log(q_errors.value.institutions[0])
                console.log(data.data);
            }else if(data.status == 201){
                q_errors.value = []
                qualification.value = [];
                query = { tab: 'bank-tab', 'id': data?.data?.user_pid }
                localStorage.setItem('TVATI_ONBOARD_TAB', JSON.stringify(query, null, 2))
                currentTab()
            }
            store.commit('setSpinner', false)
        }).catch(e => {
            store.commit('setSpinner', false)
            console.log(e);
        })
    }

    function staffBankDetail() {
        store.commit('setSpinner', true)
        b_errors.value = []
        console.log(bank.value);
        store.dispatch('bankDetail', bank.value).then((data) => {
            if(data.status == 422){
                b_errors.value = data.data
            }else if(data.status == 201){
                b_errors.value = []
                bank.value = [];
                query = { }
                localStorage.setItem('TVATI_ONBOARD_TAB', JSON.stringify(query, null, 2))
                currentTab()
            }
            store.commit('setSpinner', false)
        }).catch(e => {
            store.commit('setSpinner', false)
            console.log(e);
        })
    }

    const currentTab = ()=>{
      let q = localStorage.getItem('TVATI_ONBOARD_TAB') ? JSON.parse(localStorage.getItem('TVATI_ONBOARD_TAB')) : 'null'
        if(q != 'null'){
            //    var someTabTriggerEl = document.querySelector('#'+q.tab);
            // var tab = new bootstrap.Tab(someTabTriggerEl);
            // tab.show();
            router.push({ query: q })
            let resultsTab = document.getElementById(q.tab);
            user_pid.value = q.id
            //show the results tab:
            resultsTab.click();
        }
       
    }   
    onMounted(() => {
        currentTab()
    })

</script>

<style scoped>

</style>
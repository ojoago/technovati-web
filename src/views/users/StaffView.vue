<template>
    <div>
        <div class="container-fluid mt-2">
           <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Staff Onboarding</h5>

                  <!-- Default Tabs -->
                  <ul class="nav nav-tabs d-flex" id="myTabjustified" role="tablist">
                    <li class="nav-item flex-fill" role="presentation">
                      <button class="nav-link w-100 active" id="personal-tab" data-bs-toggle="tab" data-bs-target="#personal" type="button" role="tab" aria-controls="personal" aria-selected="true">Personal</button>
                    </li>
                    <li class="nav-item flex-fill" role="presentation">
                      <button class="nav-link w-100" id="next-tab" data-bs-toggle="tab" data-bs-target="#next" type="button" role="tab" aria-controls="next" aria-selected="false">Next of Kin</button>
                    </li>
                    <li class="nav-item flex-fill" role="presentation">
                      <button class="nav-link w-100" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-justified" type="button" role="tab" aria-controls="contact" aria-selected="false">Qualification</button>
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
                                            <input type="text" v-model="user.gsm" class="form-control" placeholder="e.g 080xxxxxxxx">
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
                                </div>

                                <div class="row">
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
                                            <label class="form-label">lga of origin <span class="text-danger">*</span></label>
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
                                            <label class="form-label">lga of residence <span class="text-danger">*</span></label>
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

                    <div class="tab-pane fade" id="contact-justified" role="tabpanel" aria-labelledby="contact-tab">
                       <fieldset class="border rounded-3 p-2 m-1">
                                    <legend class="float-none w-auto px-2">Qualification</legend>
                                    <form >
                                        <div class="row">
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label">institution <span class="text-danger">*</span></label>
                                                    <input type="text" v-model="qualification.institution" class="form-control" placeholder="e.g aminu@technovati.com.ng">
                                                    <p class="text-danger " v-if="nex_errors?.institution">{{ nex_errors?.institution[0] }}</p>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label">Email</label>
                                                    <input type="text" v-model="qualification.email" class="form-control" placeholder="e.g musa.isah ">
                                                    <p class="text-danger " v-if="nex_errors?.email">{{ nex_errors?.email[0] }}</p>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label">Phone Number <span class="text-danger">*</span></label>
                                                    <input type="text" v-model="qualification.gsm" maxlength="11" class="form-control" placeholder="e.g 080xxxxxxxx">
                                                    <p class="text-danger " v-if="nex_errors?.gsm">{{ nex_errors?.gsm[0] }}</p>
                                                </div>
                                            </div>
                                        </div>
    
                                        <div class="row">
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label">Gender <span class="text-danger">*</span></label>
                                                    <input type="text" v-model="qualification.gender" class="form-control" placeholder="e.g Aminu">
                                                    <p class="text-danger " v-if="nex_errors?.gender">{{ nex_errors?.gender[0] }}</p>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label">religion <span class="text-danger">*</span></label>
                                                    <input type="text" v-model="qualification.religion" class="form-control" placeholder="e.g Sanusi ">
                                                    <p class="text-danger " v-if="nex_errors?.religion">{{ nex_errors?.religion[0] }}</p>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label">relationship</label>
                                                    <input type="text" v-model="qualification.relationship" class="form-control" placeholder="null">
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

                                        <button type="button" class="btn btn-success btn-sm mt-2" @click="staffQualification">Submit</button>
                                    </form>
                                </fieldset>
                    </div>
                  </div><!-- End Default Tabs -->

                </div>
              </div>

        </div>
    </div>
</template>

<script setup>
    import store from "@/store";
    import { ref } from "vue";
    const errors = ref({});
    const nex_errors = ref({});
    const q_errors = ref({});
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
    });
    const next = ref({
        'fullname':'',
        'gsm':'',
        'email':'',
        'gender':'',
        'religion':'',
        'relationship':'',
        'address':'',
        'user_pid':'2E30T8052020D204A212273C1S60'
    });
    const qualification = ref({
        'institution':'',
        'qualification':'',
        'degree':'',
        'year':'',
        'field':'',
        'grade':'',
        'address':'',
        'user_pid':'2E30T8052020D204A212273C1S60'
    });

    function createStaff() {
        store.commit('setSpinner', true)
        errors.value = []
        store.dispatch('createUser', user.value).then((data) => {
            if(data.status == 422){
                errors.value = data.data
            }else if(data.status ==201){
                errors.value = []
                user.value = [];
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
                next.value = [];
            }
            store.commit('setSpinner', false)
        }).catch(e => {
            store.commit('setSpinner', false)
            console.log(e);
        })
    }
    function staffQualification() {
        store.commit('setSpinner', true)
        nex_errors.value = []
        store.dispatch('nextOfKin', qualification.value).then((data) => {
            if(data.status == 422){
                q_errors.value = data.data
            }else if(data.status ==201){
                q_errors.value = []
                qualification.value = [];
            }
            store.commit('setSpinner', false)
        }).catch(e => {
            store.commit('setSpinner', false)
            console.log(e);
        })
    }

</script>

<style scoped>

</style>
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
                      <button class="nav-link w-100" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-justified" type="button" role="tab" aria-controls="profile" aria-selected="false">Profile</button>
                    </li>
                    <li class="nav-item flex-fill" role="presentation">
                      <button class="nav-link w-100" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-justified" type="button" role="tab" aria-controls="contact" aria-selected="false">Contact</button>
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
                                            <!-- <p class="text-danger " v-if="errors?.department[0]">{{ errors?.department[0] }}</p> -->
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label">Username</label>
                                            <input type="text" v-model="user.username" class="form-control" placeholder="e.g musa.isah ">
                                            <!-- <p class="text-danger " v-if="errors?.description[0]">{{ errors?.description[0] }}</p> -->
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label">Phone Number <span class="text-danger">*</span></label>
                                            <input type="text" v-model="user.gsm" class="form-control" placeholder="e.g 080xxxxxxxx">
                                            <!-- <p class="text-danger " v-if="errors?.head[0]">{{ errors?.head[0] }}</p> -->
                                        </div>
                                    </div>
                                </div>
    
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label">Firstname <span class="text-danger">*</span></label>
                                            <input type="text" v-model="user.firstname" class="form-control" placeholder="e.g Aminu">
                                            <!-- <p class="text-danger " v-if="errors?.department[0]">{{ errors?.department[0] }}</p> -->
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label">Lastname <span class="text-danger">*</span></label>
                                            <input type="text" v-model="user.lastname" class="form-control" placeholder="e.g Sanusi ">
                                            <!-- <p class="text-danger " v-if="errors?.description[0]">{{ errors?.description[0] }}</p> -->
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label">Othername</label>
                                            <input type="text" v-model="user.othername" class="form-control" placeholder="null">
                                            <!-- <p class="text-danger " v-if="errors?.head[0]">{{ errors?.head[0] }}</p> -->
                                        </div>
                                    </div>
                                </div>
        
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label">gender <span class="text-danger">*</span></label>
                                            <input type="text" v-model="user.gender" class="form-control" placeholder="e.g aminu@technovati.com.ng">
                                            <!-- <p class="text-danger " v-if="errors?.department[0]">{{ errors?.department[0] }}</p> -->
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label">religion <span class="text-danger">*</span></label>
                                            <input type="text" v-model="user.religion" class="form-control" placeholder="e.g musa.isah ">
                                            <!-- <p class="text-danger " v-if="errors?.description[0]">{{ errors?.description[0] }}</p> -->
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label">marital status <span class="text-danger">*</span></label>
                                            <input type="text" v-model="user.marital_status" class="form-control" placeholder="e.g 080xxxxxxxx">
                                            <!-- <p class="text-danger " v-if="errors?.head[0]">{{ errors?.head[0] }}</p> -->
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label">Date Of Birth <span class="text-danger">*</span></label>
                                            <input type="date" v-model="user.dob" class="form-control" placeholder="e.g aminu@technovati.com.ng">
                                            <!-- <p class="text-danger " v-if="errors?.department[0]">{{ errors?.department[0] }}</p> -->
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label">Place of Birth</label>
                                            <input type="text" v-model="user.pob" class="form-control" placeholder="e.g Jos North ">
                                            <!-- <p class="text-danger " v-if="errors?.description[0]">{{ errors?.description[0] }}</p> -->
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label">state of origin <span class="text-danger">*</span></label>
                                            <input type="text" v-model="user.state_of_origin" class="form-control" placeholder="e.g 080xxxxxxxx">
                                            <!-- <p class="text-danger " v-if="errors?.head[0]">{{ errors?.head[0] }}</p> -->
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label">lga of origin <span class="text-danger">*</span></label>
                                            <input type="text" v-model="user.lga_of_origin" class="form-control" placeholder="e.g aminu@technovati.com.ng">
                                            <!-- <p class="text-danger " v-if="errors?.department[0]">{{ errors?.department[0] }}</p> -->
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label">state of residence <span class="text-danger">*</span></label>
                                            <input type="text" v-model="user.state_of_residence" class="form-control" placeholder="e.g musa.isah ">
                                            <!-- <p class="text-danger " v-if="errors?.description[0]">{{ errors?.description[0] }}</p> -->
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label">lga of residence <span class="text-danger">*</span></label>
                                            <input type="text" v-model="user.lga_of_residence" class="form-control" placeholder="e.g 080xxxxxxxx">
                                            <!-- <p class="text-danger " v-if="errors?.head[0]">{{ errors?.head[0] }}</p> -->
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="form-label">address <span class="text-danger">*</span> </label>
                                            <textarea type="text" v-model="user.address" class="form-control" placeholder="e.g Zaria road"></textarea>
                                            <!-- <p class="text-danger " v-if="errors?.head[0]">{{ errors?.head[0] }}</p> -->
                                        </div>
                                    </div>
                                </div>

                                <button type="button" class="btn btn-success btn-sm mt-2" @click="createDepartment">Submit</button>
                            </form>
                        </fieldset>
                      
                    </div>
                    <div class="tab-pane fade" id="profile-justified" role="tabpanel" aria-labelledby="profile-tab">
                      Nesciunt totam et. Consequuntur magnam aliquid eos nulla dolor iure eos quia. Accusantium distinctio omnis et atque fugiat. Itaque doloremque aliquid sint quasi quia distinctio similique. Voluptate nihil recusandae mollitia dolores. Ut laboriosam voluptatum dicta.
                    </div>
                    <div class="tab-pane fade" id="contact-justified" role="tabpanel" aria-labelledby="contact-tab">
                      Saepe animi et soluta ad odit soluta sunt. Nihil quos omnis animi debitis cumque. Accusantium quibusdam perspiciatis qui qui omnis magnam. Officiis accusamus impedit molestias nostrum veniam. Qui amet ipsum iure. Dignissimos fuga tempore dolor.
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

    function createDepartment() {
    store.commit('setSpinner', true)
    store.dispatch('createUser', user.value).then(() => {
        store.commit('setSpinner', false)
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
    })
}

</script>

<style scoped>

</style>
<template>
    <div>
        <fieldset class="border rounded-3 p-2 m-1">
            <legend class="float-none w-auto px-2">Persoanl Information</legend>
            <form enctype="multipart/form-data">
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">Email <span class="text-danger">*</span></label>
                            <input type="text" v-model="user.email" class="form-control form-control-sm"
                                placeholder="e.g aminu@technovati.com.ng">
                            <p class="text-danger " v-if="errors?.email">{{ errors?.email[0] }}</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">Username</label>
                            <input type="text" v-model="user.username" class="form-control form-control-sm"
                                placeholder="e.g musa.isah ">
                            <p class="text-danger " v-if="errors?.username">{{ errors?.username[0] }}</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">Phone Number <span class="text-danger">*</span></label>
                            <input type="text" v-model="user.gsm" maxlength="11" class="form-control form-control-sm"
                                placeholder="e.g 080xxxxxxxx">
                            <p class="text-danger " v-if="errors?.gsm">{{ errors?.gsm[0] }}</p>
                        </div>
                    </div>


                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">Firstname <span class="text-danger">*</span></label>
                            <input type="text" v-model="user.firstname" class="form-control form-control-sm"
                                placeholder="e.g Aminu">
                            <p class="text-danger " v-if="errors?.firstname">{{ errors?.firstname[0] }}</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">Lastname <span class="text-danger">*</span></label>
                            <input type="text" v-model="user.lastname" class="form-control form-control-sm"
                                placeholder="e.g Sanusi ">
                            <p class="text-danger " v-if="errors?.lastname">{{ errors?.lastname[0] }}</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">Othername</label>
                            <input type="text" v-model="user.othername" class="form-control form-control-sm"
                                placeholder="null">
                            <p class="text-danger " v-if="errors?.othername">{{ errors?.othername[0] }}</p>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">Gender <span class="text-danger">*</span></label>
                            <select v-model="user.gender" class="form-control form-control-sm">
                                <option value="" selected>Select Gender</option>
                                <option>Female</option>
                                <option>Male</option>
                            </select>
                            <p class="text-danger " v-if="errors?.gender">{{ errors?.gender[0] }}</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">Religion <span class="text-danger">*</span></label>
                            <select v-model="user.religion" class="form-control form-control-sm">
                                <option value="" selected>Select Religion</option>
                                <option>Islam</option>
                                <option>Christainity</option>
                                <option>Other</option>
                            </select>
                            <p class="text-danger " v-if="errors?.religion">{{ errors?.religion[0] }}</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">Marital Status <span class="text-danger">*</span></label>
                            <select v-model="user.marital_status" class="form-control form-control-sm">
                                <option value="" selected>Select Status</option>
                                <option>Single</option>
                                <option>Married</option>
                                <option>Separated</option>
                                <option>Divorced</option>
                                <option>Widow</option>
                                <option>Widower</option>
                            </select>
                            <p class="text-danger " v-if="errors?.marital_status">{{ errors?.marital_status[0] }}</p>
                        </div>
                    </div>
                    <div class="col-md-4">

                        <div class="form-group">
                            <label class="form-label">Blood Group <span class="text-danger">*</span></label>

                            <select v-model="user.blood_group" class="form-control form-control-sm">
                                <option value="" selected>Select Group</option>
                                <option>A+</option>
                                <option>A-</option>
                                <option>B+</option>
                                <option>B-</option>
                                <option>O+</option>
                                <option>O-</option>
                                <option>AB+</option>
                                <option>AB-</option>
                            </select>
                            <p class="text-danger " v-if="errors?.blood_group">{{ errors?.blood_group[0] }}</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">Geno Type <span class="text-danger"></span></label>
                            <input type="text" v-model="user.geno_type" class="form-control form-control-sm"
                                placeholder="e.g AA">
                            <p class="text-danger " v-if="errors?.geno_type">{{ errors?.geno_type[0] }}</p>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">Date of Birth <span class="text-danger">*</span></label>
                            <input type="date" v-model="user.dob" class="form-control form-control-sm"
                                placeholder="e.g aminu@technovati.com.ng">
                            <p class="text-danger " v-if="errors?.dob">{{ errors?.dob[0] }}</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">Place of Birth <span class="text-danger">*</span></label>
                            <input type="text" v-model="user.pob" class="form-control form-control-sm"
                                placeholder="e.g Jos North ">
                            <p class="text-danger " v-if="errors?.pob">{{ errors?.pob[0] }}</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">State of Origin <span class="text-danger">*</span></label>
                            <!-- <Select2 v-model="user.state_of_origin" :options="states" :settings="{ width: '100%' }"  /> -->
                            <select v-model="user.state_of_origin" class="form-control form-control-sm"
                                @change="loadStateLga($event?.target?.value)">
                                <option value="" selected>Select State</option>
                                <option v-for="state in states" :key="state.id" :value="state.id">{{ state.text }}
                                </option>
                            </select>
                            <p class="text-danger " v-if="errors?.state_of_origin">{{ errors?.state_of_origin[0] }}</p>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">LGA of Origin <span class="text-danger">*</span></label>
                            <Select2 v-model="user.lga_of_origin" :options="stateLgas" :settings="{ width: '100%' }"
                                aria-placeholder="Select Option" />
                            <p class="text-danger " v-if="errors?.lga_of_origin">{{ errors?.lga_of_origin[0] }}</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">State of Residence <span class="text-danger">*</span></label>
                            <!-- <Select2 v-model="user.state_of_residence" :options="states" :settings="{ width: '100%' }"  /> -->
                            <select v-model="user.state_of_residence" class="form-control form-control-sm"
                                @change="loadStateRes($event?.target?.value)">
                                <option value="" selected>Select Option</option>
                                <option v-for="state in states" :key="state.id" :value="state.id">{{ state.text }}
                                </option>
                            </select>
                            <p class="text-danger " v-if="errors?.state_of_residence">{{ errors?.state_of_residence[0]
                                }}</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">LGA of Residence <span class="text-danger">*</span></label>
                            <Select2 v-model="user.lga_of_residence" :options="resLga" :settings="{ width: '100%' }"
                                aria-placeholder="Select LGA" />
                            <p class="text-danger " v-if="errors?.lga_of_residence">{{ errors?.lga_of_residence[0] }}
                            </p>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">Department <span class="text-danger">*</span></label>
                            <select v-model="user.department_pid" class="form-control form-control-sm"
                                @change="loadSubDept($event)">
                                <option value="" selected>Select Department</option>
                                <option v-for="dp in departments" :key="dp.id" :value="dp.id">{{ dp.text }}</option>
                            </select>
                            <p class="text-danger " v-if="errors?.department_pid">{{ errors?.department_pid[0] }}</p>
                        </div>
                    </div>

                    <div class="col-md-3">
                        <div class="form-group">
                            <label class="form-label">Sub Department </label>
                            <Select2 v-model="user.sub_department" :options="sub" :settings="{ width: '100%' }"
                                aria-placeholder="Select Sub Department" />
                            <p class="text-danger " v-if="errors?.sub_department">{{ errors?.sub_department[0] }}</p>
                        </div>
                    </div>

                    <div class="col-md-3">
                        <div class="form-group">
                            <label class="form-label">Designation <span class="text-danger">*</span></label>
                            <Select2 v-model="user.designation_pid" :options="desig" :settings="{ width: '100%' }"
                                aria-placeholder="Select Designation" />
                            <p class="text-danger " v-if="errors?.designation_pid">{{ errors?.designation_pid[0] }}</p>
                        </div>
                    </div>

                    <div class="col-md-3">
                        <div class="form-group">
                            <label class="form-label">Roles </label>
                            <Select2 v-model="user.role" :options="roles" :settings="{ width: '100%' }"
                                aria-placeholder="Select Role" />
                            <p class="text-danger " v-if="errors?.role">{{ errors?.role[0] }}</p>
                        </div>
                    </div>

                    <div class="col-md-3">
                        <div class="form-group">
                            <label class="form-label">Passport <span class="text-danger">*</span></label>
                            <input type="file" class="form-control form-control-sm" id="image"
                                @change="handleImageChange" accept="image/*" required />
                            <p class="text-danger " v-if="errors?.image">{{ errors?.image[0] }}</p>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="form-label">Address <span class="text-danger">*</span> </label>
                            <textarea type="text" v-model="user.address" class="form-control form-control-sm"
                                placeholder="e.g Zaria road"></textarea>
                            <p class="text-danger " v-if="errors?.address">{{ errors?.address[0] }}</p>
                        </div>
                    </div>
                    <img v-if="user.image" :src="user.image" alt="Selected Image"
                        style="max-width: 200px; margin-top: 10px;" />
                    <img v-if="user.path" :src="user.path" alt="Selected Image"
                        style="max-width: 200px; margin-top: 10px;" />

                </div>
                <button type="button" class="btn btn-success btn-sm mt-2 mr-3" @click="saveStaff">Save & Exit</button> 
                <i class="m-3"></i>
                <button type="button" class="btn btn-success btn-sm mt-2" @click="createStaff">Save & Continue</button>
            </form>
        </fieldset>

    </div>
</template>

<script setup>
import store from "@/store";
import {  defineEmits } from "vue";
import Select2 from 'vue3-select2-component';
import { ref, onMounted } from "vue";
// import { useHelper } from "@/composables/helper";
// const {handleFile}  = useHelper()
// import { useRoute, useRouter } from 'vue-router';

const errors = ref({});

const props = defineProps({
    user_pid: String,
});

const user = ref({
    email: '',
    username: '',
    gsm: '',
    group: '',
    firstname: '',
    othername: '',
    marital_status: '',
    gender: '',
    religion: '',
    pob: '',
    dob: '',
    state_of_origin: '',
    lga_of_origin: '',
    state_of_residence: '',
    lga_of_residence: '',
    address: '',
    department_pid: '',
    sub_department: '',
    designation_pid: '',
    user_pid: props.user_pid,
    image: null,
    role: '',
    geno_type: '',
    blood_group: '',
    pid:null,
});

let query = {}

function createStaff() {
    errors.value = []
    store.dispatch('postMethod', { url: '/create-staff', param: user.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data;
        } else if (data?.status == 201) {
            query = { tab: 'next-tab', 'id': data?.data?.user_pid }
            localStorage.setItem('TVATI_ONBOARD_TAB', JSON.stringify(query, null, 2))
            errors.value = []
            resetAttr()
            switchTab()
        }
    })
}
function saveStaff() {
    errors.value = []
    store.dispatch('postMethod', { url: '/create-staff', param: user.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data;
        } else if (data?.status == 201) {
            resetAttr()
            query = { tab: 'personal-tab' }
            localStorage.setItem('TVATI_ONBOARD_TAB', JSON.stringify(query, null, 2))
            localStorage.setItem('TVATI_EDIT_STAFF', JSON.stringify(query, null, 2))
            switchTab()
        }
    })
}
const  emit =  defineEmits(['currentTab'])

    function switchTab(){
        emit('currentTab')
    }


    const states = ref([]);
    function dropdownUser() {
        store.dispatch('loadDropdown', 'state').then(({ data }) => {
            states.value = data;
        })
    }

    dropdownUser()

    const departments = ref([]);
    function dropdownDpet() {
        store.dispatch('loadDropdown', 'departments').then(({ data }) => {
            departments.value = data;
        }).catch(e => {
            console.log(e);
        })
    }

    dropdownDpet()

    const desig = ref([]);
    function dropdownDesig() {
        store.dispatch('loadDropdown', 'designations').then(({ data }) => {
            desig.value = data;
        }).catch(e => {
            console.log(e);
        })
    }
    dropdownDesig()

    
const sub = ref([]);
function loadSubDept(event) {
    store.dispatch('loadDropdown', 'sub-departments/' + event.target.value).then(({ data }) => {
        sub.value = data;
    }).catch(e => {
        console.log(e);
    })
}


const roles = ref([]);
function loadRoles() {
    store.dispatch('loadDropdown', 'roles').then(({ data }) => {
        roles.value = data;
    }).catch(e => {
        console.log(e);
    })
}
loadRoles()

const handleImageChange = (event) => {
    // user.value.image = handleFile(event);

    const file = event.target.files[0];
    if (file) {
        var ext = file['name'].substring(file['name'].lastIndexOf('.') + 1);
        if (!['png', 'jpeg', 'jpg'].includes(ext)) {
            event.target.value = null;
            store.commit('notify', { message: 'Only Image is allowed', type: 'warning' })
            return;
        }
        if (file.size > 1024 * 1024) {
            event.target.value = null;
            store.commit('notify', { message: 'Image cannot be more 1MB', type: 'warning' })
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            user.value.image = reader.result;
        };
        reader.readAsDataURL(file);
    }
}
    // const sub = ref([]);
    //  function loadSubDept(event) {
    //     store.dispatch('loadDropdown', 'sub-departments/' + event.target.value).then(({ data }) => {
    //         sub.value = data;
    //     }).catch(e => {
    //         console.log(e);
    //     })
    // }

    const stateLgas = ref([]);
     function loadStateLga(event) {
        store.dispatch('loadDropdown', 'state-lga/' + event).then(({ data }) => {
            stateLgas.value = data;
        })
    }
    
    const resLga = ref([]);

     function loadStateRes(event) {
        store.dispatch('loadDropdown', 'state-lga/' + event).then(({ data }) => {
            resLga.value = data;
        }).catch(e => {
            console.log(e);
        })
    }
    
    onMounted(() => {
        let tsk = localStorage.getItem('TVATI_EDIT_STAFF') ? JSON.parse(localStorage.getItem('TVATI_EDIT_STAFF')) : 'null'
        if (tsk != 'null') {
            if(tsk.action=='edit'){
                loadStaff(tsk?.staff?.pid)
            }
        }else{
            user.value.user_pid = null;
        }
    })

    const  loadStaff = (pid) => {
    store.dispatch('getMethod', { url: '/load-personal-detail/'+pid }).then((data) => {
        if (data?.status == 200) {
            user.value = data.data;
            user.value.email = data?.data?.user?.email 
            user.value.pid = data?.data?.user?.pid 
            user.value.username = data.data?.user?.username
            user.value.gsm = data.data?.user?.gsm
            loadStateLga(user.value.state_of_origin)
            loadStateRes(user.value.state_of_residence)
        }
    })
}


const resetAttr = () => {
    user.value = {
        email: '',
        username: '',
        gsm: '',
        group: '',
        firstname: '',
        othername: '',
        marital_status: '',
        gender: '',
        religion: '',
        pob: '',
        dob: '',
        state_of_origin: '',
        lga_of_origin: '',
        state_of_residence: '',
        lga_of_residence: '',
        address: '',
        department_pid: '',
        sub_department: '',
        designation_pid: '',
        user_pid: props.user_pid,
        image: null,
        pid:null,
        role: '',
    }
}
     
</script>

<style scoped>

</style>
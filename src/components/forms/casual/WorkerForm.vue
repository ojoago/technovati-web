<template>
    <div>
         <form  id="casualForm">
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Firstname <span class="text-danger">*</span></label>
                        <input type="text" v-model="staff.firstname" class="form-control form-control-sm" placeholder="e.g Aminu">
                        <p class="text-danger " v-if="errors?.firstname">{{ errors?.firstname[0] }}</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Lastname <span class="text-danger">*</span></label>
                        <input type="text" v-model="staff.lastname" class="form-control form-control-sm" placeholder="e.g Sanusi ">
                        <p class="text-danger " v-if="errors?.lastname">{{ errors?.lastname[0] }}</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Othername</label>
                        <input type="text" v-model="staff.othername" class="form-control form-control-sm" placeholder="null">
                        <p class="text-danger " v-if="errors?.othername">{{ errors?.othername[0] }}</p>
                    </div>
                </div>
            
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">Email <span class="text-danger">*</span></label>
                            <input type="text" v-model="staff.email" class="form-control form-control-sm" placeholder="e.g aminu@technovati.com.ng">
                            <p class="text-danger " v-if="errors?.email">{{ errors?.email[0] }}</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">Username</label>
                            <input type="text" v-model="staff.username" class="form-control form-control-sm" placeholder="e.g musa.isah ">
                            <p class="text-danger " v-if="errors?.username">{{ errors?.username[0] }}</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">Phone Number <span class="text-danger">*</span></label>
                            <input type="text" v-model="staff.gsm" maxlength="11" class="form-control form-control-sm" placeholder="e.g 080xxxxxxxx">
                            <p class="text-danger " v-if="errors?.gsm">{{ errors?.gsm[0] }}</p>
                        </div>
                    </div>
                
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">gender <span class="text-danger">*</span></label>
                            <select v-model="staff.gender" class="form-control form-control-sm">
                                <option value="" selected>Select Gender</option>
                                <option>Female</option>
                                <option>Male</option>
                            </select>
                            <!-- <input type="text" v-model="staff.gender" class="form-control" placeholder="e.g aminu@technovati.com.ng"> -->
                            <p class="text-danger " v-if="errors?.gender">{{ errors?.gender[0] }}</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">religion <span class="text-danger">*</span></label>
                            <select v-model="staff.religion" class="form-control form-control-sm">
                                    <option value="" selected>Select Status</option>
                                    <option>Muslim</option>
                                    <option>Christian</option>
                                    <option>Other</option>
                                </select>
                            <p class="text-danger " v-if="errors?.religion">{{ errors?.religion[0] }}</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">marital status <span class="text-danger">*</span></label>
                            <select v-model="staff.marital_status" class="form-control form-control-sm">
                                <option value="" selected>Select Status</option>
                                <option>Single</option>
                                <option>Married</option>
                                <option>Separated</option>
                                <option>Divorce</option>
                            </select>
                            <!-- <input type="text" v-model="staff.marital_status" class="form-control" placeholder="e.g 080xxxxxxxx"> -->
                            <p class="text-danger " v-if="errors?.marital_status">{{ errors?.marital_status[0] }}</p>
                        </div>
                    </div>
                        <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">Bload Group <span class="text-danger">*</span></label>
                            <input type="text" v-model="staff.bload_group" class="form-control  form-control-sm" placeholder="e.g B+">
                            <p class="text-danger " v-if="errors?.bload_group">{{ errors?.bload_group[0] }}</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">Geno Type <span class="text-danger">*</span></label>
                            <input type="text" v-model="staff.geno_type" class="form-control  form-control-sm" placeholder="e.g AA">
                            <p class="text-danger " v-if="errors?.geno_type">{{ errors?.geno_type[0] }}</p>
                        </div>
                    </div>
                
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">Date Of Birth <span class="text-danger">*</span></label>
                            <input type="date" v-model="staff.dob" class="form-control form-control-sm" >
                            <p class="text-danger " v-if="errors?.dob">{{ errors?.dob[0] }}</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">Place of Birth</label>
                            <input type="text" v-model="staff.pob" class="form-control form-control-sm" placeholder="e.g Jos North ">
                            <p class="text-danger " v-if="errors?.pob">{{ errors?.pob[0] }}</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">state of origin <span class="text-danger">*</span></label>
                            <select v-model="staff.state_of_origin" class="form-control form-control-sm" @change="loadStateLga($event)">
                                <option value="" selected>Select Option</option>
                                <option v-for="state in states" :key="state.id" :value="state.id">{{ state.text }}</option>
                            </select>
                            <!-- <Select2  v-model="staff.state_of_origin"  :options="stateDrop" :settings="{ width: '100%' }"  /> -->
                            <p class="text-danger " v-if="errors?.state_of_origin">{{ errors?.state_of_origin[0] }}</p>
                        </div>
                    </div>
                
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">LGA of Origin <span class="text-danger">*</span></label>
                            <!-- <input type="text" v-model="staff.lga_of_origin" class="form-control form-control-sm" placeholder="e.g aminu@technovati.com.ng"> -->
                            <Select2  v-model="staff.lga_of_origin"  :options="stateLgas" :settings="{ width: '100%' }"  />
                            <p class="text-danger " v-if="errors?.lga_of_origin">{{ errors?.lga_of_origin[0] }}</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">State of Residence <span class="text-danger">*</span></label>
                            <select v-model="staff.state_of_residence" class="form-control form-control-sm" @change="loadStateRes($event)">
                                <option value="" selected>Select Option</option>
                                <option v-for="state in states" :key="state.id" :value="state.id">{{ state.text }}</option>
                            </select>
                            <p class="text-danger " v-if="errors?.state_of_residence">{{ errors?.state_of_residence[0] }}</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">LGA of Residence <span class="text-danger">*</span></label>
                            <Select2  v-model="staff.lga_of_residence" :options="resLga" :settings="{ width: '100%' }"  />
                            <!-- <input type="text" v-model="staff.lga_of_residence" class="form-control form-control-sm" placeholder="e.g zaria road"> -->
                            <p class="text-danger " v-if="errors?.lga_of_residence">{{ errors?.lga_of_residence[0] }}</p>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="form-label">address <span class="text-danger">*</span> </label>
                            <textarea type="text" v-model="staff.address" class="form-control form-control-sm" placeholder="e.g Zaria road"></textarea>
                            <p class="text-danger " v-if="errors?.address">{{ errors?.address[0] }}</p>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="form-label">Image <span class="text-danger">*</span> </label>
                            <input type="file" accept="image/*" class="form-control form-control-sm" @change="handleImageChange">
                            <p class="text-danger " v-if="errors?.image">{{ errors?.image[0] }}</p>
                        </div>
                    </div>
                        <div class="col-md-6">
                        <label class="form-label">Team</label>
                        <Select2 v-model="staff.term_pid" :options="teamDrop" :settings="{ width: '100%' }"  />
                        <p class="text-danger " v-if="errors?.term_pid">{{ errors?.title[0] }} </p>
                    </div>
                </div>
                <button type="button" class="btn btn-success btn-sm mt-2" @click="createCasualStaff">Submit</button>
        </form>  
    </div>
</template>

<script setup>
    import Select2 from 'vue3-select2-component';
    import store from "@/store";
    import { onMounted, ref } from "vue";
    const errors = ref({});
    const staff = ref({
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
        term_pid: '',
        bload_group: '',
        geno_type: '',
        image: null,
        // 'user_pid': user_pid,
    });


const handleImageChange = (event) => {
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
            staff.value.image = reader.result;
        };
        reader.readAsDataURL(file);
    }
}

function createCasualStaff() {
    errors.value = []
    store.dispatch('postMethod', { url: '/create-casual-staff', param: staff.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data
        } else if (data?.status == 201) {
            let form = document.querySelector('#casualForm');
            form.reset();
            // staff.value = [];
        }
    })

}


const states = ref({});
function dropDOwnState() {
    store.dispatch('loadDropdown', 'state').then(({ data }) => {
        states.value = data;
    })
}
dropDOwnState()

const teamDrop = ref({});
function dropDownTeam() {
    store.dispatch('loadDropdown', 'team').then(({ data }) => {
        teamDrop.value = data;
    })
}
dropDownTeam()

const stateLgas = ref([]);
function loadStateLga(event) {
    store.dispatch('loadDropdown', 'state-lga/' + event.target.value).then(({ data }) => {
        stateLgas.value = data;
    })
}

const resLga = ref([]);

function loadStateRes(event) {
    store.dispatch('loadDropdown', 'state-lga/' + event.target.value).then(({ data }) => {
        resLga.value = data;
    })
}
 onMounted(() => {
    // alert('mounted')
    let tsk = localStorage.getItem('TVATI_CASAUL_TAB') ? JSON.parse(localStorage.getItem('TVATI_CASAUL_TAB')) : 'null'
    if (tsk != 'null') {
        if (tsk.action == 'edit') {
            loadCasual(tsk?.query?.id)
        }
    }
 })

 const loadCasual = (pid) => {
    store.dispatch('getMethod', { url: '/load-casual-staff-detail/'+pid }).then((data) => {
         if (data?.status == 200) {
            staff.value = data.data;
        }
    })
 }

 

</script>

<style scoped>

</style>
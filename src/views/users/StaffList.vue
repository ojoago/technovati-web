<template>
    <div>
        <div class="container-fluid mt-2">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Staff List
                        <!-- <router-link to="/staff" class="nav-link">Create Staff</router-link> -->
                    </h5>

                    <!-- Default Tabs -->
                    <ul class="nav nav-tabs d-flex" id="myTabjustified" role="tablist">
                        <li class="nav-item flex-fill" role="presentation">
                            <button class="nav-link w-100 active" id="personal-tab" data-bs-toggle="tab"
                                data-bs-target="#personal" type="button" role="tab" aria-controls="personal"
                                aria-selected="true">Active Staff</button>
                        </li>
                        <li class="nav-item flex-fill" role="presentation">
                            <button class="nav-link w-100" id="next-tab" data-bs-toggle="tab" data-bs-target="#next"
                                type="button" role="tab" aria-controls="next" aria-selected="false">Disabled</button>
                        </li>
                        <!-- <li class="nav-item flex-fill" role="presentation">
                      <button class="nav-link w-100" id="qualification-tab" data-bs-toggle="tab" data-bs-target="#qualification" type="button" role="tab" aria-controls="qualification" aria-selected="false">Qualification</button>
                    </li>
                    <li class="nav-item flex-fill" role="presentation">
                      <button class="nav-link w-100" id="bank-tab" data-bs-toggle="tab" data-bs-target="#bank" type="button" role="tab" aria-controls="bank" aria-selected="false">Bank Details</button>
                    </li> -->
                    </ul>
                    <div class="tab-content pt-2" id="myTabjustifiedContent">
                        <div class="tab-pane fade show active" id="personal" role="tabpanel"
                            aria-labelledby="personal-tab">
                            <fieldset class="border rounded-3 p-2 m-1">
                                <legend class="float-none w-auto px-2">Active Staff</legend>
                                <div class="table-responsive">
                                    <table class="table table-bordered table-stripped table-hover">
                                        <thead>
                                            <tr>
                                                <th width="5%">S/N</th>
                                                <th>fullname</th>
                                                <th>username</th>
                                                <th>Email</th>
                                                <th>GSM</th>
                                                <th>Department</th>
                                                <th>Staff Id</th>
                                                <th> <i class="bi bi-gear"></i> </th>
                                            </tr>
                                        </thead>
                                        <tbody v-if="users.data">

                                            <tr v-for="(user,loop) in users.data" :key="loop">
                                                <td>{{ loop+1 }}</td>
                                                <td>{{ `${user.lastname} ${user.firstname}` }} {{ user.othername }}</td>
                                                <td>{{ user.username }}</td>
                                                <td>{{ user.email }}</td>
                                                <td>{{ user.gsm }}</td>
                                                <td>{{ user.department }}</td>
                                                <td>{{ user.staff_id }}</td>
                                                <td>
                                                    <div class="dropdown">
                                                        <button type="button"
                                                            class="btn btn-primary btn-sm dropdown-toggle"
                                                            data-bs-toggle="dropdown">
                                                            <i class="bi bi-tools"></i>
                                                        </button>
                                                        <ul class="dropdown-menu dropdown-menu-start">
                                                            <li><a class="dropdown-item pointer bg-info"
                                                                    @click="staffDetail(user)">Detail</a></li>

                                                            <li><a class="dropdown-item pointer"
                                                                    @click="updateRoles(user.id,user.username)">Update Roles</a></li>

                                                            <li><a class="dropdown-item pointer bg-success"
                                                                    @click="updateStep(user.pid)">Update Salary Step</a>
                                                            </li>

                                                            <li><a class="dropdown-item pointer bg-warning"
                                                                    @click="editStaff(user)">Edit</a></li>

                                                            <li><a class="dropdown-item pointer bg-primary text-white"
                                                                    @click="assignDepartment(user.pid)">Assign Dept</a>
                                                            </li>

                                                            <li><a class="dropdown-item pointer bg-warning"
                                                                    @click="resetLink(user.pid)">Reset Password</a></li>

                                                            <li><a class="dropdown-item pointer bg-danger"
                                                                    @click="disableStaff(user.pid)">Disable Account</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                        <tfoot v-else class="text-center" style="width: 100%" width="100%">
                                            <tr>
                                                <td colspan="8">No Record Yet</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                    <div class="flex justify-center mt-4">
                                        <nav class="relative justify-center rounded-md shadow pagination">
                                            <pagination-links v-for="(link, i) of users.links" :link="link" :key="i"
                                                @next="nextPage($event,link)"></pagination-links>
                                        </nav>
                                    </div>
                                </div>
                            </fieldset>

                        </div>

                        <div class="tab-pane fade" id="next" role="tabpanel" aria-labelledby="next-tab">
                            <fieldset class="border rounded-3 p-2 m-1">
                                <legend class="float-none w-auto px-2">Disabled Staff</legend>
                                <div class="table-responsive">
                                    <table class="table table-bordered table-stripped table-hover">
                                        <thead>
                                            <tr>
                                                <th width="5%">S/N</th>
                                                <th>fullname</th>
                                                <th>username</th>
                                                <th>Email</th>
                                                <th>GSM</th>
                                                <th>Department</th>
                                                <th>Staff Id</th>
                                                <th> <i class="bi bi-gear"></i> </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(user, loop) in disabledList.data" :key="loop">
                                                <td>{{ loop + 1 }}</td>
                                                <td>{{ `${user.lastname} ${user.firstname} ${user.othername}` }}</td>
                                                <td>{{ user.username }}</td>
                                                <td>{{ user.email }}</td>
                                                <td>{{ user.gsm }}</td>
                                                <td>{{ user.department }}</td>
                                                <td>{{ user.staff_id }}</td>
                                                <td>
                                                    <div class="dropdown">
                                                        <button type="button"
                                                            class="btn btn-primary btn-sm dropdown-toggle"
                                                            data-bs-toggle="dropdown">
                                                            <i class="bi bi-tools"></i>
                                                        </button>
                                                        <ul class="dropdown-menu">
                                                            <li><a class="dropdown-item pointer bg-info"
                                                                    @click="staffDetail(user)">Detail</a></li>
                                                            <li><a class="dropdown-item pointer bg-success"
                                                                    @click="reActivateStaff(user.pid)">Reactivate</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>

                                    </table>
                                    <div class="flex justify-center mt-4">
                                        <nav class="relative justify-center rounded-md shadow pagination">
                                            <pagination-links v-for="(link, i) of disabledList.links" :link="link"
                                                :key="i" @next="nextDPage(link)"></pagination-links>
                                        </nav>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                    <!-- End  Tabs -->

                </div>
            </div>

        </div>

        <o-modal :isOpen="assignModal" modal-class="modal-xs" title="Assign Department" @modal-close="closeModal">
            <template #content>
                <div>
                    <assignDepartmentForm :user_pid="user_pid" />
                </div>
            </template>
            <template #footer>
                <div></div>
            </template>
        </o-modal>

        <o-modal :isOpen="roleModal" modal-class="modal-sm" @submit="updateStaffRole" :title="`Update ${name}'s  Roles`"
            @modal-close="closeModal">
            <template #content>
                <div>
                    <form id="rForm">
                        <div class="row">
                            <template v-for="role in roles" :key="role.id">
                                <div class="col-6">
                                    <div class="form-check form-switch">
                                        <input v-model="newRole" class="form-check-input" type="checkbox"
                                            :value="role.id">
                                        <label class="form-check-label" for="flexSwitchCheckDefault">{{
                                            role.id.replace('_',' ')
                                            }}</label>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </form>
                </div>
            </template>
        </o-modal>

        <o-modal :isOpen="stepModal" modal-class="modal-sm" @submit="updateStaffStep" title="Update Grade Step"
            @modal-close="closeModal">
            <template #content>
                <div>
                    <form id="rForm">
                        <div class="row">
                            <form>

                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="form-label">Salary Structure</label>
                                            <select class="form-control form-control-sm" v-model="salary.structure_pid"
                                                @change="loadGrades($event)">
                                                <option value="" selected>Make Selection</option>
                                                <option v-for="sec in structureDrop" :key="sec.id" :value="sec.id">
                                                    {{ sec.text }}
                                                </option>
                                            </select>
                                            <p class="text-danger " v-if="errors?.structure_pid">{{
                                                errors?.structure_pid[0] }} </p>
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="form-label">Salary Grade</label>
                                            <select class="form-control form-control-sm" v-model="salary.grade_pid"
                                                @change="loadSteps($event)">
                                                <option value="" selected>Make Selection</option>
                                                <option v-for="sec in grades" :key="sec.id" :value="sec.id">{{
                                                    sec.text }} </option>
                                            </select>
                                            <p class="text-danger " v-if="errors?.grade_pid">{{ errors?.grade_pid[0]
                                                }} </p>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="form-label">Salary Step</label>
                                            <Select2 v-model="salary.step" :options="steps" id="pid"
                                                :settings="{ width: '100%' }" />
                                            <p class="text-danger " v-if="errors?.step">{{ errors?.step[0] }} </p>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </form>
                </div>
            </template>
        </o-modal>

    </div>
</template>

<script setup>
    
    import OModal from "@/components/OModal.vue";
    import PaginationLinks from "@/components/PaginationLinks.vue";
    import assignDepartmentForm from "@/components/forms/department/AssignDepartmentForm.vue";
    import Select2 from 'vue3-select2-component';

    import store from "@/store";
    import {  onMounted, ref } from "vue";
    import { useRouter } from 'vue-router';
    
    const router = useRouter()
    let query = {}
    router.push({ query: query })
  
    function nextPage(link) {
        if (!link.url || link.active) {
            return;
        }
        loadStaff(link.url)
    }
    function nextDPage(link) {
        if (!link.url || link.active) {
            return;
        }
        loadDisabledStaff(link.url)
    }

    const users = ref({});
    loadStaff()
   
    function loadStaff(url = '/load-staff/1') {
    store.dispatch('getMethod', { url: url }).then((data) => {
        if (data?.status == 200) {
            users.value = data.data;
        }else{
            users.value = data.data;
        }
    })
}
    
    const user_pid = ref(null)
    const assignModal = ref(false)
  
    const assignDepartment = (pid) => {
        user_pid.value = pid;
        assignModal.value = true
    }
    const closeModal = () => {
        assignModal.value = false;
        stepModal.value = false;
        roleModal.value = false;
        formValue.value.roles = [];
        newRole.value = []  
    };


function staffDetail(staff) {
    localStorage.setItem('TVATI_STAFF_DETAIL', JSON.stringify(staff, null, 2))
    router.push({ path: 'staff-detail', query: { staff: staff.pid } })
}
function editStaff(staff) {
    query = {action:'edit', tab: 'personal-tab', 'id': staff?.user_pid }
    let data = {
        staff : staff,
        action : 'edit',
    }
    localStorage.setItem('TVATI_ONBOARD_TAB', JSON.stringify(query, null, 2))
    localStorage.setItem('TVATI_EDIT_STAFF', JSON.stringify(data, null, 2))
    router.push({ path: 'onboarding', query: { staff: staff.pid } })
}

const disableStaff = (pid) =>{
    store.dispatch('deleteMethod', { url: '/disable-staff/'+pid }).then((data) => {
        if (data?.status == 201) {
            loadStaff()
        }
    })
}
const reActivateStaff = (pid) =>{
    store.dispatch('getMethod', { url: '/re-activate-staff/'+pid }).then((data) => {
        if (data?.status == 200) {
            loadDisabledStaff()
        }
    })
}
onMounted(()=>{
    const disableTab = document.querySelector('#next-tab');
    disableTab.addEventListener('click',()=>{
        loadDisabledStaff()
    })
})
const disabledList = ref({})
function loadDisabledStaff(url ='/load-staff/0') {
    store.dispatch('getMethod', { url: url }).then((data) => {
        if (data?.status == 200) {
            disabledList.value = data.data;
        }
    })
}

const resetLink = (pid) =>{
    if(confirm('Are you sure, you want to send a reset link to him/her')){
        store.dispatch('getMethod', { url: '/send-reset-password-link/'+pid })
    }
}

const newRole = ref([])

const roleModal = ref(false)
const name = ref()
const updateRoles = (id,username) => {
    name.value = username
    roleModal.value = true
    newRole.value = []
    formValue.value.id = id;
    store.dispatch('getMethod', { url: '/load-staff-roles/'+id }).then((data) => {
        if (data?.status == 200) {
            newRole.value.push(...data.data);
        }
    })
}

const salary = ref({
    structure_pid: '' ,
    grade_pid: '' ,
    step: '' ,
    user_pid: '' ,
})
const resetSalary = ()=> {
    salary.value = {
        structure_pid: '',
        grade_pid: '',
        step: '',
        user_pid: '',
    }
}
const stepModal = ref(false)
const updateStep = (id) => {
    stepModal.value = true
    salary.value.user_pid = id;
    store.dispatch('getMethod', { url: 'load-staff-basic-salary/'+id }).then((data) => {
        if (data?.status == 200) {
            salary.value = data.data;
        }
    })
}

const updateStaffStep = () => {
    store.dispatch('putMethod', { url: '/update-staff-grade-step', param: salary.value, prompt: 'Are you sure, you want to update the staff Step?' }).then((data) => {
        if (data?.status == 201) {
            resetSalary()
            stepModal.value = false;
        }
    })
} 




const formValue = ref({
    id:'',
    roles:[]
})

const updateStaffRole = () => {
    formValue.value.roles = newRole.value
    store.dispatch('putMethod', { url: '/update-staff-role', param: formValue.value, prompt:'Are you sure, you want to update the staff role?'}).then((data) => {
        if (data?.status == 201) {
            newRole.value = []
            roleModal.value = false
            formValue.value.roles = [];
            newRole.value = []
        }
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



const grades = ref({})

const steps = ref({})
function loadSteps(event) {
    dropdownStep(event.target.value)
}


const loadGrades = (event) => {
    dropdownGrade(event.target.value)
}

function dropdownStep(id) {
    store.dispatch('loadDropdown', 'grade-step/' + id).then(({ data }) => {
        steps.value = data;
    }).catch(e => {
        console.log(e);
    })
}
function dropdownGrade(id) {
    store.dispatch('loadDropdown', 'salary-grade/' + id).then(({ data }) => {
        grades.value = data;
    }).catch(e => {
        console.log(e);
    })
}


const structureDrop = ref({});
function dropdownStructure() {
    store.dispatch('loadDropdown', 'salary-structure').then(({ data }) => {
        structureDrop.value = data;
    }).catch(e => {
        console.log(e);
    })
}
dropdownStructure()

</script>

<style scoped>

</style>
<template>
    <div>
        <div class="container mt-2">
            <div class="card">
                <div class="card-body">
                    <div class="card-header">
                        <h3>Departments</h3>
                    </div>
                     <!-- Default Tabs -->
                      <ul class="nav nav-tabs d-flex" id="myTabjustified" role="tablist">
                        <li class="nav-item flex-fill" role="presentation">
                          <button class="nav-link w-100 active" id="department-tab" data-bs-toggle="tab" data-bs-target="#department" type="button" role="tab" aria-controls="department" aria-selected="true">Department</button>
                        </li>

                        <li class="nav-item flex-fill" role="presentation">
                          <button class="nav-link w-100" id="sub-tab" data-bs-toggle="tab" data-bs-target="#sub" type="button" role="tab" aria-controls="sub" aria-selected="false">Sub Department</button>
                        </li>
                        <li class="nav-item flex-fill" role="presentation">
                          <button class="nav-link w-100" id="desig-tab" data-bs-toggle="tab" data-bs-target="#desig" type="button" role="tab" aria-controls="desig" aria-selected="false">Designation</button>
                        </li>
                        
                      </ul>
                      <div class="tab-content pt-2" id="myTabjustifiedContent">
                        <div class="tab-pane fade show active" id="department" role="tabpanel" aria-labelledby="department-tab">
                            <button class="btn btn-sm btn-primary mb-1" @click="toggleModal=true">Add New</button>
                            <div class="table-responsive">
                                <table class="table-hover table-stripped table-bordered table">
                                    <thead>
                                        <tr>
                                            <th>SN</th>
                                            <th>DEPARTMENT</th>
                                            <th>Sub DEPARTMENT</th>
                                            <th>DESCRIPTION</th>
                                            <th>HEAD</th>
                                            <th> <i class="bi bi-gear-fill"></i> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(dp, loop) in departments.data" :key="dp.pid">
                                            <td>{{ loop + 1 }}</td>
                                            <td>{{ dp.department }}</td>
                                            <td>{{ dp.sub_count }}</td>
                                            <td>{{ dp.description }}</td>
                                            <td>{{ dp.head?.username }}</td>
                                            <td>
                                                <div class="dropdown">
                                                    <button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-bs-toggle="dropdown">
                                                        <i class="bi bi-tools"></i>
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                        <li><a class="dropdown-item pointer" @click="editDept(dp)">Edit</a></li>
                                                        <li><a class="dropdown-item pointer" @click="openModal(dp.pid)">Assign</a></li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="flex justify-center mt-4">
                                        <nav class="relative justify-center rounded-md shadow pagination">
                                            <pagination-links v-for="(link, i) of departments.links" :link="link" :key="i"
                                                @next="nextPage($event,link)"></pagination-links>
                                        </nav>
                                    </div>
                            </div>
                        </div>

                        <div class="tab-pane fade" id="sub" role="tabpanel" aria-labelledby="sub-tab">
                            <SubDepartment/>
                        </div>
                        <div class="tab-pane fade" id="desig" role="tabpanel" aria-labelledby="desig-tab">
                            
                            <div class="row">
                                <div class="col-md-4">
                                    <fieldset class="border rounded-3 p-2 m-1">
                                    <legend class="float-none w-auto px-2 h5">Create Designation</legend>
                                <form >
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Designation</label>
                                                <input type="text" v-model="desig.name" class="form-control" placeholder="e.g graduate trainy">
                                                <p class="text-danger " v-if="desig_error?.name">{{ desig_error?.name[0] }}</p>
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="form-label">Description</label>
                                            <textarea type="text" v-model="desig.description" class="form-control" placeholder="any description"></textarea>
                                            <p class="text-danger " v-if="desig_error?.description">{{ desig_error?.description[0] }}</p>
                                        </div>
                                    </div>

                                    </div>
                                    <button type="button" class="btn btn-success btn-sm mt-2" @click="createDesignation">Submit</button>
                                </form>
                            </fieldset>
                                </div>
                                <div class="col-md-8">
                                    <div class="table-responsive">
                                    <table class="table-hover table-stripped table-bordered table">
                                        <thead>
                                            <tr>
                                                <th>SN</th>
                                                <th>DESIGNATION</th>
                                                <th>STATUS</th>
                                                <th>DESCRIPTION</th>
                                                <th> <i class="bi bi-gear-fill"></i> </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(dp, loop) in designations.data" :key="dp.pid">
                                                <td>{{ loop + 1 }}</td>
                                                <td>{{ dp.name }}</td>
                                                <td>{{ dp.status == 1 ? 'ENABLED' : 'DISABLED' }}</td>
                                                <td>{{ dp.description }}</td>
                                                <td>
                                                    <div class="dropdown">
                                                        <button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-bs-toggle="dropdown">
                                                            <i class="bi bi-tools"></i>
                                                        </button>
                                                        <ul class="dropdown-menu">
                                                            <li><a class="dropdown-item pointer" @click="editDesig(dp)">Edit</a></li>
                                                            <li><a class="dropdown-item pointer bg-danger" @click="deleteDeisg(dp.pid)">Delete</a></li>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="flex justify-center mt-4">
                                        <nav class="relative justify-center rounded-md shadow pagination">
                                            <pagination-links v-for="(link, i) of designations.links" :link="link" :key="i"
                                                @next="nextDPage($event,link)"></pagination-links>
                                        </nav>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <o-modal :isOpen="toggleModal" modal-class="modal-xs" @submit="createDepartment" title="Create Department" @modal-close="closeModal">
            <template #content>
                <div>
                    <p class="text-danger small">Note Head of Department must have the role of [HOD]</p>
                    <form >
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="form-label">Department</label>
                                    <input type="text" v-model="dept.department" class="form-control" placeholder="Name of department">
                                    <p class="text-danger " v-if="errors?.department">{{ errors?.department[0] }}</p>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="form-label">Description</label>
                                    <textarea type="text" v-model="dept.description" class="form-control" placeholder="Name of department"></textarea>
                                    <p class="text-danger " v-if="errors?.description">{{ errors?.description[0] }}</p>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="form-label">Head of Department</label>
                                    <Select2 v-model="dept.head_pid" :options="users" :settings="{ width: '100%' }"  />
                                    <p class="text-danger " v-if="errors?.head">{{ errors?.head[0] }}</p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </template>
        </o-modal>

        <o-modal :isOpen="isModalOpened" modal-class="modal-xs" @submit="assignDepartment" title="Assign Department" @modal-close="closeModal">
            <template #content>
                <div>
                    <form  >
                        <div class="row">

                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="form-label">Sub Department </label>
                                    <Select2 v-model="dept.sub_department" :options="sub" :settings="{ width: '100%' }"  />
                                    <p class="text-danger " v-if="a_errors?.sub_department">{{ a_errors?.sub_department[0] }}</p>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="form-label">Staff  <span>*</span> </label>
                                    <Select2 v-model="dept.user_pid" :options="users" :settings="{ width: '100%' }"  />
                                    <p class="text-danger " v-if="a_errors?.user_pid">{{ a_errors?.user_pid[0] }}</p>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </template>
        </o-modal>
    </div>
</template>

<script setup>
import store from "@/store";
import { ref, onMounted } from "vue";
import Select2 from 'vue3-select2-component';
import OModal from "@/components/OModal.vue";
import SubDepartment from "@/components/department/SubDepartment.vue"
import PaginationLinks from "@/components/PaginationLinks.vue";

const isModalOpened = ref(false);

const openModal = (pid) => {
    isModalOpened.value = true;
    assign.value.department_pid = pid;
    loadSubDept(pid)
};
const closeModal = () => {
    isModalOpened.value = false;
    toggleModal.value = false;
    resetDept()
};
const toggleModal = ref(false);

    
    const departments = ref({});
    const dept = ref({
        'department':'' ,
        'description':'' , 
        'head_pid':'' , 
    });
    const resetDept = () => {
        dept.value ={
            'department': '',
            'description': '',
            'head_pid': '',
        }
    }
    const assign = ref({
        department_pid: '',
        sub_department: '',
        user_pid:''
    });
   
 
    function editDept(data){
        dept.value = {
            'department': data.department ,
            'description': data.description,
            'head_pid': data.head_pid,
            'pid': data.pid
        }
        toggleModal.value = true
    }

    const errors = ref({})
    function createDepartment() {
    errors.value = []
    store.dispatch('postMethod', { url: '/create-department', param: dept.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data
        } else if (data?.status == 201) {
            closeModal();
            loadDepartment()
        }
    })
}


     const assign_sub = ref({
        sub_department: '',
        user_pid: ''
    });

    const a_errors = ref({})
    function assignDepartment() {
        a_errors.value = []
        store.dispatch('postMethod', { url: '/assign-department', param: dept.value }).then((data) => {
            if (data?.status == 422) {
                a_errors.value = data.data;
            }
        })
    }
    
    

const desig = ref({
    name : '' ,
    description: '',
})

const editDesig = (ds) => {
    desig.value = {
        name :ds.name ,
        description:ds.description ,
        pid: ds.pid ,
        status : ds.status
    }
}
const deleteDeisg = (pid) =>{
    if(confirm('are you sure you want to delete this ?')){
       store.dispatch('deleteMethod', { url: '/delete-designation/'+pid }).then(() => {
            loadDesignation()
        })
    }
}
const desig_error = ref(false)
function createDesignation(){
    desig_error.value = []
    store.dispatch('postMethod', { url: '/create-designation', param: desig.value }).then((data) => {
        if (data?.status == 422) {
            desig_error.value = data.data
        } else if (data?.status == 201) {
            assign_sub.value.name = '';
            assign_sub.value.description = '';
            loadDesignation()
        }
    })
}

    loadDepartment()
    
    function loadDepartment(url ='/load-departments') {
        store.dispatch('getMethod', { url: url }).then((data) => {
            if (data?.status == 200) {
                departments.value = data.data;
            }
        })
    }
    // load-designation
    const designations = ref({});
    function loadDesignation(url = '/load-designation') {
        store.dispatch('getMethod', { url: url }).then((data) => {
            if (data?.status == 200) {
                designations.value = data.data;
            }else{
                designations.value = {}
            }
        })
    }

    const users = ref([]);
    function dropdownAllow() {
        store.dispatch('loadDropdown', 'hod').then(({ data }) => {
            users.value = data;
        }).catch(e => {
            console.log(e);
        })
    }
    dropdownAllow()

    const deptDrop = ref([]);
    function dropdownDepts() {
        store.dispatch('loadDropdown', 'departments').then(({ data }) => {
            deptDrop.value = data;
        })
    }
    dropdownDepts()

    const sub = ref([]);
    function loadSubDept(pid) {
        store.dispatch('loadDropdown', 'sub-departments/' + pid).then(({ data }) => {
            sub.value = data;
        }).catch(e => {
            console.log(e);
        })
    }

     onMounted(() => {
        // const subTab = document.querySelector('#sub-tab');
        const desigTab = document.querySelector('#desig-tab');
        // subTab.addEventListener('click',()=>{
        //     loadSubDepartment()
        // })
        desigTab.addEventListener('click',()=>{
            loadDesignation()
        })
     })

    function nextPage(link) {
        if (!link.url || link.active) {
            return;
        }
        loadDepartment(link.url)
    }
    function nextDPage(link) {
        if (!link.url || link.active) {
            return;
        }
        loadDesignation(link.url)
    }
</script>

<style scoped>

</style>
<template>
    <div>
        <div class="container mt-2">
            <div class="card">
                <div class="card-body">
                    <div class="card-header"></div>
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
                         
                            <div class="row">
                                <div class="col-md-4">
                                      <fieldset class="border rounded-3 p-2 m-1">
                                                <legend class="float-none w-auto px-2">Create Department</legend>
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
                                                    <button type="button" class="btn btn-success btn-sm mt-2" @click="createDepartment">Submit</button>
                                                </form>
                                            </fieldset>
                                </div>
                                <div class="col-md-8">
                                    <div class="table-responsive">
                                    <table class="table-hover table-stripped table-bordered table">
                                        <thead>
                                            <tr>
                                                <th>SN</th>
                                                <th>DEPARTMENT</th>
                                                <th>Sub DEPARTMENT</th>
                                                <th>DESCRIPTION</th>
                                                <th>HEAD</th>
                                                <th> <i class="bi bi-pencil-fill"></i> </th>
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
                                </div>
                                </div>
                            </div>
                      
                        </div>

                        <div class="tab-pane fade" id="sub" role="tabpanel" aria-labelledby="sub-tab">
                            
                            <div class="row">
                                <div class="col-md-4">
                                    <fieldset class="border rounded-3 p-2 m-1">
                                <legend class="float-none w-auto px-2 h5">Create Sub Department</legend>
                                <form >
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Department</label>
                                                <Select2 v-model="sub.department_pid" :options="deptDrop" :settings="{ width: '100%' }"  />
                                                <p class="text-danger " v-if="sub_error?.department_pid">{{ sub_error?.department_pid[0] }}</p>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Sub Department</label>
                                                <input type="text" v-model="sub.name" class="form-control" placeholder="e.g sub operation">
                                                <p class="text-danger " v-if="sub_error?.name">{{ sub_error?.name[0] }}</p>
                                            </div>
                                        </div>

                                        <!-- <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="form-label">Description</label>
                                            <textarea type="text" v-model="sub.description" class="form-control" placeholder="Name of department"></textarea>
                                            <p class="text-danger " v-if="sub_error?.description">{{ sub_error?.description[0] }}</p>
                                        </div>
                                    </div> -->

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Head of Department</label>
                                                <Select2 v-model="sub.head" :options="users" :settings="{ width: '100%' }"  />
                                                <p class="text-danger " v-if="sub_error?.head">{{ sub_error?.head[0] }}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="button" class="btn btn-success btn-sm mt-2" @click="createSubDepartment">Submit</button>
                                </form>
                            </fieldset>
                                </div>
                                <div class="col-md-8">
                                    <div class="table-responsive">
                                    <table class="table-hover table-stripped table-bordered table">
                                        <thead>
                                            <tr>
                                                <th>SN</th>
                                                <th>DEPARTMENT</th>
                                                <th>Sub Department</th>
                                                <th>HEAD</th>
                                                <th> <i class="bi bi-pencil-fill"></i> </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(dp, loop) in sub_depts.data" :key="dp.pid">
                                                <td>{{ loop + 1 }}</td>
                                                <td>{{ dp.department.department }}</td>
                                                <td>{{ dp.name }}</td>
                                                <td>{{ dp.head.username }}</td>
                                                <td>
                                                    <div class="dropdown">
                                                        <button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-bs-toggle="dropdown">
                                                            <i class="bi bi-tools"></i>
                                                        </button>
                                                        <ul class="dropdown-menu">
                                                            <li><a class="dropdown-item pointer" @click="editDept(dp)">Edit</a></li>
                                                            <li><a class="dropdown-item pointer" @click="showModal(dp.pid)">Assign</a></li>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                </div>
                            </div>
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
                                            <textarea type="text" v-model="desig.description" class="form-control" placeholder="for the drvie force"></textarea>
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
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <dynamic-modal :isOpen="isModalOpened" @modal-close="closeModal" @submit="submitHandler" :modal="small" name="first-modal">
            <template #header>Update Department Head</template>
            <template #content>
                <div class="col-md-12">
                    <div class="form-group">
                        <label class="form-label">Head of Department</label>
                        <select v-model="assign.user_pid" class="form-control form-control-sm">
                            <option value="" selected>Select Staff</option>
                            <option v-for="dp in users" :key="dp.id" :value="dp.id" >{{ dp.text }}</option>
                        </select>
                        <!-- <Select2 v-model="dept.head" :options="users" :settings="{ width: '100%' }"  /> -->

                        <p class="text-danger " v-if="e_errors?.user_pid">{{ e_errors?.user_pid[0] }}</p>
                    </div>
                </div>
            </template>
        </dynamic-modal>

        <dynamic-modal :isOpen="toggleModal" @modal-close="closeModal" @submit="assignSubDepartnemt" :modal="small" >
            <template #header>Update Sub Department Head</template>
            <template #content>
                <div class="col-md-12">
                    <div class="form-group">
                        <label class="form-label">Head of Department</label>
                        <select v-model="assign_sub.user_pid" class="form-control form-control-sm">
                            <option value="" selected>Select Staff</option>
                            <option v-for="dp in users" :key="dp.id" :value="dp.id" >{{ dp.text }}</option>
                        </select>

                        <p class="text-danger " v-if="s_errors?.user_pid">{{ s_errors?.user_pid[0] }}</p>
                    </div>
                </div>
            </template>
        </dynamic-modal>
    </div>
</template>

<script setup>
import store from "@/store";
import { ref, onMounted } from "vue";
import Select2 from 'vue3-select2-component';
// import DepartmentForm from "@/components/forms/department/DepartmentForm.vue"
import DynamicModal from "@/components/DynamicModal.vue";

const isModalOpened = ref(false);

const openModal = (pid) => {
    isModalOpened.value = true;
    assign.value.department_pid = pid;
};
const closeModal = () => {
    isModalOpened.value = false;
    toggleModal.value = false;

};
const toggleModal = ref(false);

const showModal = (pid) => {

    toggleModal.value = true;
    assign_sub.value.sub_department = pid;
};
 

// import { useRouter } from 'vue-router';
// const router = useRouter()

    
    const departments = ref({});
    const dept = ref({
        'department':'' ,
        'description':'' , 
        'head_pid':'' , 
    });
    const assign = ref({
        department_pid: '',
        user_pid:''
    });
   
    const sub = ref({
        'department_pid':'' ,
        'name':'' ,
        'description':'' , 
        'head':'' , 
    });

    // const editDept = ()=>{

    // }
    function editDept(data){
        dept.value = {
            'department': data.department ,
            'description': data.description,
            'head_pid': data.head_pid,
            'pid': data.pid
        }
    }

    const errors = ref({})
    function createDepartment() {
    store.commit('setSpinner', true)
    errors.value = []
    store.dispatch('postMethod', { url: '/create-department', param: dept.value }).then((data) => {
        if (data.status == 422) {
            errors.value = data.data
        } else if (data.status == 201) {
            dept.value = [];
        }
        store.commit('setSpinner', false)
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
    })
}

    const sub_error = ref({})
    function createSubDepartment() {
        store.commit('setSpinner', true)
        sub_error.value = []
        store.dispatch('postMethod', { url: '/create-sub-department', param: sub.value }).then((data) => {
            if (data.status == 422) {
                sub_error.value = data.data
            } else if (data.status == 201) {
                sub.value = [];
            }
            store.commit('setSpinner', false)
        }).catch(e => {
            store.commit('setSpinner', false)
            console.log(e);
        })
    }
    const a_error = ref({})
    function submitHandler() {
        store.commit('setSpinner', true)
        sub_error.value = []
        store.dispatch('postMethod', { url: '/assign-department-head', param: assign.value }).then((data) => {
            if (data.status == 422) {
                a_error.value = data.data
            } else if (data.status == 201) {
                assign.value = [];
            }
            store.commit('setSpinner', false)
        }).catch(e => {
            store.commit('setSpinner', false)
            console.log(e);
        })
    }

     const assign_sub = ref({
        sub_department: '',
        user_pid: ''
    });
    const s_error = ref({})

    function assignSubDepartnemt() {
        store.commit('setSpinner', true)
        s_error.value = []
        store.dispatch('postMethod', { url: '/assign-sub-department-head', param: assign_sub.value }).then((data) => {
            if (data.status == 422) {
                s_error.value = data.data
            } else if (data.status == 201) {
                assign_sub.value = [];
            }
            store.commit('setSpinner', false)
        }).catch(e => {
            store.commit('setSpinner', false)
            console.log(e);
        })
    }


    const sub_depts = ref({})    
function loadSubDepartment() {
    store.commit('setSpinner', true)
    store.dispatch('getMethod', { url: '/load-sub-departments' }).then((data) => {
        store.commit('setSpinner', false)
        if (data.status == 200) {
            sub_depts.value = data.data;
        }
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
        alert('weting be this')
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
        }).catch(e => {
            store.commit('setSpinner', false)
            console.log(e);
        })
    }
}
const desig_error = ref(false)
function createDesignation(){
    store.commit('setSpinner', true)
    desig_error.value = []
    store.dispatch('postMethod', { url: '/create-designation', param: desig.value }).then((data) => {
        if (data.status == 422) {
            desig_error.value = data.data
        } else if (data.status == 201) {
            assign_sub.value = [];
            loadDesignation()
        }
        store.commit('setSpinner', false)
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
    })
}

    loadDepartment()
    
    function loadDepartment() {
        store.commit('setSpinner', true)
        store.dispatch('getMethod', { url: '/load-departments' }).then((data) => {
            store.commit('setSpinner', false)
            if (data.status == 200) {
                departments.value = data.data;
            }
        }).catch(e => {
            store.commit('setSpinner', false)
            console.log(e);
            alert('weting be this')
        })
    }
    // load-designation
    const designations = ref({});
    function loadDesignation() {
        store.commit('setSpinner', true)
        store.dispatch('getMethod', { url: '/load-designation' }).then((data) => {
            store.commit('setSpinner', false)
            if (data.status == 200) {
                designations.value = data.data;
            }
        }).catch(e => {
            store.commit('setSpinner', false)
            console.log(e);
            alert('weting be this')
        })
    }

    const users = ref([]);
    function dropdownAllow() {
        store.dispatch('loadDropdown', 'users').then(({ data }) => {
            users.value = data;
        }).catch(e => {
            console.log(e);
            alert('Something Went Wrong')
        })
    }
    dropdownAllow()

    const deptDrop = ref([]);
    function dropdownDepts() {
        store.dispatch('loadDropdown', 'departments').then(({ data }) => {
            deptDrop.value = data;
        }).catch(e => {
            console.log(e);
            alert('Something Went Wrong')
        })
    }
    dropdownDepts()

     onMounted(() => {
        const subTab = document.querySelector('#sub-tab');
        const desigTab = document.querySelector('#desig-tab');
        subTab.addEventListener('click',()=>{
            loadSubDepartment()
        })
        desigTab.addEventListener('click',()=>{
            loadDesignation()
        })
     })
</script>

<style scoped>

</style>
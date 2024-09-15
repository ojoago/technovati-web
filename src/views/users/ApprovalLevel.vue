<template>
    <div>
        <div class="container mt-2">
            <div class="card">
                <div class="card-body">
                    <div class="card-header">
                        <h3>Approval Level</h3>
                    </div>
                    <button class="btn btn-sm btn-primary m-2" @click="toggleModal=true">Add New</button>
                    <div class="row">
                            <div class="col-md-4">
                            <fieldset class="border rounded-3 p-2 m-1">
                                <legend class="float-none w-auto px-2">Levels</legend>
                                <div class="table-responsive">
                                    <table class="table-hover table-stripped table-bordered table">
                                        <thead>
                                            <tr>
                                                <th>title</th>
                                                <th>level</th>
                                                <th width ="5%" > <i class="bi bi-gear-fill"></i> </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(dp, loop) in levels" :key="loop">
                                                <td>{{ dp.title }}</td>
                                                <td>{{ dp.level }}</td>
                                                <td>
                                                    <div class="dropdown">
                                                        <button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-bs-toggle="dropdown">
                                                            <i class="bi bi-tools"></i>
                                                        </button>
                                                        <ul class="dropdown-menu">
                                                            <li><a class="dropdown-item pointer" @click="editLevel(dp)">Edit</a></li>
                                                            <li><a class="dropdown-item pointer" @click="openModal(dp.level)">Assign</a></li>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    
                                </div>
                            </fieldset>
                        </div>
                        <div class="col-md-8">
                            <fieldset class="border rounded-3 p-2 m-1">
                                <legend class="float-none w-auto px-2">Assigend Level</legend>
                                <div class="table-responsive">
                                    <table class="table-hover table-stripped table-bordered table">
                                        <thead>
                                            <tr>
                                                <th>Username</th>
                                                <th>Full name</th>
                                                <th>level</th>
                                                 <th width ="5%" > <i class="bi bi-gear-fill"></i> </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(dp, loop) in assigned" :key="loop">
                                                <td>{{ dp.username }}</td>
                                                <td>{{ `${dp.lastname} ${dp.firstname}` }}  {{ dp.othername }}</td>
                                                <td>{{ dp.level }}</td>
                                                <td> <i class="bi bi-trash pointer" title="revoke level" @click="revokeLevel(dp.pid)"></i></td>
                                               
                                            </tr>
                                        </tbody>
                                    </table>
                                    
                                </div>
                            </fieldset>
                        </div>
                    </div>
                     <!-- Default Tabs -->
                      
                     
                </div>
            </div>
        </div>

        <o-modal :isOpen="toggleModal" modal-class="modal-xs" @submit="createApprovalLevel" title="Create Approval Level" @modal-close="closeModal">
            <template #content>
                <div>
                    <form >
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="form-label">Title</label>
                                    <input type="text" v-model="level.title" class="form-control form-control-sm" placeholder="e.g level 1">
                                    <p class="text-danger " v-if="errors?.title">{{ errors?.title }}</p>
                                </div>
                            </div>
                            
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="form-label">Level</label>
                                    <select class="form-control form-control-sm" v-model="level.level">
                                        <option value="" disabled selected>Select Level</option>
                                        <option value="2">02</option>
                                        <option value="3">03</option>
                                        <option value="4">04</option>
                                    </select>
                                    <p class="text-danger " v-if="errors?.level">{{ errors?.level }}</p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </template>
        </o-modal>

        <o-modal :isOpen="isModalOpened" modal-class="modal-xs" @submit="assignLevel" title="Assign Level" @modal-close="closeModal">
            <template #content>
                <div>
                    <form  >
                        <div class="row">

                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="form-label">Staff  <span>*</span> </label>
                                    <Select2 v-model="assign.user_pid" :options="users" :settings="{ width: '100%' }"  />
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
import { ref } from "vue";
import Select2 from 'vue3-select2-component';
import OModal from "@/components/OModal.vue";
import { formatError } from "@/composables/formatError";
const {transformValidationErrors} = formatError()
const isModalOpened = ref(false);

const openModal = (level) => {
    isModalOpened.value = true;
    assign.value.level = level;
};
const closeModal = () => {
    isModalOpened.value = false;
    toggleModal.value = false;
    resetAttr()
};
const toggleModal = ref(false);

    
    const levels = ref({});
    const level = ref({
        'title':'' ,
        'level':'' , 
    });
    const resetAttr = () => {
        level.value ={
            'title':'' ,
            'level':'' , 
        }
    }
    const assign = ref({
        level: '',
        user_pid:''
    });
   
 
    function editLevel(data){
        level.value = {
            'title':data.title ,
            'level':data.level , 
            'id': data.id
        }
        toggleModal.value = true
    }

    const errors = ref({})
    function createApprovalLevel() {
        errors.value = []
        store.dispatch('postMethod', { url: '/create-approval-level', param: level.value }).then((data) => {
            if (data?.status == 422) {
                errors.value = transformValidationErrors(data.data)
            } else if (data?.status == 201) {
                closeModal();
                loadApprovalLevel()
            }
        })
    }

    const a_errors = ref({})
    function assignLevel() {
        a_errors.value = []
        store.dispatch('postMethod', { url: '/assign-level', param: assign.value }).then((data) => {
            if (data?.status == 422) {
                a_errors.value = data.data;
            }else if(data?.status == 201 ){
                closeModal();
                loadAssignLevel()
            }
        })
    }
    
    const revokeLevel  = (pid)  => {
         store.dispatch('putMethod', { url: '/revoke-level/'+pid, prompt:'Are you sure, you want to revoke this right?' }).then((data) => {
            if (data?.status == 201) {
                closeModal();
                loadAssignLevel()
            }
        })
    }


    loadApprovalLevel()
    
    function loadApprovalLevel(url ='/load-approval-levels') {
        store.dispatch('getMethod', { url: url }).then((data) => {
            if (data?.status == 200) {
                levels.value = data.data;
            }else{
                levels.value = {}
            }
        })
    }

    loadAssignLevel()
    const assigned = ref({})
    function loadAssignLevel(url ='/load-assign-levels') {
        store.dispatch('getMethod', { url: url }).then((data) => {
            if (data?.status == 200) {
                assigned.value = data.data;
            }else{
                assigned.value = {}
            }
        })
    }
    // load-designation
    // const designations = ref({});
    // function loadDesignation(url = '/load-designation') {
    //     store.dispatch('getMethod', { url: url }).then((data) => {
    //         if (data?.status == 200) {
    //             designations.value = data.data;
    //         }else{
    //             designations.value = {}
    //         }
    //     })
    // }

    const users = ref([]);
    function dropdownAllow() {
        store.dispatch('loadDropdown', 'users').then(({ data }) => {
            users.value = data;
        }).catch(e => {
            console.log(e);
        })
    }
    dropdownAllow()

   


    //  onMounted(() => {
    //     // const subTab = document.querySelector('#sub-tab');
    //     const desigTab = document.querySelector('#desig-tab');
    //     // subTab.addEventListener('click',()=>{
    //     //     loadSubDepartment()
    //     // })
    //     desigTab.addEventListener('click',()=>{
    //         loadDesignation()
    //     })
    //  })


</script>

<style scoped>

</style>
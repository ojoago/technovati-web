<template>
    <div>
        <div class="container-fluid mt-2">
            <div class="card">
                <div class="card-body">
                    <h3 class="card-title">Leave Configuration</h3>

                    <!-- Default Tabs -->
                    <ul class="nav nav-tabs d-flex" id="myTabjustified" role="tablist">
                        <li class="nav-item flex-fill" role="presentation">
                            <button class="nav-link w-100 active" id="config-tab" data-bs-toggle="tab"
                                data-bs-target="#config" type="button" role="tab" aria-controls="config"
                                aria-selected="true">Config</button>
                        </li>
                        <li class="nav-item flex-fill" role="presentation">
                            <button class="nav-link w-100" id="request-tab" data-bs-toggle="tab"
                                data-bs-target="#request" type="button" role="tab" aria-controls="request"
                                aria-selected="false">Assign Leave</button>
                        </li>

                    </ul>
                    <div class="tab-content pt-2" id="myTabjustifiedContent">
                        <div class="tab-pane fade show active" id="config" role="tabpanel" aria-labelledby="config-tab">

                            <div class="row">
                                <div class="col-md-4">
                                    <fieldset class="border rounded-3 p-2 m-1">
                                        <legend class="float-none w-auto px-2">Add Leave</legend>
                                        <form id="lform">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label class="form-label">Leave <span
                                                                class="text-danger">*</span></label>
                                                        <input type="text" v-model="leave.leave" class="form-control"
                                                            placeholder="e.g annual leave">
                                                        <p class="text-danger " v-if="errors?.leave">{{ errors?.leave
                                                            }}</p>
                                                    </div>
                                                </div>
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label class="form-label">Days</label>
                                                        <input type="number" v-model="leave.days" class="form-control"
                                                            placeholder="e.g 15 ">
                                                        <p class="text-danger " v-if="errors?.days">{{ errors?.days
                                                            }}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label class="form-label">Description </label>
                                                        <textarea type="text" v-model="leave.description"
                                                            class="form-control"
                                                            placeholder="e.g any description"></textarea>
                                                        <p class="text-danger " v-if="errors?.description">{{
                                                            errors?.description }}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <button type="button" class="btn btn-success btn-sm mt-2"
                                                @click="createLeave">Submit</button>
                                        </form>
                                    </fieldset>
                                </div>
                                <div class="col-md-8">
                                    <fieldset class="border rounded-3 p-2 m-1">
                                        <legend class="float-none w-auto px-2">Leaves</legend>
                                        <div class="table-responsive">
                                            <table class="table-hover table-stripped table-bordered table">
                                                <thead>
                                                    <tr>
                                                        <th>SN</th>
                                                        <th>Leave</th>
                                                        <th>Days</th>
                                                        <th>Description</th>
                                                        <th> <i class="bi bi-gear-fill"></i> </th>
                                                    </tr>
                                                </thead>
                                                <tbody v-if="leaves.data">
                                                    <tr v-for="(lv, loop) in leaves.data" :key="loop">
                                                        <td>{{ loop + 1 }}</td>
                                                        <td>{{ lv.leave }}</td>
                                                        <td>{{ lv.days }}</td>
                                                        <td>{{ lv.description }}</td>
                                                        <td>
                                                            <div class="dropdown">
                                                                <button type="button"
                                                                    class="btn btn-primary btn-sm dropdown-toggle"
                                                                    data-bs-toggle="dropdown">
                                                                    <i class="bi bi-tools"></i>
                                                                </button>
                                                                <ul class="dropdown-menu">
                                                                    <li class="bg-warning"><a
                                                                            class="dropdown-item pointer"
                                                                            @click="editLeave(lv)">Edit</a> </li>
                                                                    <li class="bg-danger"><a
                                                                            class="dropdown-item pointer"
                                                                            @click="deleteLeave(lv.pid)">Delete</a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                                <tfoot v-else class="text-center" style="width: 100%" width="100%">
                                                    <tr>
                                                        <td colspan="50"><small class="small">No Record Yet</small>
                                                        </td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                            <div class="flex justify-center mt-4">
                                                <nav class="relative justify-center rounded-md shadow pagination">
                                                    <pagination-links v-for="(link, i) of leaves.links" :link="link"
                                                        :key="i" @next="nextPage(link)"></pagination-links>
                                                </nav>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>

                        </div>
                        <div class="tab-pane fade" id="request" role="tabpanel" aria-labelledby="request-tab">
                            <fieldset class="border rounded-3 p-2 m-1">
                                <legend class="float-none w-auto px-2">Assign Leave </legend>
                                <button class="btn btn-primary btn-sm mb-2" @click="assignFunc">Assign</button>
                                <div class="table-responsive">
                                    <table class="table-hover table-stripped table-bordered table">
                                        <thead>
                                            <tr>
                                                <th>SN</th>
                                                <th>Leave</th>
                                                <th>Days</th>
                                                <th>Designation</th>
                                                <!-- <th> <i class="bi bi-gear-fill"></i> </th> -->
                                            </tr>
                                        </thead>
                                        <tbody v-if="dlvx">
                                            <tr v-for="(lv, loop) in dlvx" :key="loop">
                                                <td>{{ loop + 1 }}</td>
                                                <td>{{ lv.leave }}</td>
                                                <td>{{ lv.days }}</td>
                                                <td>{{ lv.name }}</td>

                                                <!-- <td>
                                                    <div class="dropdown">
                                                        <button type="button" class="btn btn-primary btn-sm">
                                                            Remove
                                                        </button>
                                                    </div>
                                                </td> -->
                                            </tr>
                                        </tbody>
                                        <tfoot v-else class="text-center" style="width: 100%" width="100%">
                                            <tr>
                                                <td colspan="50"><small class="small">No Record Yet</small> </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                    <!-- End  Tabs -->

                </div>
            </div>

        </div>
        
        <o-modal :isOpen="assignModal" @submit="assignLeave" modal-class="modal-sm" title="Assign Leave"
            @modal-close="closeModal">
            <template #content>
                <div>
                    <form id="aForm">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="form-label">Leave <span class="text-danger">*</span></label>
                                    <select v-model="assign.leave_pid" class="form-control form-control-sm">
                                        <option value="" selected>Make Selection</option>
                                        <option v-for="(leave, i) in lvx" :key="i" :value="leave.id">{{ leave.text
                                            }} - {{ leave.days }} days</option>
                                    </select>
                                    <p class="text-danger " v-if="errors?.leave_pid">{{ errors?.leave_pid }}</p>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="form-label">Designations <span class="text-danger">*</span></label>
                                    <Select2 v-model="assign.designation_pid" :options="desigs"
                                        :settings="{ width: '100%' }" />

                                    <p class="text-danger " v-if="errors?.from">{{ errors?.from }}</p>
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
import PaginationLinks from "@/components/PaginationLinks.vue";
import OModal from "@/components/OModal.vue";
import Select2 from 'vue3-select2-component';
import { formatError } from "@/composables/formatError";
 const {transformValidationErrors} = formatError()

const assignModal = ref(false)
const closeModal = () => {
    assignModal.value = false;
};

const assignFunc = () => {
    assignModal.value = true;
    dropdownLeave()
}
const errors = ref({});

// const requests = ref({});
const leave = ref({
    leave: '',
    days : '',
    description : ''
});
const resetAttr = () => {
    leave.value = {
        leave: '',
        days: '',
        description: '',
        pid: ''
    }
}
const leaves = ref({});

function createLeave() {
    errors.value = []
    store.dispatch('postMethod', {url:'/create-leave',param:leave.value}).then((data) => {
        if (data?.status == 422) {
            errors.value = transformValidationErrors(data.data)
        } else if (data?.status == 201) {
            resetAttr()
            loadLeaves()
        }
    }) 
}

const assign = ref({
    leave_pid:'',
    designation_pid:''
})
const resetA = () => {
    assign.value = {
        leave_pid: '',
        designation_pid: ''        
    }
}

function assignLeave() {
    errors.value = []
    store.dispatch('postMethod', {url:'/assign-leave',param:assign.value}).then((data) => {
        if (data?.status == 422) {
            errors.value = transformValidationErrors(data.data)
        } else if (data?.status == 201) {
            resetA()
            loadAssignLeave()
        }
    }) 
}

const editLeave = (lv) =>{
    leave.value = {
        leave: lv.leave ,
        days: lv.days ,
        description: lv.description ,
        pid: lv.pid
    }
}

const deleteLeave = (pid) => {
    store.dispatch('deleteMethod',{url:'delete-leave/'+pid}).then((data)=>{
        if(data?.status == 201){
            loadLeaves()
        }
    })
}
 
loadLeaves()

function loadLeaves(url = '/load-leaves') {
    store.dispatch('getMethod', { url: url}).then((data) => {
        if (data?.status == 200) {
            leaves.value = data.data;
        }else{
            leaves.value = {}
        }
    })
}
 
 
loadAssignLeave()
const dlvx = ref({})
function loadAssignLeave() {
    store.dispatch('getMethod', { url: '/load-assigned-leaves'}).then((data) => {
        if (data?.status == 200) {
            dlvx.value = data.data;
        }
    })
}
 
const desigs = ref([]);
function dropdownAllow() {
    store.dispatch('loadDropdown', 'designations').then(({ data }) => {
        desigs.value = data;
    }).catch(e => {
        console.log(e);
    })
}
dropdownAllow()

const lvx = ref([]);
function dropdownLeave() {
    store.dispatch('loadDropdown', 'leaves').then(({ data }) => {
        lvx.value = data;
    }).catch(e => {
        console.log(e);
    })
}
dropdownLeave()

function nextPage(link) {

    if (!link.url || link.active) {
        return;
    }
    loadLeaves(link.url)
}


</script>

<style scoped>

</style>
<template>
    <div>
        <div class="container mt-2">
            <div class="row">

                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">
                            Appraisal Configurations

                            <button class="btn btn-primary btn-sm" @click="configModal=true">Configure
                                Appraisal</button>

                        </div>
                        <div class="card-body">

                            <div class="table-responsive">
                                <table class="table-hover table-stripped table-bordered table">
                                    <thead>
                                        <tr>
                                            <th>SN</th>
                                            <th>Cycle</th>
                                            <th>Year</th>
                                            <th>Month</th>
                                            <th>Begin date</th>
                                            <th>End date</th>
                                            <th>Note</th>
                                            <th>Status</th>
                                            <th> <i class="bi bi-gear-fill"></i> </th>
                                        </tr>
                                    </thead>
                                    <tbody class="mb-2" v-if="apparisals.data">
                                        <tr v-for="(data, loop) in apparisals.data" :key="loop">
                                            <td>{{ loop + 1 }}</td>
                                            <td>{{ data.cycle.title }}</td>
                                            <td>{{ data.year }}</td>
                                            <td>{{ data.month }}</td>
                                            <td>{{ data.start }}</td>
                                            <td>{{ data.end }}</td>
                                            <td>{{ data.note }}</td>
                                            <td>{{ data?.status_name }}</td>
                                            <td>
                                                <div class="dropdown" v-if="data?.status==1">
                                                    <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                                        data-bs-toggle="dropdown">
                                                        <i class="bi bi-tools"></i>
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                        <li><a class="dropdown-item pointer bg-primary text-white"
                                                                @click="configureCycle(data.pid)">Map To Staff</a> </li>
                                                        <li><a class="dropdown-item pointer bg-warning"
                                                                @click="editCycle(data)">Edit</a> </li>
                                                        <li><a class="dropdown-item pointer bg-info"
                                                                @click="lockAppraisal(data.pid)">Lock Appraisal</a>
                                                        </li>
                                                        <li><a class="dropdown-item pointer bg-danger"
                                                                @click="deleteAppraisal(data.pid)">Delete</a> </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tfoot v-else class="text-center" style="width: 100%" width="100%">
                                        <tr>
                                            <td colspan="50"><small class="small">No Record Yet</small> </td>
                                        </tr>
                                    </tfoot>
                                </table>
                                <div class="flex justify-center mt-4">
                                    <nav class="relative justify-center rounded-md shadow pagination">
                                        <pagination-links v-for="(link, i) of apparisals.links" :link="link" :key="i"
                                            @next="nextPage(link)"></pagination-links>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <o-modal :isOpen="configModal" modal-class="modal-lg" title="Configure Appraisal Assessment"
            @submit="configAppraisal" @modal-close="closeModal">
            <template #content>
                <form id="configForm">
                    <div class="col-md-12">
                        <label class="form-label">Section</label>
                        <select class="form-control form-control-sm" v-model="config.title_pid">
                            <option value="" selected>Select Section</option>
                            <option v-for="title in titleDrop" :key="title.pid" :value="title.pid">{{ title.title }}
                            </option>
                        </select>
                        <p class="text-danger " v-if="errors?.title_pid">{{ errors?.title_pid[0] }} </p>
                    </div>
                    <div class="row">

                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">Year</label>
                                <input type="number" v-model="config.year" class="form-control" placeholder="e.g 3">
                                <p class="text-danger " v-if="errors?.year">{{ errors?.year[0] }} </p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">Month</label>
                                <select class="form-control form-control-sm" v-model="config.month">
                                    <option value="" selected>Select Month</option>
                                    <option v-for="(month, j) in months" :key="j">{{ month }}</option>
                                </select>
                                <p class="text-danger " v-if="errors?.month">{{ errors?.month[0] }} </p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">From</label>
                                <input type="date" v-model="config.from" class="form-control" placeholder="e.g 3">
                                <p class="text-danger " v-if="errors?.from">{{ errors?.from[0] }} </p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">To</label>
                                <input type="date" v-model="config.to" class="form-control" placeholder="e.g 3">
                                <p class="text-danger " v-if="errors?.to">{{ errors?.to[0] }} </p>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="form-label">Note</label>
                                <textarea type="text" v-model="config.note" class="form-control"
                                    placeholder="e.g 3"></textarea>
                                <p class="text-danger " v-if="errors?.note">{{ errors?.note[0] }} </p>
                            </div>
                        </div>
                    </div>
                </form>
            </template>
        </o-modal>


        <o-modal :isOpen="cycleModal" modal-class="modal-sm" title="KPI Mapping" @submit="initiateAppraisal"
            @modal-close="closeModal">
            <template #content>
                <form id="configForm">

                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="form-label">Departments</label>
                                <select v-model="mapping.department" class="form-control">
                                    <option value="" selected>Make Selection</option>
                                    <option v-for="dep in depts" :key="dep.id" :value="dep.id">{{ dep.text }}</option>
                                </select>
                                <!-- <div>
                                            <Multiselect
                                                v-model="mapping.department"
                                                :options="depts"
                                                :multiple="false"
                                                :close-on-select="true"
                                                placeholder="Select Department"
                                                label="text"
                                                track-by="id"
                                                />
                                        </div> -->
                                <p v-if="init_errors.department" class="text-danger">{{ init_errors.department[0] }}</p>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="form-label">Designation</label>
                                <div>
                                    <Multiselect v-model="mapping.designations" :options="desig" :multiple="true"
                                        :close-on-select="true" placeholder="Pick Designation" label="text"
                                        track-by="id" />
                                </div>
                                <p v-if="init_errors.designations" class="text-danger">{{ init_errors.designations[0] }}
                                </p>

                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="form-label">Appraisal Type</label>
                                <div>
                                    <Multiselect v-model="mapping.types" :options="types" :multiple="true"
                                        :close-on-select="true" placeholder="Pick Type" label="text" track-by="id" />
                                </div>
                            </div>
                            <p v-if="init_errors.types" class="text-danger">{{ init_errors.types[0] }}</p>
                        </div>

                    </div>
                </form>
            </template>
        </o-modal>

    </div>
</template>

<script setup>
import store from "@/store";
import { ref } from "vue";
import PaginationLinks from "@/components/PaginationLinks.vue";
import OModal from "@/components/OModal.vue";
import { Multiselect } from 'vue-multiselect';

const errors = ref({});
const apparisals = ref({});
const titleDrop = ref({});
const currentTime = new Date()
var year = currentTime.getFullYear()
const configModal = ref(false)
const cycleModal = ref(false)

const closeModal = () => {
    configModal.value = false;
    cycleModal.value = false;
    resetConfig()
    resetMap()
};
const config = ref({
    title_pid : '' , 
    year : year ,
    month : '' ,
    from : '' ,
    to : '' ,
    note : '' ,
});

const resetConfig = ()=>{
    config.value= {
        title_pid: '',
        year: year,
        month: '',
        from: '',
        to: '',
        note: '',
    }
}
const editCycle = (cycle) => {
    config.value = {
        title_pid: cycle.title_pid,
        year: cycle.year,
        month: cycle.month,
        from: cycle.from,
        to: cycle.to,
        note: cycle.note,
        pid: cycle.pid,
    }
    configModal.value = true
}

const mapping = ref({
    apparisal_pid: '' ,
    department: '' ,
    designations: '' ,
    types: ''
})

const resetMap = (pid) =>{
    mapping.value = {
        apparisal_pid: pid,
        department: '',
        designations: '',
        types: ''
    }
}
const configureCycle = (pid) => {
    cycleModal.value = true;
    mapping.value.apparisal_pid = pid
}
 const months = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
 ];


function configAppraisal() {
    // store.commit('setSpinner', true)
    errors.value = []
    store.dispatch('postMethod', { url: '/create-appraisal-cycle', param: config.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data
        } else if (data?.status == 201) {
            resetConfig()
            loadSectionDetails()
        }
    })
}

const lockAppraisal = (pid) => {
    store.dispatch('putMethod', { url: '/lock-appraisal-cycle/'+pid, prompt:'Are you sure you want to lock this Appraisal?' }).then((data) => {
        if (data?.status == 201) {
            loadSectionDetails()
        }
    })
}


const deleteAppraisal = (pid) => {
    store.dispatch('deleteMethod', { url: '/delete-appraisal-cycle/'+pid, prompt:'Are you sure, you want to delete this Appraisal? ' }).then((data) => {
        if (data?.status == 201) {
            loadSectionDetails()
        }
    })
}

const init_errors = ref({})
function initiateAppraisal() {
    // store.commit('setSpinner', true)
    init_errors.value = []
    store.dispatch('postMethod', { url: '/initiate-appraisal', param: mapping.value }).then((data) => {
        if (data?.status == 422) {
            init_errors.value = data.data
        } else if (data?.status == 201) {
            resetMap(mapping.value.apparisal_pid);
        }
        // store.commit('setSpinner', false)
    })
}

loadSectionDetails()
function loadSectionDetails(url= '/load-appraisal-cycle') {
    store.dispatch('getMethod', { url:url}).then((data) => {
        if (data?.status == 200) {
            apparisals.value = data.data;
        }else{
            apparisals.value = {}
        }
    }).catch(e => {
        console.log(e);
    })
}

function dropdownSection() {
    store.dispatch('loadDropdown', 'appraisal-title').then(({ data }) => {
        titleDrop.value = data;
    }).catch(e => {
        console.log(e);
    })
}
dropdownDept()
const depts = ref({})
function dropdownDept() {
    store.dispatch('loadDropdown', 'departments').then(({ data }) => {
        depts.value = data;
    }).catch(e => {
        console.log(e);
    })
}

dropdownTypes()
const types = ref({})
function dropdownTypes() {
    store.dispatch('loadDropdown', 'appraisal-types').then(({ data }) => {
        types.value = data;
    }).catch(e => {
        console.log(e);
    })
}

dropdownDesig()
const desig = ref({})
function dropdownDesig() {
    store.dispatch('loadDropdown', 'designations').then(({ data }) => {
        desig.value = data;
    }).catch(e => {
        console.log(e);
    })
}
dropdownSection()


function nextPage(link) {
    if (!link.url || link.active) {
        return;
    }
    loadSectionDetails(link.url)
}


</script>

<style scoped></style>
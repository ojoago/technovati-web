<template>
    <div>
        <div class="container mt-2">
            <div class="card">
                <div class="card-header">
                    <h3 class="mx-4">Unit Allowances</h3>
                    <button @click="openModal" class="btn btn-sm btn-primary">Add New</button>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table-hover table-stripped table-bordered table">
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Allowance</th>
                                    <th>Amount</th>
                                    <th> Level</th>
                                    <th> Value Type</th>
                                    <th>Method</th>
                                    <th> <i class="bi bi-gear-fill"></i> </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(ex, loop) in units.data" :key="loop">
                                    <td>{{ loop + 1 }}</td>
                                    <td>{{ ex.allowance.name }}</td>
                                    <td>{{ ex.total }}</td>
                                    <td>{{ ex.levels }}</td>
                                    <td>{{ ex.type }}</td>
                                    <td>{{ ex.methods }}</td>
                                    <td>
                                        <div class="dropdown">
                                            <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                                data-bs-toggle="dropdown">
                                                <i class="bi bi-tools"></i>
                                            </button>
                                            <ul class="dropdown-menu">
                                                <li class="bg-warning"><a class="dropdown-item pointer"
                                                        @click="editUnit(ex)">Edit</a> </li>
                                                <li class="bg-danger"><a class="dropdown-item pointer"
                                                        @click="deleteData(ex.id)">Delete</a> </li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="flex justify-center mt-4">
                            <nav class="relative justify-center rounded-md shadow pagination">
                                <pagination-links v-for="(link, i) of units.links" :link="link" :key="i"
                                    @next="nextPage(link)"></pagination-links>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <o-modal :isOpen="assignModal" @submit="createUnitAllowance" modal-class="modal-lg" title="Unit Allowance"
            @modal-close="closeModal">
            <template #content>
                <div>
                    <form id="unitForm">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="form-label">Name</label>
                                    <Select2 v-model="unit.allowance_pid" :options="allowance" :settings="{ width: '100%' }"  />
                                    <!-- <div>
                                        <Multiselect v-model="unit.allowance_pid" :options="allowance"
                                            :close-on-select="true" :clear-on-select="false" placeholder="Select Option"
                                            label="name" track-by="pid" />
                                    </div> -->
                                    <p class="text-danger " v-if="errors?.allowance_pid">{{ errors?.allowance_pid[0] }}
                                    </p>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-label">Level</label>
                                    <select v-model="unit.level" class="form-control">
                                        <option value="" selected>Select Level</option>
                                        <option value="1"> Department </option>
                                        <option value="2"> Designation </option>
                                        <option value="3"> Employee </option>
                                        <option value="4"> Grade </option>
                                        <option value="5"> Structure </option>
                                    </select>
                                    <p class="text-danger " v-if="errors?.level">{{ errors?.level[0] }} </p>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-label">Value Type</label>
                                    <select v-model="unit.value_type" class="form-control">
                                        <option value="" selected>Select Type</option>
                                        <option value="1">Fixed</option>
                                        <option value="2">Percentage of basic</option>
                                    </select>
                                    <p class="text-danger " v-if="errors?.value_type">{{ errors?.value_type[0] }}
                                    </p>
                                </div>
                            </div>

                            <div class="col-md-8">
                                <div class="form-group">
                                    <label class="form-label">Amount/Percentage</label>
                                    <input v-model="unit.amount" type="number" placeholder="e.g 3000.5"
                                        class="form-control">
                                    <p class="text-danger " v-if="errors?.amount">{{ errors?.amount[0] }} </p>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="form-label">Method</label>
                                    <select v-model="unit.method" class="form-control">
                                        <option value="" selected>Select Method</option>
                                        <option value="1">PERIODIC</option>
                                        <option value="2">GENERAL</option>
                                    </select>
                                    <p class="text-danger " v-if="errors?.method">{{ errors?.method[0] }} </p>
                                </div>
                            </div>

                            <fieldset v-if="unit.level == 1">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="form-label">Department</label>
                                        <!-- <Select2 v-model="unit.departments" multiple :options="department" :settings="{ width: '100%' }"  /> -->
                                        <div>
                                            <Multiselect v-model="unit.departments" :options="department"
                                                :multiple="true" :close-on-select="true" placeholder="Pick department"
                                                label="text" track-by="id" />
                                        </div>
                                        <p class="text-danger " v-if="errors?.departments">{{ errors?.departments[0] }}
                                        </p>
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset v-if="unit.level == 2">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="form-label">Designation</label>
                                        <!-- <Select2 v-model="unit.designations" multiple :options="designation" :settings="{ width: '100%' }"  /> -->
                                        <div>
                                            <Multiselect v-model="unit.designations" :options="designation"
                                                :multiple="true" :close-on-select="true" placeholder="Pick Designation"
                                                label="text" track-by="id" />
                                        </div>
                                        <p class="text-danger " v-if="errors?.designations">{{ errors?.designations[0]
                                            }} </p>
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset v-if="unit.level == 3">

                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="form-label">Employee</label>
                                        <!-- <Select2 v-model="unit.employees" :multiple="true" :close-on-select="true" :options="users" :settings="{ width: '100%' }"  /> -->
                                        <div>
                                            <Multiselect v-model="unit.employees" :options="users" :multiple="true"
                                                :close-on-select="true" placeholder="Pick staff" label="text"
                                                track-by="id" />
                                        </div>
                                        <p class="text-danger " v-if="errors?.employees">{{ errors?.employees[0] }} </p>
                                    </div>
                                </div>
                            </fieldset>


                            <fieldset v-if="unit.level == 4">
                                <div class="row">

                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label">Salary Structure</label>
                                            <select v-model="unit.grade_structure_pid" class="form-control"
                                                @change="loadSectionDetails($event)">
                                                <option value="" selected>Select Structure</option>
                                                <option v-for="sec in structures" :key="sec.id" :value="sec.id">{{
                                                    sec.text }}</option>
                                            </select>
                                            <p class="text-danger " v-if="errors?.grade_structure_pid">{{
                                                errors?.grade_structure_pid[0] }} </p>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label">Salary Grade</label>
                                            <select v-model="unit.grade_grade_pid" class="form-control"
                                                @change="loadSteps($event)">
                                                <option value="" selected>Select Grade</option>
                                                <option v-for="sec in grades" :key="sec.id" :value="sec.id">{{
                                                    sec.text }}</option>
                                            </select>
                                            <p class="text-danger " v-if="errors?.grade_grade_pid">{{
                                                errors?.grade_grade_pid[0] }}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label">Salary Step</label>
                                            <!-- <select v-model="unit.grade_step" multiple class="form-control">
                                                <option value="" selected>Select Step</option>
                                                <option v-for="i = 1, in 15" :key="i" value="{{i}}">Step {{ i }}
                                                </option>
                                            </select> -->
                                            <Multiselect v-model="unit.grade_step" :options="steps"
                                                :multiple="true" :close-on-select="false"
                                                placeholder="Pick Grade Step" label="text" track-by="id" />
                                            <p class="text-danger " v-if="errors?.grade_step">{{ errors?.grade_step[0]
                                                }} </p>
                                        </div>
                                    </div>

                                </div>
                            </fieldset>

                            <fieldset v-if="unit.level == 5">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="form-label">Structure </label>

                                        <div>
                                            <Multiselect v-model="unit.structures" :options="structures"
                                                :multiple="true" :close-on-select="false"
                                                placeholder="Pick Salary Structure" label="text" track-by="id" />
                                        </div>
                                        <p class="text-danger " v-if="errors?.structures">{{ errors?.structures[0] }}
                                        </p>
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset v-if="unit.method == 1">

                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="form-label">Start Period </label>
                                            <input v-model="unit.period_from" type="date" class="form-control">
                                            <p class="text-danger " v-if="errors?.period_from">{{ errors?.period_from[0]
                                                }} </p>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="form-label">End Period </label>
                                            <input v-model="unit.period_to" type="date" class="form-control">
                                            <p class="text-danger " v-if="errors?.period_to">{{ errors?.period_to[0] }}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </fieldset>


                        </div>
                        <!-- <button type="button" class="btn btn-success btn-sm mt-2" @click="createUnitAllowance">Submit</button> -->
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
import { Multiselect } from 'vue-multiselect';
// import Multiselect from 'vue-multiselect'
import OModal from "@/components/OModal.vue";
const assignModal = ref(false)
const openModal = () => {
    assignModal.value = true
}
const closeModal = () => {
    assignModal.value = false;
};


const errors = ref({});
const unit = ref({
    allowance_pid: '',
    level:'',
    value_type:'',
    amount: '',
    method: '',
    period_from: '',
    period_to: '',
    departments: [] ,
    structures: [] ,
    employees: [] ,
    designations: [] ,
    grade_grade_pid:'' , 
    grade_structure_pid:'' ,
    grade_step:'' ,
   
    // grade: {
    //     grade_pid:'' , 
    //     structure_pid:'' ,
    //     step:''
    // } ,
   
});

const editUnit = (ex) => {
    unit.value = {
        allowance_pid: ex.allowance_pid,
        level: ex.level,
        value_type: ex.value_type,
        amount: ex.amount,
        method: ex.method,
        period:ex.period,
        period_from: ex.period_from,
        period_to: ex.period_to,
        departments: ex.departments,
        structures: ex.structures,
        employees: ex.employees,
        designations: ex.designations,
        grade_grade_pid: ex.grade_grade_pid,
        grade_structure_pid: ex.grade_structure_pid,
        grade_step: ex.grade_step ,
        pid: ex.pid ,
        
    }
    assignModal.value = true
}

const resetAttr = () =>{
    unit.value = {
        allowance_pid: '',
        level: '',
        value_type: '',
        amount: '',
        method: '',
        period_from: '',
        period_to: '',
        // period: {
        //     from: '',
        //     to: ''
        // },
        departments: '',
        structures: '',
        employees: '',
        designations: '',
        grade_grade_pid: '',
        grade_structure_pid: '',
        grade_step: '' ,
        pid: '' ,

        // grade: {
        //     grade_pid: '',
        //     structure_pid: '',
        //     step: ''
        // },
    }
}

function createUnitAllowance() {
    errors.value = []
    store.dispatch('postMethod', { url: '/create-unit-allowance', param: unit.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data
        } else if (data?.status == 201) {
            resetAttr()
            closeModal()
            loadLog()
        }
    }).catch(e => {
        console.log(e);
    })
}

const units = ref({});

function loadLog() {
    store.dispatch('getMethod', { url: '/load-unit-allowance' }).then((data) => {
        if (data?.status == 200) {
            units.value = data.data;
        }
    }).catch(e => {
        console.log(e);
    })
}

loadLog()

//allowance-names
const allowance = ref([]);
function dropdownAllow() {
    store.dispatch('loadDropdown', 'allowance-names').then(({ data }) => {
        allowance.value = data;
    }).catch(e => {
        console.log(e);
    })
}
dropdownAllow()

const department = ref([]);
function dropdownDept() {
    store.dispatch('loadDropdown', 'departments').then(({ data }) => {
        department.value = data;
    }).catch(e => {
        console.log(e);
    })
}
dropdownDept()

const designation = ref([]);
function dropdownDesig() {
    store.dispatch('loadDropdown', 'designations').then(({ data }) => {
        designation.value = data;
    }).catch(e => {
        console.log(e);
    })
}
dropdownDesig()

const users = ref([]);
function dropdownUser() {
    store.dispatch('loadDropdown', 'users').then(({ data }) => {
        users.value = data;
    }).catch(e => {
        console.log(e);
    })
}
dropdownUser()

const structures = ref([]);
function dropdownStructure() {
    store.dispatch('loadDropdown', 'salary-structure').then(({ data }) => {
        structures.value = data;
    }).catch(e => {
        console.log(e);
    })
}
dropdownStructure()

const grades = ref([]);
function loadSectionDetails(event) {
    store.dispatch('loadDropdown', 'salary-grade/' + event.target.value ).then((data) => {
        if (data?.status == 200) {
            grades.value = data.data;
        }
    }).catch(e => {
        console.log(e);
    })
}

const steps = ref([])
const loadSteps = (event) => {
    store.dispatch('loadDropdown', 'grade-step/' + event.target.value).then((data) => {
        if (data?.status == 200) {
            steps.value = data.data;
        }
    }).catch(e => {
        console.log(e);
    })
}


</script>

<style scoped></style>
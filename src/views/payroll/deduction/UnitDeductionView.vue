<template>
    <div>
        <div class="container mt-2">
            <div class="card">
                <div class="card-header">
                    <h3 class="mx-4">Unit Deductions</h3>
                    <button class="btn btn-sm btn-primary" @click="toggleModal = true">Add New</button>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table-hover table-stripped table-bordered table">
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Deduction</th>
                                    <th>Amount</th>
                                    <th> Level</th>
                                    <th> Value Type</th>
                                    <th>Method</th>
                                    <th> <i class="bi bi-gear-fill"></i> </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(ex, loop) in deductions.data" :key="loop">
                                    <td>{{ loop + 1 }}</td>
                                    <td>{{ ex.deduction.name }}</td>
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
                                                <li><a class="dropdown-item pointer bg-warning" @click="editData(ex)">Edit</a></li>
                                                <li><a class="dropdown-item pointer bg-danger" @click="deleteData(ex.pid)">Delete</a> </li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="flex justify-center mt-4">
                            <nav class="relative justify-center rounded-md shadow pagination">
                                <pagination-links v-for="(link, i) of deductions.links" :link="link" :key="i"
                                    @next="nextPage(link)"></pagination-links>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <o-modal :isOpen="toggleModal" @submit="createUnitDeduction" modal-class="modal-xl" title="Unit Deduction" @modal-close="closeModal">
                <template #content>
                    <div>
                        
                         <form id="deductionForm">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label">Name</label>
                                            <Select2 v-model="deduction.deduction_pid" :options="deduction_names" :settings="{ width: '100%' }"  />
                                            <p class="text-danger " v-if="errors?.deduction_pid">{{ errors?.deduction_pid[0] }}
                                            </p>
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label">Level</label>
                                            <select v-model="deduction.level" class="form-control">
                                                <option value="" selected>Select Level</option>
                                                <option  value="1"> Department </option>
                                                <option  value="2"> Designation </option>
                                                <option  value="3"> Employee </option>
                                                <option  value="4"> Grade </option>
                                                <option  value="5"> Structure </option>
                                            </select>
                                            <p class="text-danger " v-if="errors?.level">{{ errors?.level[0] }} </p>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label">Value Type</label>
                                            <select v-model="deduction.value_type" class="form-control">
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
                                            <label class="form-label">Amount</label>
                                            <input v-model="deduction.amount" type="number" placeholder="e.g 3000.5"
                                                class="form-control">
                                            <p class="text-danger " v-if="errors?.amount">{{ errors?.amount[0] }} </p>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label">Method</label>
                                            <select v-model="deduction.method" class="form-control">
                                                <option value="" selected>Select Method</option>
                                                <option value="1">PERIODIC</option>
                                                <option value="2">GENERAL</option>
                                            </select>
                                            <p class="text-danger " v-if="errors?.method">{{ errors?.method[0] }} </p>
                                        </div>
                                    </div>

                                    <fieldset v-if="deduction.level == 1">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Department</label>
                                                <!-- <Select2 v-model="deduction.departments" multiple :options="department" :settings="{ width: '100%' }"  /> -->
                                                <div>
                                                    <Multiselect v-model="deduction.departments" :options="department"
                                                        :multiple="true" :close-on-select="true" placeholder="Pick department"
                                                        label="text" track-by="id" />
                                                </div>
                                                <p class="text-danger " v-if="errors?.departments">{{ errors?.departments[0] }}
                                                </p>
                                            </div>
                                        </div>
                                    </fieldset>

                                    <fieldset v-if="deduction.level == 2">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Designation</label>
                                                <!-- <Select2 v-model="deduction.designations" multiple :options="designation" :settings="{ width: '100%' }"  /> -->
                                                <div>
                                                    <Multiselect v-model="deduction.designations" :options="designation"
                                                        :multiple="true" :close-on-select="true" placeholder="Pick Designation"
                                                        label="text" track-by="id" />
                                                </div>
                                                <p class="text-danger " v-if="errors?.designations">{{ errors?.designations[0] }} </p>
                                            </div>
                                        </div>
                                    </fieldset>

                                    <fieldset v-if="deduction.level == 3">

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Employee</label>
                                                <!-- <Select2 v-model="deduction.employees" :multiple="true" :close-on-select="true" :options="users" :settings="{ width: '100%' }"  /> -->
                                                <div>
                                                    <Multiselect v-model="deduction.employees" :options="users" :multiple="true"
                                                        :close-on-select="true" placeholder="Pick staff" label="text"
                                                        track-by="id" />
                                                </div>
                                                <p class="text-danger " v-if="errors?.employees">{{ errors?.employees[0] }} </p>
                                            </div>
                                        </div>
                                    </fieldset>


                                    <fieldset v-if="deduction.level == 4">
                                        <div class="row">

                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label">Salary Structure</label>
                                                    <select v-model="deduction.grade_structure_pid" class="form-control"
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
                                                    <select v-model="deduction.grade_grade_pid" class="form-control"
                                                        @change="loadSectionDetails($event)">
                                                        <option value="" selected>Select Grade</option>
                                                        <option v-for="sec in grades" :key="sec.id" :value="sec.id">{{
                                                            sec.text }}</option>
                                                    </select>
                                                    <p class="text-danger " v-if="errors?.grade_grade_pid">{{ errors?.grade_grade_pid[0] }} </p>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label">Salary Step</label>
                                                    <select v-model="deduction.grade_step" multiple class="form-control">
                                                        <option value="" selected>Select Step</option>
                                                        <option v-for="i = 1, in 15" :key="i" value="{{i}}">Step {{ i }}</option>
                                                    </select>
                                                    <p class="text-danger " v-if="errors?.grade_step">{{ errors?.grade_step[0] }} </p>
                                                </div>
                                            </div>

                                        </div>
                                    </fieldset>

                                    <fieldset v-if="deduction.level == 5">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Structure </label>

                                                <div>
                                                    <Multiselect v-model="deduction.structures" :options="structures"
                                                        :multiple="true" :close-on-select="true"
                                                        placeholder="Pick Salary Structure" label="text" track-by="id" />
                                                </div>
                                                <p class="text-danger " v-if="errors?.structures">{{ errors?.structures[0] }}
                                                </p>
                                            </div>
                                        </div>
                                    </fieldset>

                                    <fieldset v-if="deduction.method == 1">

                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="form-label">Start Period </label>
                                                    <input v-model="deduction.period_from" type="date" class="form-control">
                                                    <p class="text-danger " v-if="errors?.period_from">{{ errors?.period_from[0] }} </p>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="form-label">End Period </label>
                                                    <input v-model="deduction.period_to" type="date" class="form-control">
                                                    <p class="text-danger " v-if="errors?.period_to">{{ errors?.period_to[0] }}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                    </fieldset>


                                </div>
                               
                            </form>
                    </div>
                </template>
        </o-modal>
    </div>
</template>

<script setup>
import PaginationLinks from "@/components/PaginationLinks.vue";
import store from "@/store";
import { ref } from "vue";
import Select2 from 'vue3-select2-component';
import { Multiselect } from 'vue-multiselect';
import OModal from "@/components/OModal.vue";

const toggleModal = ref(false)

const closeModal = () => {
    toggleModal.value = false;
    resetAttr()
};

const errors = ref({});
const deduction = ref({
    deduction_pid: '',
    level: '',
    value_type: '',
    amount: '',
    method: '',
    period_from: '',
    period_to: '',
    departments: [],
    structures: [],
    employees: [],
    designations: [],
    grade_grade_pid: '',
    grade_structure_pid: '',
    grade_step: '',
});



const editData = (data) => {
    deduction.value = {
        deduction_pid: data.deduction_pid ,
        level: data.level ,
        value_type: data.value_type ,
        amount: data.amount ,
        method: data.method ,
        period_from: data.period.from,
        period_to: data.period.to,
        departments: data.departments ,
        structures: data.structures ,
        employees: data.employees ,
        designations: data.designations ,
        grade_grade_pid: data.grade_grade_pid ,
        grade_structure_pid: data.grade_structure_pid ,
        grade_step: data.grade_step ,
        pid: data.pid,
        // grade: {
        //     grade_pid: '',
        //     structure_pid: '',
        //     step: ''
        // },
    }
    toggleModal.value = true
}

const resetAttr = () => {
    deduction.value = {
        deduction_pid: '',
        level: '',
        value_type: '',
        amount: '',
        method: '',
        period_from: '',
        period_to: '',
        departments: [],
        structures: [],
        employees: [],
        designations: [],
        grade_grade_pid: '',
        grade_structure_pid: '',
        grade_step: '',
    }
}


function createUnitDeduction() {
    errors.value = []
    store.dispatch('postMethod', { url: '/create-unit-deduction', param: deduction.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data
        } else if (data?.status == 201) {
            loadLog()
            closeModal();
        }
    }).catch(e => {
        console.log(e);
    })
}
function deleteData(id) {
    store.dispatch('deleteMethod', { url: '/delete-unit-deduction/'+id }).then((data) => {
        if (data?.status == 201) {
            loadLog()
        }
    }).catch(e => {
        console.log(e);
    })
}

const deductions = ref({});

function loadLog(url= '/load-unit-deductions') {
    store.dispatch('getMethod', { url: url }).then((data) => {
        if (data?.status == 200) {
            deductions.value = data.data;
        }else{
             deductions.value = {};
        }
    }).catch(e => {
        console.log(e);
    })
}

loadLog()

//allowance-names
const deduction_names = ref([]);
function dropdownAllow() {
    store.dispatch('loadDropdown', 'deduction-names').then(({ data }) => {
        deduction_names.value = data;
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
    store.dispatch('loadDropdown', 'salary-grade/' + event.target.value).then((data) => {
        if (data?.status == 200) {
            grades.value = data.data;
        }
    }).catch(e => {
        console.log(e);
    })
}

function nextPage(link) {

    if (!link.url || link.active) {
        return;
    }
    loadLog(link.url)
}

</script>

<style scoped></style>
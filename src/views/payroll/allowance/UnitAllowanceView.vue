<template>
    <div>
        <div class="container mt-2">
                    <div class="card">
                        <div class="card-body">
                            <fieldset class="border rounded-3 p-2 m-1">
                                <legend class="float-none w-auto px-2">Unit Allowance</legend>
                                <form id="unitForm">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="form-label">Name</label>
                                                <!-- <Select2 v-model="unit.allowance_pid" :options="allowance" :settings="{ width: '100%' }"  /> -->
                                                            <div>
                                                                <Multiselect
                                                                    v-model="unit.allowance_pid"
                                                                    :options="allowance"
                                                                    :close-on-select="true"
                                                                    :clear-on-select="false"
                                                                    placeholder="Select Option"
                                                                    label="name"
                                                                    track-by="pid"
                                                                    />
                                                            </div>
                                                 
                                                
                                                <p class="text-danger " v-if="errors?.allowance_pid">{{ errors?.allowance_pid[0] }}
                                                </p>
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="form-label">Level</label>
                                                <select v-model="unit.level" class="form-control">
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
                                                <label class="form-label">Amount</label>
                                                <input v-model="unit.amount" type="number" placeholder="e.g 3000.5" class="form-control">
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

                                        <fieldset v-if="unit.level==1">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="form-label">Department</label>
                                                    <!-- <Select2 v-model="unit.departments" multiple :options="department" :settings="{ width: '100%' }"  /> -->
                                                    <div>
                                                                 <Multiselect
                                                                        v-model="unit.departments"
                                                                        :options="department"
                                                                        :multiple="true"
                                                                        :close-on-select="true"
                                                                        placeholder="Pick department"
                                                                        label="text"
                                                                        track-by="id"
                                                                        />
                                                             </div>
                                                    <p class="text-danger " v-if="errors?.departments">{{ errors?.departments[0] }} </p>
                                                </div>
                                            </div>
                                        </fieldset>

                                        <fieldset  v-if="unit.level == 2">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="form-label">Designation</label>
                                                    <!-- <Select2 v-model="unit.designations" multiple :options="designation" :settings="{ width: '100%' }"  /> -->
                                                     <div>
                                                             <Multiselect
                                                                    v-model="unit.designations"
                                                                    :options="designation"
                                                                    :multiple="true"
                                                                    :close-on-select="true"
                                                                    placeholder="Pick Designation"
                                                                    label="text"
                                                                    track-by="id"
                                                                    />
                                                         </div>
                                                    <p class="text-danger " v-if="errors?.designations">{{ errors?.designations[0] }} </p>
                                                </div>
                                            </div>
                                        </fieldset>

                                        <fieldset  v-if="unit.level == 3">

                                             <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="form-label">Employee</label>
                                                     <!-- <Select2 v-model="unit.employees" :multiple="true" :close-on-select="true" :options="users" :settings="{ width: '100%' }"  /> -->
                                                     <div>
                                                         <Multiselect
                                                                v-model="unit.employees"
                                                                :options="users"
                                                                :multiple="true"
                                                                :close-on-select="true"
                                                                placeholder="Pick staff"
                                                                label="text"
                                                                track-by="id"
                                                                />
                                                     </div>
                                                    <p class="text-danger " v-if="errors?.employees">{{ errors?.employees[0] }} </p>
                                                </div>
                                            </div>
                                        </fieldset>
                                       

                                        <fieldset  v-if="unit.level == 4">
                                            <div class="row">

                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Salary Structure</label>
                                                        <select v-model="unit.grade.structure_pid" class="form-control" @change="loadSectionDetails($event)">
                                                            <option value="" selected>Select Structure</option>
                                                            <option v-for="sec in structures" :key="sec.pid" :value="sec.pid">{{ sec.structure }}</option>
                                                        </select>
                                                        <p class="text-danger " v-if="errors?.grade.structure_pid">{{ errors?.grade.structure_pid[0] }} </p>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Salary Grade</label>
                                                        <select v-model="unit.grade.grade_pid" class="form-control" @change="loadSectionDetails($event)">
                                                                <option value="" selected>Select Grade</option>
                                                                <option v-for="sec in grades" :key="sec.pid" :value="sec.pid">{{ sec.grade }}</option>
                                                        </select>
                                                        <p class="text-danger " v-if="errors?.grade.grade_pid">{{ errors?.grade.grade_pid[0] }} </p>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Salary Step</label>
                                                        <select v-model="unit.grade.step" multiple class="form-control">
                                                            <option value="" selected>Select Step</option>
                                                            <option v-for="i=1, in 15" :key="i" value="{{i}}">Step {{i}}</option>
                                                        </select>
                                                        <p class="text-danger " v-if="errors?.grade.step">{{ errors?.grade.step[0] }} </p>
                                                    </div>
                                                </div>

                                            </div>
                                        </fieldset>

                                           <fieldset  v-if="unit.level == 5">
                                                 <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label class="form-label">Structure </label>
                                                      
                                                        <div>
                                                             <Multiselect
                                                                    v-model="unit.structures"
                                                                    :options="structures"
                                                                    :multiple="true"
                                                                    :close-on-select="true"
                                                                    placeholder="Pick Salary Structure"
                                                                    label="structure"
                                                                    track-by="pid"
                                                                    />
                                                         </div>
                                                        <p class="text-danger " v-if="errors?.structures">{{ errors?.structures[0] }} </p>
                                                    </div>
                                                </div>
                                            </fieldset>

                                           <fieldset  v-if="unit.method == 1">

                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label class="form-label">Start Period </label>
                                                            <input v-model="unit.period.from" type="date" class="form-control">
                                                            <p class="text-danger " v-if="errors?.period.from">{{ errors?.period.from[0] }} </p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label class="form-label">End Period </label>
                                                            <input v-model="unit.period.to" type="date" class="form-control">
                                                            <p class="text-danger " v-if="errors?.period.to">{{ errors?.period.to[0] }} </p>
                                                        </div>
                                                    </div>
                                                </div>

                                            </fieldset>
 
                                        
                                    </div>
                                    <button type="button" class="btn btn-success btn-sm mt-2"
                                        @click="createUnitAllowance">Submit</button>
                                </form>
                            </fieldset>
                             <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">Allowance Exclusions</div>
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
                                                <th> <i class="bi bi-pencil-fill"></i> </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(ex, loop) in units.data" :key="loop">
                                                <td>{{ loop + 1 }}</td>
                                                <td>{{ ex.allowance.name }}</td>
                                                <td>{{ ex.amount }}</td>
                                                <td>{{ levels[Number(ex.level)-1] }}</td>
                                                <td>{{ ex.value_type  == 1 ? 'FIXED' : 'PERCENTAGE OF BASIC' }}</td>
                                                <td>{{ ex.method == 1 ? 'PERIODIC' : 'GENERAL' }}</td>
                                                <td>
                                                    <div class="dropdown">
                                                        <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                                            data-bs-toggle="dropdown">
                                                            <i class="bi bi-tools"></i>
                                                        </button>
                                                        <ul class="dropdown-menu">
                                                            <li class="bg-warning"><a class="dropdown-item pointer"
                                                                    @click="edit(ex)">Edit</a> </li>
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
                        </div>
                    </div>
                </div>
              
            </div>
      
</template>

<script setup>
import store from "@/store";
import { ref } from "vue";

// import Select2 from 'vue3-select2-component';
import { Multiselect } from 'vue-multiselect';
// import Multiselect from 'vue-multiselect'
const levels = [
    'Department' ,'Designation','Employee','Grade','Structure'
];
const errors = ref({});
const unit = ref({
    allowance_pid: '',
    level:'',
    value_type:'',
    amount: '',
    method: '',
    period: {
        from: '',
        to: ''
    } ,
    departments: [] ,
    structures: [] ,
    employees: [] ,
    designations: [] ,
    grade: {
        grade_pid:'' , 
        structure_pid:'' ,
        step:''
    } ,
});



function createUnitAllowance() {
    store.commit('setSpinner', true)
    errors.value = []
    store.dispatch('postMethod', { url: '/create-unit-allowance', param: unit.value }).then((data) => {
        if (data.status == 422) {
            errors.value = data.data
        } else if (data.status == 201) {
            unit.value = [];
            // unitForm
            let form = document.querySelector('#unitForm');
            form.reset();
        }
        store.commit('setSpinner', false)
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
    })
}

const units = ref({});

function loadLog() {
    store.commit('setSpinner', true)
    store.dispatch('getMethod', { url: '/load-unit-allowance' }).then((data) => {
        store.commit('setSpinner', false)
        if (data.status == 200) {
            units.value = data.data;
        }
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
        alert('weting be this')
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
        alert('Something Went Wrong')
    })
}
dropdownAllow()

const department = ref([]);
function dropdownDept() {
    store.dispatch('loadDropdown', 'departments').then(({ data }) => {
        department.value = data;
    }).catch(e => {
        console.log(e);
        alert('Something Went Wrong')
    })
}
dropdownDept()

const designation = ref([]);
function dropdownDesig() {
    store.dispatch('loadDropdown', 'departments').then(({ data }) => {
        designation.value = data;
    }).catch(e => {
        console.log(e);
        alert('Something Went Wrong')
    })
}
dropdownDesig()

const users = ref([]);
function dropdownUser() {
    store.dispatch('loadDropdown', 'users').then(({ data }) => {
        users.value = data;
    }).catch(e => {
        console.log(e);
        alert('Something Went Wrong')
    })
}
dropdownUser()

const structures = ref([]);
function dropdownStructure() {
    store.dispatch('loadDropdown', 'salary-structure').then(({ data }) => {
        structures.value = data;
    }).catch(e => {
        console.log(e);
        alert('Something Went Wrong')
    })
}
dropdownStructure()

const grades = ref([]);
function loadSectionDetails(event) {
    store.commit('setSpinner', true)
    store.dispatch('loadDropdown', 'salary-grade/' + event.target.value ).then((data) => {
        store.commit('setSpinner', false)
        if (data.status == 200) {
            grades.value = data.data;
        }
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
        alert('weting be this')
    })
}


</script>

<style scoped></style>
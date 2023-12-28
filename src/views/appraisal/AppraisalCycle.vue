<template>
    <div>
        <div class="container mt-2">
            <div class="row">
                <div class="col-md-12">
                    <label class="form-label">Section</label>
                    <select class="form-control form-control-sm" @change="loadSectionDetails($event)">
                        <option disabled selected>Select Section</option>
                        <option v-for="sec in sectionsDrop" :key="sec.pid" :value="sec.pid">{{ sec.name }}</option>
                    </select>
                    <p class="text-danger email_error"></p>
                </div>
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <fieldset class="border rounded-3 p-2 m-1">
                                <legend class="float-none w-auto px-2 h5">Create Appraisal Section</legend>
                                <form>
                                    <div class="col-md-12">
                                        <label class="form-label">Section</label>
                                        <select class="form-control form-control-sm" v-model="config.title_pid">
                                            <option disabled selected>Select Section</option>
                                            <option v-for="title in titleDrop" :key="title.pid" :value="title.pid">{{ title.title }}</option>
                                        </select>
                                         <p class="text-danger " v-if="errors?.title_pid">{{ errors?.title_pid[0] }} </p>
                                    </div>
                                    <div class="row">
    
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="form-label">Year</label>
                                                <input type="number" v-model="config.year" class="form-control" placeholder="e.g 3">

                                                 <!-- <select class="form-control form-control-sm" v-model="config.year" :selected="year"  >
                                                    <option disabled selected>Select Year</option>
                                                    <option v-for="i in 4" :key="i">{{ (year++)-4 }}</option>
                                                </select> -->
                                                <p class="text-danger " v-if="errors?.year">{{ errors?.year[0] }} </p>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="form-label">Month</label>
                                                <select class="form-control form-control-sm" v-model="config.month"  >
                                                    <option disabled selected>Select Month</option>
                                                    <option v-for="(month,j) in months" :key="j">{{ month }}</option>
                                                 </select>
                                                <p class="text-danger " v-if="errors?.month">{{ errors?.month[0] }}       </p>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="form-label">From</label>
                                                    <input type="date" v-model="config.from" class="form-control" placeholder="e.g 3">
                                                <p class="text-danger " v-if="errors?.from">{{ errors?.from[0] }}       </p>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="form-label">To</label>
                                                    <input type="date" v-model="config.to" class="form-control"
                                                        placeholder="e.g 3">
                                                <p class="text-danger " v-if="errors?.to">{{ errors?.to[0] }}       </p>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Note</label>
                                                    <textarea type="text" v-model="config.note" class="form-control" placeholder="e.g 3"></textarea>
                                                    <p class="text-danger " v-if="errors?.note">{{ errors?.note[0] }}       </p>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="button" class="btn btn-success btn-sm mt-2" @click="configAppraisal">Submit</button>
                                </form>

                            </fieldset>
                        </div>
                    </div>
                </div>

                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">Appraisal Section</div>
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
                                            <th> <i class="bi bi-pencil-fill"></i> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(data, loop) in apparisals.data" :key="loop">
                                            <td>{{ loop + 1 }}</td>
                                            <td>{{ data.cycle.title }}</td>
                                            <td>{{ data.year }}</td>
                                            <td>{{ data.month }}</td>
                                            <td>{{ data.from }}</td>
                                            <td>{{ data.to }}</td>
                                            <td>{{ data.note }}</td>
                                            <td>{{ data.status }}</td>
                                            <td>
                                                <div class="dropdown">
                                                    <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                                        data-bs-toggle="dropdown">
                                                        <i class="bi bi-tools"></i>
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                        <li class="bg-primary"><a class="dropdown-item pointer" @click="configureCycle(data.pid)">Add KPIs</a> </li>
                                                        <li class="bg-warning"><a class="dropdown-item pointer" @click="editCycle(data)">Edit</a> </li>
                                                        <li class="bg-danger"><a class="dropdown-item pointer" @click="deleteCycle(data.pid)">Delete</a> </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="flex justify-center mt-4">
                                    <nav class="relative justify-center rounded-md shadow pagination">
                                        <pagination-links v-for="(link, i) of apparisals.links" :link="link" :key="i" @next="nextPage(link)"></pagination-links>
                                    </nav>
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
import PaginationLinks from "@/components/PaginationLinks.vue";

const errors = ref({});
const apparisals = ref({});
const titleDrop = ref({});
const currentTime = new Date()
var year = currentTime.getFullYear()

const config = ref({
    title_pid : '' , 
    year : year ,
    month : '' ,
    from : '' ,
    to : '' ,
    note : '' ,
});

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
}
const deleteCycle = (pid) => {
    alert(pid)
}
const configureCycle = (pid) => {
    alert(pid)
}
 const months = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
 ];


function configAppraisal() {
    store.commit('setSpinner', true)
    errors.value = []
    store.dispatch('postMethod', { url: '/create-appraisal-cycle', param: config.value }).then((data) => {
        if (data.status == 422) {
            errors.value = data.data
        } else if (data.status == 201) {
            console.log();
        }
        store.commit('setSpinner', false)
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
    })
}
loadSectionDetails()
function loadSectionDetails() {
    store.commit('setSpinner', true)
    store.dispatch('getMethod', { url: '/load-appraisal-cycle'}).then((data) => {
        store.commit('setSpinner', false)
        if (data.status == 200) {
            apparisals.value = data.data;
        }
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
        alert('weting be this')
    })
}
function dropdownSection() {
    store.dispatch('loadDropdown', 'appraisal-title').then(({ data }) => {
        titleDrop.value = data;
    }).catch(e => {
        console.log(e);
        alert('Something Went Wrong')
    })
}
dropdownSection()
function nextPage(link) {
    alert()
    if (!link.url || link.active) {
        return;
    }
    alert(link.url)
}


</script>

<style scoped></style>
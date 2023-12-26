<template>
    <div>
        <div class="container mt-2">
            <div class="row">
                <div class="col-md-12">
                            <label class="form-label">Section</label>
                            <select class="form-control form-control-sm" @change="loadSectionDetails($event)">
                                <option disabled selected>Select Section</option>
                                <option v-for="sec in sectionsDrop" :key="sec.pid" :value="sec.pid">{{sec.name}}</option>
                            </select>
                            <p class="text-danger email_error"></p>
                        </div>
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <fieldset class="border rounded-3 p-2 m-1">
                                <legend class="float-none w-auto px-2 h5">Create Appraisal Section</legend>
                                <form v-if="section_pid">
                                    <fieldset v-for="(key,i) in keys.keys" :key="i">
                                        <div class="row">
                                            <div class="col-md-8">
                                                <div class="form-group">
                                                    <label class="form-label">Key</label>
                                                    <input type="text" v-model="key.key" class="form-control" placeholder="e.g mode of request">
                                                    <!-- <p class="text-danger " v-if="errors?.name">{{ errors?.name[0] }} </p> -->
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label">Score</label>
                                                    <div class="input-group">
                                                         <input type="text" v-model="key.score" class="form-control" placeholder="e.g 3">
                                                            <button type="button" class="btn btn-sm btn-warning" @click="removeKey(i)"><i class="bi bi-patch-minus" ></i></button>
                                                    </div>
                                                    <!-- <p class="text-danger " v-if="errors?.note">{{ errors?.note[0] }}       </p> -->
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                    <button type="button" class="btn btn-sm btn-primary mt-2"  @click="addKey"><i class="bi bi-patch-plus" ></i></button>
                                    <hr>
                                    <div class="float-end">
                                        <button type="button" class="btn btn-success btn-sm mt-2" @click="createKpi">Submit</button>
                                    </div>
                                </form>

                            </fieldset>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">Appraisal Section</div>
                        <div class="card-body">
                            <h4>{{ sectionsDetail.name }}</h4>
                            <hr>
                            <p>{{ sectionsDetail.note }}</p>
                            <div class="table-responsive">
                                <table class="table-hover table-stripped table-bordered table">
                                    <thead>
                                        <tr>
                                            <th>SN</th>
                                            <th>Key</th>
                                            <th>Score</th>
                                            <th> <i class="bi bi-pencil-fill"></i> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(data, loop) in sectionsDetail?.keys" :key="loop">
                                            <td>{{ loop + 1 }}</td>
                                            <td>{{ data.key }}</td>
                                            <td>{{ data.score }}</td>
                                            <td>
                                                <div class="dropdown">
                                                    <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                                        data-bs-toggle="dropdown">
                                                        <i class="bi bi-tools"></i>
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                        <li class="bg-warning"><a class="dropdown-item pointer"
                                                                @click="editSection(data)">Edit</a> </li>
                                                        <li class="bg-danger"><a class="dropdown-item pointer"
                                                                @click="deleteLog(data.pid)">Delete</a> </li>
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
</template>

<script setup>
import store from "@/store";
import { ref } from "vue";

const errors = ref({});
const sectionsDetail = ref({});
const section_pid = ref(null);
const sectionsDrop = ref({});

const keys = ref({
    keys: [{
        key: '',
        score: '',
    }],
    section_pid: section_pid,
});
const addKey = () => {
    keys.value.keys.push({
        key: '',
        score: '',
    })
}
const removeKey = (i) => {
    let len = keys.value.keys.length;
    if (len === 1) {
        store.commit('notify', { message: 'One key is required', type: 'warning' })
        return;
    }
    keys.value.keys.splice(i, 1);
}
const editSection = (sec) => {
   keys.value.keys.push({
        key: sec.key ,
        score: sec.score ,
        pid: sec.pid,
    })
}
const deleteLog = (id) => {
    alert(id)
}
 

function createKpi() {
    store.commit('setSpinner', true)
    errors.value = []
    store.dispatch('postMethod', { url: '/create-appraisal-section-kpi', param: keys.value }).then((data) => {
        if (data.status == 422) {
            errors.value = data.data
        } else if (data.status == 201) {
            keys.value.keys = [[{
                key: '',
                score: '',
            }]];
        }
        store.commit('setSpinner', false)
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
    })
}

function loadSectionDetails(event) {
    section_pid.value = event.target.value;
    store.commit('setSpinner', true)
    store.dispatch('getMethod', { url: '/load-section-kpi/'+section_pid.value }).then((data) => {
        store.commit('setSpinner', false)
        if (data.status == 200) {
            sectionsDetail.value = data.data;
            console.log(data);
        }
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
        alert('weting be this')
    })
}
function dropdownSection() {
    store.dispatch('loadDropdown', 'appraisal-section' ).then(({data}) => {
        sectionsDrop.value = data;
    }).catch(e => {
        console.log(e);
        alert('Something Went Wrong')
    })
}
dropdownSection()


</script>

<style scoped></style>
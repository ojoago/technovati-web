<template>
    <div>
        <div class="container mt-2">
            <h3 class="mx-4">Appraisal KPIs</h3>
            <div class="row">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <fieldset class="border rounded-3 p-2 m-1">
                                <legend class="float-none w-auto px-2 h5">Add Appraisal KPIs</legend>
                                <div class="col-md-12">
                                    <label class="form-label">Appraisal Type</label>
                                    <select class="form-control" @change="loadSectionDetails($event)">
                                        <option disabled selected>Make Selection</option>
                                        <option v-for="sec in sectionsDrop" :key="sec.pid" :value="sec.pid">{{ sec.name
                                            }} -- {{ sec.obtainable }}</option>
                                    </select>
                                    <p class="text-danger email_error"></p>
                                </div>
                                <form v-if="keys.type_pid">
                                    <fieldset v-for="(key,i) in keys.keys" :key="i">
                                        <div class="row">
                                            <div class="col-md-8">
                                                <div class="form-group">
                                                    <label class="form-label">Key</label>
                                                    <input type="text" v-model="key.key" class="form-control"
                                                        placeholder="e.g mode of request">
                                                    <!-- <p class="text-danger " v-if="errors?.name">{{ errors?.name[0] }} </p> -->
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label">Obtainable Score</label>
                                                    <div class="input-group">
                                                        <input type="number" step="0.1" @change="sumVal"
                                                            v-model="key.obtainable" class="form-control"
                                                            placeholder="e.g 3">
                                                        <button type="button" class="btn btn-sm btn-warning"
                                                            @click="removeKey(i)"><i
                                                                class="bi bi-patch-minus"></i></button>
                                                    </div>
                                                    <!-- <p class="text-danger " v-if="errors?.note">{{ errors?.note[0] }}       </p> -->
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                    {{ obtainable }} /{{ keys?.obtainable }}
                                    <button type="button" class="btn btn-sm btn-primary mt-2" @click="addKey"><i
                                            class="bi bi-plus"></i></button>
                                    <hr>
                                    <div class="float-end">
                                        <button type="button" class="btn btn-success btn-sm mt-2"
                                            @click="createKpi">Submit</button>
                                    </div>
                                </form>

                            </fieldset>
                        </div>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">Appraisal Type</div>
                        <div class="card-body">
                            <h4>{{ type.name }}</h4>
                            <hr>
                            <p>{{ type.note }}</p>
                            <div class="table-responsive">
                                <table class="table-hover table-stripped table-bordered table">
                                    <thead>
                                        <tr>
                                            <th>SN</th>
                                            <th>Key</th>
                                            <th>Score</th>
                                            <!-- <th> <i class="bi bi-gear-fill"></i> </th> -->
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(kpi, loop) in kpis" :key="loop">
                                            <td>{{ loop + 1 }}</td>
                                            <td>{{ kpi.key }}</td>
                                            <td>{{ kpi.obtainable }}</td>

                                            <!-- <td>
                                                <div class="dropdown">
                                                    <button type="button" class="btn btn-primary btn-sm dropdown-toggle"  data-bs-toggle="dropdown">
                                                        <i class="bi bi-tools"></i>
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                        <li class="bg-warning"><a class="dropdown-item pointer"
                                                                @click="editSection(kpi)">Edit</a> </li>
                                                        <li class="bg-danger"><a class="dropdown-item pointer"
                                                                @click="deleteLog(kpi.pid)">Delete</a> </li>
                                                    </ul>
                                                </div>
                                            </td> -->
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
const type = ref({});
const kpis = ref({});
const sectionsDrop = ref({});

const keys = ref({
    keys: [{
        key: '',
        obtainable: '',
    }],
    type_pid: '',
    obtainable: 0,
});


const addKey = () => {
    keys.value.keys.push({
        key: '',
        obtainable: '',
    })

}
const removeKey = (i) => {
    let len = keys.value.keys.length;
    if (len === 1) {
        store.commit('notify', { message: 'One key is required to proceed', type: 'warning' })
        return;
    }
    keys.value.keys.splice(i, 1);
    sumVal()
}
// const editSection = (sec) => {
//    keys.value.keys.push({
//         key: sec.key ,
//         obtainable: sec.obtainable ,
//         pid: sec.pid,
//     })
// }
// const deleteLog = (id) => {
//     alert(id)
// }
const obtainable = ref(0)
 const sumVal = ()=>{
    obtainable.value = keys.value.keys.reduce((n, { obtainable }) => n + Number(obtainable), 0);
 }

function createKpi() {
    errors.value = []
    store.dispatch('postMethod', { url: '/create-appraisal-kpi', param: keys.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data
        } else if (data?.status == 201) {
            keys.value.keys = [{
                key: '',
                obtainable: '',
            }];
        }
    }).catch(e => {
        console.log(e);
    })
}

function loadSectionDetails(event) {
    store.dispatch('getMethod', { url: '/load-section-kpi/'+ event.target.value }).then((data) => {
        if (data?.status == 200) {
            type.value = data.data;
            kpis.value = data.data.keys;
            if(data?.data?.keys.length){
                keys.value.keys =  data.data.keys
            }else{
                keys.value.keys = [{
                key: '',
                obtainable: '',
            }];
            }
            keys.value.type_pid = event.target.value;
            keys.value.obtainable = data.data.obtainable;
            sumVal()
        }
    }).catch(e => {
        console.log(e);
    })
}
function dropdownSection() {
    store.dispatch('loadDropdown', 'appraisal-section' ).then(({data}) => {
        sectionsDrop.value = data;
    }).catch(e => {
        console.log(e);
    })
}
dropdownSection()


</script>

<style scoped></style>
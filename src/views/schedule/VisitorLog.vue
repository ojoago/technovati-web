<template>
    <div>
        <div class="container mt-2">
            <div class="row">
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <fieldset class="border rounded-3 p-2 m-1">
                                <legend class="float-none w-auto px-2">Log Visitor</legend>
                                <form>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Names</label>
                                                <input type="text" v-model="log.names" class="form-control"
                                                    placeholder="Name of visitor">
                                                <p class="text-danger " v-if="errors?.names">{{ errors?.names[0] }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">purpose</label>
                                                <textarea type="text" v-model="log.purpose" class="form-control" placeholder="purpose of visit"></textarea>
                                                <p class="text-danger " v-if="errors?.purpose">{{ errors?.purpose[0] }}
                                                </p>
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Phone Numbers</label>
                                                <input type="text" maxlength="11" v-model="log.gsm" class="form-control"
                                                    placeholder="gsm">
                                                <p class="text-danger " v-if="errors?.gsm">{{ errors?.gsm[0]}}</p>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Address</label>
                                                <textarea type="text" v-model="log.address" class="form-control" placeholder="visitor address"></textarea>
                                                <p class="text-danger " v-if="errors?.address">{{ errors?.address[0]  }}</p>
                                            </div>
                                        </div>
                                       

                                    </div>
                                    <button type="button" class="btn btn-success btn-sm mt-2" @click="logVisitor">Submit</button>
                                </form>

                            </fieldset>
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header">Departments</div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table-hover table-stripped table-bordered table">
                                    <thead>
                                        <tr>
                                            <th>SN</th>
                                            <th>Names</th>
                                            <th> Number</th>
                                            <th> purpose</th>
                                            <th> Tag</th>
                                            <th>time in</th>
                                            <th>time out</th>
                                            <th> <i class="bi bi-pencil-fill"></i> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(lg, loop) in logs.data" :key="loop">
                                            <td>{{ loop + 1 }}</td>
                                            <td>{{ lg.names }}</td>
                                            <td>{{ lg.gsm }}</td>
                                            <td>{{ lg.purpose }}</td>
                                            <td>{{ lg.tag }}</td>
                                            <td>{{ lg.time_in }}</td>
                                            <td>{{ lg.time_out }}</td>
                                            <td>
                                                <div class="dropdown">
                                                    <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                                        data-bs-toggle="dropdown">
                                                        <i class="bi bi-tools"></i>
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                        <li class="bg-warning"><a class="dropdown-item pointer"
                                                                @click="editlog(lg)">Details</a> </li>
                                                        <li class="bg-danger"><a class="dropdown-item pointer"
                                                                @click="deleteLog(lg.id)">Delete</a> </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="flex justify-center mt-4">
                                    <nav class="relative justify-center rounded-md shadow pagination">
                                        <pagination-links v-for="(link, i) of logs.links" :link="link" :key="i"
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
</template>

<script setup>
import store from "@/store";
import { ref } from "vue";
import PaginationLinks from "@/components/PaginationLinks.vue";

const errors = ref({});
const logs = ref({});
const log = ref({
   'names':'' , 
   'purpose':'' , 
   'gsm' :'' , 
   'address': '', 
   'tag' : '', 
   'time_in' : '', 
   'time_out': ''
});

const editlog = (lg) => {
    log.value = {
        names : lg.names,
        purpose : lg.purpose,
        gsm : lg.gsm,
        address : lg.address,
        tag : lg.tag,
        time_in : lg.time_in,
        time_out: lg.time_out,
        id: lg.id,
    }
}
const deleteLog = (id) => {
    alert(id)
}

function logVisitor() {
    store.commit('setSpinner', true)
    errors.value = []
    store.dispatch('postMethod', { url: '/log-visitor', param: log.value }).then((data) => {
        if (data.status == 422) {
            errors.value = data.data
        } else if (data.status == 201) {
            log.value = [];
        }
        store.commit('setSpinner', false)
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
    })
}

function loadLog() {
    store.commit('setSpinner', true)
    store.dispatch('getMethod', { url: '/load-visitor-log' }).then((data) => {
        store.commit('setSpinner', false)
        if (data.status == 200) {
            logs.value = data.data;
        }
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
        alert('weting be this')
    })
}

loadLog()
function nextPage(link) {
    alert()
    if (!link.url || link.active) {
        return;
    }
    alert(link.url)
}

</script>

<style scoped></style>
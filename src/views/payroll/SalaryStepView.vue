<template>
    <div>
        <div class="container mt-2">
            <div class="row">
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <fieldset class="border rounded-3 p-2 m-1">
                                <legend class="float-none w-auto px-2">Salary Steps</legend>
                                <form>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Name</label>
                                                <input type="text" v-model="step.step" class="form-control"
                                                    placeholder="Name of visitor">
                                                <p class="text-danger " v-if="errors?.step">{{ errors?.step[0] }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Description</label>
                                                <textarea type="text" v-model="step.description" class="form-control"
                                                    placeholder="description of visit"></textarea>
                                                <p class="text-danger " v-if="errors?.description">{{ errors?.description[0] }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="button" class="btn btn-success btn-sm mt-2" @click="createSalaryStep">Submit</button>
                                </form>
                            </fieldset>
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header">Salary Steps</div>
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
const step = ref({
    name : '',
    description: '',
});

const editlog = (stp) => {
    step.value = {
        names: stp.name,
        purpose: stp.description,
        pid: stp.pid,
    }
}
const deleteLog = (pid) => {
    alert(pid)
}

function createSalaryStep() {
    store.commit('setSpinner', true)
    errors.value = []
    store.dispatch('postMethod', { url: '/create-salary-step', param: step.value }).then((data) => {
        if (data.status == 422) {
            errors.value = data.data
        } else if (data.status == 201) {
            step.value = [];
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
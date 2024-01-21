<template>
    <div>
        <div class="container mt-2">
            <div class="row">
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <fieldset class="border rounded-3 p-2 m-1">
                                <legend class="float-none w-auto px-2">Deduction Name</legend>
                                <form>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Name</label>
                                                <input type="text" v-model="deduction.name" class="form-control"
                                                    placeholder="e.g deductable">
                                                <p class="text-danger " v-if="errors?.name">{{ errors?.name[0] }}
                                                </p>
                                            </div>
                                        </div>
                                    
                                        <div class="col-md-12">
                                                <label class="form-label">Name</label>
                                                <div class="form-group">
                                                    <input type="radio" v-model="deduction.payment" value="1"> yes
                                                    <input type="radio" v-model="deduction.payment" value="0"> No
                                                </div>
                                                <p class="text-danger " v-if="errors?.payment">{{ errors?.payment[0] }}
                                                </p>
                                        </div>
                                    
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Description</label>
                                                <textarea type="text" v-model="deduction.description" class="form-control"
                                                    placeholder="e.g for senior staff"></textarea>
                                                <p class="text-danger " v-if="errors?.description">{{ errors?.description[0]
                                                }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="button" class="btn btn-success btn-sm mt-2"
                                        @click="createDeductionName">Submit</button>
                                </form>
                            </fieldset>
                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">Departments</div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table-hover table-stripped table-bordered table">
                                    <thead>
                                        <tr>
                                            <th>SN</th>
                                            <th>Deduction</th>
                                            <th>Payment</th>
                                            <th>Description</th>
                                            <th> <i class="bi bi-pencil-fill"></i> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(dd, loop) in deductions.data" :key="loop">
                                            <td>{{ loop + 1 }}</td>
                                            <td>{{ dd.name }}</td>
                                            <td>{{ dd.payment == 1 ? 'YES' : 'NO' }}</td>
                                            <td>{{ dd.description }}</td>
                                            <td>
                                                <div class="dropdown">
                                                    <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                                        data-bs-toggle="dropdown">
                                                        <i class="bi bi-tools"></i>
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                        <li class="bg-warning"><a class="dropdown-item pointer"
                                                                @click="editlog(dd)">Details</a> </li>
                                                        <li class="bg-danger"><a class="dropdown-item pointer"
                                                                @click="deleteLog(dd.id)">Delete</a> </li>
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
            </div>
        </div>
    </div>
</template>

<script setup>
import store from "@/store";
import { ref } from "vue";
import PaginationLinks from "@/components/PaginationLinks.vue";

const errors = ref({});
const deduction = ref({
    name: '',
    description: '',
    payment: ''
});

const editlog = (stp) => {
    deduction.value = {
        names: stp.name,
        purpose: stp.description,
        pid: stp.pid,
    }
}
const deleteLog = (pid) => {
    alert(pid)
}

function createDeductionName() {
    store.commit('setSpinner', true)
    errors.value = []
    store.dispatch('postMethod', { url: '/create-deduction-name', param: deduction.value }).then((data) => {
        if (data.status == 422) {
            errors.value = data.data
        } else if (data.status == 201) {
            let form = document.getElementsByName('form');
            form.reset()
            loadDeductionName()
            // deduction.value = [];
        }
        store.commit('setSpinner', false)
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
    })
}


const deductions = ref({});

function loadDeductionName() {
    store.commit('setSpinner', true)
    store.dispatch('getMethod', { url: '/load-deduction-names' }).then((data) => {
        store.commit('setSpinner', false)
        if (data.status == 200) {
            deductions.value = data.data;
        }
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
        alert('weting be this')
    })
}

loadDeductionName()
function nextPage(link) {
    alert()
    if (!link.url || link.active) {
        return;
    }
    alert(link.url)
}

</script>

<style scoped></style>
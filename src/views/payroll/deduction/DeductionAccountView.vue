<template>
    <div>
        <div class="container mt-2">
            <div class="row">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <fieldset class="border rounded-3 p-2 m-1">
                                <legend class="float-none w-auto px-2">Salary Steps</legend>
                                <form>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="form-label">department</label>
                                                    <Select2  v-model="deduction.department_pid"  :options="department" :settings="{ width: '100%' }"  />
                                                <p class="text-danger " v-if="errors?.department_pid">{{ errors?.department_pid[0] }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="form-label">deduction</label>
                                                    <Select2  v-model="deduction.deduction_pid"  :options="deducts" :settings="{ width: '100%' }"  />
                                                <p class="text-danger " v-if="errors?.deduction_pid">{{ errors?.deduction_pid[0] }}
                                                </p>
                                            </div>
                                        </div>
                                            <!-- <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="form-label">Amount</label>
                                                    <input type="text" v-model="deduction.amount" class="form-control"
                                                        placeholder="e.g 50000">
                                                    <p class="text-danger " v-if="errors?.amount">{{ errors?.amount[0] }}
                                                    </p>
                                                </div>
                                            </div> -->
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="form-label">Account number</label>
                                                <input type="text" v-model="deduction.number" class="form-control"
                                                    placeholder="e.g xxxxxxxxxx">
                                                <p class="text-danger " v-if="errors?.number">{{ errors?.number[0] }}
                                                </p>
                                            </div>
                                        </div>

                                       
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="form-label">Account name</label>
                                                <input type="text" v-model="deduction.name" class="form-control"
                                                    placeholder="Name of visitor">
                                                <p class="text-danger " v-if="errors?.name">{{ errors?.name[0] }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="form-label">bank</label>
                                                <input type="text" v-model="deduction.bank" class="form-control"
                                                    placeholder="e.g Wema Bank">
                                                <p class="text-danger " v-if="errors?.bank">{{ errors?.bank[0] }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="form-label">branch</label>
                                                <input type="text" v-model="deduction.branch" class="form-control"
                                                    placeholder="e.g Jos">
                                                <p class="text-danger " v-if="errors?.branch">{{ errors?.branch[0] }}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        
                                    </div>
                                    <button type="button" class="btn btn-success btn-sm mt-2"
                                        @click="createDeductionAccount">Submit</button>
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
                                            <th>Department</th>
                                            <th>Account Number</th>
                                            <th>Account Nmae</th>
                                            <th>Bank</th>
                                            <th>Branch</th>
                                            <th> <i class="bi bi-pencil-fill"></i> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(da, loop) in accounts.data" :key="loop">
                                            <td>{{ loop + 1 }}</td>
                                            <td>{{ da.deduction.name }}</td>
                                            <td>{{ da.department.department }}</td>
                                            <td>{{ da.account_number }}</td>
                                            <td>{{ da.account_name }}</td>
                                            <td>{{ da.bank_branch }}</td>
                                            <td>{{ da.bank }}</td>
                                            <td>
                                                <div class="dropdown">
                                                    <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                                        data-bs-toggle="dropdown">
                                                        <i class="bi bi-tools"></i>
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                        <li class="bg-warning"><a class="dropdown-item pointer"
                                                                @click="EditData(da)">Edit</a> </li>
                                                        <li class="bg-danger"><a class="dropdown-item pointer"
                                                                @click="deleteLog(da.id)">Delete</a> </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="flex justify-center mt-4">
                                    <nav class="relative justify-center rounded-md shadow pagination">
                                        <pagination-links v-for="(link, i) of accounts.links" :link="link" :key="i"
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
import Select2 from 'vue3-select2-component';

const errors = ref({});
const deduction = ref({
    department_pid : '', 
    deduction_pid: '' , 
    amount: '' , 
    account_number: '' , 
    account_name: '' , 
    bank: '' , 
    bank_branch: ''
});

const EditData = (stp) => {
    deduction.value = {
        names: stp.name,
        purpose: stp.description,
        pid: stp.pid,
    }
}
const deleteLog = (pid) => {
    alert(pid)
}

function createDeductionAccount() {
    store.commit('setSpinner', true)
    errors.value = []
    store.dispatch('postMethod', { url: '/create-deduction-account', param: deduction.value }).then((data) => {
        if (data.status == 422) {
            errors.value = data.data
        } else if (data.status == 201) {
            deduction.value = [];
        }
        store.commit('setSpinner', false)
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
    })
}
const accounts = ref({});

function loadLog() {
    store.commit('setSpinner', true)
    store.dispatch('getMethod', { url: '/load-deduction-accounts' }).then((data) => {
        store.commit('setSpinner', false)
        if (data.status == 200) {
            accounts.value = data.data;
        }
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
        alert('weting be this')
    })
}
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

const deducts = ref([]);
function dropdownDeduct() {
    store.dispatch('loadDropdown', 'deduction-names').then(({ data }) => {
        deducts.value = data;
    }).catch(e => {
        console.log(e);
        alert('Something Went Wrong')
    })
}
dropdownDeduct()
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
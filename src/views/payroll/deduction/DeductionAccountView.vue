<template>
    <div>
        <div class="container mt-2">
            <div class="card">
                <div class="card-header">Deduction Account
                    <button class="btn btn-sm btn-primary" @click="openModal">Add New</button>
                </div>
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
                                    <th> <i class="bi bi-gear-fill"></i> </th>
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
                                                <li><a class="dropdown-item pointer bg-warning" @click="editData(da)">Edit</a> </li>
                                                <li><a class="dropdown-item pointer bg-danger" @click="deleteData(da.id)">Delete</a> </li>
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
        <o-modal :isOpen="toggleModal" @submit="createDeductionAccount" :modal-class="lg" title="Deduction Account" @modal-close="closeModal">
            <template #content>
                <div>
                    <form>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-label">Department</label>
                                    <Select2  v-model="deduction.department_pid"  :options="department" :settings="{ width: '100%' }"  />
                                    <p class="text-danger " v-if="errors?.department_pid">{{ errors?.department_pid[0] }} </p>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-label">Deduction</label>
                                    <Select2  v-model="deduction.deduction_pid"  :options="deducts" :settings="{ width: '100%' }"  />
                                    <p class="text-danger " v-if="errors?.deduction_pid">{{ errors?.deduction_pid[0] }}  </p>
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
                                    <label class="form-label">Account Number</label>
                                    <input type="text" v-model="deduction.account_number" class="form-control" maxlength="10" placeholder="e.g xxxxxxxxxx">
                                    <p class="text-danger " v-if="errors?.account_number">{{ errors?.account_number[0] }}  </p>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-label">Account Name</label>
                                    <input type="text" v-model="deduction.account_name" class="form-control" placeholder="e.g Technovati Ltd">
                                    <p class="text-danger " v-if="errors?.account_name">{{ errors?.account_name[0] }}
                                    </p>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-label">Bank</label>
                                    <input type="text" v-model="deduction.bank" class="form-control" placeholder="e.g Taj Bank">
                                    <p class="text-danger " v-if="errors?.bank">{{ errors?.bank[0] }}  </p>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-label">Branch</label>
                                    <input type="text" v-model="deduction.bank_branch" class="form-control" placeholder="e.g Jos">
                                    <p class="text-danger " v-if="errors?.bank_branch">{{ errors?.bank_branch[0] }}  </p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </template>
         </o-modal>
    </div>
</template>

<script setup>
import store from "@/store";
import { ref } from "vue";
import PaginationLinks from "@/components/PaginationLinks.vue";
import Select2 from 'vue3-select2-component';
import OModal from "@/components/OModal.vue";

const toggleModal = ref(false)
const lg = 'modal-lg'
const openModal = () => {
    toggleModal.value = true
}
const closeModal = () => {
    toggleModal.value = false;
    resetAttr()
};
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

const editData = (data) => {
    deduction.value = {
        department_pid: data.department_pid ,
        deduction_pid: data.deduction_pid ,
        amount: data.amount ,
        account_number: data.account_number ,
        account_name: data.account_name ,
        bank: data.bank ,
        bank_branch: data.bank_branch ,
        pid: data.pid ,
    }
    toggleModal.value = true
}

const resetAttr = () => {
    deduction.value = {
        department_pid: '',
        deduction_pid: '',
        amount: '',
        account_number: '',
        account_name: '',
        bank: '',
        bank_branch: ''
    }
}

const deleteData = (pid) => {
    alert(pid)
}

function createDeductionAccount() {
    errors.value = []
    store.dispatch('postMethod', { url: '/create-deduction-account', param: deduction.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data
        } else if (data?.status == 201) {
            closeModal()
            loadLog()
        }
    }).catch(e => {
        console.log(e);
    })
}
const accounts = ref({});

function loadLog(url= '/load-deduction-accounts') {
    store.dispatch('getMethod', { url:url }).then((data) => {
        if (data?.status == 200) {
            accounts.value = data.data;
        }
    }).catch(e => {
        console.log(e);
    })
}
const department = ref([]);
function dropdownDept() {
    store.dispatch('loadDropdown', 'departments').then(({ data }) => {
        department.value = data;
    }).catch(e => {
        console.log(e);
    })
}
dropdownDept()

const deducts = ref([]);
function dropdownDeduct() {
    store.dispatch('loadDropdown', 'deduction-names').then(({ data }) => {
        deducts.value = data;
    }).catch(e => {
        console.log(e);
    })
}
dropdownDeduct()
loadLog()
function nextPage(link) {

    if (!link.url || link.active) {
        return;
    }
    loadLog(link.url)
}

</script>

<style scoped></style>
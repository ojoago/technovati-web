<template>
    <div>
        <div class="container mt-2">
            <div class="card">
                <div class="card-header">Nontaxable Allowance
                    <button class="btn btn-sm btn-primary" @click="openModal">Add New</button>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table-hover table-stripped table-bordered table">
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Allowance</th>
                                    <th>Amount</th>
                                    <th>Staff</th>
                                    <th>Start</th>
                                    <th>End</th>
                                    <th>Type</th>
                                    <th> <i class="bi bi-pencil-fill"></i> </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(tx, loop) in nontaxable.data" :key="loop">
                                    <td>{{ loop + 1 }}</td>
                                    <td>{{ tx.allowance.name }}</td>
                                    <td>{{ tx.amount }}</td>
                                    <td>
                                            <span v-for="em in tx.employees" :key="em.pid" class="badge bg-dark p-1 m-1">
                                                {{ em.text }}
                                            </span>
                                        </td>
                                    <td>{{ tx.begin }}</td>
                                    <td>{{ tx.end }}</td>
                                    <td>{{ tx.value_type == 1 ? 'FIXED' : 'PERCENTAGE OF BASIC' }}</td>
                                    <td>
                                        <div class="dropdown">
                                            <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                                data-bs-toggle="dropdown">
                                                <i class="bi bi-tools"></i>
                                            </button>
                                            <ul class="dropdown-menu">
                                                <li class="bg-warning"><a class="dropdown-item pointer"
                                                        @click="editEntry(tx)">Edit</a> </li>
                                                <li class="bg-danger"><a class="dropdown-item pointer"
                                                        @click="deleteLog(tx.id)">Delete</a> </li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="flex justify-center mt-4">
                            <nav class="relative justify-center rounded-md shadow pagination">
                                <pagination-links v-for="(link, i) of nontaxable.links" :link="link" :key="i"
                                    @next="nextPage(link)"></pagination-links>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <o-modal :isOpen="toggleModal" @submit="createNonTaxableAllowance" :modal-class="lg" title="Nontaxable Allowance" @modal-close="closeModal">
                            <template #content>
                                <div>
                                     <form>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="form-label">Allowance</label>
                                                    <Select2 v-model="nontax.allowance_pid" :options="allowance" :settings="{ width: '100%' }"  />

                                                            <div>
                                                                    <Multiselect
                                                                        v-model="nontax.allowance"
                                                                        :options="allowance"
                                                                        :close-on-select="true"
                                                                        :clear-on-select="false"
                                                                        placeholder="Select Option"
                                                                        label="name"
                                                                        track-by="pid"
                                                                        />
                                                            </div>
                                                    <p class="text-danger " v-if="errors?.allowance">{{ errors?.allowance[0] }} </p>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="form-label">Value Type</label>
                                                      <select v-model="nontax.value_type" class="form-control form-control-sm">
                                                            <option value="" selected>Select Type</option>
                                                            <option value="1">Fixed</option>
                                                            <option value="2">Percentage of basic</option>
                                                        </select>
                                                    <p class="text-danger " v-if="errors?.value_type">{{ errors?.value_type[0] }} </p>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="form-label">Amount</label>
                                                    <input type="number" v-model="nontax.amount" class="form-control form-control-sm" placeholder="e.g 5,000">
                                                    <p class="text-danger " v-if="errors?.amount">{{ errors?.amount[0] }} </p>
                                                </div>
                                            </div>

                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="form-label">Employee Excluded</label>
                                                         <div>
                                                                     <Multiselect
                                                                            v-model="nontax.employees"
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
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="form-label">Start month</label>
                                                    <input type="date" v-model="nontax.begin" class="form-control form-control-sm">
                                                    <p class="text-danger " v-if="errors?.begin">{{ errors?.begin[0] }} </p>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="form-label">End Month</label>
                                                    <input type="date" v-model="nontax.end" class="form-control form-control-sm">
                                                    <p class="text-danger " v-if="errors?.end">{{ errors?.end[0] }} </p>
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
import { Multiselect } from 'vue-multiselect';
import OModal from "@/components/OModal.vue";
const toggleModal = ref(false)
const lg = 'modal-lg'
const openModal = () => {
    toggleModal.value = true
}
const closeModal = () => {
    toggleModal.value = false;
};
const errors = ref({});
const nontax = ref({
    allowance_pid: '',
    employees: '' , 
    begin: '', 
    end: '', 
    value_type :'' , 
    amount:''
});

const editEntry = (tx) => {
    nontax.value = {
        allowance_pid: tx.allowance_pid,
        employees: tx.employees,
        begin: tx.begin,
        end: tx.end,
        value_type: tx.value_type,
        amount: tx.amount ,
        pid: tx.pid,
    }
    toggleModal.value = true
}
const deleteLog = (pid) => {
    alert(pid)
}

function createNonTaxableAllowance() {
    errors.value = []
    store.dispatch('postMethod', { url: '/create-non-taxable-allowance', param: nontax.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data
        } else if (data?.status == 201) {
            dropdownAllow()
        }
    }).catch(e => {
        console.log(e);
    })
}

const nontaxable = ref({});

function loadLog() {
    store.dispatch('getMethod', { url: '/load-nontaxable-allowance' }).then((data) => {
        store.commit('setSpinner', false)
        if (data?.status == 200) {
            nontaxable.value = data.data;
        }
    }).catch(e => {
        console.log(e);
    })
}


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
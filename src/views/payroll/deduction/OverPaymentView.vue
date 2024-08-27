<template>
    <div>
        <div class="container mt-2">
            <div class="card">
                <div class="card-header">Over Payments
                    <button class="btn btn-sm btn-primary" @click="openModal">Add New</button>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table-hover table-stripped table-bordered table">
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Staff</th>
                                    <th>Comment</th>
                                    <th> <i class="bi bi-pencil-fill"></i> </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(ov, loop) in payments.data" :key="loop">
                                    <td>{{ loop + 1 }}</td>
                                    <td>{{ ov.amount }}</td>
                                    <td>{{ ov.date }}</td>
                                    <td>
                                                <span v-for="em in ov.employees" :key="em.pid" class="badge bg-dark p-1 m-1">
                                                    {{ em.text }}
                                                </span>
                                            </td>
                                    <td>{{ ov.comment }}</td>
                                    <td>
                                        <div class="dropdown"  v-if="ov.status == 0">
                                            <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                                data-bs-toggle="dropdown">
                                                <i class="bi bi-tools"></i>
                                            </button>
                                            <ul class="dropdown-menu position-absolute">
                                                <li><a class="dropdown-item pointer bg-warning" @click="editInfo(ov)">Edit</a> </li>
                                                <li><a class="dropdown-item pointer bg-danger"  @click="deleteLog(ov.id)">Delete</a> </li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="flex justify-center mt-4">
                            <nav class="relative justify-center rounded-md shadow pagination">
                                <pagination-links v-for="(link, i) of payments.links" :link="link" :key="i"
                                    @next="nextPage(link)"></pagination-links>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            
        <o-modal :isOpen="toggleModal" @submit="createDeductionName" modal-class="modal-sm" title="Over Payment" @modal-close="closeModal">
                    <template #content>
                        <div>
                               <form>
                                        <div class="row">
                                           

                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="form-label">Date</label>
                                                    <input type="date" v-model="over.date" class="form-control"  placeholder="e.g deductable">
                                                </div>
                                                <p class="text-danger " v-if="errors?.date">{{ errors?.date[0] }} </p>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="form-label">Amount</label>
                                                    <input type="number" step="0.5" v-model="over.amount" class="form-control"  placeholder="e.g 5000">
                                                </div>
                                                <p class="text-danger " v-if="errors?.amount">{{ errors?.amount[0] }} </p>
                                            </div>

                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="form-label">Comments</label>
                                                    <textarea type="text" v-model="over.comment" class="form-control"
                                                        placeholder="e.g for senior staff"></textarea>
                                                    <p class="text-danger " v-if="errors?.comment">{{ errors?.comment[0] }} </p>
                                                </div>
                                            </div>
                                             <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label class="form-label">Employee</label>
                                                        <div>
                                                            <Multiselect v-model="over.employees" :options="users" :multiple="true"
                                                                :close-on-select="true" placeholder="Pick staff" label="text" track-by="id" />
                                                        </div>
                                                        <p class="text-danger " v-if="errors?.employees">{{ errors?.employees[0] }} </p>
                                                    </div>
                                                </div>
                                        </div>
                                        <!-- <button type="button" class="btn btn-success btn-sm mt-2"  @click="createDeductionName">Submit</button> -->
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
const openModal = () => {
    toggleModal.value = true
}
const closeModal = () => {
    toggleModal.value = false;
    resetAttr()
};
const errors = ref({});
const over = ref({
    employees: '',
    date: '',
    comment: '',
    amount: ''
});

const resetAttr = () => {
    over.value = {
        employees: '',
        date: '',
        comment: '',
        amount: ''
    }
}

const editInfo = (info) => {
    over.value = {
        employees: info.employees,
        date: info.date,
        comment: info.comment,
        amount: info.amount ,
        pid: info.pid,
    }
    toggleModal.value = true
}

const deleteLog = (pid) => {
    alert(pid)
}

function createDeductionName() {
    errors.value = []
    store.dispatch('postMethod', { url: '/add-over-payments', param: over.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data
        } else if (data?.status == 201) {
            closeModal()
            loadOverPayments()
            // deduction.value = [];
        }
    }).catch(e => {
        console.log(e);
    })
}


const payments = ref({});

function loadOverPayments(url= '/load-over-payments') {
    store.dispatch('getMethod', { url:url}).then((data) => {
        if (data?.status == 200) {
            payments.value = data.data;
        }else{
            payments.value ={}
        }
    }).catch(e => {
        console.log(e);
    })
}

loadOverPayments()

const users = ref([]);
function dropdownUser() {
    store.dispatch('loadDropdown', 'users').then(({ data }) => {
        users.value = data;
    }).catch(e => {
        console.log(e);
    })
}
dropdownUser()

function nextPage(link) {
 
    if (!link.url || link.active) {
        return;
    }
    loadOverPayments(link.url)
}

</script>

<style scoped></style>
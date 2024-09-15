<template>
    <div>
        <div class="container mt-2">
            <div class="card">
                <div class="card-header">
                    <h3 class="mx-4">Deduction Exclusions</h3>
                    <button class=" btn btn-sm btn-primary" @click="openModal">Add New</button>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table-hover table-stripped table-bordered table">
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Deduction</th>
                                    <th> Employees</th>
                                    <th> start</th>
                                    <th> End</th>
                                    <th> <i class="bi bi-gear-fill"></i> </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(ex, loop) in exclusions.data" :key="loop">
                                    <td>{{ loop + 1 }}</td>
                                    <td>{{ ex.deduction.name }}</td>
                                    <td>
                                        <span v-for="em in ex.employees" :key="em.pid" class="badge bg-dark p-1 m-1">
                                            {{ em.text }}
                                        </span>
                                    </td>
                                    <td>{{ ex.begin }}</td>
                                    <td>{{ ex.end }}</td>
                                    <td>
                                        <div class="dropdown">
                                            <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                                data-bs-toggle="dropdown">
                                                <i class="bi bi-tools"></i>
                                            </button>
                                            <ul class="dropdown-menu">
                                                <li class=""><a class="dropdown-item pointer bg-warning" @click="editData(ex)">Edit</a> </li>
                                                <li class=""><a class="dropdown-item pointer bg-danger" @click="deleteData(ex.id)">Delete</a> </li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="flex justify-center mt-4">
                            <nav class="relative justify-center rounded-md shadow pagination">
                                <pagination-links v-for="(link, i) of exclusions.links" :link="link" :key="i"
                                    @next="nextPage(link)"></pagination-links>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <o-modal :isOpen="toggleModal" @submit="createAllowanceExclusion" modal-class="modal-sm" title="Deduction Exclusion" @modal-close="closeModal">
                        <template #content>
                            <div>
                                   <form>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="form-label">Deduction</label>
                                                    <Select2 v-model="exclusion.deduction" :options="deduction" :settings="{ width: '100%' }"  />
                                                    <p class="text-danger " v-if="errors?.deduction">{{ errors?.deduction[0] }} </p>
                                                </div>
                                            </div>

                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="form-label">Excluded Employee(s) </label>
                                               
                                                        <div>
                                                                 <Multiselect
                                                                        v-model="exclusion.employees"
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
                                                    <input type="date" v-model="exclusion.begin" class="form-control" >
                                                    <p class="text-danger " v-if="errors?.begin">{{ errors?.begin[0] }} </p>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="form-label">End Month</label>
                                                    <input type="date" v-model="exclusion.end" class="form-control">
                                                    <p class="text-danger " v-if="errors?.end">{{ errors?.end[0] }} </p>
                                                </div>
                                            </div>
                                       
                                        </div>
                                        <!-- <button type="button" class="btn btn-success btn-sm mt-2" @click="createAllowanceExclusion">Submit</button> -->
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
import Select2 from 'vue3-select2-component';
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
const exclusion = ref({
    deduction: '',
    employees: '',
    begin: '',
    end: '',
});


const resetAttr = () => {
    exclusion.value = {
        deduction: '',
        employees: '',
        begin: '',
        end: '',
    }
}
const editData = (ex) => {
    exclusion.value = {
        deduction: ex.deduction_pid,
        employees: ex.employees,
        begin: ex.begin,
        end: ex.end,
        pid: ex.pid,
    }
    toggleModal.value = true
}


const deleteData = (pid) => {
    alert(pid)
}

function createAllowanceExclusion() {
    errors.value = []
    store.dispatch('postMethod', { url: '/add-deduction-exclusion', param: exclusion.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data
        } else if (data?.status == 201) {
            closeModal();
            loadLog();
        }
    }).catch(e => {
        console.log(e);
    })
}

const exclusions = ref({});

function loadLog(url='/load-deduction-exclusion' ) {
    store.dispatch('getMethod', { url: url }).then((data) => {
        if (data?.status == 200) {
            exclusions.value = data.data;
        }
    }).catch(e => {
        console.log(e);
    })
}

loadLog()

const users = ref([]);
function dropdownUser() {
    store.dispatch('loadDropdown', 'users').then(({ data }) => {
        users.value = data;
    }).catch(e => {
        console.log(e);
    })
}
dropdownUser()

const deduction = ref([]);
function dropdownAllow() {
    store.dispatch('loadDropdown', 'deduction-names').then(({ data }) => {
        deduction.value = data;
    }).catch(e => {
        console.log(e);
    })
}
dropdownAllow()

function nextPage(link) {

    if (!link.url || link.active) {
        return;
    }
    loadLog(link.url)
}

</script>

<style scoped></style>
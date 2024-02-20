<template>
    <div>
        <div class="container mt-2">
           
            <div class="card">
                <div class="card-header">Allowance Exclusions
                    <button class="btn btn-sm btn-primary" @click="openModal">Add New</button>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table-hover table-stripped table-bordered table">
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Allowance</th>
                                    <th> Employees</th>
                                    <th> start</th>
                                    <th> End</th>
                                    <th> <i class="bi bi-pencil-fill"></i> </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(ex, loop) in exclusions.data" :key="loop">
                                    <td>{{ loop + 1 }}</td>
                                    <td>{{ ex.allowance.name }}</td>
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
                                                <li class="bg-warning"><a class="dropdown-item pointer"
                                                        @click="edit(ex)">Edit</a> </li>
                                                <li class="bg-danger"><a class="dropdown-item pointer"
                                                        @click="deleteData(ex.id)">Delete</a> </li>
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
       
          <o-modal :isOpen="toggleModal" @submit="createAllowanceExclusion" :modal-class="sm" title="Allowance Exclusion" @modal-close="closeModal">
                        <template #content>
                            <div>
                                  <form id="excForm">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="form-label">Allowance</label>
                                                        <div>
                                                                <Multiselect
                                                                    v-model="exclusion.allowance"
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
                                             <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label class="form-label">Employee Excluded</label>
                                               
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
const sm = 'modal-sm'
const openModal = () => {
    toggleModal.value = true
}
const closeModal = () => {
    toggleModal.value = false;
};
const errors = ref({});
const exclusion = ref({
    allowance: '',
    employees: '',
    begin: '',
    end: '',
});

const edit = (ex) => {
    exclusion.value = {
        allowance: ex.allowance,
        employees: ex.employees,
        begin: ex.begin,
        end: ex.end,
        pid: ex.pid,
    }
}
const deleteData = (pid) => {
    alert(pid)
}

function createAllowanceExclusion() {
    store.commit('setSpinner', true)
    errors.value = []
    store.dispatch('postMethod', { url: '/create-allowance-exclusion', param: exclusion.value }).then((data) => {
        if (data.status == 422) {
            errors.value = data.data
        } else if (data.status == 201) {
            let form = document.querySelector('#excForm')
            form.reset()
            // exclusion.value = [];
        }
        store.commit('setSpinner', false)
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
    })
}
const exclusions = ref({});

function loadLog() {
    store.commit('setSpinner', true)
    store.dispatch('getMethod', { url: '/load-allowance-exclusion' }).then((data) => {
        store.commit('setSpinner', false)
        if (data.status == 200) {
            exclusions.value = data.data;
        }
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
        alert('weting be this')
    })
}

loadLog()

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

function nextPage(link) {
    alert()
    if (!link.url || link.active) {
        return;
    }
    alert(link.url)
}

</script>

<style scoped></style>
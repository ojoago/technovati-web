<template>
    <div>
        <div class="container mt-2">
            <div class="card">
                <div class="card-body">
                    <ul class="nav nav-tabs d-flex" id="myTabjustified" role="tablist">
                        <li class="nav-item flex-fill" role="presentation">
                        <button class="nav-link w-100 active" id="customer-tab" data-bs-toggle="tab" data-bs-target="#customer" type="button" role="tab" aria-controls="customer" aria-selected="true">Customer</button>
                        </li>
                        <li class="nav-item flex-fill" role="presentation">
                        <button class="nav-link w-100" id="store-tab" data-bs-toggle="tab" data-bs-target="#store" type="button" role="tab" aria-controls="store" aria-selected="false">Store Manager</button>
                        </li>
                    </ul>
                    <div class="tab-content pt-2" id="myTabjustifiedContent">
                        <div class="tab-pane fade show active" id="customer" role="tabpanel" aria-labelledby="customer-tab">
                            <div class="row">
                                <div class="col-md-4">
                                    <fieldset class="border rounded-3 p-2 m-1">
                                        <legend class="float-none w-auto px-2">Create Customer</legend>

                                        <form id="cForm">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label class="form-label">Name</label>
                                                        <input type="text" v-model="customer.name" class="form-control"
                                                            placeholder="e.g Ray Engineering">
                                                        <p class="text-danger " v-if="errors?.name">{{ errors?.name[0] }}</p>
                                                    </div>
                                                </div>
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label class="form-label">RC</label>
                                                        <input type="text" v-model="customer.rc" class="form-control"
                                                            placeholder="e.g 20121212">
                                                        <p class="text-danger " v-if="errors?.rc">{{ errors?.rc[0] }}</p>
                                                    </div>
                                                </div>
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label class="form-label">Email</label>
                                                        <input type="text" v-model="customer.email" class="form-control"
                                                            placeholder="e.g ojoago@optimalsoft.com">
                                                        <p class="text-danger " v-if="errors?.email">{{ errors?.email[0] }}</p>
                                                    </div>
                                                </div>
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label class="form-label">Phone Number</label>
                                                        <input type="text" v-model="customer.gsm" class="form-control"
                                                            placeholder="Enter phone number">
                                                        <p class="text-danger " v-if="errors?.gsm">{{ errors?.gsm[0] }}</p>
                                                    </div>
                                                </div>
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label class="form-label">Address</label>
                                                        <textarea type="text" v-model="customer.address" class="form-control"
                                                            placeholder="e.g plot 99 lagos avenue"></textarea>
                                                        <p class="text-danger " v-if="errors?.address">{{ errors?.address[0]
                                                        }}</p>
                                                    </div>
                                                </div>

                                            </div>
                                            <button type="button" class="btn btn-success btn-sm mt-2"
                                                @click="createCustomer">Submit</button>
                                        </form>

                                    </fieldset>
                                </div>
                                <div class="col-md-8">
                                    <div class="table-responsive">
                                            <table class="table-hover table-stripped table-bordered table">
                                                <thead>
                                                    <tr>
                                                        <th>SN</th>
                                                        <th>name</th>
                                                        <th>RC</th>
                                                        <th>email</th>
                                                        <th>Phone Number</th>
                                                        <th>address</th>
                                                        <!-- <th>STATUS</th> -->
                                                        <th> <i class="bi bi-pencil-fill"></i> </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(data, loop) in customers?.data" :key="loop">
                                                        <td>{{ loop + 1 }}</td>
                                                        <td>{{ data.name }}</td>
                                                        <td>{{ data.rc }}</td>
                                                        <td>{{ data.email }}</td>
                                                        <td>{{ data.gsm }}</td>
                                                        <td>{{ data.address }}</td>
                                                        <!-- <td>{{ data.status }}</td> -->
                                                        <td>
                                                            <div class="dropdown">
                                                                <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                                                    data-bs-toggle="dropdown">
                                                                    <i class="bi bi-tools"></i>
                                                                </button>
                                                                <ul class="dropdown-menu">
                                                                    <li class=""><a class="dropdown-item pointer"
                                                                            @click="taskDetail(data)">Details</a> </li>
                                                                    <li class="bg-warning"><a class="dropdown-item pointer"
                                                                            @click="editCustomer(data)">Edit</a> </li>
                                                                    <li class="bg-danger"><a class="dropdown-item pointer">Delete</a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                </div>
                            </div>
                        </div>
                    <div class="tab-pane fade show active" id="store" role="tabpanel" aria-labelledby="customer-tab">
                   
                    </div>
                            <div class="row">
                                    <div class="col-md-4">
                                        <fieldset class="border rounded-3 p-2 m-1">
                                            <legend class="float-none w-auto px-2">Create Customer</legend>

                                            <form id="cForm">
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label class="form-label">Name</label>
                                                            <Select2 v-model="manager.customer_pid" :options="customersDrop" :settings="{ width: '100%' }"  />
                                                            <p class="text-danger " v-if="sub_error?.customer_pid">{{ sub_error?.customer_pid[0] }}</p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label class="form-label">Name</label>
                                                            <input type="text" v-model="manager.names" class="form-control" placeholder="e.g Ray Engineering">
                                                            <p class="text-danger " v-if="sub_error?.names">{{ sub_error?.names[0] }}</p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label class="form-label">Email</label>
                                                            <input type="text" v-model="manager.email" class="form-control"   placeholder="e.g optimal@gmail.com">
                                                            <p class="text-danger " v-if="sub_error?.email">{{ sub_error?.email[0] }}</p>
                                                        </div>
                                                    </div>
                                                    
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label class="form-label">Phone Number</label>
                                                            <input type="text" maxlength="11" v-model="manager.gsm" class="form-control" placeholder="Enter phone number">
                                                            <p class="text-danger " v-if="sub_error?.gsm">{{ sub_error?.gsm[0] }}</p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label class="form-label">Address</label>
                                                            <textarea type="text" v-model="manager.address" class="form-control"
                                                                placeholder="e.g plot 99 lagos avenue"></textarea>
                                                            <p class="text-danger " v-if="sub_error?.address">{{ sub_error?.address[0]
                                                            }}</p>
                                                        </div>
                                                    </div>

                                                </div>
                                                <button type="button" class="btn btn-success btn-sm mt-2"
                                                    @click="createStoreManager">Submit</button>
                                            </form>

                                        </fieldset>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="table-responsive">
                                                <table class="table-hover table-stripped table-bordered table">
                                                    <thead>
                                                        <tr>
                                                            <th>SN</th>
                                                            <th>Company</th>
                                                            <th>names</th>
                                                            <th>Username</th>
                                                            <th>email</th>
                                                            <th>Phone Number</th>
                                                            <th>address</th>
                                                            <!-- <th>STATUS</th> -->
                                                            <th> <i class="bi bi-pencil-fill"></i> </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="(data, loop) in managers?.data" :key="loop">
                                                            <td>{{ loop + 1 }}</td>
                                                            <td>{{ data.company.name }}</td>
                                                            <td>{{ data.names }}</td>
                                                            <td>{{ data.user.username }}</td>
                                                            <td>{{ data.user.email }}</td>
                                                            <td>{{ data.user.gsm }}</td>
                                                            <td>{{ data.address }}</td>
                                                            <td>
                                                                <div class="dropdown">
                                                                    <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                                                        data-bs-toggle="dropdown">
                                                                        <i class="bi bi-tools"></i>
                                                                    </button>
                                                                    <ul class="dropdown-menu">
                                                                        <li class=""><a class="dropdown-item pointer"
                                                                                @click="taskDetail(data)">Details</a> </li>
                                                                        <li class="bg-warning"><a class="dropdown-item pointer"
                                                                                @click="editCustomer(data)">Edit</a> </li>
                                                                        <li class="bg-danger"><a class="dropdown-item pointer">Delete</a>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </td>
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
        </div>
</template>

<script setup>
import axiosClient from "@/axios";
import store from "@/store";
import { ref } from "vue";
import { useRouter } from 'vue-router';
import Select2 from 'vue3-select2-component';

const router = useRouter()

const errors = ref({});
const customers = ref({});
const customer = ref({
    name: '',
    rc: '',
    email: '',
    gsm: '',
    address: '',
    // balance : ''
});

const manager = ref({
    customer_pid: '',
    names: '',
    email: '',
    gsm: '',
    address: '',
    // balance : ''
    // username
});

const editCustomer = (data) => {
    customer.value = {
        'name': data.name,
        'rc': data.rc,
        'email': data.email,
        'gsm': data.gsm,
        'address': data.address,
        'pid': data.pid
    }
}


function createCustomer() {
    store.commit('setSpinner', true)
    errors.value = []
    return axiosClient.post('/create-customer', customer.value)
        .then(({ data }) => {
            if (data.status == 201) {
                errors.value = []
                store.commit('notify', { message: data.message })
                console.log(data.data);
                loadCustomer()
                store.commit('setSpinner', false)

            } else if (data.status == 422) {
                errors.value = data.data;
                store.commit('setSpinner', false)

                store.commit('notify', { message: data.message, type: 'warninig' })
            } else {
                store.commit('notify', { message: data.message, type: 'danger' })
                store.commit('setSpinner', false)
            }
            return data;
        })
}

function loadCustomer() {
    store.commit('setSpinner', true)
    return axiosClient.get('/load-customers')
        .then(({ data }) => {
            if (data.status == 200) {
                store.commit('notify', { message: data.message })
                let form = document.querySelector('#cForm');
                form.reset();
                customers.value = data.data
                store.commit('setSpinner', false)
            } else {
                store.commit('notify', { message: data.message, type: 'danger' })
                store.commit('setSpinner', false)
            }
            return data;
        })
}
//load-customer-store-manager
// function createSubDepartment() {
//     store.commit('setSpinner', true)
//     sub_error.value = []
//     store.dispatch('postMethod', { url: '/load-customer-store-manager', param: manager.value }).then((data) => {
//         if (data.status == 422) {
//             sub_error.value = data.data
//         } else if (data.status == 201) {
//             manager.value = [];
//         }
//         store.commit('setSpinner', false)
//     }).catch(e => {
//         store.commit('setSpinner', false)
//         console.log(e);
//     })
// }

const managers = ref({})
function loadManager() {
    store.commit('setSpinner', true)
    store.dispatch('getMethod', { url: '/load-customer-store-manager' }).then((data) => {
        store.commit('setSpinner', false)
        if (data.status == 200) {
            managers.value = data.data;
        }
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
        alert('weting be this')
    })
}
loadManager()

const sub_error = ref({})
function createStoreManager() {
    store.commit('setSpinner', true)
    sub_error.value = []
    store.dispatch('postMethod', { url: '/create-customer-store-manager', param: manager.value }).then((data) => {
        if (data.status == 422) {
            sub_error.value = data.data
        } else if (data.status == 201) {
            // sub.value = [];
        }
        store.commit('setSpinner', false)
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
    })
}

const customersDrop = ref([]);
function dropdownAllow() {
    store.dispatch('loadDropdown', 'customers').then(({ data }) => {
        customersDrop.value = data;
    }).catch(e => {
        console.log(e);
        alert('Something Went Wrong')
    })
}
dropdownAllow()

function taskDetail(task) {
    localStorage.setItem('TVATI_TASK_DETAIL', JSON.stringify(task, null, 2))
    router.push({ path: 'task-detail', query: { task: task.pid } })
}


loadCustomer()

</script>

<style scoped></style>
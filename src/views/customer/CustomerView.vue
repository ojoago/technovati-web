<template>
    <div>
        <div class="container mt-2">
            <div class="card">
                <div class="card-body">
                    <ul class="nav nav-tabs d-flex" id="myTabjustified" role="tablist">
                        <li class="nav-item flex-fill" role="presentation">
                            <button class="nav-link w-100 active" id="customer-tab" data-bs-toggle="tab"
                                data-bs-target="#customer" type="button" role="tab" aria-controls="customer"
                                aria-selected="true">Customer</button>
                        </li>
                        <li class="nav-item flex-fill" role="presentation">
                            <button class="nav-link w-100" id="store-tab" data-bs-toggle="tab" data-bs-target="#store"
                                type="button" role="tab" aria-controls="store" aria-selected="false">Store
                                Manager</button>
                        </li>
                    </ul>
                    <div class="tab-content pt-2" id="myTabjustifiedContent">
                        <div class="tab-pane fade show active" id="customer" role="tabpanel"
                            aria-labelledby="customer-tab">
                            <button class="btn btn-sm btn-primary m-2" @click="toggleCModal=true">Add New</button>
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
                                            <th> <i class="bi bi-gear-fill"></i> </th>
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
                                            <!-- <td>{{ data?.status }}</td> -->
                                            <td>
                                                <div class="dropdown">
                                                    <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                                        data-bs-toggle="dropdown">
                                                        <i class="bi bi-tools"></i>
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                        <li class=""><a class="dropdown-item pointer bg-info"
                                                                @click="customerDetail(data)">Details</a> </li>
                                                        <li class=""><a class="dropdown-item pointer bg-warning"
                                                                @click="editCustomer(data)">Edit</a> </li>
                                                        <li class=""><a class="dropdown-item pointer bg-danger"
                                                                @click="deleteCustomer(data.pid)">Delete</a> </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="flex justify-center mt-4">
                                    <nav class="relative justify-center rounded-md shadow pagination">
                                        <pagination-links v-for="(link, i) of customers.links" :link="link" :key="i"
                                            @next="nextPage(link)"></pagination-links>
                                    </nav>
                                </div>
                            </div>
                        </div>

                        <div class="tab-pane fade" id="store" role="tabpanel" aria-labelledby="customer-tab">
                            <button class="btn btn-sm btn-primary m-3" @click="mModal">Add New</button>

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
                                            <th> <i class="bi bi-gear-fill"></i> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(data, loop) in managers?.data" :key="loop">
                                            <td>{{ loop + 1 }}</td>
                                            <td>{{ data.company.name }}</td>
                                            <td>{{ data.fullname }}</td>
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
                                                        <li><a class="dropdown-item pointer bg-warning"
                                                                @click="editCustomerStore(data)">Edit</a> </li>
                                                        <li><a class="dropdown-item pointer bg-danger"
                                                                @click="deleteCustomerStore(data.id)">Delete</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="flex justify-center mt-4">
                                    <nav class="relative justify-center rounded-md shadow pagination">
                                        <pagination-links v-for="(link, i) of managers.links" :link="link" :key="i"
                                            @next="nextPage(link)"></pagination-links>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>


        <o-modal modal-class="modal-lg" :is-open="toggleMModal" @submit="createStoreManager"
            title="Customer Store Manager" @modal-close="closeModal">
            <template #content>
                <form id="mForm">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">Company</label>
                                <Select2 v-model="manager.customer_pid" :options="customersDrop"
                                    :settings="{ width: '100%' }" />
                                <p class="text-danger " v-if="sub_error?.customer_pid">{{ sub_error?.customer_pid[0] }}
                                </p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">Name</label>
                                <input type="text" v-model="manager.fullname" class="form-control"
                                    placeholder="e.g Nasiru ...">
                                <p class="text-danger " v-if="sub_error?.fullname">{{ sub_error?.fullname[0] }}</p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">Email</label>
                                <input type="text" v-model="manager.email" class="form-control"
                                    placeholder="e.g optimal@gmail.com">
                                <p class="text-danger " v-if="sub_error?.email">{{ sub_error?.email[0] }}</p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">Phone Number</label>
                                <input type="text" maxlength="11" v-model="manager.gsm" class="form-control"
                                    placeholder="Enter phone number">
                                <p class="text-danger " v-if="sub_error?.gsm">{{ sub_error?.gsm[0] }}</p>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="form-label">Address</label>
                                <textarea type="text" v-model="manager.address" class="form-control"
                                    placeholder="e.g plot 99 lagos avenue"></textarea>
                                <p class="text-danger " v-if="sub_error?.address">{{ sub_error?.address[0] }}</p>
                            </div>
                        </div>

                    </div>
                </form>
            </template>
        </o-modal>

        <o-modal modal-class="modal-lg" :is-open="toggleCModal" @submit="createCustomer" title="Create Customer"
            @modal-close="closeModal">
            <template #content>
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
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">RC</label>
                                <input type="text" v-model="customer.rc" class="form-control"
                                    placeholder="e.g 20121212">
                                <p class="text-danger " v-if="errors?.rc">{{ errors?.rc[0] }}</p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Email</label>
                                <input type="text" v-model="customer.email" class="form-control"
                                    placeholder="e.g ojoago@optimalsoft.com">
                                <p class="text-danger " v-if="errors?.email">{{ errors?.email[0] }}</p>
                            </div>
                        </div>
                        <div class="col-md-4">
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
                    <!-- <button type="button" class="btn btn-success btn-sm mt-2" @click="createCustomer">Submit</button> -->
                </form>
            </template>
        </o-modal>
    </div>
</template>

<script setup>
import store from "@/store";
import { ref } from "vue";
import { useRouter } from 'vue-router';
import Select2 from 'vue3-select2-component';
import PaginationLinks from "@/components/PaginationLinks.vue";
import OModal from "@/components/OModal.vue";
const router = useRouter()

const toggleCModal = ref(false)
const toggleMModal = ref(false)
const closeModal = () => {
    toggleCModal.value = false;
    toggleMModal.value = false;
};

const mModal = () => {
    toggleMModal.value = false;
    dropdownAllow()
}
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

const resetCust = () => {
    customer.value = {
        name: '',
        rc: '',
        email: '',
        gsm: '',
        address: '',
    }
}

const manager = ref({
    customer_pid: '',
    fullname: '',
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
    toggleCModal.value = true;
}
const editCustomerStore = (data) => {
    manager.value = {
        customer_pid: data.customer_pid ,
        fullname: data.fullname,
        email: data?.user?.email,
        gsm: data?.user?.gsm,
        address: data.address,
        id: data.id
    }
    toggleMModal.value = true;
}


function createCustomer() {
    errors.value = []
    store.dispatch('postMethod', { url: '/create-customer', param: customer.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data;
        } else if (data?.status == 201) {
            resetCust();
            loadCustomer()
        }
    })
}


function loadCustomer() {
    store.dispatch('getMethod', { url: '/load-customers' }).then((data) => {
        if (data?.status == 200) {
            customers.value = data.data;
        }
    })
}
function deleteCustomer(pid) {
    store.dispatch('deleteMethod', { url: '/delete-customer/'+pid }).then((data) => {
        if (data?.status == 201) {
            loadCustomer()
        }
    })
}
function deleteCustomerStore(pid) {
    store.dispatch('deleteMethod', { url: '/delete-customer-store-manager/'+pid }).then((data) => {
        if (data?.status == 201) {
            loadManager()
        }
    })
}

const managers = ref({})
function loadManager() {
    store.dispatch('getMethod', { url: '/load-customer-store-manager' }).then((data) => {
        if (data?.status == 200) {
            managers.value = data.data;
        }
    })
}
loadManager()

const resetAttr = () => {
    manager.value = {
        customer_pid: '',
        fullname: '',
        email: '',
        gsm: '',
        address: '',
    }
} 
const sub_error = ref({})
function createStoreManager() {
    sub_error.value = []
    store.dispatch('postMethod', { url: '/create-customer-store-manager', param: manager.value }).then((data) => {
        if (data?.status == 422) {
            sub_error.value = data.data;
        } else if (data?.status == 201) {
            resetAttr();
            loadManager()
        }
    })
    
}

const customersDrop = ref([]);
function dropdownAllow() {
    store.dispatch('loadDropdown', 'customers').then(({ data }) => {
        customersDrop.value = data;
    }).catch(e => {
        console.log(e);
    })
}
dropdownAllow()

function customerDetail(cst) {
    localStorage.setItem('TVATI_CST_DETAIL', JSON.stringify(cst, null, 2))
    router.push({ path: 'customer-detail', query: { cst: cst.pid } })
}


loadCustomer()

function nextPage(link) {
    alert()
    if (!link.url || link.active) {
        return;
    }
    alert(link.url)
}

</script>

<style scoped></style>
<template>
    <div>
        <div class="container mt-2">
            <div class="row">
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <fieldset class="border rounded-3 p-2 m-1">
                                <legend class="float-none w-auto px-2">Create Task</legend>

                                <form id="sForm">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Name</label>
                                                <input type="text" v-model="supplier.name" class="form-control" placeholder="e.g Ray Engineering">
                                                <p class="text-danger " v-if="errors?.name">{{ errors?.name[0] }}</p>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">RC</label>
                                                <input type="text" v-model="supplier.rc" class="form-control" placeholder="e.g 20121212">
                                                <p class="text-danger " v-if="errors?.rc">{{ errors?.rc[0] }}</p>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Email</label>
                                                <input type="text" v-model="supplier.email" class="form-control" placeholder="e.g ojoago@optimalsoft.com">
                                                <p class="text-danger " v-if="errors?.email">{{ errors?.email[0] }}</p>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Phone Number</label>
                                                <input type="text" v-model="supplier.gsm" class="form-control" placeholder="Enter phone number">
                                                <p class="text-danger " v-if="errors?.gsm">{{ errors?.gsm[0] }}</p>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Address</label>
                                                <textarea type="text" v-model="supplier.address" class="form-control" placeholder="e.g plot 99 lagos avenue"></textarea>
                                                <p class="text-danger " v-if="errors?.address">{{ errors?.address[0]
                                                }}</p>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <button type="button" class="btn btn-success btn-sm mt-2"
                                        @click="createSupplier">Submit</button>
                                </form>

                            </fieldset>
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header">Suppliers</div>
                        <div class="card-body">
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
                                        <tr v-for="(data, loop) in suppliers?.data" :key="loop">
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
                                                        <li><a class="dropdown-item pointer bg-info" @click="supplierDetail(data)">Details</a> </li>
                                                        <li><a class="dropdown-item pointer bg-warning" @click="editSupplier(data)">Edit</a> </li>
                                                        <li><a class="dropdown-item pointer bg-danger"  @click="detelSupplier(data?.pid)">Delete</a></li>
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
</template>

<script setup>
import store from "@/store";
import { ref } from "vue";
import { useRouter } from 'vue-router';
const router = useRouter()

const errors = ref({});
const suppliers = ref({});
const supplier = ref({
    name : '' ,
    rc : '' ,
    email : '' ,
    gsm : '' ,
    address : '' ,
    // balance : ''
});

const editSupplier = (data)=> {
        supplier.value = {
        'name': data.name,
        'rc': data.rc,
        'email': data.email,
        'gsm': data.gsm,
        'address': data.address,
        'pid': data.pid
    }
}


function createSupplier() {
    errors.value = []
     store.dispatch('postMethod', { url: '/create-supplier', param: supplier.value }).then((data) => {
        if (data.status == 422) {
            errors.value = data.data;
        } else if (data.status == 201) {
            let form = document.querySelector('#sForm');
            form.reset();
            loadSuppliers()
        }
    })
    
}

function loadSuppliers() {
    store.dispatch('getMethod', { url: '/load-suppliers' }).then((data) => {
        if (data?.status == 200) {
            suppliers.value = data.data;
        }
    })
}
function detelSupplier(pid) {
    store.dispatch('deleteMethod', { url: '/delete-supplier/'+pid }).then((data) => {
        console.log(data);
        if (data?.status == 201) {
            suppliers.value = data.data;
            loadSuppliers()
        }
    })
}

function supplierDetail(supplier) {
    localStorage.setItem('TVATI_SUP_DETAIL', JSON.stringify(supplier, null, 2))
    router.push({ path: 'supplier-detail', query: { supplier: supplier.pid } })
}


loadSuppliers()

</script>

<style scoped></style>
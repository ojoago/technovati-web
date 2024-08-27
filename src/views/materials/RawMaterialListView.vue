<template>
    <div>
        <div class="container mt-2">
            <div class="card">
                    <div class="card-header">Raw Materials  <button class="btn btn-sm btn-success mb-2"> 
                                    <router-link to="/raw-material" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Add Quantity  </span>  </router-link>
                                </button></div>
                    <div class="card-body">
                        <button @click="toggleModal = true" class="btn btn-sm btn-primary mr-2">Add New</button> &nbsp;
                        <button @click="unitModal = true" class="btn btn-sm btn-primary ml-2">Add Item Unit</button>
                        <fieldset class="border rounded-3 p-2 m-1">
                            <legend class="float-none w-auto px-2">Lists</legend>
                            <div class="table-responsive">
                                <table class="table-hover table-stripped table-bordered table">
                                    <thead>
                                        <tr>
                                            <th>SN</th>
                                            <th>Name</th>
                                            <th>Model</th>
                                            <th>quantity</th>
                                            <!-- <th>Type</th> -->
                                            <!-- <th>Team</th> -->
                                            <th>description</th>
                                            <th>manufacturer</th>
                                            <th> <i class="bi bi-gear-fill"></i> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(data, loop) in rawMaterials.data" :key="loop">
                                            <td>{{ loop + 1 }}</td>
                                            <td>{{ data.name }}</td>
                                            <td>{{ data.model  }} </td>
                                            <td>{{ data?.quantity?.quantity }} {{ data?.unit?.name }}</td>
                                            <td>{{ data.description  }}</td>
                                            <td>{{ data.manufacturer?.name }}</td>
                                            <td>
                                                <div class="dropdown">
                                                    <button type="button"
                                                        class="btn btn-primary btn-sm dropdown-toggle"
                                                        data-bs-toggle="dropdown">
                                                        <i class="bi bi-tools"></i>
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                        <li @click="editMaterial(data)"><a class="dropdown-item pointer">Edit</a> </li>
                                                        <!-- <li><a class="dropdown-item pointer">details</a> </li> -->
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="flex justify-center mt-4">
                                    <nav class="relative justify-center rounded-md shadow pagination">
                                        <pagination-links v-for="(link, i) of rawMaterials.links" :link="link" :key="i"
                                            @next="nextPage(link)"></pagination-links>
                                    </nav>
                                </div>
                            </div>
                        </fieldset>
                </div>
            </div>
        </div>
        <o-modal :isOpen="toggleModal" modal-class="modal-lg" title="Add New Item" @submit="addMaterial" @modal-close="closeModal" >
            <template #content>
                 <form >
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">Name</label>
                                <input type="text" v-model="raw.name" class="form-control" placeholder="e.g box">
                                <p class="text-danger " v-if="errors?.name">{{ errors?.name[0] }}</p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">model</label>
                                <input type="text" v-model="raw.model" class="form-control" placeholder="e.g 20121212">
                                <p class="text-danger " v-if="errors?.model">{{ errors?.model[0] }}</p>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="form-label">description</label>
                                <textarea type="text" v-model="raw.description" class="form-control" placeholder="e.g this is from japan"></textarea>
                                <p class="text-danger " v-if="errors?.description">{{ errors?.description[0] }}</p>
                            </div>
                        </div>
                        
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-label">Unit</label>
                                    <Select2 v-model="raw.unit" :options="units" :settings="{ width: '100%' }"  />
                                    <p class="text-danger " v-if="errors?.unit">{{ errors?.unit[0] }}</p>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-label">manufacturer</label>
                                    <Select2 v-model="raw.manufacturer" :options="suppliers" :settings="{ width: '100%' }"  />
                                    <p class="text-danger " v-if="errors?.manufacturer">{{ errors?.manufacturer[0] }}</p>
                                </div>
                            </div>
                    </div>
                </form>
            </template>
             
        </o-modal>

        <o-modal :isOpen="unitModal" modal-class="modal-xs" title="Add Item Unit" @modal-close="closeModal" >
            <template #content>
                <UnitItemForm/>
            </template>
            <template #footer>
                <div></div>
            </template>
        </o-modal>
    </div>
</template>

<script setup>
import store from "@/store";
import { ref } from "vue";
import PaginationLinks from "@/components/PaginationLinks.vue";
import OModal from "@/components/OModal.vue";
import UnitItemForm from "@/components/material/ItemUnitForm.vue"
import Select2 from 'vue3-select2-component';


const toggleModal = ref(false)
const unitModal = ref(false)

const closeModal = () => {
    toggleModal.value = false;
    unitModal.value = false;
    resetAttr()
};



const rawMaterials = ref({});

loadRawMaterials()
function loadRawMaterials(url = '/load-materials') {
    store.dispatch('getMethod', { url: url }).then((data) => {
        if (data?.status == 200) {
            rawMaterials.value = data.data;
        }
    })
}


const raw = ref({
    name: '',
    model: '',
    description: '',
    unit: '',
    manufacturer: '',
});

const resetAttr = () => {
    raw.value = {
        name: '',
        model: '',
        description: '',
        unit: '',
        manufacturer: '',
    }
}

const errors = ref({})
function addMaterial() {
    errors.value = []
    store.dispatch('postMethod', { url: '/create-material', param: raw.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data
        } else if (data?.status == 201) {
            closeModal()
        }
    })
}




const suppliers = ref({});

function dropdownSupplier() {
    store.dispatch('loadDropdown', 'suppliers').then(({ data }) => {
        suppliers.value = data;
    })
}
dropdownSupplier()

const units = ref({});

function dropdownUnits() {
    store.dispatch('loadDropdown', 'units').then(({ data }) => {
        units.value = data;
    })
}
dropdownUnits()


const editMaterial = (data) => {
     raw.value = {
        name: data.name,
        model: data.model,
        description: data.description,
        unit: data.unit?.pid,
        manufacturer: data.manufacturer?.pid,
        pid: data.pid,
    }
    toggleModal.value = true
}



function nextPage(link) {
    
    if (!link.url || link.active) {
        return;
    }
    loadRawMaterials(link.url)
}

</script>

<style scoped></style>
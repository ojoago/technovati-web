<template>
    <div>
        <div class="container mt-2">

            <div class="card">
                <div class="card-header">Company Items

                    <button class="btn btn-primary btn-sm mr-2" @click="openToggleModal">Add New</button> &nbsp;
                    <button @click="unitModal = true" class="btn btn-sm btn-primary ml-2">Add Item Unit</button>

                </div>
                <div class="card-body">

                    <div class="table-responsive">
                        <table class="table-hover table-stripped table-bordered table">
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Name</th>
                                    <th>Unit</th>
                                    <th>Description</th>
                                    <th> <i class="bi bi-gear-fill"></i> </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, loop) in items?.data" :key="loop">
                                    <td>{{ loop + 1 }}</td>
                                    <td>{{ item.name }}</td>
                                    <td>{{ item.unit }}</td>
                                    <td>{{ item.description }}</td>
                                    <td>
                                        <div class="dropdown">
                                            <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                                data-bs-toggle="dropdown">
                                                <i class="bi bi-tools"></i>
                                            </button>
                                            <ul class="dropdown-menu">
                                                <li class="bg-warning"><a class="dropdown-item pointer"
                                                        @click="editItem(item)">Edit</a> </li>
                                                <!-- <li class="bg-danger"><a class="dropdown-item pointer"
                                                                @click="deleteItem(item.pid)">Delete</a> </li> -->
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="flex justify-center mt-4">
                            <nav class="relative justify-center rounded-md shadow pagination">
                                <pagination-links v-for="(link, i) of items.links" :link="link" :key="i"
                                    @next="nextPage(link)"></pagination-links>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <o-modal :isOpen="unitModal" modal-class="modal-xs" title="Add Item Unit" @modal-close="closeModal">
            <template #content>
                <UnitItemForm />
            </template>
            <template #footer>
                <div></div>
            </template>
        </o-modal>

        <o-modal :isOpen="toggleModal" modal-class="modal-xs" title="Create Item Names" @submit="createItem"
            @modal-close="closeModal">
            <template #content>
                <form id="itemForm">
                    <div class="row">
                        <div class="col-md-12">
                            <label class="form-label">Item Name</label>
                            <input type="text" v-model="item.name" class="form-control form-control-sm"
                                placeholder="e.g UIU">
                            <p class="text-danger " v-if="errors?.name">{{ errors?.name[0] }} </p>
                        </div>
                        <div class="col-md-12">
                            <label class="form-label">Item Name</label>
                            <select v-model="item.unit" class="form-control form-control-sm">
                                <option value="" selected>Select Unit</option>
                                <option v-for="(unit, i) in units" :key="i">{{ unit.text }}</option>
                            </select>
                            <p class="text-danger " v-if="errors?.unit">{{ errors?.unit[0] }} </p>
                        </div>
                        <div class="col-md-12">
                            <label>Description</label>
                            <textarea v-model="item.description" class="form-control form-control-sm"></textarea>
                        </div>
                    </div>

                    <!-- <div class="float-end">
                        <button type="button" class="btn btn-success btn-sm mt-2" @click="createItem">Submit</button>
                    </div> -->
                </form>
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

const unitModal = ref(false)
const toggleModal = ref(false);

const closeModal = () => {
    toggleModal.value = false;
    unitModal.value = false;
};

const openToggleModal = ()=> {
    toggleModal.value = true;
    dropdownUnits()
}


const errors = ref({});
const items = ref({});

const item = ref({
    unit:'' ,
    name:'' ,
    description: '' ,
});
 
const editItem = (sec) => {
    item.value = {
        unit: sec.unit ,
        description: sec.description ,
        name: sec.name ,
        pid: sec.pid ,
    }
    toggleModal.value = true
}

const resetAttr = () => {
    item.value = {
        unit: '',
        name: '',
        description: '',
    }
}
// const deleteItem = (id) => {
//     alert(id)
// }

function createItem() {
    errors.value = []
    store.dispatch('postMethod', { url: '/create-item', param: item.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data
        } else if (data?.status == 201) {
            resetAttr();
            loadItem()
        }
    }).catch(e => {
        console.log(e);
    })
}
loadItem()
function loadItem() {
    store.dispatch('getMethod', { url: '/load-items/' }).then((data) => {
        if (data?.status == 200) {
            items.value = data.data;
        }
    }).catch(e => {
        console.log(e);
    })
}
// function dropdownSection() {
//     store.dispatch('loadDropdown', 'appraisal-section').then(({ data }) => {
//         sectionsDrop.value = data;
//     }).catch(e => {
//         console.log(e);
//         alert('Something Went Wrong')
//     })
// }
// dropdownSection()


const units = ref({});

function dropdownUnits() {
    store.dispatch('loadDropdown', 'units').then(({ data }) => {
        units.value = data;
    })
}
dropdownUnits()

</script>

<style scoped></style>
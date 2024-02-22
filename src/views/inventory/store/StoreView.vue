<template>
    <div>
        <div class="container mt-2">
           
            <div class="card">
                <div class="card-header">Company Stores
                    <button class="btn btn-primary btn-sm" @click="openModal=true">Add New</button>
                </div>
                <div class="card-body">

                    <div class="table-responsive">
                        <table class="table-hover table-stripped table-bordered table">
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Name</th>
                                    <th>Manager</th>
                                    <th>location</th>
                                    <th>Description</th>
                                    <th><i class="bi bi-gear-fill"></i></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, loop) in stores?.data" :key="loop">
                                    <td>{{ loop + 1 }}</td>
                                    <td>{{ item.name }}</td>
                                    <td>{{ item?.manager?.username }}</td>
                                    <td>{{ item.location }}</td>
                                    <td>{{ item.description }}</td>
                                    <td>
                                        <div class="dropdown">
                                            <button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-bs-toggle="dropdown">
                                                <i class="bi bi-tools"></i>
                                            </button>
                                            <ul class="dropdown-menu">
                                                <li class="bg-warning"><a class="dropdown-item pointer" @click="editItem(item)">Edit</a> </li>
                                                <li class="bg-danger"><a class="dropdown-item pointer"  @click="deleteItem(item.pid)">Delete</a> </li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="flex justify-center mt-4">
                            <nav class="relative justify-center rounded-md shadow pagination">
                                <pagination-links v-for="(link, i) of stores.links" :link="link" :key="i" @next="nextPage(link)"></pagination-links>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <o-modal  :isOpen="openModal" modal-class="modal-sm" title="Company Store" @submit="createStore" @modal-close="closeModal">
            <template #content>
                <form id="itemForm">
                    <div class="row">
                        <div class="col-md-12">
                            <label class="form-label">Name</label>
                            <input type="text" v-model="storeFrom.name" class="form-control form-control-sm" placeholder="e.g HQ store">
                            <p class="text-danger" v-if="errors?.name">{{ errors?.name[0] }} </p>
                        </div>
                    <div class="col-md-12">
                        <label class="form-label">Location</label>
                        <textarea v-model="storeFrom.location" class="form-control form-control-sm" placeholder="e.g Zaria"></textarea>
                        <p class="text-danger" v-if="errors?.location">{{ errors?.location[0] }} </p>
                    </div>
                    <div class="col-md-12">
                        <label>Description</label>
                        <textarea v-model="storeFrom.description" class="form-control form-control-sm" placeholder="e.g Raw material store"></textarea>
                        <p class="text-danger" v-if="errors?.description">{{ errors?.description[0] }} </p>
                    </div>
                    <div class="col-md-12">
                        <label class="form-label">Store Manager</label>
                        <Select2 v-model="storeFrom.manager_pid" :options="users" :settings="{ width: '100%' }" />
                        <p class="text-danger" v-if="errors?.manager_pid">{{ errors?.manager_pid[0] }} </p>
                    </div>
                </div>
                   
                </form>
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
const openModal = ref(false)
const closeModal = () => {
    openModal.value = false;
};

const errors = ref({});
const stores = ref({});

const storeFrom = ref({
    location: '',
    name: '',
    description: '',
    maanager_pid: '',
});

const editItem = (sec) => {
    storeFrom.value = {
        location: sec.location,
        description: sec.description,
        name: sec.name,
        maanager_pid: sec.maanager_pid,
        pid: sec.pid,
    }
    openModal.value = true
}
const deleteItem = (id) => {
    alert(id)
}



function createStore() {
    errors.value = []
    store.dispatch('postMethod', { url: '/create-store', param: storeFrom.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data
        } else if (data?.status == 201) {
            let form = document.querySelector('#itemForm');
            form.reset();
            loadItem()
        }
    })
}
loadItem()
function loadItem() {
    store.dispatch('getMethod', { url: '/load-stores' }).then((data) => {
        if (data?.status == 200) {
            stores.value = data.data;
        }
    })
}
const users = ref({})
function dropdownSection() {
    store.dispatch('loadDropdown', 'users').then(({ data }) => {
        users.value = data;
    })
}
dropdownSection()


</script>

<style scoped></style>
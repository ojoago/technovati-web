<template>
    <div>
        <div class="container mt-2">
            <div class="row">
                 
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-body">
                            <fieldset class="border rounded-3 p-2 m-1">
                                <legend class="float-none w-auto px-2 h5">Create Item Name</legend>
                                <form id="itemForm">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <label class="form-label">Item Name</label>
                                                <input type="text" v-model="item.name" class="form-control form-control-sm" placeholder="e.g UIU">
                                                <p class="text-danger " v-if="errors?.name">{{ errors?.name[0] }} </p>
                                            </div>
                                            <div class="col-md-12">
                                                    <label class="form-label">Item Name</label>
                                                    <select v-model="item.unit" class="form-control form-control-sm" >
                                                        <option value="" selected>Select Unit</option>
                                                        <option v-for="(unit,i) in units" :key="i">{{ unit }}</option>
                                                    </select>
                                                <p class="text-danger " v-if="errors?.unit">{{ errors?.unit[0] }} </p>
                                            </div>
                                           <div class="col-md-12">
                                                <label >Description</label>
                                                <textarea v-model="item.description" class="form-control form-control-sm"></textarea>
                                           </div>
                                        </div>
                                    
                                    <div class="float-end">
                                        <button type="button" class="btn btn-success btn-sm mt-2"
                                            @click="createItem">Submit</button>
                                    </div>
                                </form>

                            </fieldset>
                        </div>
                    </div>
                </div>
                <div class="col-md-7">
                    <div class="card">
                        <div class="card-header">Company Items</div>
                        <div class="card-body">
                           
                            <div class="table-responsive">
                                <table class="table-hover table-stripped table-bordered table">
                                    <thead>
                                        <tr>
                                            <th>SN</th>
                                            <th>Name</th>
                                            <th>Unit</th>
                                            <th>Description</th>
                                            <th> <i class="bi bi-pencil-fill"></i> </th>
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
                                                        <li class="bg-danger"><a class="dropdown-item pointer"
                                                                @click="deleteItem(item.pid)">Delete</a> </li>
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

const errors = ref({});
const items = ref({});

const item = ref({
    unit:'' ,
    name:'' ,
    description: '' ,
});
 
const editItem = (sec) => {
    item.value = {
        unit: sec.item ,
        description: sec.description ,
        name: sec.name ,
        pid: sec.pid ,
    }
}
const deleteItem = (id) => {
    alert(id)
}
const units = [
    'pieces', 'meters' , 'cartoon' , 'parket'
]


function createItem() {
    store.commit('setSpinner', true)
    errors.value = []
    store.dispatch('postMethod', { url: '/create-item', param: item.value }).then((data) => {
        if (data.status == 422) {
            errors.value = data.data
        } else if (data.status == 201) {
            loadItem()
        }
        store.commit('setSpinner', false)
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
    })
}
loadItem()
function loadItem() {
    store.commit('setSpinner', true)
    store.dispatch('getMethod', { url: '/load-items/' }).then((data) => {
        store.commit('setSpinner', false)
        if (data.status == 200) {
            items.value = data.data;
        }
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
        alert('weting be this')
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


</script>

<style scoped></style>
<template>
    <div>
        <div class="container mt-2">

            <div class="card">
                <div class="card-header">

                    <div class="row">
                        <div class="col-md-6">
                            Company Items
                        </div>
                        <div class="col-md-6">
                            <select class="form-control" @change="loadItem($event.target.value)">
                                <option disabled selected>Make Selection</option>
                                <template v-for="sec in stores" :key="sec.id">
                                    <option v-if="stores.length==1" selected :value="sec.id">{{ sec.text }} </option>
                                    <option v-else :value="sec.id">{{ sec.text }} </option>
                                </template>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="card-body">

                    <div class="table-responsive">
                        <table class="table-hover table-stripped table-bordered table">
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Name</th>
                                    <!-- <th>Unit</th> -->
                                    <th>Quantity</th>
                                    <th>Description</th>
                                    <!-- <th> <i class="bi bi-pencil-fill"></i> </th> -->
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, loop) in items?.data" :key="loop">
                                    <td>{{ loop + 1 }}</td>
                                    <td>{{ item?.item?.name }}</td>
                                    <!-- <td></td> -->
                                    <td>{{ item?.quantity }} {{ item?.item?.unit }}</td>
                                    <td>{{ item?.item?.description }}</td>
                                    <!-- <td> -->
                                    <!-- <div class="dropdown">
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
                                        </div> -->
                                    <!-- </td> -->
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

    </div>
</template>

<script setup>
import store from "@/store";
import { ref } from "vue";
import PaginationLinks from "@/components/PaginationLinks.vue";
 
const items = ref({});

 
function loadItem(pid) {
    store.dispatch('getMethod', { url: '/load-store-items/' + pid }).then((data) => {
        if (data?.status == 200) {
            items.value = data.data;
        }
    }).catch(e => {
        console.log(e);
    })
}

const stores = ref({})
function dropdownSection() {
    store.dispatch('loadDropdown', 'stores').then(({ data }) => {
        if(data.length==1){
            loadItem(data[0].id)
        }
        stores.value = data;
    }).catch(e => {
        console.log(e);
    })
}
dropdownSection()


</script>

<style scoped></style>
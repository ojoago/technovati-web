<template>
    <div>
        <div class="container mt-2">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">Raw Material Consignment <button class="btn btn-sm btn-success mb-2">
                            <router-link to="/raw-material" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Add New </span> </router-link>
                        </button></div>
                    <div class="card-body">
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
                                            <th>unit cost</th>
                                            <th>total cost</th>
                                            <th>consignment number</th>
                                            <th>manufactured date</th>
                                            <th>expiring date</th>
                                            <th>date supplied</th>
                                            <th>description</th>
                                            <th>manufacturer</th>
                                            <th>Recorded By</th>
                                            <!-- <th> <i class="bi bi-pencil-fill"></i> </th> -->
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(data, loop) in rawMaterials.data" :key="loop">
                                            <td>{{ loop + 1 }}</td>
                                            <td>{{ data.name }}</td>
                                            <td>{{ data.model }} </td>
                                            <td>{{ data.quantity }} {{ data.unit }}</td>
                                            <td>{{ data.unit_cost }} </td>
                                            <td>{{ data.total_cost }} </td>
                                            <td>{{ data.consignment_number }}</td>
                                            <td>{{ data.manufactured_date }}</td>
                                            <td>{{ data.expiring_date }}</td>
                                            <!-- <td>{{ data.manufactured_date }}</td> -->
                                            <td>{{ data.date_supplied }}</td>
                                            <td>{{ data.description }}</td>
                                            <td>{{ data.manufacturer?.name }}</td>
                                            <td>{{ data.user?.username }}</td>

                                            <!-- <td>
                                                <div class="dropdown">
                                                    <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                                        data-bs-toggle="dropdown">
                                                        <i class="bi bi-tools"></i>
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                        <li @click="editMaterial(data)"><a
                                                                class="dropdown-item pointer">Edit</a> </li>
                                                        <li><a class="dropdown-item pointer">details</a> </li>
                                                    </ul>
                                                </div>
                                            </td> -->
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colspan="4">total</td>
                                            <td>{{ unit }}</td>
                                            <td>{{ cost }}</td>
                                        </tr>
                                    </tfoot>
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
        </div>
    </div>
</template>

<script setup>
import store from "@/store";
import { ref } from "vue";
import PaginationLinks from "@/components/PaginationLinks.vue";

const rawMaterials = ref({});
let unit = 0;
let cost = 0;
loadRawMaterials()
function loadRawMaterials() {
    store.commit('setSpinner', true)
    store.dispatch('getMethod', { url: '/load-material-consignment' }).then((data) => {
        store.commit('setSpinner', false)
        if (data?.status == 200) {
            rawMaterials.value = data.data;
        }
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
        alert('weting be this')
    })
}


function nextPage(link) {
    alert()
    if (!link.url || link.active) {
        return;
    }
    alert(link.url)
}

</script>

<style scoped></style>
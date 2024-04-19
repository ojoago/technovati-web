<template>
    <div>
        <div class="container-fluid mt-2">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{{ supplier.name }} {{ supplier.rc }} </h5>

                    <!-- Default Tabs -->
                    <ul class="nav nav-tabs d-flex" id="myTabjustified" role="tablist">
                        <li class="nav-item flex-fill" role="presentation">
                            <button class="nav-link w-100 active" id="detail-tab" data-bs-toggle="tab"
                                data-bs-target="#detail" type="button" role="tab" aria-controls="detail" aria-selected="true">Item </button>
                        </li>
                        <li class="nav-item flex-fill" role="presentation">
                            <button class="nav-link w-100" id="supplied-tab" data-bs-toggle="tab" data-bs-target="#supplied" type="button" role="tab" aria-controls="supplied" aria-selected="false"> Supplied Consignments</button>
                        </li>

                    </ul>
                    <div class="tab-content pt-2" id="myTabjustifiedContent">
                        <div class="tab-pane fade show active" id="detail" role="tabpanel" aria-labelledby="detail-tab">
                            <div class="table-responsive">
                                <table class="table-hover table-stripped table-bordered table">
                                    <thead>
                                        <tr>
                                            <th>SN</th>
                                            <th>Item</th>
                                            <th>Model</th>
                                            <th>Quantity </th>
                                            <th>Last Supplied Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(data, loop) in supplies.data" :key="loop">
                                            <td>{{ loop + 1 }}</td>
                                            <td>{{ data.name }}</td>
                                            <td>{{ data.model }}</td>
                                            <td>{{ data?.quantity?.quantity }} {{ data?.unit?.name }}</td>
                                            <td>{{ data?.quantity?.date_supplied }}</td>
                                           
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="flex justify-center mt-4">
                                    <nav class="relative justify-center rounded-md shadow pagination">
                                        <pagination-links v-for="(link, i) of supplies.links" :link="link" :key="i" @next="nextPage(link)"></pagination-links>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="supplied" role="tabpanel" aria-labelledby="supplied-tab">
                            <div class="table-responsive">
                                    <table class="table-hover table-stripped table-bordered table">
                                        <thead>
                                            <tr>
                                                <th>SN</th>
                                                <th>Consignment</th>
                                                <th>Item</th>
                                                <th>Model</th>
                                                <th>Quantity </th>
                                                <th>Unit Cost </th>
                                                <th>Total Cost </th>
                                                <th>Description </th>
                                                <th>Supplied Date</th>
                                                <th>Manufactured Date</th>
                                                <th>Expiring Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(data, loop) in consignments.data" :key="loop">
                                                <td>{{ loop + 1 }}</td>
                                                <td>{{ data.consignment_number }}</td>
                                                <td>{{ data.name }}</td>
                                                <td>{{ data.model }}</td>
                                                <td>{{ data.quantity }} {{ data.unit }}</td>
                                                <td>{{ data.unit_cost }}</td>
                                                <td>{{ data.total_cost }}</td>
                                                <td>{{ data.description }}</td>
                                                <td>{{ data.date_supplied }}</td>
                                                <td>{{ data.manufactured_date }}</td>
                                                <td>{{ data.expiring_date }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="flex justify-center mt-4">
                                        <nav class="relative justify-center rounded-md shadow pagination">
                                            <pagination-links v-for="(link, i) of consignments.links" :link="link" :key="i" @next="nextPage(link)"></pagination-links>
                                        </nav>
                                    </div>
                                </div>
                        </div>

                    </div>
                    <!-- End  Tabs -->

                </div>
            </div>

        </div>
    </div>
</template>

<script setup>

import store from "@/store";
import { onMounted, ref } from "vue";
import PaginationLinks from "@/components/PaginationLinks.vue";

const supplier = ref({});
const supplies = ref({});
const consignments = ref({});
const pid = ref(null);
onMounted(() => {
    let lcls = localStorage.getItem('TVATI_SUP_DETAIL') ? JSON.parse(localStorage.getItem('TVATI_SUP_DETAIL')) : 'null'
    if (lcls != 'null') {
        supplier.value = lcls;
        pid.value = lcls.pid
        loadCompanySuppliedItem(pid.value)
    }
    let consignTab = document.querySelector('#supplied-tab');
    consignTab.addEventListener('click', () => {
        loadCompanyConsignment(pid.value)
    })
});

function loadCompanySuppliedItem(pid){
    store.dispatch('getMethod', { url: '/supplier-items/' + pid }).then(({ data }) => {
        supplies.value = data;
    }).catch(e => {
        console.log(e);
    })
}



function loadCompanyConsignment(pid) {
    store.dispatch('getMethod', { url: '/supplier-consignment/' + pid }).then(({ data }) => {
        consignments.value = data;
    }).catch(e => {
        console.log(e);
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
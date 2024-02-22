<template>
    <div>
        <div class="container mt-2">
            <div class="card">
                <div class="card-header">Inventory Item Request Details</div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table-hover table-stripped table-bordered table">
                            <tbody>
                                <tr>
                                    <td colspan="4">{{ request.comment }}</td>
                                </tr>
                                <tr>
                                    <th>Requested By </th>
                                    <td>{{ request.request?.username }}</td>
                                    <th>Receiver </th>
                                    <td>{{ request.receiver?.username ?? request.request?.username }} </td>
                                </tr>
                                <tr>
                                    <th>Order </th>
                                    <td>#{{ request.waybill }}</td>
                                    <th>Item Count </th>
                                    <td>{{ request.items_count }} </td>
                                    
                                </tr>
                              
                                <tr>
                                    <th>Date </th>
                                    <td>{{ request.request_time }} </td>
                                    <th>Status </th>
                                    <td> {{ request.way_status }} </td>
                                </tr>
                            </tbody>
                        </table>

                        <table class="table-hover table-stripped table-bordered table">
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Item Name</th>
                                    <!-- <th>Model</th> -->
                                    <th>Quantity Requested</th>
                                    <th>Quantity Supplied</th>
                                    <th>Difference</th>
                                   
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(data, loop) in details" :key="loop">
                                    <td>{{ loop + 1 }}</td>
                                    <td>{{ data.name }}</td>
                                    <!-- <td>{{ data.model }}</td> -->
                                    <td>{{ data.quantity_requested }}</td>
                                    <td>{{ data.quantity_supplied }}</td>
                                    <td>{{ data.quantity_supplied - data.quantity_requested }}</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    </div>
      
</template>

<script setup>
import store from "@/store";
import { onMounted, ref } from "vue";
import {  useRouter } from 'vue-router';
const router = useRouter()

const request = ref({});
// const requests = ref({});

// loadRequest()
// function loadRequest() {
//     store.commit('setSpinner', true)
//     store.dispatch('getMethod', { url: '/load-my-raw-material-requests' }).then((data) => {
//         store.commit('setSpinner', false)
//         if (data.status == 200) {
//             requests.value = data.data;
//         }
//     }).catch(e => {
//         store.commit('setSpinner', false)
//         console.log(e);
//         alert('weting be this')
//     })
// }
const details = ref({});

function loadRequest() {
    store.dispatch('getMethod', { url: '/load-way-bill-details/' + request.value.waybill }).then((data) => {
        if (data?.status == 200) {
            details.value = data.data;
            console.log(data.data);
        }
    })
}

onMounted(() => {
    request.value = localStorage.getItem('TVATI_MY_RQ_DETAIL') ? JSON.parse(localStorage.getItem('TVATI_MY_RQ_DETAIL')) : 'null'
    if (request.value == 'null') {
        router.push({ path: 'my-request'})
        return false
    }
    loadRequest()
    getUrlQueryParams()
});

async function getUrlQueryParams() {
    await router.isReady()
}

</script>

<style scoped></style>
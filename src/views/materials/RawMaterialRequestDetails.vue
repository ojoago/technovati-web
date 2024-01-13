<template>
    <div>
        <div class="container mt-2">
            <div class="card">
                <div class="card-header">Raw Material Request Details</div>
                <div class="card-body">
                    <input type="text" class=" form-control form-control-sm" placeholder="search Item">
                    <div class="table-responsive">
                        <table class="table-hover table-stripped table-bordered table">
                           
                            <tbody>
                                <tr>
                                    <td colspan="2">{{ item.note }}</td>
                                </tr>
                                <tr>
                                    <!-- <td>{{ item.requested_by?.username }}</td> -->
                                    <th>Item Count </th>
                                    <td>{{ item.item_count }}</td>
                                    
                                </tr>
                                <tr>
                                    <th>Receiver </th>
                                    <td>{{ item.receiver?.username ?? item.requested_by?.username }}</td>
                                </tr>
                                <tr>
                                    <th>Date </th>
                                    <td>{{ item.request_time }} <b>Status: {{ item.status }}</b> </td>
                                </tr>
                            </tbody>
                        </table>

                        <table class="table-hover table-stripped table-bordered table">
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Item Name</th>
                                    <th>Model</th>
                                    <th>Quantity Requested</th>
                                    <th>Quantity Supplied</th>
                                    <th>Difference</th>
                                   
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(data, loop) in item.item" :key="loop">
                                    <td>{{ loop + 1 }}</td>
                                    <td>{{ data.name }}</td>
                                    <td>{{ data.model }}</td>
                                    <td>{{ data.quantity_requested }}</td>
                                    <td>{{ data.quantity_supplied }}</td>
                                    <td>{{ data.quantity_requested - data.quantity_supplied }}</td>
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
// import store from "@/store";
import { onMounted, ref } from "vue";
import {  useRouter } from 'vue-router';
const router = useRouter()

const item = ref({});
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

onMounted(() => {
    item.value = localStorage.getItem('TVATI_RAW_MAT_RQ_DETAIL') ? JSON.parse(localStorage.getItem('TVATI_RAW_MAT_RQ_DETAIL')) : 'null'
    if (item.value == 'null') {
        router.push({ path: 'my-request'})
    }
    getUrlQueryParams()
});

async function getUrlQueryParams() {
    await router.isReady()
}

</script>

<style scoped></style>
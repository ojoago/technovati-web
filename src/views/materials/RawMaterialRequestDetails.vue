<template>
    <div>
        <div class="container mt-2">
            <div class="card">
                <div class="card-header">Raw Material Request Details</div>
                 
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table-hover table-stripped table-bordered table">
                            <tbody>
                                <tr>
                                    <td colspan="2">{{ item?.note }}</td>
                                </tr>
                                <tr>
                                    <!-- <td>{{ item.requested_by?.username }}</td> -->
                                    <th>Item Count </th>
                                    <td>{{ item?.item_count }}</td>

                                </tr>
                                <tr>
                                    <th>Receiver </th>
                                    <td>{{ item?.receiver?.username ?? item?.requested_by?.username }}</td>
                                </tr>
                                <tr>
                                    <th>Date </th>
                                    <td>{{ item?.request_time }} <b>Status: {{ item?.request_status }}</b> </td>
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
                                    <td>{{ data.quantity_supplied - data.quantity_requested }}</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                    <button class="btn btn-primary btn-sm" @click="confirmItems">confirm</button>
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

const item = ref({});
// const requests = ref({});

const confirmItems = () => {
    store.dispatch('putMethod', { url: '/confirm-raw-material-received/' + item.value?.pid, prompt: 'by clicking ok you accept that quantity indicated on the app tallies with quantity received phisycally' }).then((data) => {
        if (data?.status == 201) {
            loadRequest(item.value?.pid)
            // requests.value = data.data;
        }
    }).catch(e => {
        console.log(e);
    })
}
function loadRequest(pid) {
    store.dispatch('getMethod', { url: '/load-raw-material-receipt/'+pid }).then((data) => {
        console.log(data);
        if (data?.status == 200) {
            
            item.value = data?.data;
        }
    }).catch(e => {
        console.log(e);
        alert('weting be this')
    })
}

onMounted(() => {
    item.value = localStorage.getItem('TVATI_RAW_MAT_RQ_DETAIL') ? JSON.parse(localStorage.getItem('TVATI_RAW_MAT_RQ_DETAIL')) : 'null'
    console.log(item.value);
    if (item.value == 'null') {
        router.push({ path: 'my-raw-material-request'})
    } else if (item.value.item==undefined){
        loadRequest(item.value.request_pid)
    }
    getUrlQueryParams()
});

async function getUrlQueryParams() {
    await router.isReady()
}

</script>

<style scoped></style>
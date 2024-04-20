<template>
    <div>
        <div class="container mt-2">
            <!-- {{ way }} -->
            <div class="card">
                <div class="receipt-header">
                    <div class="receipt-left">
                        <h6 class="h4">{{ way?.customer?.name }} <small class="small">{{ way?.customer?.rc }}</small>
                        </h6>

                        <!-- {{ way?.customer?.email }} <br> -->
                        {{ way?.customer?.gsm }} <br>
                        {{ way?.customer?.address }}
                    </div>
                    <div class="receipt-right">
                        #{{ way?.waybill }} <br>
                        date: {{ way?.request_time }} <br>
                        comment: {{ way?.comment }}

                    </div>
                </div>

                <div class="table-responsive p-2">
                    <table class="table-hover table-stripped table-bordered table">
                        <thead>
                            <tr>
                                <th>SN</th>
                                <th>Item Name</th>
                                <th>Description</th>
                                <th># Quantity </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(data, loop) in details" :key="loop">
                                <td>{{ loop + 1 }}</td>
                                <td>{{ data?.name }} </td>
                                <td>{{ data?.description }}</td>
                                <td>{{ data?.quantity_supplied }} {{ data?.unit }}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="3">Total</td>

                                <td>{{ '0' }}</td>
                            </tr>
                        </tfoot>
                    </table>

                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import store from "@/store";
import { onMounted, ref } from "vue";
import { useRouter } from 'vue-router';
const router = useRouter()

const way = ref({});
const details = ref({});

function loadRequest() {
    store.dispatch('getMethod', { url: '/load-way-bill-details/'+way.value.waybill }).then((data) => {
        if (data.status == 200) {
            details.value = data.data;
        }
    }).catch(e => {
        console.log(e);
    })
}

onMounted(() => {
    way.value = localStorage.getItem('TVATI_WAYBILL_DETAIL') ? JSON.parse(localStorage.getItem('TVATI_WAYBILL_DETAIL')) : 'null'
    if (way.value == 'null') {
        router.push({ path: 'cr-out-request' })
    }
    
    loadRequest()
    getUrlQueryParams()
});

async function getUrlQueryParams() {
    await router.isReady()
}

</script>

<style scoped>
    .receipt-header{
        padding: 10px 15px;
        display: flex;
        justify-content: space-between;
    }

</style>
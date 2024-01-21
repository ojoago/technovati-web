<template>
    <div>
        <div class="container mt-2">
            <div class="card">
                <div class="card-header">Weigh Bill Details</div>
                <div class="card-body">
                    <div class="table-responsive">
                       

                        <table class="table-hover table-stripped table-bordered table">
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Item Name</th>
                                    <th>Description</th>
                                    <th>Quantity </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(data, loop) in details" :key="loop">
                                    <td>{{ loop + 1 }}</td>
                                    <td>{{ data.name }}</td>
                                    <td>{{ data.description }}</td>
                                    <td>{{ data.quantity }}</td>
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
import { useRouter } from 'vue-router';
const router = useRouter()

const weigh = ref({});
const details = ref({});

function loadRequest() {
    store.commit('setSpinner', true)
    store.dispatch('getMethod', { url: '/load-weigh-bill-details/'+weigh.value.pid }).then((data) => {
        store.commit('setSpinner', false)
        if (data.status == 200) {
            details.value = data.data;
        }
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
        alert('weting be this')
    })
}

onMounted(() => {
    weigh.value = localStorage.getItem('TVATI_WEIGHBILL_DETAIL') ? JSON.parse(localStorage.getItem('TVATI_WEIGHBILL_DETAIL')) : 'null'
    if (weigh.value == 'null') {
        router.push({ path: 'cr-out-request' })
    }
    
    loadRequest()
    console.log('details',weigh);
    getUrlQueryParams()
});

async function getUrlQueryParams() {
    await router.isReady()
}

</script>

<style scoped></style>
<template>
    <div>
        <div class="container mt-2">
            {{way}}
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
</template>

<script setup>
import store from "@/store";
import { onMounted, ref } from "vue";
import { useRouter } from 'vue-router';
const router = useRouter()

const way = ref({});
const details = ref({});

function loadRequest() {
    store.commit('setSpinner', true)
    store.dispatch('getMethod', { url: '/load-way-bill-details/'+way.value.waybill }).then((data) => {
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
    way.value = localStorage.getItem('TVATI_WAYBILL_DETAIL') ? JSON.parse(localStorage.getItem('TVATI_WAYBILL_DETAIL')) : 'null'
    if (way.value == 'null') {
        router.push({ path: 'cr-out-request' })
    }
    
    loadRequest()
    console.log('details',way);
    getUrlQueryParams()
});

async function getUrlQueryParams() {
    await router.isReady()
}

</script>

<style scoped></style>
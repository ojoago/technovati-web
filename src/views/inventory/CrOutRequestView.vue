<template>
    <div>
        <div class="container mt-2">
                    <div class="card">
                        <div class="card-header">Company Raw Materials</div>
                        <div class="card-body">
                            <input type="text" class=" form-control form-control-sm" placeholder="search Item">
                            <div class="table-responsive">
                                <table class="table-hover table-stripped table-bordered table">
                                    <thead>
                                        <tr>
                                            <th>SN</th>
                                            <th>ID</th>
                                            <th>note</th>
                                            <th>Items</th>
                                            <th>Time</th>
                                            <th>Receiver</th>
                                            
                                            <th align="center"> <i class="bi bi-pencil-fill"></i> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, loop) in items?.data" :key="loop">
                                            <td>{{ loop + 1 }}</td>
                                            <td>{{ item.weighbill }}</td>
                                            <td>{{ item.comment }}</td>
                                            <td>{{ item.items_count }}</td>
                                            <td>{{ item.request_time }}</td>
                                            <td>{{ item.receiver_name }}</td>
                                            <td>
                                                <button @click="requestDetailPage(item)" type="button"
                                                    class="btn btn-primary btn-sm">
                                                    <i class="bi bi-patch-plus-fill"></i>
                                                </button>
                                            </td>
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
import { ref } from "vue";
import { useRouter } from 'vue-router';
const router = useRouter()
const items = ref({});

loadItem()
function loadItem() {
    store.commit('setSpinner', true)
    store.dispatch('getMethod', { url: '/load-cr-out-request' }).then((data) => {
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

function requestDetailPage(item) {
    localStorage.setItem('TVATI_WEIGHBILL_DETAIL', JSON.stringify(item, null, 2))
    router.push({ path: 'weigh-bill-receipt', query: { bill: item.pid } })
}


</script>

<style scoped></style>
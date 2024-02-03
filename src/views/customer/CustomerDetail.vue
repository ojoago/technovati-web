<template>
    <div>
        <div class="container-fluid mt-2">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{{ customer.name }} {{ customer.rc }} </h5>

                  
                    <div class="card-body">
                                <input type="text" class=" form-control form-control-sm" placeholder="search Item">
                                <div class="table-responsive">
                                    <table class="table-hover table-stripped table-bordered table">
                                        <thead>
                                            <tr>
                                                <th>SN</th>
                                                <th>#ID</th>
                                                <th>note</th>
                                                <th>Items</th>
                                                <th>Date</th>
                                                <th align="center"> <i class="bi bi-gear-fill"></i> </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, loop) in items?.data" :key="loop">
                                                <td>{{ loop + 1 }}</td>
                                                <td>{{ item.waybill }}</td>
                                                <td>{{ item.comment }}</td>
                                                <td>{{ item.items_count }}</td>
                                                <td>{{ item.request_time }}</td>
                                                
                                                <td>
                                                    <button @click="requestDetailPage(item)" type="button"
                                                        class="btn btn-primary btn-sm">
                                                        <i class="bi bi-arrow-right-circle"></i> <small>Details</small>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                     <div class="flex justify-center mt-4">
                                            <nav class="relative justify-center rounded-md shadow pagination">
                                                <pagination-links v-for="(link, i) of items.links" :link="link" :key="i" @next="nextPage(link)"></pagination-links>
                                            </nav>
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
import { useRouter } from 'vue-router';
const router = useRouter()
const customer = ref({});
const items = ref({});
const pid = ref(null);
onMounted(() => {
    let lcls = localStorage.getItem('TVATI_CST_DETAIL') ? JSON.parse(localStorage.getItem('TVATI_CST_DETAIL')) : 'null'
    if (lcls != 'null') {
        customer.value = lcls;
        pid.value = lcls.pid
        loadItem(pid.value)
    }
});

function loadItem(pid) {
    store.commit('setSpinner', true)
    store.dispatch('getMethod', { url: '/load-customer-invoice/'+pid }).then((data) => {
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
    localStorage.setItem('TVATI_WAYBILL_DETAIL', JSON.stringify(item, null, 2))
    router.push({ path: 'way-bill-receipt', query: { bill: item.waybill } })
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
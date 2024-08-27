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
                                            <th>#ID</th>
                                            <th>note</th>
                                            <th>Items</th>
                                            <th>Date</th>
                                            <th>Receiver</th>
                                            
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
                                            <td>{{ item?.customer?.name }}</td>
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
                                        <pagination-links v-for="(link, i) of items.links" :link="link" :key="i"
                                            @next="nextPage(link)"></pagination-links>
                                    </nav>
                                </div>
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
import PaginationLinks from "@/components/PaginationLinks.vue";

const router = useRouter()
const items = ref({});

loadItem()
function loadItem(url = '/load-cr-out-request') {
    store.dispatch('getMethod', { url: url }).then((data) => {
        if (data?.status == 200) {
            items.value = data.data;
        }
    }).catch(e => {
        console.log(e);
    })
}
function nextPage(link) {

    if (!link.url || link.active) {
        return;
    }
    loadItem(link.url)
   
}
function requestDetailPage(item) {
    localStorage.setItem('TVATI_WAYBILL_DETAIL', JSON.stringify(item, null, 2))
    router.push({ path: 'way-bill-receipt', query: { bill: item.waybill } })
}


</script>

<style scoped></style>
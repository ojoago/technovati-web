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
                                    <th>Request Note</th>
                                    <th>Requested By</th>
                                    <th>Items</th>
                                    <th>Status</th>
                                    <th>Receiver</th>
                                    <th>Date</th>
                                    <th align="center"> <i class="bi bi-gear-fill"></i> </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, loop) in requests?.data" :key="loop">
                                    <td>{{ loop + 1 }}</td>
                                    <td>{{ item.note }}</td>
                                    <td>{{ item.requested_by?.username }}</td>
                                    <td>{{ item.item_count }}</td>
                                    <td>{{ item.request_status }}</td>
                                    <td>{{ item.receiver?.username ?? item.requested_by?.username }}</td>
                                    <td>{{ item.request_time }}</td>

                                    <td>
                                        <button @click="requestDetailPage(item)" type="button"
                                            class="btn btn-primary btn-sm">
                                            <i class="bi bi-collection-fill"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="flex justify-center mt-4">
                            <nav class="relative justify-center rounded-md shadow pagination">
                                <pagination-links v-for="(link, i) of requests.links" :link="link" :key="i"
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
import PaginationLinks from "@/components/PaginationLinks.vue";
import { useRouter } from 'vue-router';

const router = useRouter()

const requests = ref({});

loadRequest()
function loadRequest() {
    store.dispatch('getMethod', { url: '/load-processed-raw-material-requests' }).then((data) => {
        if (data?.status == 200) {
            requests.value = data.data;
        }
    }).catch(e => {
        console.log(e);
    })
}

function requestDetailPage(item) {
    console.log(item);
    localStorage.setItem('TVATI_RAW_MAT_RQ_DETAIL', JSON.stringify(item, null, 2))
    router.push({ path: 'raw-material-request-details', query: { request: item.pid } })
}

</script>

<style scoped>
    #side{
        display: none;
    }

</style>
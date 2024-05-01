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
                                    <th>Receiver</th>
                                    <th>Receiver</th>
                                    <th>time</th>
                                    <th align="center"> <i class="bi bi-gear-fill"></i> </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, loop) in requests?.data" :key="loop">
                                    <td>{{ loop + 1 }}</td>
                                    <td>{{ item.comment }}</td>
                                    <td>{{ item.request?.username }}</td>
                                    <td>{{ item.items_count }}</td>
                                    <td>{{ item.receiver?.username ?? item.request?.username }}</td>
                                    <td>{{ item.way_status }}</td>
                                    <td>{{ item.request_time }}</td>
                                    <td>
                                        <div class="dropdown">
                                            <button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-bs-toggle="dropdown">
                                                <i class="bi bi-tools"></i>
                                            </button>
                                            <ul class="dropdown-menu">
                                                <li><a class="dropdown-item pointer bg-info" @click="requestDetailPage(item)">Detail</a></li>
                                                <li><a class="dropdown-item pointer bg-warning" v-if="item?.status == 0" @click="requestDetailPage(item)">Edit</a></li>
                                                <li><a class="dropdown-item pointer bg-secondary" v-if="item?.status == 1" @click="requestDetailPage(item)">Return</a></li>
                                            </ul>
                                        </div>
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
const requests = ref({});


// function processRawMaterialRequest() {
//     store.commit('setSpinner', true)
//     errors.value = []
//     store.dispatch('postMethod', { url: '/process-raw-material-request', param: requestDetail.value }).then((data) => {
//         if (data?.status == 422) {
//             errors.value = data.data
//         } else if (data?.status == 201) {
//             let form = document.querySelector('#itemForm');
//             form.reset()
//         }
//         store.commit('setSpinner', false)
//     }).catch(e => {
//         store.commit('setSpinner', false)
//         console.log(e);
//     })
// }

function requestDetailPage(item) {
    localStorage.setItem('TVATI_MY_RQ_DETAIL', JSON.stringify(item, null, 2))
    router.push({ path: 'my-request-details', query: { request: item.pid } })
}
loadRequest()
function loadRequest() {
    store.dispatch('getMethod', { url: '/load-item-request' }).then((data) => {
        if (data?.status == 200) {
            console.log(data.data);
            requests.value = data.data;
        }
    })
}

</script>

<style scoped></style>
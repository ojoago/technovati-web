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
                                    <th>time</th>
                                    <th align="center"> <i class="bi bi-pencil-fill"></i> </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, loop) in requests?.data" :key="loop">
                                    <td>{{ loop + 1 }}</td>
                                    <td>{{ item.note }}</td>
                                    <td>{{ item.requested_by?.username }}</td>
                                    <td>{{ item.item_count }}</td>
                                    <td>{{ item.receiver?.username ?? item.requested_by?.username }}</td>
                                    <td>{{ item.request_time }}</td>
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
const requests = ref({});


// function processRawMaterialRequest() {
//     store.commit('setSpinner', true)
//     errors.value = []
//     store.dispatch('postMethod', { url: '/process-raw-material-request', param: requestDetail.value }).then((data) => {
//         if (data.status == 422) {
//             errors.value = data.data
//         } else if (data.status == 201) {
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
    localStorage.setItem('TVATI_RAW_MAT_RQ_DETAIL', JSON.stringify(item, null, 2))
    router.push({ path: 'raw-material-request-details', query: { request: item.pid } })
}
loadRequest()
function loadRequest() {
    store.commit('setSpinner', true)
    store.dispatch('getMethod', { url: '/load-my-raw-material-requests' }).then((data) => {
        store.commit('setSpinner', false)
        if (data.status == 200) {
            requests.value = data.data;
        }
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
        alert('weting be this')
    })
}

</script>

<style scoped></style>
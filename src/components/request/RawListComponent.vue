<template>
    <div>
        <div class="container mt-2">
            <fieldset class="border rounded-3 p-2 m-1">
                <legend class="float-none w-auto px-2 h5"></legend>
                <input type="text" class=" form-control form-control-sm" placeholder="search Item">
                    <div class="table-responsive">
                        <table class="table-hover table-stripped table-bordered table">
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Request Note</th>
                                    <!-- <th>Requested By</th> -->
                                    <th>Items</th>
                                    <th>Receiver</th>
                                    <th>time</th>
                                    <th>status</th>
                                    <th align="center"> <i class="bi bi-gear-fill"></i> </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, loop) in requests?.data" :key="loop">
                                    <td>{{ loop + 1 }}</td>
                                    <td>{{ item?.note }}</td>
                                    <!-- <td>{{ item?.user?.username }}</td> -->
                                    <td>{{ item?.item_count }}</td>
                                    <td>{{ item?.receiver?.username ?? item.user?.username }}</td>
                                    <td>{{ item?.request_time }}</td>
                                    <td>{{ item?.request_status }}</td>
                                    <td>
                                        <div class="dropdown">
                                            <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                                data-bs-toggle="dropdown">
                                                <i class="bi bi-tools"></i>
                                            </button>
                                            <ul class="dropdown-menu">
                                                <li><a class="dropdown-item pointer"
                                                        @click="requestDetailPage(item)">Detail</a></li>
                                                <li><a class="dropdown-item pointer bg-warning" v-if="item?.status==0"
                                                        @click="cancelRequest(item.request_pid)">Cancel</a></li>
                                                <li><a class="dropdown-item pointer bg-info"
                                                        v-if=" item?.status > 0 && item?.status < 4 "
                                                        @click="returnItem(item)">Return</a></li>
                                            </ul>
                                        </div>
                                        <!-- <button @click="requestDetailPage(item)" type="button"
                                            class="btn btn-primary btn-sm">
                                            <i class="bi bi-plus"></i>
                                        </button> -->
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

            </fieldset>
           
        </div>

        <o-modal :isOpen="toggleModal" modal-class="modal-lg" @submit="returnBackToStore"
            title="Returning Item to store" @modal-close="closeModal">
            <template #content>
                <div>
                    <form id="rForm">
                        <table class="table-hover table-stripped table-bordered table">
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Item Name</th>
                                    <th>Model</th>
                                    <th>Requested</th>
                                    <th>Supplied</th>
                                    <th>Return</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(data, loop) in items" :key="loop">
                                    <td>{{ loop + 1 }}</td>
                                    <td>{{ data.name }}</td>
                                    <td>{{ data.model }}</td>
                                    <td>{{ data.quantity_requested }}</td>
                                    <td>{{ data.quantity_supplied }}</td>
                                    <td> <input v-model="data.quantity_returned" type="text"
                                            class="form-control form-control-sm" placeholder=""></td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </template>

        </o-modal>
    </div>

</template>

<script setup>
import store from "@/store";
import { ref } from "vue";
import OModal from "@/components/OModal.vue";
import PaginationLinks from "@/components/PaginationLinks.vue";

import { useRouter } from 'vue-router';

const router = useRouter()
const toggleModal = ref(false)
const requests = ref({});
const items = ref({})
const returnItem = (request) => {
    toggleModal.value = true;
    items.value = request?.item;
}

const closeModal = () => {
    toggleModal.value = false;
};

function requestDetailPage(item) {
    localStorage.setItem('TVATI_RAW_MAT_RQ_DETAIL', JSON.stringify(item, null, 2))
    router.push({ path: 'raw-material-request-details', query: { request: item.pid } })
}
loadRequest()
function loadRequest(url = '/load-my-raw-material-requests') {
    store.dispatch('getMethod', { url: url }).then((data) => {
        if (data?.status == 200) {
            requests.value = data.data;
        }
    }).catch(e => {
        console.log(e);
    })
}


const returnBackToStore = () => {
    store.dispatch('postMethod', { url: '/return-requested-raw-materials' , param : items.value }).then((data) => {
        if (data?.status == 201) {
            toggleModal.value = false;
        }
    }).catch(e => {
        console.log(e);
    })
}
const cancelRequest = (pid) => {
    store.dispatch('postMethod', { url: '/cancel-raw-material-request/'+pid , param : items.value }).then((data) => {
        if (data?.status == 201) {
            toggleModal.value = false;
        }
    }).catch(e => {
        console.log(e);
    })
}



function nextPage(link) {
    if (!link.url || link.active) {
        return;
    }
    loadRequest(link.url)
}



</script>

<style scoped></style>
<template>
    <div>
        <div class="container my-2">

            <div class="card">
                <div class="card-body">
                    <h3>Staff fund request</h3>
                    <div class="table-responsive">
                        <table class="table-hover table-stripped table-bordered table">
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th width="40%">Purpose</th>
                                    <th>Amount Requested</th>
                                    <th>Amount Approved</th>
                                    <th>Status</th>
                                    <th>Date </th>
                                    <th>Image </th>
                                    <th> <i class="bi bi-gear-fill"></i> </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(data, loop) in requests?.data" :key="loop">
                                    <td>{{ loop + 1 }}</td>
                                    <td >{{ data.purpose }}</td>
                                    <td>{{ data.requested }}</td>
                                    <td>{{ data.approved }}</td>
                                    <td>{{ data.request_status }}</td>
                                    <td>{{ data.date }}</td>
                                    <td>
                                        <img :src="data.image" alt="" class="img img-responsive tend-image">
                                    </td>
                                    
                                    <td>
                                        <button class="btn btn-sm btn-success" v-if="data.status == 1" @click="approveRequest(data.pid)">Action</button>
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
import { ref } from "vue";
import store from "@/store";
import PaginationLinks from "@/components/PaginationLinks.vue";
// import { useRouter } from 'vue-router';
// import BudgetComponent from '@/components/travel/BudgetComponent.vue'
const creator = ref(null);
creator.value = store?.state?.user?.data?.pid;

const requests = ref({})
function loadRequest() {
    store.dispatch('getMethod', { url: '/load-staff-fund-request' }).then((data) => {
        if (data?.status == 200) {
            requests.value = data.data
        }else{
            requests.value = {}
        }
    })
}
loadRequest()


function approveRequest(pid){
     alert(pid)
}


function nextPage(link) {
    alert()
    if (!link.url || link.active) {
        return;
    }
    alert(link.url)
}


</script>

<style scoped>
    .dropdown{
        position: relative;
    }

    .dropdown-menu{
        position: absolute;
    }
    
.tend-image {
    width: 40px;
}

.tend-image:hover {
    width: 250px !important;
    height: auto !important;
    position: absolute !important;
    right: 20px !important;
    z-index: 1000;
}
</style>
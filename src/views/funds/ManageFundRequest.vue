<template>
    <div>
        <div class="container my-2">

            <div class="card">
                <div class="card-body">
                    <h3 class="mx-3">Staff fund Request</h3>
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
                                    <td>
                                      {{ data.approved }}
                                    </td>
                                    <td>{{ data.request_status }}</td>
                                    <td>{{ data.date }}</td>
                                    <td>
                                        <img :src="data.image" alt="" class="img img-responsive tend-image">
                                    </td>
                                    
                                    <td>
                                        <button class="btn btn-sm btn-success" v-if="level == 2 && data.status == 1" @click="respondToRequest(data)">Respond</button>
                                        <div v-else-if="data.status+1 == level || (data.line_manager == manager && data.status == 0)">

                                            <button class="btn btn-sm btn-success"  @click="updateRequestStatus(data.pid,status[0])">Approve</button>
                                            <button class="btn btn-sm btn-secondary"  @click="updateRequestStatus(data.pid,status[1])">Reject</button>
                                        </div>
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
         <o-modal :isOpen="toggleModal" @submit="postResponse" modal-class="modal-sm" title="Request Leave"
            @modal-close="closeModal">
            <template #content>
                <div>
                    <form >
                        <div class="row">
                            <div class="col-md-12">
                                <label class="form-label">Amount Requested {{ response.requested }} </label>
                                
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="form-label">Approve Amount: <span class="text-danger">*</span> </label> <br>
                                    <input type="number" step=".5" v-model="response.approved_amount"
                                        class="form-control form-control-sm"
                                        placeholder="e.g 5000">
                                    <p class="text-danger " v-if="errors?.status">{{ errors?.status[0] }}</p>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="form-label">Approve? <span class="text-danger">*</span> </label> <br>
                                    <label for="yes">Yes</label> &nbsp;
                                    <input v-model="response.status" type="radio" id="yes"  value="2">
                                    &nbsp;
                                    &nbsp;
                                    &nbsp;
                                    <label for="no">No</label>
                                    &nbsp;
                                    <input v-model="response.status" type="radio" id="no"  value="6">
                                    <p class="text-danger " v-if="errors?.status">{{ errors?.status[0] }}</p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </template>

        </o-modal>
    </div>
</template>

<script setup>
import { ref } from "vue";
import store from "@/store";
import PaginationLinks from "@/components/PaginationLinks.vue";
// import { useRouter } from 'vue-router';
// import BudgetComponent from '@/components/travel/BudgetComponent.vue'
import OModal from "@/components/OModal.vue";
const toggleModal = ref(false)
const closeModal = () => {
    toggleModal.value = false;
    response.value = {}
};

const manager = ref(null);
const level = ref(null);
manager.value = store?.state?.user?.data?.pid;
level.value = store?.state?.approvalLevel;

const status = ref([1,5])

if(level.value == 2){
    status.value = [2,6]
}else if(level.value == 3){
    status.value = [3,7]
}else if(level.value == 4){
    status.value = [4,8]
}
 

const response = ref({})
function respondToRequest(data) {
    response.value = data;
    toggleModal.value = true
}
function postResponse() {
    store.dispatch('postMethod', { url: '/approve-fund-amount',param: response.value }).then((data) => {
        if (data?.status == 422) {
            requests.value = data.data
        }else if(data?.status == 201){
            requests.value = {}
            closeModal()
        }
    })
}

const requests = ref({})
function loadRequest(url = '/load-staff-fund-request') {
    store.dispatch('getMethod', { url: url }).then((data) => {
        if (data?.status == 200) {
            requests.value = data.data
        }else{
            requests.value = {}
        }
    })
}
loadRequest()


function updateRequestStatus(pid,status){
    store.dispatch('putMethod', { url: `/update-fund-request-status/${pid}/${status}`  , prompt: 'Are you sure, you want to update the status of this request?' }).then((data) => {
        if (data?.status == 201) {
            loadRequest()
        }
    })
}


function nextPage(link) {
    if (!link.url || link.active) {
        return;
    }
    loadRequest(link.url)
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
<template>
    <div>
        <div class="container my-2">
            
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Staff Travel Request
                    </h5>
                    <div class="table-responsive">
                        <table class="table-hover table-stripped table-bordered table">
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>title</th>
                                    <th>Department</th>
                                    <th>destination</th>
                                    <th>from</th>
                                    <th>to</th>
                                    <th>crew</th>
                                    <th>itinerary</th>
                                    <th>mode</th>
                                    <th>Initiator</th>
                                    <th> <i class="bi bi-gear-fill"></i> </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(data, loop) in requests?.data" :key="loop">
                                <td>{{ loop + 1 }}</td>
                                <td>{{ data.title }}</td>
                                <td>{{ data.department.department }}</td>
                                <td>{{ data.destination }}</td>
                                <td>{{ data.start }}</td>
                                <td>{{ data.to }}</td>
                                <td>
                                    <span v-for="em in data.crew" :key="em.pid" class="badge bg-dark p-1 m-1">
                                        {{ em.text }}
                                    </span>
                                </td>
                                <td>{{ data.itinerary }}</td>
                                <td>{{ data.mode }}</td>
                                <td>{{ data.user.username }}</td>
                                <td>
                                    <div class="dropdown">
                                        <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                            data-bs-toggle="dropdown">
                                            <i class="bi bi-tools"></i>
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li ><a class="dropdown-item pointer bg-info" @click="requestDetail(data)">Details</a> </li>
                                            <div v-if="data.status < level || (data.line_manager == manager && data?.status == 0)">
                                                
                                                <li ><a class="dropdown-item pointer bg-success" @click="approveRejectRequest(data.pid,status[0])">Approve</a> </li>
                                                <li ><a class="dropdown-item pointer bg-secondary" @click="approveRejectRequest(data.pid,status[1])">Reject</a> </li>
                                            </div>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div class="flex justify-center mt-4">
                            <nav class="relative justify-center rounded-md shadow pagination">
                                <pagination-links v-for="(link, i) of requests.links" :link="link" :key="i" @next="nextPage(link)"></pagination-links>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>

 
        <!-- <BudgetComponent :budget-modal="budgetModal" :request-pid="budget.travel_pid"  @modal-close="budgetModal=false"/> -->
    </div>
</template>

<script setup>
import { ref } from "vue";
// import OModal from "@/components/OModal.vue";
import store from "@/store";
// import { Multiselect } from 'vue-multiselect';
import PaginationLinks from "@/components/PaginationLinks.vue";
import { useRouter } from 'vue-router';
// import BudgetComponent from '@/components/travel/BudgetComponent.vue'
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
const router = useRouter()
let query = {}
router.push({ query: query })
     
     
const approveRejectRequest = (pid,status) => {
    store.dispatch('putMethod', { url: `/update-travel-request-status/${pid}/${status}`  , prompt: 'Are you sure, you want to update the status of this request?' }).then((data) => {
        if (data?.status == 201) {
            loadRequest()
        }
    })
}

const requests = ref({})
function loadRequest(url = '/load-staff-request') {
    store.dispatch('getMethod', { url:url }).then((data) => {
        if (data?.status == 200) {
            requests.value = data.data
        }else{
            requests.value = {}
        }
    })
}
loadRequest()

function requestDetail(request) {
    localStorage.setItem('TVATI_TRV_RQS_DETAIL', JSON.stringify(request, null, 2))
    router.push({ path: 'travel-request-detail-hr-view', query: { request: request.pid } })
}

// request budget 
 
 
const userDrop = ref([]);
function dropdownUser() {
    store.dispatch('loadDropdown', 'users').then(({ data }) => {
        userDrop.value = data;
    })
}
dropdownUser()

function nextPage(link) {
    if (!link.url || link.active) {
        return;
    }
    loadRequest(link.url)
}


</script>

<style scoped>

</style>
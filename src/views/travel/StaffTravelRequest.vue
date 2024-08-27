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
                                            <li ><a class="dropdown-item pointer bg-success" v-if="data?.status == 0" @click="approveRequest(data.pid)">Approve</a> </li>
                                            <li ><a class="dropdown-item pointer bg-secondary" v-if="data?.status == 0" @click="rejectRequest(data.pid)">Reject</a> </li>
                                            <!-- <li ><a class="dropdown-item pointer bg-warning" v-if="data?.status == 0 && data?.user_pid == creator" @click="editRequest(data)">Edit</a> </li> -->
                                            <!-- <li ><a class="dropdown-item pointer bg-primary" v-if="data?.status != 3  && data?.user_pid == creator" @click="addBudget(data.pid)">Add Budget</a> </li> -->
                                            <!-- <li ><a class="dropdown-item pointer bg-info" v-if="(data?.status == 3 || data?.status == 1)  && data?.user_pid == creator" @click="addExpense(data.pid)">Add Expense</a> </li> -->
                                            <!-- <li ><a class="dropdown-item pointer bg-danger" v-if="data?.status == 0  && data?.user_pid == creator" @click="deleteShift(data.pid)">Delete</a> </li> -->
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
const creator = ref(null);
creator.value = store?.state?.user?.data?.pid;
const router = useRouter()
let query = {}
router.push({ query: query })
     
     
const approveRequest = (pid) => {
    store.dispatch('putMethod', { url: '/approve-travel-request/'+pid , prompt: 'Are you sure you want to approve this request?' }).then((data) => {
        if (data?.status == 201) {
            loadRequest()
        }
    })
}
const rejectRequest = (pid) => {
    store.dispatch('putMethod', { url: '/travel-request/'+pid , prompt: 'Are you sure you want to reject this request?' }).then((data) => {
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
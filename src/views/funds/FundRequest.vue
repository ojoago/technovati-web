<template>
    <div>
        <div class="container my-2">

            <div class="card">
                <div class="card-body">
                    <h3 class="mx-4">Fund Request</h3>
                    <button class="btn btn-sm btn-primary m-2" @click="openModal">Request</button>
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
                                        <div class="dropdown">
                                            <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                                data-bs-toggle="dropdown">
                                                <i class="bi bi-tools"></i>
                                            </button>
                                            <ul class="dropdown-menu">
                                              <li><a class="dropdown-item pointer bg-warning"
                                                        v-if="data?.status == 0 && data?.user_pid == creator"
                                                        @click="editRequest(data)">Edit</a> </li>
                                                <li><a class="dropdown-item pointer bg-danger"
                                                        v-if="data?.status == 0  && data?.user_pid == creator"
                                                        @click="cancelRequest(data.pid)">Cancel</a> </li>
                                            </ul>
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


        <o-modal :isOpen="toggleModal" modal-class="modal-sm" title="Add Request Expense" @submit="fundRequest"
            @modal-close="closeModal">
            <template #content>
                <form >
                   
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="form-label">Purpose <span class="text-danger">*</span></label>
                                <textarea v-model="fundRequestData.purpose" class="form-control form-control-sm"
                                    placeholder="e.g feeding"></textarea>
                                <p class="text-danger " v-if="errors?.purpose">{{ errors?.purpose[0] }}</p>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="form-label">Amount <span class="text-danger">*</span></label>
                                <input type="number" step="0.1" placeholder="e.g 20000" v-model="fundRequestData.requested_amount"
                                    class="form-control form-control-sm">
                                <p class="text-danger " v-if="errors?.requested_amount">{{ errors?.requested_amount[0] }} </p>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="form-label">Receipt </label>
                                <input type="file" class="form-control form-control-sm" id="image"
                                    @change="handleImageChange" accept="image/*" required />
                                <p class="text-danger " v-if="errors?.image">{{ errors?.image[0] }}</p>
                            </div>
                        </div>
                    </div>
                </form>
            </template>

        </o-modal>
        <!-- <BudgetComponent :budget-modal="budgetModal" :request-pid="budget.travel_pid"  @modal-close="budgetModal=false"/> -->
    </div>
</template>

<script setup>
import { ref } from "vue";
import OModal from "@/components/OModal.vue";
import store from "@/store";
import PaginationLinks from "@/components/PaginationLinks.vue";



// import { useRouter } from 'vue-router';
// import BudgetComponent from '@/components/travel/BudgetComponent.vue'
const creator = ref(null);
creator.value = store?.state?.user?.data?.pid;
// const router = useRouter()
// let query = {}
// router.push({ query: query })
     
     
const toggleModal = ref(false)
const openModal = () => {
    toggleModal.value = true;
};

const closeModal = () => {
    toggleModal.value = false;
    resetAttr()
};

const fundRequestData = ref({
    purpose : '' ,
    requested_amount: '' ,
    image:''
})

const resetAttr = ()=>{
    fundRequestData.value = {
        purpose : '' ,
        requested_amount: '' ,
        image:'',
    }
}

function editRequest(data){
    fundRequestData.value = {
        purpose : data.purpose ,
        requested_amount: data.requested_amount ,
        pid: data.pid ,
        image:''
    }
    toggleModal.value = true;
}
const errors = ref({})

const requests = ref({})
function loadRequest() {
    store.dispatch('getMethod', { url: '/load-fund-request' }).then((data) => {
        if (data?.status == 200) {
            requests.value = data.data
        }else{
            requests.value = {}
        }
    })
}
loadRequest()

// function requestDetail(request) {
//     localStorage.setItem('TVATI_TRV_RQS_DETAIL', JSON.stringify(request, null, 2))
//     router.push({ path: 'travel-request-detail', query: { request: request.pid } })
// }



const handleImageChange = (event) => {
    // fundRequestData.value.image = handleFile(event)
    const file = event.target.files[0];
    if (file) {
        var ext = file['name'].substring(file['name'].lastIndexOf('.') + 1);
        if (!['png', 'jpeg', 'jpg'].includes(ext)) {
            event.target.value = null;
            store.commit('notify', { message: 'Only Image is allowed', type: 'warning' })
            return;
        }
        if (file.size > 1024 * 1024) {
            event.target.value = null;
            store.commit('notify', { message: 'Image cannot be more 1MB', type: 'warning' })
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            fundRequestData.value.image = reader.result;
        };
        reader.readAsDataURL(file);
    }
}


function fundRequest(){
    errors.value = {}
     store.dispatch('postMethod', { url: '/request-fund', param: fundRequestData.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data
        } else if (data?.status == 201) {
            closeModal()
            loadRequest()
        }
    })
}
function cancelRequest(pid){
     store.dispatch('deleteMethod', { url: '/delete-fund-request/'+pid, prompt: 'are you sure, you want to cancel this request?' }).then((data) => {
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
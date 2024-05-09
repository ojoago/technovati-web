<template>
    <div>
        <div class="container mt-2">
            <div class="card">
                <div class="card-header">Company Raw Materials</div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-8" id="_main">
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
                                            <th align="center"> <i class="bi bi-gear-fill"></i> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, loop) in requests?.data" :key="loop">
                                            <td>{{ loop + 1 }}</td>
                                            <td>{{ item.note }}</td>
                                            <td>{{ item?.user?.username }}</td>
                                            <td>{{ item.item_count }}</td>
                                            <td>{{ item?.receiver?.username ?? item?.user?.username }}</td>
                                            <td>{{ item.request_time }}</td>

                                            <td>
                                                <button v-if="item.status == 0" @click="loadItems(item.pid)"
                                                    type="button" class="btn btn-primary btn-sm">
                                                    <i class="bi bi-plus"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                        </div>

                        <div class="col-md-4" id="_side">
                            
                            <fieldset class="border rounded-3 p-2 m-1">
                                <legend class="float-none w-auto px-2 h5">Request Item List</legend>
                                <form id="itemForm" v-if="requestDetail?.items.length">
                                    <fieldset class="border rounded-3 p-2 m-1">
                                        <div class="col-md-12" v-for="(item, loop) in requestDetail?.items"
                                            :key="loop">
                                            <label class="form-label">{{ item.name }} </label>
                                            <div class="input-group">
                                                <span class="bg-light p-1">#{{ item.quantity }}</span>
                                                <input type="number" v-model="item.quantity_requested"
                                                    class="form-control" placeholder="e.g 5">
                                                <!-- <button type="button" class="btn btn-danger btn-sm"
                                                    @click="removeitem(loop)"> <i class="bi bi-patch-minus"></i>
                                                </button> -->
                                            </div>
                                        </div>
                                    </fieldset>

                                    <div class="row">
                                        <div class="col-md-12">
                                            <label class="form-label">Comment</label>
                                            <textarea type="text" v-model="requestDetail.comment"
                                                class="form-control form-control-sm"
                                                placeholder="e.g UIU"></textarea>
                                            <p class="text-danger " v-if="errors?.comment">{{ errors?.comment[0]
                                                }} </p>
                                        </div>
                                    </div>

                                    <div class="float-end">
                                        <button type="button" class="btn btn-success btn-sm mt-2"
                                            @click="processRawMaterialRequest">Process</button>
                                    </div>
                                </form>

                            </fieldset>
                              
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

const router = useRouter()
const errors = ref({});
const requests = ref({});

const requestDetail = ref({
    request_pid: '',
    comment: '',
    items: [],
});


// const removeitem = (i) => {
//     // let len = request.value.items.length;
//     // if (len === 1) {
//     //     store.commit('notify', { message: 'Qualification requires at least one instituion', type: 'warning' })
//     //     return;
//     // }
    
//     requestDetail.value.items.splice(i, 1);
// }


function processRawMaterialRequest() {
    errors.value = []
    store.dispatch('postMethod', { url: '/process-raw-material-request', param: requestDetail.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data
        } else if (data?.status == 201) {
            let form = document.querySelector('#itemForm');
            form.reset()
            requestDetailPage(requestDetail.value)
        }
    })
}

function requestDetailPage(item) {
    localStorage.setItem('TVATI_RAW_MAT_RQ_DETAIL', JSON.stringify(item, null, 2))
    requestDetail.value.items = []
    // requestDetail.value.request_pid = ''
    requestDetail.value.comment = ''
    router.push({ path: 'raw-material-request-details', query: { request: item.request_pid } })
}

function loadItems(pid) {
    requestDetail.value.request_pid = pid;
    store.dispatch('getMethod', { url: '/load-raw-material-request-details/'+pid }).then((data) => {
        // var main = document.getElementById("main");
        // var side = document.getElementById("side");
        if (data?.status == 200) {
            // main.classList.remove("col-md-12");
            // main.classList.add("col-md-7");
            // side.classList.add("col-md-5");
            // requestDetail.value.items = Object.entries(data.data);
            requestDetail.value.items = data.data;
            // side.style.display = "block";
        }else{
            requestDetail.value.items = [];
            // side.style.display = "none";
            // main.classList.add("col-md-12");
            // main.classList.remove("col-md-7");
        }
    }).catch(e => {
        console.log(e);
    })
}
loadRequest()
function loadRequest() {
    store.dispatch('getMethod', { url: '/load-pending-raw-material-requests' }).then((data) => {
        if (data?.status == 200) {
            requests.value = data.data;
        }
    }).catch(e => {
        console.log(e);
    })
}

const users = ref({})
function dropdownSupplier() {
    store.dispatch('loadDropdown', 'users').then(({ data }) => {
        users.value = data;
    }).catch(e => {
        console.log(e);
    })
}
dropdownSupplier()


</script>

<style scoped>
    #side{
        display: none;
    }

</style>
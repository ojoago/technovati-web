<template>
    <div>
        <div class="container-fluid mt-2">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Staff Leave
                    </h5>
                    <fieldset class="border rounded-3 p-2 m-1">
                        <legend class="float-none w-auto px-2">Leave Request</legend>
                        <div class="table-responsive">
                            <table class="table-hover table-stripped table-bordered table">
                                <thead>
                                    <tr>
                                        <th>SN</th>
                                        <th>Name</th>
                                        <th>Leave</th>
                                        <th>From</th>
                                        <th>to</th>
                                        <th>Days</th>
                                        <th>note</th>
                                        <th>status</th>
                                        <th>manager comment</th>
                                        <th>hr comment</th>
                                        <th> <i class="bi bi-gear-fill"></i> </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(lv, loop) in leaves.data" :key="loop">
                                        <td>{{ loop + 1 }}</td>
                                        <td>{{ lv.staff.username }}</td>
                                        <td>{{ lv.leave.leave }}</td>
                                        <td>{{ lv.begin }}</td>
                                        <td>{{ lv.end }}</td>
                                        <td>{{ lv.days }}</td>
                                        <td>{{ lv.note }}</td>
                                        <td>{{ lv.request_status }}</td>
                                        <td>{{ lv.line_manager_comment }}</td>
                                        <td>{{ lv.hr_comment }}</td>

                                        <td>
                                            
                                            <div class="dropdown" v-if="(lv.status == 0 && lv.line_manager == lineManager) || (lv.status == approvalLevel -1) && !lv.expired">
                                                
                                                <button type="button" class="btn btn-primary btn-sm"
                                                    @click="respond(lv.pid)">
                                                    <span>Response</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="flex justify-center mt-4">
                                <nav class="relative justify-center rounded-md shadow pagination">
                                    <pagination-links v-for="(link, i) of leaves.links" :link="link" :key="i"
                                        @next="nextPage(link)"></pagination-links>
                                </nav>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>

        <o-modal :isOpen="assignModal" @submit="respondToRequest" modal-class="modal-sm" title="Request Leave"
            @modal-close="closeModal">
            <template #content>
                <div>
                    <form >
                        <div class="row">
                            
                            <div class="col-md-12" v-if="approvalLevel<3 || approvalLevel == 'null' ">
                                <div class="form-group">
                                    <label class="form-label">Comment <span class="text-danger">*</span> </label>
                                    <textarea type="text" cols="4" v-model="response.comment"
                                        class="form-control form-control-sm"
                                        placeholder="e.g go and refresh "></textarea>
                                    <p class="text-danger " v-if="errors?.comment">{{ errors?.comment[0] }}</p>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="form-label">Approve? <span class="text-danger">*</span> </label> <br>
                                    <label for="yes">Yes </label> 
                                    &nbsp;
                                    <input v-model="response.status" type="radio" id="yes" name="status" :value="status[0]">
                                    &nbsp;
                                    &nbsp;
                                    &nbsp;
                                    
                                    <label for="no">No </label>
                                    &nbsp;
                                    <input v-model="response.status" type="radio" id="no" name="status" :value="status[1]">
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

import store from "@/store";
import { ref } from "vue";
import PaginationLinks from "@/components/PaginationLinks.vue";
import OModal from "@/components/OModal.vue";

const lineManager = ref(null)
lineManager.value = store?.state?.user?.data?.pid;

const approvalLevel = ref(0)
approvalLevel.value = store.state.approvalLevel;

const errors = ref({});

const assignModal = ref(false)

const closeModal = () => {
    assignModal.value = false;
};
const response = ref({
    'comment' :'' ,
    'leave_pid' : '' , 
    'status' : '' , 
    level : approvalLevel.value
});

const status = ref([1,5])

if(approvalLevel.value == 2){
    status.value = [2,6]
}else if(approvalLevel.value == 3){
    status.value = [3,7]
}else if(approvalLevel.value == 4){
    status.value = [4,8]
}


const resetAttr = () =>{
    response.value = {
        'comment': '',
        'leave_pid': '',
        'status': '', 
    }
}
const leaves = ref({});
const respond = (pid) =>{
    response.value.leave_pid = pid
    assignModal.value = true
}

const respondToRequest = () => {
    errors.value = []
    store.dispatch('postMethod', { url: '/respond-to-leave-request',param:response.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data
        } else if (data?.status == 201) {
            loadLeaves()
            resetAttr()
        }
    })
}
 
loadLeaves()

function loadLeaves(url = '/manage-leave-request') {
    store.dispatch('getMethod', { url: url}).then((data) => {
        if (data?.status == 200) {
            leaves.value = data.data;
        }
    }) 
}


function nextPage(link) {
    if (!link.url || link.active) {
        return;
    }
    loadLeaves(link.url)
}


</script>

<style scoped></style>
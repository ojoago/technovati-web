<template>
    <div>
        <div class="container-fluid mt-2">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Staff Onboarding  </h5>

                    <!-- Default Tabs -->
                    <ul class="nav nav-tabs d-flex" id="myTabjustified" role="tablist">
                        <li class="nav-item flex-fill" role="presentation">
                            <button class="nav-link w-100 active" id="config-tab" data-bs-toggle="tab"
                                data-bs-target="#config" type="button" role="tab" aria-controls="config"
                                aria-selected="true">Config</button>
                        </li>
                        <li class="nav-item flex-fill" role="presentation">
                            <button class="nav-link w-100" id="request-tab" data-bs-toggle="tab" data-bs-target="#request"
                                type="button" role="tab" aria-controls="request" aria-selected="false">Request</button>
                        </li>
                        
                    </ul>
                    <div class="tab-content pt-2" id="myTabjustifiedContent">
                        <div class="tab-pane fade show active" id="config" role="tabpanel" aria-labelledby="config-tab">
                           
                            <div class="row">
                                <div class="col-md-4">
                                    <fieldset class="border rounded-3 p-2 m-1">
                                    <legend class="float-none w-auto px-2">Create Leave</legend>
                                    <form>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="form-label">leave <span class="text-danger">*</span></label>
                                                    <input type="text" v-model="leave.leave" class="form-control"
                                                        placeholder="e.g annual leave">
                                                    <p class="text-danger " v-if="errors?.leave">{{ errors?.leave[0] }}</p>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="form-label">days</label>
                                                    <input type="number" v-model="leave.days" class="form-control" placeholder="e.g 15 ">
                                                    <p class="text-danger " v-if="errors?.days">{{ errors?.days[0] }}
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="form-label">description <span class="text-danger">*</span></label>
                                                    <textarea type="text" v-model="leave.description" class="form-control" placeholder="e.g this leave only applies to senior devs"></textarea>
                                                    <p class="text-danger " v-if="errors?.description">{{ errors?.description[0] }}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="button" class="btn btn-success btn-sm mt-2" @click="createLeave">Submit</button>
                                    </form>
                                </fieldset>
                                </div>
                                <div class="col-md-8">
                                    <fieldset class="border rounded-3 p-2 m-1">
                                        <legend class="float-none w-auto px-2">Leaves</legend>
                                        <div class="table-responsive">
                                <table class="table-hover table-stripped table-bordered table">
                                    <thead>
                                        <tr>
                                            <th>SN</th>
                                            <th>Leave</th>
                                            <th>Days</th>
                                            <th>Description</th>
                                            <th> <i class="bi bi-pencil-fill"></i> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(lv, loop) in leaves.data" :key="loop">
                                            <td>{{ loop + 1 }}</td>
                                            <td>{{ lv.leave }}</td>
                                            <td>{{ lv.days }}</td>
                                            <td>{{ lv.description }}</td>
                                            <td>
                                                <div class="dropdown">
                                                    <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                                        data-bs-toggle="dropdown">
                                                        <i class="bi bi-tools"></i>
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                        <li><a class="dropdown-item pointer" @click="editLeave(lv)">Edit</a> </li>
                                                        <li><a class="dropdown-item pointer" @click="deleteLeave(lv.pid)">Delete</a> </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="flex justify-center mt-4">
                                    <nav class="relative justify-center rounded-md shadow pagination">
                                        <pagination-links v-for="(link, i) of leaves.links" :link="link" :key="i" @next="nextPage(link)"></pagination-links>
                                    </nav>
                                </div>
                            </div>
                                    </fieldset>
                                </div>
                            </div>

                        </div>
                        <div class="tab-pane fade" id="request" role="tabpanel" aria-labelledby="request-tab">
                            <fieldset class="border rounded-3 p-2 m-1">
                                <legend class="float-none w-auto px-2">Leave Request</legend>
                                <div class="table-responsive">
                                    <table class="table-hover table-stripped table-bordered table">
                                        <thead>
                                            <tr>
                                                <th>SN</th>
                                                <th>Staff</th>
                                                <th>Leave</th>
                                                <th>From</th>
                                                <th>to</th>
                                                <th>note</th>
                                                <th>status</th>
                                                <th>manager</th>
                                                <th>manager comment</th>
                                                <th>hr comment</th>
                                                <th> <i class="bi bi-pencil-fill"></i> </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(request, loop) in requests.data" :key="loop">
                                                <td>{{ loop + 1 }}</td>
                                                <td>{{ request.staff.username }}</td>
                                                <td>{{ request.leave.leave }}</td>
                                                <td>{{ request.from }}</td>
                                                <td>{{ request.to }}</td>
                                                <td>{{ request.note }}</td>
                                                <td>{{ request.status }}</td>
                                                <td>{{ request.line_manager.username }}</td>
                                                <td>{{ request.line_manager_comment }}</td>
                                                <td>{{ request.hr_comment }}</td>
                                                <td>
                                                    <div class="dropdown">
                                                        <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                                            data-bs-toggle="dropdown">
                                                            <i class="bi bi-tools"></i>
                                                        </button>
                                                        <ul class="dropdown-menu">
                                                            <li v-if="request.status == 0" class="bg-primary"><a class="dropdown-item pointer" @click="sendReminder(request.pid)">Remind</a> </li>
                                                            <li v-if="request.status == 1" class="bg-success"><a class="dropdown-item pointer" @click="approveLeave(request)">Approve</a> </li>
                                                            <li v-if="request.status == 1" class="bg-danger"><a class="dropdown-item pointer" @click="rejectLeave(request.pid)">Reject</a> </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                        <div class="flex justify-center mt-4">
                            <nav class="relative justify-center rounded-md shadow pagination">
                                <pagination-links v-for="(link, i) of leaves.links" :link="link" :key="i" @next="nextPage(link)"></pagination-links>
                            </nav>
                        </div>
                    </div>
                            </fieldset>
                        </div>
                    </div>
                    <!-- End  Tabs -->

                </div>
            </div>

        </div>
    </div>
</template>

<script setup>

import store from "@/store";
import { ref } from "vue";
import PaginationLinks from "@/components/PaginationLinks.vue";

const errors = ref({});



// const requests = ref({});
const leave = ref({
    leave: '',
    days : '',
    description : ''
});
const leaves = ref({});
const requests = ref({});

 

function createLeave() {
    store.commit('setSpinner', true)
    errors.value = []
    store.dispatch('postMethod', {url:'/create-leave',param:leave.value}).then((data) => {
        if (data.status == 422) {
            errors.value = data.data
        } else if (data.status == 201) {

          leave.value = [];
             
        }
        store.commit('setSpinner', false)
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
    })
}

const editLeave = (lv) =>{
    leave.value = {
        leave: lv.leave ,
        days: lv.days ,
        description: lv.description ,
        pid: lv.pid
    }
}
const deleteLeave = (pid) => {
    alert(pid)
}
 
loadLeaves()

function loadLeaves() {
    store.commit('setSpinner', true)
    store.dispatch('getMethod', { url: '/load-leaves'}).then((data) => {
        store.commit('setSpinner', false)
        if (data.status == 200) {
            leaves.value = data.data;
        }
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
        alert('weting be this')
    })
}
loadLeaveRequest()

function loadLeaveRequest() {
    store.commit('setSpinner', true)
    store.dispatch('getMethod', { url: '/leave-request'}).then((data) => {
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

function nextPage(link) {
    alert()
    if (!link.url || link.active) {
        return;
    }
    alert(link.url)
}


 



</script>

<style scoped></style>
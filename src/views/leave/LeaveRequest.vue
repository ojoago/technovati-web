<template>
    <div>
        <div class="container-fluid mt-2">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Staff Leave </h5>
                        <div class="row">
                            <div class="col-md-3">
                                <fieldset class="border rounded-3 p-2 m-1">
                                <legend class="float-none w-auto px-2">Request Leave</legend>
                                <form>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Leave <span class="text-danger">*</span></label>
                                                <input type="text" v-model="request.leave_pid" class="form-control"
                                                    placeholder="e.g annual leave">
                                                <p class="text-danger " v-if="errors?.leave_pid">{{ errors?.leave_pid[0] }}</p>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Begin <span class="text-danger">*</span></label>
                                                <input type="date" v-model="request.from" class="form-control"
                                                    placeholder="e.g annual leave">
                                                <p class="text-danger " v-if="errors?.from">{{ errors?.from[0] }}</p>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">End</label>
                                                <input type="date" v-model="request.to" class="form-control" placeholder="e.g 15 ">
                                                <p class="text-danger " v-if="errors?.to">{{ errors?.to[0] }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">note <span class="text-danger">*</span></label>
                                                <textarea type="text" v-model="request.note" class="form-control" placeholder="e.g this leave only applies to senior devs"></textarea>
                                                <p class="text-danger " v-if="errors?.note">{{ errors?.note[0] }}</p>
                                            </div>
                                        </div>
                                         <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="form-label">End</label>
                                                    <input type="file" class="form-control" placeholder="e.g 15 ">
                                                    <p class="text-danger " v-if="errors?.to">{{ errors?.to[0] }}</p>
                                                </div>
                                            </div>
                                         
                                    </div>
                                    <button type="button" class="btn btn-success btn-sm mt-2" @click="makeRequest">Submit</button>
                                </form>
                            </fieldset>
                            </div>
                            <div class="col-md-9">
                                <fieldset class="border rounded-3 p-2 m-1">
                                    <legend class="float-none w-auto px-2">Leave Request</legend>
                                    <div class="table-responsive">
                            <table class="table-hover table-stripped table-bordered table">
                                <thead>
                                    <tr>
                                        <th>SN</th>
                                        <th>Leave</th>
                                        <th>From</th>
                                        <th>to</th>
                                        <th>note</th>
                                        <th>status</th>
                                        <th>manager comment</th>
                                        <th>hr comment</th>
                                        <th> <i class="bi bi-pencil-fill"></i> </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(lv, loop) in leaves.data" :key="loop">
                                        <td>{{ loop + 1 }}</td>
                                        <td>{{ lv.leave.leave }}</td>
                                        <td>{{ lv.from }}</td>
                                        <td>{{ lv.to }}</td>
                                        <td>{{ lv.note }}</td>
                                        <td>{{ lv.status }}</td>
                                        <td>{{ lv.hr_comment }}</td>
                                        <td>{{ lv.line_manager_comment }}</td>
                                        
                                        <td>
                                            <div class="dropdown">
                                                <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                                    data-bs-toggle="dropdown">
                                                    <i class="bi bi-tools"></i>
                                                </button>
                                                <ul class="dropdown-menu">
                                                    <li v-if="lv.status == 0" class="bg-primary"><a class="dropdown-item pointer" @click="remindLeave(lv.pid)">Remind</a> </li>
                                                    <li v-if="lv.status == 0" class="bg-warning"><a class="dropdown-item pointer" @click="editLeave(lv)">Edit</a> </li>
                                                    <li v-if="lv.status == 0" class="bg-danger"><a class="dropdown-item pointer" @click="deleteLeave(lv.pid)">Delete</a> </li>
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
            </div>
        </div>
    </div>
</template>

<script setup>

import store from "@/store";
import { ref } from "vue";
import PaginationLinks from "@/components/PaginationLinks.vue";

const errors = ref({});



const request = ref({
    'from' :'' ,
    'to' : '' , 
    'note' : '' , 
    'path' : '' , 
    'leave_pid' : '027N07C0220OM112414538420ED3' , 
    'user_pid' : '' , 
    'hr_comment' : '' , 
    'line_manager_comment' : '' , 
    
});

const leaves = ref({});

 

function makeRequest() {
    store.commit('setSpinner', true)
    errors.value = []
    store.dispatch('postMethod', {url:'/request-leave',param: request.value}).then((data) => {
        if (data.status == 422) {
            errors.value = data.data
        } else if (data.status == 201) {

          request.value = [];
             
        }
        store.commit('setSpinner', false)
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
    })
}

const editLeave = (lv) =>{
    request.value = {
        from: lv.from,
        to: lv.to,
        note: lv.note,
        path: '',
        leave_pid: lv.leave_pid,
        pid: lv.pid,
    }
}
const deleteLeave = (pid) => {
    alert(pid)
}
const remindLeave = (pid) => {
    alert(pid)
}
 
loadLeaves()

function loadLeaves() {
    store.commit('setSpinner', true)
    store.dispatch('getMethod', { url: '/load-my-leave-request'}).then((data) => {
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

function nextPage(link) {
    alert()
    if (!link.url || link.active) {
        return;
    }
    alert(link.url)
}


 



</script>

<style scoped></style>
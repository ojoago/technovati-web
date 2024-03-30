<template>
    <div>
        <div class="container-fluid mt-2">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Staff Leave
                        <button class="btn btn-primary btn-sm" @click="openModal">New Leave</button>
                    </h5>
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
                                        <th> <i class="bi bi-gear-fill"></i> </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(lv, loop) in leaves.data" :key="loop">
                                        <td>{{ loop + 1 }}</td>
                                        <td>{{ lv.leave.leave }}</td>
                                        <td>{{ lv.begin }}</td>
                                        <td>{{ lv.end }}</td>
                                        <td>{{ lv.note }}</td>
                                        <td>{{ lv.request_status }}</td>
                                        <td>{{ lv.hr_comment }}</td>
                                        <td>{{ lv.line_manager_comment }}</td>

                                        <td>
                                            <div class="dropdown">
                                                <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                                    data-bs-toggle="dropdown">
                                                    <i class="bi bi-tools"></i>
                                                </button>
                                                <ul class="dropdown-menu">
                                                    <li v-if="lv.status == 0" class="bg-primary"><a
                                                            class="dropdown-item pointer"
                                                            @click="remindLeave(lv.pid)">Remind</a> </li>
                                                    <li v-if="lv.status == 0" class="bg-warning"><a
                                                            class="dropdown-item pointer"
                                                            @click="editLeave(lv)">Edit</a> </li>
                                                    <li v-if="lv.status == 0" class="bg-danger"><a
                                                            class="dropdown-item pointer"
                                                            @click="deleteLeave(lv.pid)">Delete</a> </li>
                                                </ul>
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

        <o-modal :isOpen="assignModal" @submit="makeRequest" modal-class="modal-sm" title="Request Leave"
            @modal-close="closeModal">
            <template #content>
                <div>
                    <form id="lForm">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="form-label">Leave <span class="text-danger">*</span></label>
                                    <select v-model="request.leave_pid" class="form-control form-control-sm">
                                        <option value="" selected>Make Selection</option>
                                        <option v-for="(leave, i) in leaveDrop" :key="i" :value="leave.id">{{ leave.text
                                            }} - {{ leave.days }} days</option>
                                    </select>

                                    <p class="text-danger " v-if="errors?.leave_pid">{{ errors?.leave_pid[0] }}</p>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="form-label">Begin <span class="text-danger">*</span></label>
                                    <input type="date" v-model="request.from" class="form-control  form-control-sm"
                                        placeholder="e.g annual leave">
                                    <p class="text-danger " v-if="errors?.from">{{ errors?.from[0] }}</p>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="form-label">End</label>
                                    <input type="date" v-model="request.to" class="form-control form-control-sm"
                                        placeholder="e.g 15 ">
                                    <p class="text-danger " v-if="errors?.to">{{ errors?.to[0] }}
                                    </p>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="form-label">Note </label>
                                    <textarea type="text" v-model="request.note" class="form-control form-control-sm"
                                        placeholder="e.g this leave only applies to senior devs"></textarea>
                                    <p class="text-danger " v-if="errors?.note">{{ errors?.note[0] }}</p>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="form-label">Image</label>
                                    <input type="file" class="form-control form-control-sm" @change="handleImageChange"
                                        accept="image/*" placeholder="e.g 15 ">
                                    <p class="text-danger " v-if="errors?.image">{{ errors?.image[0] }}</p>
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

const errors = ref({});


const assignModal = ref(false)
const openModal = () => {
    assignModal.value = true
}
const closeModal = () => {
    assignModal.value = false;
};
const request = ref({
    'from' :'' ,
    'to' : '' , 
    'note' : '' , 
    'path' : '' , 
    'leave_pid' : '' , 
    image : ''
});

const leaves = ref({});

function makeRequest() {
    errors.value = []
    store.dispatch('postMethod', {url:'/request-leave',param: request.value}).then((data) => {
        if (data.status == 422) {
            errors.value = data.data
        } else if (data.status == 201) {
            loadLeaves()
          let form = document.querySelector('#lForm')
          form.reset()
        }
    }).catch(e => {
        console.log(e);
    })
}

const editLeave = (lv) =>{
    request.value = {
        from: lv.from,
        to: lv.to,
        note: lv.note,
        image: '',
        leave_pid: lv.leave_pid,
        pid: lv.pid,
    }
    assignModal.value = true
}
const deleteLeave = (pid) => {
    alert(pid)
}
const remindLeave = (pid) => {
    alert(pid)
}
 
loadLeaves()

function loadLeaves() {
    store.dispatch('getMethod', { url: '/load-my-leave-request'}).then((data) => {
        if (data?.status == 200) {
            leaves.value = data.data;
        }
    }).catch(e => {
        console.log(e);
    })
}

function nextPage(link) {
    alert()
    if (!link.url || link.active) {
        return;
    }
    alert(link.url)
}

const handleImageChange = (event) => {
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
            request.value.image = reader.result;
        };
        reader.readAsDataURL(file);
    }
}

const leaveDrop = ref({})
 function dropdownSection() {
     store.dispatch('loadDropdown', 'staff-leaves').then(({ data }) => {
        leaveDrop.value = data;
    }).catch(e => {
        console.log(e);
    })
}
dropdownSection()



</script>

<style scoped></style>
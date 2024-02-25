<template>
    <div>
        <div class="container mt-2">
            
                    <div class="card">
                        <div class="card-header">
                            Visitor's Log
                            <button class="btn btn-sm btn-primary" @click="openModal">Add New</button>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table-hover table-stripped table-bordered table">
                                    <thead>
                                        <tr>
                                            <th>SN</th>
                                            <th>Names</th>
                                            <th>Phone Number</th>
                                            <th>Purpose</th>
                                            <th>Tag</th>
                                            <th>Time in</th>
                                            <th>Time out</th>
                                            <th> <i class="bi bi-gear-fill"></i> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(lg, loop) in logs.data" :key="loop">
                                            <td>{{ loop + 1 }}</td>
                                            <td>{{ lg.names }}</td>
                                            <td>{{ lg.gsm }}</td>
                                            <td>{{ lg.purpose }}</td>
                                            <td>{{ lg.tag }}</td>
                                            <td>{{ lg.time }}</td>
                                            <td>{{ lg.out }}</td>
                                            <td>
                                                <div class="dropdown" v-if="!lg.time_out">
                                                    <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                                        data-bs-toggle="dropdown">
                                                        <i class="bi bi-tools"></i>
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                        <li><a class="dropdown-item pointer bg-success"  @click="clockOut(lg.id)">Clock out</a> </li>
                                                        <li><a class="dropdown-item pointer bg-warning" @click="editlog(lg)">Edit</a> </li>
                                                        <li><a class="dropdown-item pointer bg-danger" @click="deleteLog(lg.id)">Delete</a> </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tfoot></tfoot>
                                </table>
                                <div class="flex justify-center mt-4">
                                    <nav class="relative justify-center rounded-md shadow pagination">
                                        <pagination-links v-for="(link, i) of logs.links" :link="link" :key="i"
                                            @next="nextPage(link)"></pagination-links>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
       
          <o-modal :isOpen="toggleModal" @submit="logVisitor" modal-class="modal-lg" title="Visitor's Log" @modal-close="closeModal">
                        <template #content>
                            <div>

                                <form id="logForm">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="form-label">Names <span class="text-danger">*</span> </label>
                                                    <input type="text" v-model="log.names" class="form-control" placeholder="Name of visitor">
                                                    <p class="text-danger " v-if="errors?.names">{{ errors?.names[0] }} </p>
                                                </div>
                                            </div>
                                             <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="form-label">Phone Numbers</label>
                                                        <input type="text" maxlength="11" v-model="log.gsm" class="form-control" placeholder="gsm">
                                                        <p class="text-danger " v-if="errors?.gsm">{{ errors?.gsm[0] }}</p>
                                                    </div>
                                                </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="form-label">Purpose of Visit <span class="text-danger">*</span></label>
                                                    <textarea type="text" v-model="log.purpose" class="form-control" placeholder="purpose of visit"></textarea>
                                                    <p class="text-danger " v-if="errors?.purpose">{{ errors?.purpose[0] }}
                                                    </p>
                                                </div>
                                            </div>
                                             <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="form-label">Visitor's Address</label>
                                                        <textarea type="text" v-model="log.address" class="form-control" placeholder="visitor address"></textarea>
                                                        <p class="text-danger " v-if="errors?.address">{{ errors?.address[0] }}</p>
                                                    </div>
                                                </div>
                                           
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="form-label">Tag Number</label>
                                                    <input type="text" v-model="log.tag" class="form-control form-control-sm" placeholder="e.g TLV 1">
                                                    <p class="text-danger " v-if="errors?.tag">{{ errors?.tag[0] }}</p>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="form-label">Staff </label>
                                                    <Select2 v-model="log.staff_pid" :options="users" :settings="{ width: '100%' }"  />
                                                    <p class="text-danger " v-if="errors?.staff_pid">{{ errors?.staff_pid[0] }}</p>
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
import Select2 from 'vue3-select2-component';
import OModal from "@/components/OModal.vue";
const toggleModal = ref(false)
const openModal = () => {
    toggleModal.value = true
}
const closeModal = () => {
    toggleModal.value = false;
};
const errors = ref({});
const logs = ref({});
const log = ref({
   names : '' , 
   purpose : '' , 
   gsm :'' , 
   address : '', 
   tag : '', 
   time_in : '', 
   time_out : '' ,
   staff_pid : ''
});

const editlog = (lg) => {
    log.value = {
        names : lg.names,
        purpose : lg.purpose,
        gsm : lg.gsm,
        address : lg.address,
        tag : lg.tag,
        time_in : lg.time_in,
        time_out: lg.time_out,
        id: lg.id,
        staff: lg.staff_pid,
    }
    toggleModal.value = true
}
const clockOut = (id) => {
    store.dispatch('getMethod', { url: '/sign-visitor-out/'+id }).then((data) => {
         if (data?.status == 200) {
            store.commit('notify', { message: 'Reloading Datas...', type: 'secondary' })
            loadLog()
        }
    })
}
const deleteLog = (id) => {
   store.dispatch('deleteMethod', { url: '/delete-visitor-record/' + id }).then((data) => {
        if (data?.status == 200) {
            store.commit('notify', { message: 'Reloading Datas...', type: 'secondary' })
            loadLog()
        }
    })
}

function logVisitor() {
    errors.value = []
    store.dispatch('postMethod', { url: '/log-visitor', param: log.value }).then((data) => {
        console.log(data);
        if (data?.status == 422) {
            errors.value = data.data
        } else if (data.status == 201) {
            loadLog()
            let form = document.querySelector('#logForm')
            form.reset()
        }
    })
}

function loadLog() {
    store.dispatch('getMethod', { url: '/load-visitor-log' }).then((data) => {
        if (data.status == 200) {
            logs.value = data.data;
        }
    })
}
const users = ref([]);
function dropdownUser() {
    store.dispatch('loadDropdown', 'users').then(({ data }) => {
        users.value = data;
    })
}
dropdownUser()
loadLog()
function nextPage(link) {
    alert()
    if (!link.url || link.active) {
        return;
    }
    alert(link.url)
}

</script>

<style scoped></style>
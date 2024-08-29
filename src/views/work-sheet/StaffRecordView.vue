<template>
    <div>
        <div class="container mt-2">

            <div class="card">
                <div class="card-header h3">Work Sheet
                    <!-- <button class="btn btn-sm btn-primary m-2" @click="openDeviceModal">Add Device</button> -->

                    <div class="row float-right">
                        <div class="col-md-6">
                            <div class="row">
                                <div class="col-md-6">
                                    <input type="date" class="form-control form-control-sm">
                                </div>
                                <div class="col-md-6">
                                    <input type="date" class="form-control form-control-sm">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <select class="form-control" @change="loadStaffRecords($event)">
                        <option value="" selected>Make Section</option>
                        <option v-for="(worker,loop) in workers" :key="loop" :value="worker.id">{{ worker.text }}</option>
                    </select>
                    {{ records }}

                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import store from "@/store";
import { ref } from "vue";


const records = ref({})
const worker_pid = ref({})


const loadStaffRecords = (event) => {
    worker_pid.value = event.target.value
    store.dispatch('getMethod', { url: '/load-staff-records/'+ event.target.value }).then((data) => {
        if (data?.status == 200) {
            records.value = data.data;
        }
    })
}


const deviceDrop = ref({});
function dropdownDevice() {
    store.dispatch('loadDropdown', 'device').then(({ data }) => {
        deviceDrop.value = data;
    }).catch(e => {
        console.log(e);
        alert('Something Went Wrong')
    })
}
dropdownDevice()

const workers = ref({});
function dropdownWorker() {
    store.dispatch('loadDropdown', 'workers').then(({ data }) => {
        workers.value = data;
    })
}
dropdownWorker()



</script>

<style scoped></style>
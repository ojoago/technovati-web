<template>
    <div>
        <button class="btn btn-sm btn-primary m-1" @click="toggleMileage=true">Add New</button>
        <div class="table-responsive" v-if="mileage">
            <table class="table-hover table-stripped table-bordered table">
                <thead>
                    <tr>
                        <th>SN</th>
                        <th>journey </th>
                        <th>date </th>
                        <th>distance (KM)</th>
                        <th>fuel level</th>
                        <th>fuel level after</th>
                        <!-- <th>initial_oil_level</th> -->
                        <!-- <th>oil_level_after</th> -->
                        <th>driver</th>
                        <th>Status</th>
                        <th> <i class="bi bi-gear-fill"></i> </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(ml, loop) in mileage" :key="loop">
                        <td>{{ loop + 1 }}</td>
                        <td>{{ ml.journey }}</td>
                        <td>{{ ml.format_date }} </td>
                        <td>{{ ml.distance }} </td>
                        <td>{{ ml.initial }} </td>
                        <td>{{ ml.after }} </td>
                        <!-- <td>{{ ml.initial_oil_level }} </td> -->
                        <!-- <td>{{ ml.oil_level_after }} </td> -->
                        <td>{{ ml.driver }} </td>
                        <td>{{ ml.status }} </td>
                        <td> <span class="bi bi-pen-fill pointer" @click="editRecord(ml)" v-if="ml.status != 'Returned'"></span> </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else class="text-center text-uppercase">No Record yet</div>


        <!-- modal  -->
        <o-modal :isOpen="toggleMileage" modal-class="modal-lg" title="Add Vehicle mileage" @submit="addVehicleMileage"
            @modal-close="closeModal">
            <template #content>
                <form id="milForm">
                    <div class="row">

                        <div class="col-md-8">
                            <label class="form-label">Journey *</label>
                            <input type="text" v-model="mile.journey" class="form-control form-control-sm"
                                placeholder="e.g taking meters to T7, Jos">
                            <p class="text-danger " v-if="error?.journey">{{ error?.journey[0] }} </p>
                        </div>

                        <div class="col-md-4">
                            <label class="form-label">distance *</label>
                            <input type="number" step="0.1" v-model="mile.distance" class="form-control form-control-sm"
                                placeholder="e.g 138">
                            <p class="text-danger " v-if="error?.distance">{{ error?.distance[0] }} </p>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Initial fuel level *</label>
                            <input type="number" step="0.1" v-model="mile.initial_fuel_level"
                                class="form-control form-control-sm" placeholder="e.g 70">
                            <p class="text-danger " v-if="error?.initial_fuel_level">{{ error?.initial_fuel_level[0] }}
                            </p>
                        </div>


                        <!-- <div class="col-md-6">
                            <label class="form-label">Initial Oil level </label>
                            <input type="number" step="0.1" v-model="mile.initial_oil_level"
                                class="form-control form-control-sm" placeholder="12">
                            <p class="text-danger " v-if="error?.initial_oil_level">{{ error?.initial_oil_level[0] }}
                            </p>
                        </div>


                        <div class="col-md-6">
                            <label class="form-label">Oil level after</label>
                            <input type="number" step="0.1" v-model="mile.oil_level_after"
                                class="form-control form-control-sm" placeholder="1.2">
                            <p class="text-danger " v-if="error?.oil_level_after">{{ error?.oil_level_after[0] }} </p>
                        </div> -->

                        <div class="col-md-6">
                            <label class="form-label">driver</label>
                            <input type="text" v-model="mile.driver" class="form-control form-control-sm"
                                placeholder="e.g Abdul">
                            <p class="text-danger " v-if="error?.driver">{{ error?.driver[0] }} </p>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">date</label>
                            <input type="date" v-model="mile.date" class="form-control form-control-sm">
                            <p class="text-danger " v-if="error?.date">{{ error?.date[0] }} </p>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">return date</label>
                            <input type="date" v-model="mile.return_date" class="form-control form-control-sm">
                            <p class="text-danger " v-if="error?.return_date">{{ error?.return_date[0] }} </p>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Fuel level after</label>
                            <input type="number" step="0.1" v-model="mile.fuel_level_after"
                                class="form-control form-control-sm" placeholder="e.g 9">
                            <p class="text-danger " v-if="error?.fuel_level_after">{{ error?.fuel_level_after[0] }} </p>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Status</label>
                            <select  v-model="mile.status" class="form-control form-control-sm" >
                                <option value="" selected>Select Status</option>
                                <option selected>Awaiting Departure</option>
                                <option >On Transit</option>
                                <option >Returned</option>
                            </select>
                            
                            <p class="text-danger " v-if="error?.status">{{ error?.status[0] }} </p>
                        </div>

                    </div>
                </form>
            </template>

        </o-modal>
    </div>
</template>

<script setup>
     
import store from "@/store";
import { onMounted, ref } from "vue";
// import { useRoute, useRouter } from 'vue-router';
import OModal from "@/components/OModal.vue";

const toggleMileage = ref(false)
const closeModal = () => {
    toggleMileage.value = false;
};
let dtl
onMounted(() => {
    dtl = localStorage.getItem('TVATI_VEHICLE_DETAIL') ? JSON.parse(localStorage.getItem('TVATI_VEHICLE_DETAIL')) : 'null'
    if (dtl != 'null') {
        mile.value.vehicle_pid = dtl?.pid;
        loadVehicleMileage(dtl?.pid)
    }
});

const mileage = ref({})
function loadVehicleMileage(pid) {
    store.dispatch('getMethod', { url: '/load-vehicle-mileage/' + pid }).then(({ data }) => {
        mileage.value = data
    })
}

const mile = ref({
    journey: '' , 
    distance: '' , 
    initial_oil_level: '' , 
    initial_fuel_level: '' , 
    oil_level_after: '' ,
    fuel_level_after: '',
    vehicle_pid : '' , 
    driver : '' ,
    date: '',
    return_date: '' ,
    status: ''
}) 
 const resetAttr = () => {
    mile.value = {
        journey: '' , 
    distance: '' , 
    initial_oil_level: '' , 
    initial_fuel_level: '' , 
    oil_level_after: '' ,
    fuel_level_after: '',
    driver : '' ,
    date: '',
    return_date: '' ,
    status: '',
    vehicle_pid : dtl?.pid
    }
 }
const editRecord = (data) =>{
    mile.value = {
        journey: data.journey,
        distance: data.distance,
        initial_oil_level: data.initial_oil_level,
        initial_fuel_level: data.initial_fuel_level,
        oil_level_after: data.oil_level_after,
        fuel_level_after: data.fuel_level_after,
        vehicle_pid: data.vehicle_pid,
        driver: data.driver,
        date: data.date,
        return_date: data.return_date ,
        status: data.status ,
        id: data.id ,
    }
    toggleMileage.value = true
}
const error = ref({})
const addVehicleMileage = () => {
    error.value = []
    store.dispatch('postMethod', { url: '/add-vehicle-mileage', param: mile.value }).then((data) => {
        if (data?.status == 422) {
            error.value = data.data
        } else if (data?.status == 201) {
            loadVehicleMileage(mile.value.vehicle_pid)
            resetAttr()
    toggleMileage.value = false;

        }
    })
}

</script>

<style scoped>

</style>
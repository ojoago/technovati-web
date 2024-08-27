<template>
    <div>
        <button class="btn btn-sm btn-primary m-1" @click="toggleMileage=true">Add New</button>
        <div class="table-responsive" v-if="papers">
            <table class="table-hover table-stripped table-bordered table">
                <thead>
                    <tr>
                        <th>SN</th>
                        <th>make </th>
                        <th>model </th>
                        <th>type</th>
                        <th>manufacture</th>
                        <th>capacity</th>
                        <th>fuel type</th>
                        <th>transmission type</th>
                        <th>color</th>
                        <th>License Plate Number</th>
                        <th>Vehicle Identification Number (VIN)</th>
                        <th>vin expiring date</th>
                        
                        <th>Image</th>
                        <th> <i class="bi bi-gear-fill"></i> </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(ml, loop) in papers" :key="loop">
                        <td>{{ loop + 1 }}</td>
                        <td>{{ ml.make }}</td>
                        <td>{{ ml.model }} </td>
                        <td>{{ ml.type }} </td>
                        <td>{{ ml.manufacturer }} </td>
                        <td>{{ ml.capacity }} </td>
                        <td>{{ ml.fuel_type }} </td>
                        <td>{{ ml.transmission_type }} </td>
                        <td>{{ ml.color }} </td>
                        <td>{{ ml.lpn }} </td>
                        <td>{{ ml.vin }} </td>
                        <td>{{ ml.date }} </td>
                        <td>{{ ml.path }} </td>
                        <td> <span class="bi bi-pen-fill pointer" @click="editRecord(ml)"> </span> </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else class="text-center text-uppercase">No Record yet</div>


        <!-- modal  -->
        <o-modal :isOpen="toggleMileage" modal-class="modal-lg" title="Add Vehicle mileage" @submit="addVehicleMileage"
            @modal-close="closeModal">
            <template #content>
                <form >
                    <div class="row">

                        <div class="col-md-7">
                            <label class="form-label">Make *</label>
                            <input type="text" v-model="paper.make" class="form-control form-control-sm"
                                placeholder="">
                            <p class="text-danger " v-if="error?.make">{{ error?.make }} </p>
                        </div>

                        <div class="col-md-5">
                            <label class="form-label">Model *</label>
                            <input type="text"  v-model="paper.model" class="form-control form-control-sm"
                                placeholder="e.g 138">
                            <p class="text-danger " v-if="error?.model">{{ error?.model}} </p>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Type *</label>
                            <input type="text"  v-model="paper.type"
                                class="form-control form-control-sm" placeholder="">
                            <p class="text-danger " v-if="error?.type">{{ error?.type }}</p>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Manufacturer *</label>
                            <input type="text" v-model="paper.manufacturer" class="form-control form-control-sm"
                                placeholder="">
                            <p class="text-danger " v-if="error?.manufacturer">{{ error?.manufacturer }} </p>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Capacity *</label>
                            <input type="text" v-model="paper.capacity" class="form-control form-control-sm">
                            <p class="text-danger " v-if="error?.capacity">{{ error?.capacity}} </p>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Fuel Type *</label>
                            <input type="text" v-model="paper.fuel_type" class="form-control form-control-sm">
                            <p class="text-danger " v-if="error?.fuel_type">{{ error?.fuel_type }} </p>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Transmission Type *</label>
                            <input type="text"  v-model="paper.transmission_type"
                                class="form-control form-control-sm" placeholder="">
                            <p class="text-danger " v-if="error?.transmission_type">{{ error?.transmission_type }} </p>
                        </div>
                        
                        <div class="col-md-6">
                            <label class="form-label">Color *</label>
                            <input type="text"  v-model="paper.color"
                                class="form-control form-control-sm" placeholder="">
                            <p class="text-danger " v-if="error?.color">{{ error?.color }} </p>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">License Plate Number *</label>
                            <input type="text"  v-model="paper.lpn"
                                class="form-control form-control-sm" placeholder="">
                            <p class="text-danger " v-if="error?.lpn">{{ error?.lpn }} </p>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Vehicle Identification Number (VIN) *</label>
                            <input type="text"  v-model="paper.vin"
                                class="form-control form-control-sm" placeholder="">
                            <p class="text-danger " v-if="error?.vin">{{ error?.vin }} </p>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">VIN Expiring Date</label>
                            <input type="date"  v-model="paper.vin_expiring_date"
                                class="form-control form-control-sm" placeholder="">
                            <p class="text-danger " v-if="error?.vin_expiring_date">{{ error?.vin_expiring_date }} </p>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Image *</label>
                            <input type="file" @change="handleFileChange"
                                class="form-control form-control-sm" accept=".png,.jpg,.jpeg">
                            <p class="text-danger " v-if="error?.image">{{ error?.image }} </p>
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
import { useHelper } from "@/composables/helper";
import { formatError } from "@/composables/formatError";
const {transformValidationErrors} = formatError()
const {handleFile} = useHelper()

const toggleMileage = ref(false)
const closeModal = () => {
    toggleMileage.value = false;
    resetAttr()
};
let dtl
onMounted(() => {
    dtl = localStorage.getItem('TVATI_VEHICLE_DETAIL') ? JSON.parse(localStorage.getItem('TVATI_VEHICLE_DETAIL')) : 'null'
    if (dtl != 'null') {
        paper.value.vehicle_pid = dtl?.pid;
        loadVehicleMileage(dtl?.pid)
    }
});

const papers = ref({})
function loadVehicleMileage(pid) {
    store.dispatch('getMethod', { url: '/load-vehicle-papers/' + pid }).then(({ data }) => {
        papers.value = data
    })
}

const paper = ref({
    vehicle_pid: '' ,
    make: '' ,
    model: '' ,
    type:'' ,
    manufacturer:'',
    capacity:'' ,
    fuel_type :'',
    transmission_type :'',
    color :'',
    lpn :'',
    vin :'',
    vin_expiring_date :'',
    image :'',
}) 
 
const resetAttr = () => {
    paper.value = {
    make: '' ,
    model: '' ,
    type:'' ,
    manufacture:'',
    capacity:'' ,
    fuel_type :'',
    transmission_type :'',
    color :'',
    lpn :'',
    vin :'',
    vin_expiring_date :'',
    image :'',
    vehicle_pid : dtl?.pid
    }
 }

const editRecord = (data) =>{
    paper.value = {
    vehicle_pid: data.vehicle_pid ,
    make: data.make ,
    model: data.model ,
    type:data.type ,
    manufacturer:data.manufacturer,
    capacity:data.capacity ,
    fuel_type :data.fuel_type,
    transmission_type :data.transmission_type,
    color :data.color,
    lpn :data.lpn,
    vin :data.vin,
    pid :data.pid,
    vin_expiring_date :data.vin_expiring_date,
    // image :data.,
    }
    toggleMileage.value = true
}
const error = ref({})
const addVehicleMileage = () => {
    error.value = []
    store.dispatch('postMethod', { url: '/add-vehicle-paper', param: paper.value }).then((data) => {
        if (data?.status == 422) {
            error.value = transformValidationErrors(data.data)
        } else if (data?.status == 201) {
            loadVehicleMileage(paper.value.vehicle_pid)
            closeModal()
        }
    })
}


async function handleFileChange(event){
    paper.value.image = await handleFile(event)
}

</script>

<style scoped>

</style>
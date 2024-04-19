<template>
    <div>
        <div class="container mt-2">
            <div class="card">
                <div class="card-body">
                    <div class="card-header">
                        Vehicles
                        <button class="btn btn-sm btn-primary" @click="openVehicleModal">Add Vehicle</button>
                    </div>
                    <input type="text" class=" form-control form-control-sm" placeholder="search Item" >
                    <div class="table-responsive">
                        <table class="table-hover table-stripped table-bordered table">
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Vehicle </th>
                                    <th>Brand</th>
                                    <th>Plate Number</th>
                                    <th>Engine Number</th>
                                    <th>Color</th>
                                    <th>Driver</th>
                                    <th align = "center"> <i class="bi bi-gear-fill"></i> </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, loop) in vehicles?.data" :key="loop">
                                    <td>{{ loop + 1 }}</td>
                                    <td>{{ item.name }}</td>
                                    <td>{{ item.brand }} </td>
                                    <td>{{ item.plate_number }} </td>
                                    <td>{{ item.engine_number }} </td>
                                    <td>{{ item.color }} </td>
                                    <td>{{ item?.driver?.username }} </td>
                                    <td>
                                        <div class="dropdown">
                                            <button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-bs-toggle="dropdown">
                                                <i class="bi bi-tools"></i>
                                            </button>
                                            <ul class="dropdown-menu">
                                                <li><a class="dropdown-item pointer" @click="vehilceDetail(item)">Detail</a></li>
                                                <!-- <li><a class="dropdown-item pointer" @click="addFuel(item.pid)">Add Fuel Level</a></li> -->
                                                <!-- <li><a class="dropdown-item pointer" @click="changeOilModal(item.pid)">Change Oil</a></li> -->
                                                <!-- <li><a class="dropdown-item pointer" @click="addType(item.pid)">Add Tyre</a></li> -->
                                                <li><a class="dropdown-item pointer text-warning" @click="editVehicle(item)" >Edit</a></li>
                                                <li><a class="dropdown-item pointer text-danger" @click="deleteVehicleRecord(item.pid)">Delete</a></li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="flex justify-center mt-4">
                            <nav class="relative justify-center rounded-md shadow pagination">
                                <pagination-links v-for="(link, i) of vehicles.links" :link="link" :key="i"
                                    @next="nextPage(link)"></pagination-links>
                            </nav>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>

        <o-modal :isOpen="vehicleModal" modal-class="modal-lg" title="Add New Vehicle" @submit="addVehicle" @modal-close="closeModal">
            <template #content>
                <form id="toolForm">
                    <div class="row">
                        <div class="col-md-6">
                            <label class="form-label">Model *</label>
                            <input type="text" v-model="vehicle.name" placeholder="e.g Corola S" class="form-control form-control-sm">
                            <p class="text-danger " v-if="errors?.name">{{ errors?.name[0] }} </p>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Brand *</label>
                            <input type="text" v-model="vehicle.brand" placeholder="e.g Toyota" class="form-control form-control-sm">
                            <p class="text-danger " v-if="errors?.brand">{{ errors?.brand[0] }} </p>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Engine Number *</label>
                            <input type="text" v-model="vehicle.engine_number" placeholder="e.g xkev1" class="form-control form-control-sm">
                            <p class="text-danger " v-if="errors?.engine_number">{{ errors?.engine_number[0] }} </p>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Plate Number *</label>
                            <input type="text" v-model="vehicle.plate_number" placeholder="e.g kd12sk" class="form-control form-control-sm">
                            <p class="text-danger " v-if="errors?.plate_number">{{ errors?.plate_number[0] }} </p>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Color *</label>
                            <input type="text" v-model="vehicle.color" placeholder="e.g Navy Blue" class="form-control form-control-sm">
                            <p class="text-danger " v-if="errors?.color">{{ errors?.color[0] }} </p>
                        </div>
                       

                        <div class="col-md-6">
                            <label class="form-label">Fuel Capacity *</label>
                            <input type="number" v-model="vehicle.fuel_capacity" placeholder="e.g 50" class="form-control form-control-sm">
                            <p class="text-danger " v-if="errors?.fuel_capacity">{{ errors?.fuel_capacity[0] }} </p>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Mileage *</label>
                            <input type="number" v-model="vehicle.mileage" placeholder="e.g 600" class="form-control form-control-sm">
                            <p class="text-danger " v-if="errors?.mileage">{{ errors?.mileage[0] }} </p>
                        </div>

                         <div class="col-md-6">
                            <label class="form-label">Driver</label>
                            <select v-model="vehicle.driver" class="form-control form-control-sm"  >
                                <option value="" selected>make Selection</option>
                                <option v-for="(user,i) in userDrop" :key="i" :value="user.id">{{ user.text }}</option>
                            </select>
                            <p class="text-danger " v-if="errors?.driver">{{ errors?.driver[0] }} </p>
                        </div>

                    </div>
                </form>
            </template>
        </o-modal>
<!-- 
        <o-modal :isOpen="tyreModal" modal-class="modal-lg" title="Add Tyre to Vehicle" @submit="addTyre" @modal-close="closeModal">
            <template #content>
                <form id="assignForm">
                    <div class="row">
                        <div class="col-md-6">
                            <label class="form-label">Side *</label>
                            <select v-model="tyre.side" class="form-control form-control-sm">
                                <option value="" selected>Make Selection </option>
                                <option>Front Right</option>
                                <option>Front Left</option>
                                <option>Back Right</option>
                                <option>Back Left</option>
                                <option>Spare</option>
                            </select>
                            <p class="text-danger" v-if="t_error?.side">{{ t_error?.side[0] }} </p>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Brand *</label>
                            <input type="text" v-model="tyre.brand" class="form-control form-control-sm" placeholder="Mechelin">
                            <p class="text-danger " v-if="t_error?.brand">{{ t_error?.brand[0] }} </p>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Type *</label>
                            <input type="text" v-model="tyre.type" class="form-control form-control-sm" placeholder="Enter type">
                            <p class="text-danger " v-if="t_error?.type">{{ t_error?.type[0] }} </p>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Date Purchased *</label>
                            <input type="date" v-model="tyre.date_purchased" class="form-control form-control-sm">
                            <p class="text-danger " v-if="t_error?.date_purchased">{{ t_error?.date_purchased[0] }} </p>
                        </div>
                        
                        <div class="col-md-6">
                            <label class="form-label">Date Manufactured *</label>
                            <input type="date" v-model="tyre.date_manufactured" class="form-control form-control-sm">
                            <p class="text-danger " v-if="t_error?.date_manufactured">{{ t_error?.date_manufactured[0] }} </p>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Expiring Date *</label>
                            <input type="date" v-model="tyre.expiring_date" class="form-control form-control-sm">
                            <p class="text-danger " v-if="t_error?.expiring_date">{{ t_error?.expiring_date[0] }} </p>
                        </div>
                         
                    </div>
                </form>
            </template>

        </o-modal> -->

        <!-- <o-modal :isOpen="oilModal" modal-class="modal-sm" title="Change Oil" @submit="changeOil"  @modal-close="closeModal">
            <template #content>
                <form id="assignForm">
                    <div class="row">
                       
                        <div class="col-md-12">
                            <label class="form-label">Amount *</label>
                            <input type="text" v-model="oil.amount" class="form-control form-control-sm" placeholder="e.g 6000">
                            <p class="text-danger " v-if="o_error?.amount">{{ o_error?.amount[0] }} </p>
                        </div>
                        <div class="col-md-12">
                            <label class="form-label">Brand *</label>
                            <input type="text" v-model="oil.brand" class="form-control form-control-sm" placeholder="e.g Ammasco">
                            <p class="text-danger " v-if="o_error?.brand">{{ o_error?.brand[0] }} </p>
                        </div>
                        <div class="col-md-12">
                            <label class="form-label">Date *</label>
                            <input type="date" v-model="oil.date" class="form-control form-control-sm" >
                            <p class="text-danger " v-if="o_error?.date">{{ o_error?.date[0] }} </p>
                        </div>
                             
                    </div>
                </form>
            </template>
        </o-modal>

        <o-modal :isOpen="fuelModal" modal-class="modal-xs" title="Add Fuel" @submit="topFuel"  @modal-close="closeModal">
            <template #content>
                <form id="assignForm">
                    <div class="row">
                       
                        <div class="col-md-12">
                            <label class="form-label">Amount *</label>
                            <input type="text" v-model="fuel.amount" class="form-control form-control-sm" placeholder="e.g 6000">
                            <p class="text-danger " v-if="f_error?.amount">{{ f_error?.amount[0] }} </p>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Liters *</label>
                            <input type="number" step="0.1" v-model="fuel.liter" class="form-control form-control-sm" placeholder="e.g 30">
                            <p class="text-danger " v-if="f_error?.liter">{{ f_error?.liter[0] }} </p>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Date *</label>
                            <input type="date" v-model="fuel.date" class="form-control form-control-sm" placeholder="e.g 6000">
                            <p class="text-danger " v-if="f_error?.date">{{ f_error?.date[0] }} </p>
                        </div>
                        <div class="col-md-12">
                            <label class="form-label">Company *</label>
                            <input type="text" v-model="fuel.company" class="form-control form-control-sm" placeholder="e.g Ya-man">
                            <p class="text-danger " v-if="f_error?.company">{{ f_error?.company[0] }} </p>
                        </div>
                        <div class="col-md-12">
                            <label class="form-label">Purchased By</label>
                            <Select2 v-model="fuel.purcased_by" :options="userDrop" :settings="{ width: '100%' }"  />
                            <p class="text-danger " v-if="f_error?.purcased_by">{{ f_error?.purcased_by[0] }} </p>
                        </div>
                             
                    </div>
                </form>
            </template>
        </o-modal> -->
    </div>
</template>

<script setup>
import store from "@/store";
import { ref } from "vue";
import PaginationLinks from "@/components/PaginationLinks.vue";
// import Select2 from 'vue3-select2-component';

// import ItemRequestView from '@/views/inventory/ItemRequestView.vue';

// import WorkerForm from "@/components/forms/casual/WorkerForm.vue"
import OModal from "@/components/OModal.vue";
import { useRouter } from 'vue-router';

const router = useRouter()
let query = {}
router.push({ query: query })
// const user_pid = ref(null);

const vehicleModal = ref(false)

const tyreModal = ref(false)


const openVehicleModal = () => {
    vehicleModal.value = true;
};


const closeModal = () => {
    vehicleModal.value = false;
    tyreModal.value = false;
    // oilModal.value = false;
    // fuelModal.value = false;
};

const vehicle = ref({
    name:'' , 
    brand: '' , 
    plate_number: '' , 
    engine_number: '' , 
    color: '' ,
    driver: '' , 
    mileage : '' , 
    fuel_capacity : ''
})
const errors = ref({});

function addVehicle() {
    errors.value = []
    let form = document.querySelector('#toolForm');
    store.dispatch('postMethod', { url: '/add-vehicle', param: vehicle.value, form: form }).then((data) => {
        if (data.status == 422) {
            errors.value = data.data
        }else if(data?.status==201){
            loadVehicles()
        }
    })

}

const vehilceDetail = (data) =>{
    localStorage.setItem('TVATI_VEHICLE_DETAIL', JSON.stringify(data, null, 2))
    router.push({ path: 'vehicle-detail', query: { vehicle: data.pid } })
}
//  const addFuel = (pid) =>{
//      fuel.value.vehicle_pid = pid;
//      fuelModal.value = true
// }
// const fuelModal = ref(false)

// const fuel = ref({
//     vehicle_pid: '' ,
//     date : '' , 
//     amount : '' , 
//     liter : '' , 
//     company: '' , 
//     purcased_by : ''
// });

// const f_error = ref({})
// function topFuel() {
//     f_error.value = []
//     store.dispatch('postMethod', { url: '/add-fuel', param: fuel.value }).then((data) => {
//         if (data.status == 422) {
//             f_error.value = data.data
//         } else if (data.status == 201) {
//             let form = document.querySelector('#assignForm');
//             form.reset();
//         }
//     }) 

// }
// const oilModal = ref(false)
// const oil = ref({
//     'vehicle_pid': '' , 
//     'date' : '',
//     'amount' : '' ,
//     'brand' : ''
// })
// const changeOilModal = (pid) =>{
//     oil.value.vehicle_pid = pid
//     oilModal.value = true

// }
// const tyre = ref({
//     vehicle_pid: '',
//     side: '' ,
//     date_purchased: '' ,
//     date_manufactured: '' ,
//     expiring_date: '' ,
//     brand : '',
//     type: ''
// })
// const addType = (pid) => {
//     tyre.value.vehicle_pid = pid
//     tyreModal.value = true;
// }
const editVehicle = (data) =>{
    vehicle.value = {
        name: data.name ,
        brand: data.brand,
        plate_number: data.plate_number,
        engine_number: data.engine_number,
        color: data.color,
        driver: data?.driver?.pid,
        mileage: data.mileage,
        fuel_capacity: data.fuel_capacity ,
        pid: data.pid
    }
    vehicleModal.value = true;
}
// const deleteVehicle = (pid) =>{
//     if(confirm('are you sure you can to delete this ?')){
//         deleteVehicleRecord(pid)
//     }
// }

function deleteVehicleRecord(pid) {
    store.dispatch('deleteMethod', { url: '/delete-vehicle/'+pid }).then((data) => {
        if (data.status == 201) {
            loadVehicles()
        }
    }).catch(e => {
        console.log(e);
    })
}
// const t_error = ref({})
// function addTyre() {
//     store.commit('setSpinner', true)
//     t_error.value = []
//     store.dispatch('postMethod', { url: '/add-tyre', param: tyre.value }).then((data) => {
//         if (data.status == 422) {
//             t_error.value = data.data
//         } else if (data.status == 201) {
//             let form = document.querySelector('#assignForm');
//             form.reset();
//         }
//         store.commit('setSpinner', false)
//     }).catch(e => {
//         store.commit('setSpinner', false)
//         console.log(e);
//     })

// }

// const o_error = ref({})
// function changeOil() {
//     store.commit('setSpinner', true)
//     o_error.value = []
//     store.dispatch('postMethod', { url: '/change-oil', param: oil.value }).then((data) => {
//         if (data.status == 422) {
//             o_error.value = data.data
//         } else if (data.status == 201) {
//             let form = document.querySelector('#assignForm');
//             form.reset();
//         }
//         store.commit('setSpinner', false)
//     }).catch(e => {
//         store.commit('setSpinner', false)
//         console.log(e);
//     })

// }

const vehicles = ref({});

loadVehicles()
function loadVehicles() {
    store.dispatch('getMethod', { url: '/load-vehicles' }).then((data) => {
        store.commit('setSpinner', false)
        if (data.status == 200) {
            vehicles.value = data.data;
        }
    })
}



const userDrop = ref({});
function dropdownDept() {
    store.dispatch('loadDropdown', 'users').then(({ data }) => {
        userDrop.value = data;
    })
}
dropdownDept()

function nextPage(link) {
    if (!link.url || link.active) {
        return;
    }
    alert(link.url)
}


</script>

<style scoped></style>
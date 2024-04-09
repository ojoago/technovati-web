<template>
    <div>
        <!-- {{ staff }} -->
        <div class="container my-2">
            <div class="card">

                <div class="card-body">
                    <h3 class="h4">Vehicle: {{ vehicle.name }}, Plate Number: {{ vehicle.plate_number }}</h3>
                    <h3 class="h5">Color: {{ vehicle.color }}, Engine Number: {{ vehicle.engine_number }}</h3>
                    <h3 class="h5">Fuel Capacity: {{ vehicle.fuel_capacity }} Liters, Driver: {{
                        vehicle?.driver?.username.toUpperCase() }}
                    </h3>

                    <!-- {{ vehicle }} -->
                    <ul class="nav nav-tabs d-flex" id="myTabjustified" role="tablist">
                        <li class="nav-item flex-fill" role="presentation">
                            <button class="nav-link w-100 active" id="jorney-tab" data-bs-toggle="tab"
                                data-bs-target="#jorneyTab" type="button" role="tab" aria-controls="jorneyTab"
                                aria-selected="true">Journey</button>
                        </li>
                        <li class="nav-item flex-fill" role="presentation">
                            <button class="nav-link w-100 " id="tyre-tab" data-bs-toggle="tab" data-bs-target="#tyreTab"
                                type="button" role="tab" aria-controls="tyreTab" aria-selected="true">Tyres</button>
                        </li>
                        <li class="nav-item flex-fill" role="presentation">
                            <button class="nav-link w-100 " id="tyre-history" data-bs-toggle="tab"
                                data-bs-target="#tyreHistoryTab" type="button" role="tab" aria-controls="tyreHistoryTab"
                                aria-selected="true">Tyre Histories</button>
                        </li>

                        <li class="nav-item flex-fill" role="presentation">
                            <button class="nav-link w-100" id="fuel-history" data-bs-toggle="tab"
                                data-bs-target="#fuelHistory" type="button" role="tab" aria-controls="fuelHistory"
                                aria-selected="false">Fuel Histories</button>
                        </li>

                        <li class="nav-item flex-fill" role="presentation">
                            <button class="nav-link w-100" id="oil-history" data-bs-toggle="tab"
                                data-bs-target="#oilHistory" type="button" role="tab" aria-controls="oilHistory"
                                aria-selected="false">Oil Histories</button>
                        </li>

                    </ul>

                    <div class="tab-content pt-2">
                        <div class="tab-pane fade show active" id="jorneyTab" role="tabpanel"
                            aria-labelledby="worker-tab">
                            <Mileage />
                        </div>

                        <div class="tab-pane fade" id="tyreTab" role="tabpanel" aria-labelledby="worker-tab">

                            <Tyre/>
                        </div>

                        <div class="tab-pane fade" id="tyreHistoryTab" role="tabpanel" aria-labelledby="worker-tab">
                            <div class="table-responsive" v-if="detail?.tyre_history">
                                <table class="table-hover table-stripped table-bordered table">
                                    <thead>
                                        <tr>
                                            <th>SN</th>
                                            <th>Side </th>
                                            <th>Brand</th>
                                            <th>date purchased</th>
                                            <th>date manufactured</th>
                                            <th>expiring date</th>
                                            <th>Date Change</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, loop) in detail?.tyre_history" :key="loop">
                                            <td>{{ loop + 1 }}</td>
                                            <td>{{ item.side }}</td>
                                            <td>{{ item.brand }} </td>
                                            <td>{{ item.date_purchased }} </td>
                                            <td>{{ item.date_manufactured }} </td>
                                            <td>{{ item.expiring_date }} </td>
                                            <td>{{ item.created_at }} </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div v-else class="text-center text-uppercase">No Record Yet</div>
                        </div>

                        <div class="tab-pane fade" id="fuelHistory" role="tabpanel" aria-labelledby="worker-tab">
                            <div class="table-responsive" v-if="detail?.fuel_history">
                                <table class="table-hover table-stripped table-bordered table">
                                    <thead>
                                        <tr>
                                            <th>SN</th>
                                            <th>Date </th>
                                            <th>amount</th>
                                            <th>Company</th>
                                            <th>liters</th>
                                            <!-- <th>Date Change</th> -->
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, loop) in detail?.fuel_history" :key="loop">
                                            <td>{{ loop + 1 }}</td>
                                            <td>{{ item.date }}</td>
                                            <td>{{ item.amount }} </td>
                                            <td>{{ item.company }} </td>
                                            <td>{{ item.liter }} </td>
                                            <!-- <td>{{ item.brand }} </td> -->
                                            <!-- <td>{{ item.created_at }} </td> -->

                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div v-else class="text-center text-uppercase">No Record Yet</div>

                        </div>
                        <div class="tab-pane fade" id="oilHistory" role="tabpanel" aria-labelledby="worker-tab">

                            <div class="table-responsive" v-if="detail?.oil_history">
                                <table class="table-hover table-stripped table-bordered table">
                                    <thead>
                                        <tr>
                                            <th>SN</th>
                                            <th>date </th>
                                            <th>amount</th>
                                            <th>Brand</th>
                                            <!-- <th>Date Recorded</th> -->
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, loop) in detail?.oil_history" :key="loop">
                                            <td>{{ loop + 1 }}</td>
                                            <td>{{ item.date }}</td>
                                            <td>{{ item.amount }} </td>
                                            <td>{{ item.brand }} </td>
                                            <!-- <td>{{ item.created_at }} </td> -->
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div v-else class="text-center text-uppercase">No Record Yet</div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <o-modal :isOpen="tyreModal" modal-class="modal-lg" title="Add Tyre to Vehicle" @submit="addTyre"
            @modal-close="closeModal">
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
                            <input type="text" v-model="tyre.brand" class="form-control form-control-sm"
                                placeholder="Mechelin">
                            <p class="text-danger " v-if="t_error?.brand">{{ t_error?.brand[0] }} </p>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Type *</label>
                            <input type="text" v-model="tyre.type" class="form-control form-control-sm"
                                placeholder="Enter type">
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
                            <p class="text-danger " v-if="t_error?.date_manufactured">{{ t_error?.date_manufactured[0]
                                }} </p>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Expiring Date *</label>
                            <input type="date" v-model="tyre.expiring_date" class="form-control form-control-sm">
                            <p class="text-danger " v-if="t_error?.expiring_date">{{ t_error?.expiring_date[0] }} </p>
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
import Mileage from '@/components/vehicles/MileageComponent.vue'
import Tyre from '@/components/vehicles/TyreComponent.vue'
const vehicle = ref({});
const detail = ref({});
// const staff_pid = ref(null);


onMounted(() => {
    vehicle.value = localStorage.getItem('TVATI_VEHICLE_DETAIL') ? JSON.parse(localStorage.getItem('TVATI_VEHICLE_DETAIL')) : 'null'
    console.log(vehicle);
    if (vehicle.value != 'null') {
        loadVehicleDetails(vehicle.value.pid)
    }
});


const tyres = ref({}) 
const tyre_history = ref({})
const oil_history = ref({})
const fuel_history = ref({})
const mileage = ref({})
function loadVehicleDetails(pid) {
    store.dispatch('getMethod', { url: '/load-vehicle-details/' + pid }).then(({ data }) => {
        detail.value = data;
        tyres.value = data.tyres
        tyre_history.value = data.tyre_history
        oil_history.value = data.oil_history
        fuel_history.value = data.fuel_history
        mileage.value = data.mileage
    })
}



</script>

<style scoped>
body {
    margin: 20px 160px;
}

.flex-container,
.flex-row {
    display: flex;
    justify-content: space-between;
}

.text-content {
    flex-basis: 60%;
    text-align: center;
}

.text-content>.h4,
.text-content>.h3 {
    margin-bottom: 1px;
}

.text-content>p {
    margin: 1px;
    font-size: small;
}

.logo-image {
    width: 100px !important;
    border-radius: 15px;
}

.logo-image>img {
    width: 100%;
}

.flex-row {
    /* height: 200px; */
    justify-content: space-between;
}

.personal-detail,
.flex-col {
    flex-basis: 40%;
    margin: 3px;
    /* justify-content: space-between; */
}

.student-img {
    flex-basis: 15%;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    border: 1px solid #000;
    max-height: 200px;
}

.student-img>img {
    width: 100%;
    height: 100%;
}
</style>
<template>
    <div>
        <!-- {{ staff }} -->
        <div class="container my-2">
            <div class="card">

                <div class="card-body">
                    <h3 class="h6">Vehicle: {{ vehicle.name }}, Plate Number: {{ vehicle.plate_number }}</h3>
                    <h3 class="h6">Color: {{ vehicle.color }}, Engine Number: {{ vehicle.engine_number }}</h3>
                    <h3 class="h6">Fuel Capacity: {{ vehicle.fuel_capacity }}, Fuel Level: {{ vehicle?.fuel_level }}  </h3>
                    <h3 class="h6">Driver: {{ vehicle?.driver?.username.toUpperCase() }}  </h3>

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

                            <Tyre />
                        </div>

                        <div class="tab-pane fade" id="tyreHistoryTab" role="tabpanel" aria-labelledby="worker-tab">
                            <TyreHistory />
                        </div>

                        <div class="tab-pane fade" id="fuelHistory" role="tabpanel" aria-labelledby="worker-tab">
                            <FuelHistory />

                        </div>
                        <div class="tab-pane fade" id="oilHistory" role="tabpanel" aria-labelledby="worker-tab">
                            <OilHistory/>

                        </div>

                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
// import store from "@/store";
import { onMounted, ref } from "vue";
// import { useRoute, useRouter } from 'vue-router';
import Mileage from '@/components/vehicles/MileageComponent.vue'
import Tyre from '@/components/vehicles/TyreComponent.vue'
import TyreHistory from '@/components/vehicles/TyreHistoryComponent.vue'
import FuelHistory from '@/components/vehicles/FuelHistoryComponent.vue'
import OilHistory from '@/components/vehicles/OilHistoryComponent.vue'
const vehicle = ref({});
// const detail = ref({});
// const staff_pid = ref(null);


onMounted(() => {
    vehicle.value = localStorage.getItem('TVATI_VEHICLE_DETAIL') ? JSON.parse(localStorage.getItem('TVATI_VEHICLE_DETAIL')) : 'null'
    // if (vehicle.value != 'null') {
    //     loadVehicleDetails(vehicle.value.pid)
    // }
});

// function loadVehicleDetails(pid) {
//     store.dispatch('getMethod', { url: '/load-vehicle-details/' + pid }).then(({ data }) => {
//         detail.value = data;     
//     })
// }



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
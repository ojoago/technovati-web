<template>
    <div>
        <!-- {{ staff }} -->
        <div class="container my-2">
            <div class="card">
                
                <div class="card-body">
                    {{ vehicle }}

                    <ul class="nav nav-tabs d-flex" id="myTabjustified" role="tablist">
                        <li class="nav-item flex-fill" role="presentation">
                            <button class="nav-link w-100 active" id="jorney-tab" data-bs-toggle="tab" data-bs-target="#jorneyTab" type="button" role="tab" aria-controls="jorneyTab" aria-selected="true">jorney</button>
                        </li>
                        <li class="nav-item flex-fill" role="presentation">
                            <button class="nav-link w-100 " id="tyre-tab" data-bs-toggle="tab" data-bs-target="#tyreTab" type="button" role="tab" aria-controls="tyreTab" aria-selected="true">Tyres</button>
                        </li>
                        <li class="nav-item flex-fill" role="presentation">
                            <button class="nav-link w-100 " id="tyre-history" data-bs-toggle="tab" data-bs-target="#tyreHistoryTab" type="button" role="tab" aria-controls="tyreHistoryTab" aria-selected="true">Tyre Histories</button>
                        </li>

                        <li class="nav-item flex-fill" role="presentation">
                            <button class="nav-link w-100" id="fuel-history" data-bs-toggle="tab" data-bs-target="#fuelHistory" type="button" role="tab" aria-controls="fuelHistory" aria-selected="false">Fuel Histories</button>
                        </li>

                        <li class="nav-item flex-fill" role="presentation">
                            <button class="nav-link w-100" id="oil-history" data-bs-toggle="tab" data-bs-target="#oilHistory" type="button" role="tab" aria-controls="oilHistory" aria-selected="false">Oil Histories</button>
                        </li>

                    </ul>

                    <div class="tab-content pt-2">
                        <div class="tab-pane fade show active" id="jorneyTab" role="tabpanel" aria-labelledby="worker-tab">
                            1
                        </div>

                        <div class="tab-pane fade" id="tyreTab" role="tabpanel" aria-labelledby="worker-tab">
                            <div class="table-responsive">
                                <table class="table-hover table-stripped table-bordered table">
                                    <thead>
                                        <tr>
                                            <th>SN</th>
                                            <th>Side </th>
                                            <th>Brand</th>
                                            <th>date purchased</th>
                                            <th>date manufactured</th>
                                            <th>expiring date</th>
                                            <!-- <th>brand</th> -->
                                            <th>type</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, loop) in detail?.tyres" :key="loop">
                                            <td>{{ loop + 1 }}</td>
                                            <td>{{ item.side }}</td>
                                            <td>{{ item.brand }} </td>
                                            <td>{{ item.date_purchased }} </td>
                                            <td>{{ item.date_manufactured }} </td>
                                            <td>{{ item.expiring_date }} </td>
                                            <td>{{ item?.type }} </td>
                                    
                                        </tr>
                                    </tbody>
                                </table>
                           
                        </div>
                        </div>

                        <div class="tab-pane fade" id="tyreHistoryTab" role="tabpanel" aria-labelledby="worker-tab">
                            <div class="table-responsive">
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
                        </div>

                        <div class="tab-pane fade" id="fuelHistory" role="tabpanel" aria-labelledby="worker-tab">
                            <div class="table-responsive">
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
                                
                        </div>
                        <div class="tab-pane fade" id="oilHistory" role="tabpanel" aria-labelledby="worker-tab">
                            
                                 <div class="table-responsive">
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
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import store from "@/store";
import { onMounted, ref } from "vue";
// import { useRoute, useRouter } from 'vue-router';

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


function loadVehicleDetails(pid) {
    store.dispatch('getMethod', { url: '/load-vehicle-details/' + pid }).then(({ data }) => {
        detail.value = data;
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
<template>
    <div>
        <div class="container mt-2">
            <div class="card">
                <div class="card-body">
                    <div class="card-header">Company Drivers</div>
                    <ul class="nav nav-tabs d-flex" id="myTabjustified" role="tablist">
                        <li class="nav-item flex-fill" role="presentation">
                            <button class="nav-link w-100 active" id="worker-tab" data-bs-toggle="tab"
                                data-bs-target="#worker" type="button" role="tab" aria-controls="worker"
                                aria-selected="true">Drivers</button>
                        </li>
                        <li class="nav-item flex-fill" role="presentation">
                            <button class="nav-link w-100" id="casual-tab" data-bs-toggle="tab" data-bs-target="#casual"
                                type="button" role="tab" aria-controls="casual" aria-selected="false">Vehicle Assigned History</button>
                        </li>

                    </ul>
                    <div class="tab-content pt-2" id="myTabjustifiedContent">
                        <div class="tab-pane fade show active" id="worker" role="tabpanel" aria-labelledby="worker-tab">
                            <button class="btn btn-primary btn-sm m-2" @click="openModal">Add New</button>

                            <div class="table-responsive">
                                        <table class="table-hover table-stripped table-bordered table">
                                            <thead>
                                                <tr>
                                                    <th>SN</th>
                                                    <th>Username</th>
                                                    <th>Phone Number</th>
                                                    <th>Email</th>
                                                    <th>Vehicle</th>
                                                    <th>Color</th>
                                                    <th>plate number</th>
                                                    <th> <i class="bi bi-gear-fill"></i> </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(data, loop) in drivers.data" :key="loop">
                                                    <td>{{ loop + 1 }}</td>
                                                    <td>{{  data?.user?.username }}</td>
                                                    <td>{{  data?.user?.gsm  }}</td>
                                                    <td>{{  data?.user?.email }}</td>
                                                    <td>{{ data?.vehicle?.name }}</td>
                                                    <td>{{ data?.vehicle?.color }}</td>
                                                    <td>{{ data?.vehicle?.plate_number }}</td>
                                                    <td>
                                                        <button class="btn btn-sm btn-primary" @click="assignVehicleModal(data.user_pid)">Asign Vehicle</button>
                                                        <!-- <div class="dropdown">
                                                            <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                                                data-bs-toggle="dropdown">
                                                                <i class="bi bi-tools"></i>
                                                            </button>
                                                            <ul class="dropdown-menu">
                                                                <li v-if="data?.team"><a class="bg-warning dropdown-item pointer" @click="deAssignTeamModal(data.pid)">Remove from Team</a> </li>
                                                            </ul>
                                                        </div> -->
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div class="flex justify-center mt-4">
                                            <nav class="relative justify-center rounded-md shadow pagination">
                                                <pagination-links v-for="(link, i) of drivers.links" :link="link" :key="i"
                                                    @next="nextPage(link)"></pagination-links>
                                            </nav>
                                        </div>
                                    </div>
                        </div>
                        <div class="tab-pane fade" id="casual" role="tabpanel" aria-labelledby="casual-tab">
                            <div class="table-responsive">
                                        <table class="table-hover table-stripped table-bordered table">
                                            <thead>
                                                <tr>
                                                    <th>SN</th>
                                                    <th>Username</th>
                                                    <th>Phone Number</th>
                                                    <th>Email</th>
                                                    <th>Vehicle</th>
                                                    <th>Color</th>
                                                    <th>plate number</th>
                                                    <th>Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(data, loop) in history.data" :key="loop">
                                                    <td>{{ loop + 1 }}</td>
                                                    <td>{{  data?.user?.username }}</td>
                                                    <td>{{  data?.user?.gsm  }}</td>
                                                    <td>{{  data?.user?.email }}</td>
                                                    <td>{{ data?.vehicle?.name }}</td>
                                                    <td>{{ data?.vehicle?.color }}</td>
                                                    <td>{{ data?.vehicle?.plate_number }}</td>
                                                    <td>{{ data?.created_at }}</td>
                                                    
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div class="flex justify-center mt-4">
                                            <nav class="relative justify-center rounded-md shadow pagination">
                                                <pagination-links v-for="(link, i) of history.links" :link="link" :key="i"
                                                    @next="nextHPage(link)"></pagination-links>
                                            </nav>
                                        </div>
                                    </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <o-modal :isOpen="driverModal" modal-class="modal-xs" title="Add Driver" @submit="addDriver" @modal-close="closeModal" >
                    <template #content>
                        <form id="teamForm">
                            <div class="row">

                                <div class="col-md-12">
                                    <label class="form-label">Staff</label>
                                    <Select2 v-model="driver.user_pid" :options="userDrop"  />
                                    <p class="text-danger " v-if="errors?.user_pid">{{ errors?.user_pid[0] }} </p>
                                </div>
                                <div class="col-md-12">
                                    <label class="form-label">Vehicle</label>
                                    <Select2 v-model="driver.vehicle_pid" :options="vehicleDrop"  />
                                    <p class="text-danger " v-if="errors?.vehicle_pid">{{ errors?.vehicle_pid[0] }} </p>
                                </div>
                            </div>
                        </form>
                    </template>
            </o-modal>
    </div>
</template>

<script setup>
import Select2 from 'vue3-select2-component';
import store from "@/store";
import { ref } from "vue";
import OModal from "@/components/OModal.vue";


const closeModal = () => {
    driverModal.value = false;
    resetAttr()

};
const driverModal = ref(false)
const openModal = () => {
    driverModal.value = true;
    resetAttr()
}

const driver = ref({
    user_pid:'',
    vehicle_pid:''
})

const resetAttr = () => {
    driver.value = {
        user_pid:'',
        vehicle_pid:''
    }
}

const assignVehicleModal = (pid) => {
    driver.value.user_pid = pid
    driverModal.value = true;
}
const errors = ref({});

function addDriver() {
    errors.value = []
    store.dispatch('postMethod', { url: '/add-driver', param: driver.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data
        }else if(data.status ==201){
            resetAttr()
            loadDrivers()
        }
    }).catch(e => {
        console.log(e);
    })

}

const drivers = ref({});

loadDrivers()
function loadDrivers() {
    store.dispatch('getMethod', { url: '/load-drivers' }).then((data) => {
        if (data?.status == 200) {
            drivers.value = data.data;
        }
    }).catch(e => {
        console.log(e);
    })
}


loadDrivers()

const history = ref({})
loadDriverHistory()
function loadDriverHistory() {
    store.dispatch('getMethod', { url: '/load-driver-histories' }).then((data) => {
        if (data?.status == 200) {
            alert()
            history.value = data.data;
        }
    }).catch(e => {
        console.log(e);
    })
}


const userDrop = ref({});
function dropDownTeam() {
    store.dispatch('loadDropdown', 'users').then(({ data }) => {
        userDrop.value = data;
    }).catch(e => {
        console.log(e);
    })
}
dropDownTeam()


const vehicleDrop = ref({});
function dropdownDept() {
    store.dispatch('loadDropdown', 'vehicle').then(({ data }) => {
        vehicleDrop.value = data;
    }).catch(e => {
        console.log(e);
    })
}
dropdownDept()



</script>

<style scoped></style>
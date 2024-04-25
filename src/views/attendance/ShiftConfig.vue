<template>
    <div>
        <div class="container-fluid mt-2 mb-2">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Manage Shifts </h5>

                    <!-- Default Tabs -->
                    <ul class="nav nav-tabs d-flex" id="myTabjustified" role="tablist">
                        <li class="nav-item flex-fill" role="presentation">
                            <button class="nav-link w-100 active" id="shifts-tab" data-bs-toggle="tab"
                                data-bs-target="#shifts" type="button" role="tab" aria-controls="shifts"
                                aria-selected="true">Shift</button>
                        </li>
                        <li class="nav-item flex-fill" role="presentation">
                            <button class="nav-link w-100" id="shift-allocation-tab" data-bs-toggle="tab"
                                data-bs-target="#shift-allocation" type="button" role="tab"
                                aria-controls="shift-allocation" aria-selected="false">Shift Allocation</button>
                        </li>

                        <li class="nav-item flex-fill" role="presentation">
                            <button class="nav-link w-100" id="shift-holiday-tab" data-bs-toggle="tab"
                                data-bs-target="#shift-holiday" type="button" role="tab" aria-controls="shift-holiday"
                                aria-selected="false">Shift Holidays</button>
                        </li>
                    </ul>
                    <div class="tab-content pt-2" id="myTabjustifiedContent">
                        <div class="tab-pane fade show active" id="shifts" role="tabpanel" aria-labelledby="shifts-tab">
                            <fieldset class="border rounded-3 p-2 m-1">
                                <legend class="float-none w-auto px-2">Shifts</legend>
                                <button class="btn btn-sm btn-primary m-2" @click="openModal">Add Shift</button>

                                <div class="table-responsive">
                                    <table class="table-hover table-stripped table-bordered table">
                                        <thead>
                                            <tr>
                                                <th>SN</th>
                                                <th>shift</th>
                                                <th>Office Start</th>
                                                <th>Office Close</th>
                                                <th>clock in start</th>
                                                <th>shift start</th>
                                                <th>shift end</th>
                                                <th>shift days</th>
                                                <th>working days</th>
                                                <th>late</th>
                                                <th> <i class="bi bi-gear-fill"></i> </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(data, loop) in shifts?.data" :key="loop">
                                                <td>{{ loop + 1 }}</td>
                                                <td>{{ data.shift }}</td>
                                                <td>{{ data.begin_clock }}</td>
                                                <td>{{ data.end_clock }}</td>
                                                <td>{{ data.clock_in_start }}</td>
                                                <td>{{ data.shift_start }}</td>
                                                <td>{{ data.shift_end }}</td>
                                                <td>{{ data.shift_days }}</td>
                                                <td>{{ data.working_days }}</td>
                                                <td>{{ data.late }}</td>
                                                <td>
                                                    <div class="dropdown">
                                                        <button type="button"
                                                            class="btn btn-primary btn-sm dropdown-toggle"
                                                            data-bs-toggle="dropdown">
                                                            <i class="bi bi-tools"></i>
                                                        </button>
                                                        <ul class="dropdown-menu">
                                                            <li><a class="bg-info dropdown-item pointer"
                                                                    @click="shiftDtail(data)">Details </a> </li>
                                                            <li><a class="bg-warning dropdown-item pointer"
                                                                    @click="editShift(data)">Edit </a> </li>
                                                            <li><a class="bg-danger dropdown-item pointer"
                                                                    @click="deleteShift(data.pid)">Delete</a> </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                            </fieldset>

                        </div>
                        <div class="tab-pane fade" id="shift-allocation" role="tabpanel"
                            aria-labelledby="shift-allocation-tab">
                            <fieldset class="border rounded-3 p-2 m-1">
                                <legend class="float-none w-auto px-2">Shift Allocation</legend>
                                <button class="btn btn-sm btn-primary m-2" @click="openAlloModal">Allocate</button>

                                <fieldset class="border rounded-3 p-2 m-1" v-for="(object, loop) in allocations"
                                    :key="loop">
                                    <legend class="float-none w-auto px-2 h5"> {{ object.shift.toUpperCase() }}</legend>
                                    <fieldset class="border rounded-3 ">
                                        <span v-for="(key, l) in object.staff" :key="l"
                                            class="badge bg-dark p-1 m-1 ellipsis">
                                            {{ key.toUpperCase() }}
                                        </span>

                                    </fieldset>
                                </fieldset>


                            </fieldset>
                        </div>

                        <div class="tab-pane fade" id="shift-holiday" role="tabpanel"
                            aria-labelledby="shift-holiday-tab">
                            <HolidayView />
                        </div>
                    </div>
                    <!-- End  Tabs -->

                </div>
            </div>

        </div>
        <o-modal :isOpen="toggleModal" modal-class="modal-lg" title="Create Shift" @submit="createShift"
            @modal-close="closeModal">
            <template #content>
                <form>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Shift <span class="text-danger">*</span></label>
                                <input type="text" v-model="shift.shift" class="form-control"
                                    placeholder="e.g morning shift">
                                <p class="text-danger " v-if="errors?.shift">{{ errors?.shift[0] }}</p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">shift Start <span class="text-danger">*</span></label>
                                <input type="date" v-model="shift.shift_start" class="form-control">
                                <p class="text-danger " v-if="errors?.shift_start">{{ errors?.shift_start[0] }}</p>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">End of shift <span class="text-danger">*</span></label>
                                <input type="date" v-model="shift.shift_end" class="form-control">
                                <p class="text-danger " v-if="errors?.shift_end">{{ errors?.shift_end[0] }}
                                </p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Work Starts</label>
                                <input type="time" v-model="shift.begin_clock" class="form-control">
                                <p class="text-danger " v-if="errors?.begin_clock">{{ errors?.begin_clock[0] }}</p>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Work ends<span class="text-danger">*</span></label>
                                <input type="time" v-model="shift.end_clock" class="form-control">
                                <p class="text-danger " v-if="errors?.end_clock">{{ errors?.end_clock[0] }}</p>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">clocking Start </label>
                                <input type="time" v-model="shift.clock_in_start" class="form-control">
                                <p class="text-danger " v-if="errors?.clock_in_start">{{ errors?.clock_in_start[0] }}
                                </p>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Late Start<span class="text-danger">*</span></label>
                                <input type="time" v-model="shift.late" class="form-control">
                                <p class="text-danger " v-if="errors?.late">{{ errors?.late[0] }}</p>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="form-label">Working Days <span class="text-danger">*</span></label>
                                <input type="text" v-model="shift.working_days" class="form-control"
                                    placeholder="e.g Sanusi ">
                                <p class="text-danger " v-if="errors?.working_days">{{ errors?.working_days[0] }}
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </template>

        </o-modal>

        <o-modal :isOpen="alloModal" modal-class="modal-xs" title="Allocate Shift" @submit="allocateShift"
            @modal-close="closeModal">
            <template #content>
                <form>
                    <div class="row">
                        <div class="col-md-12 mt-3">
                            <label for="">Shifts</label>
                            <div class="form-group">
                                <select class="form-control" v-model="allocation.shift_pid">
                                    <option value="" selected>Select Shift</option>
                                    <option v-for="sec in shiftDrop" :key="sec.pid" :value="sec.pid">{{ sec.shift }}
                                    </option>
                                </select>
                                <p class="text-danger " v-if="alo_errors?.shift_pid">{{ alo_errors?.shift_pid[0] }}</p>
                            </div>
                        </div>

                        <div class="col-md-12 mt-3">
                            <label for="">Category</label>
                            <div class="form-group">
                                <select class="form-control" v-model="allocation.category">
                                    <option value="" selected>Select Option</option>
                                    <option value="1">All Staff</option>
                                    <option value="2">Department</option>
                                    <option value="3">Individual</option>
                                </select>
                                <p class="text-danger " v-if="alo_errors?.category">{{ alo_errors?.category[0] }}</p>
                            </div>
                        </div>
                        <div class="col-md-12 mt-3" v-if="allocation.category == 3">
                            <label for="">Staff</label>
                            <div class="form-group">
                                <div>
                                    <Multiselect v-model="allocation.staff" :options="userDrop" :multiple="true"
                                        :close-on-select="true" placeholder="Pick Staff" label="text" track-by="id" />
                                </div>
                                <p class="text-danger " v-if="alo_errors?.staff">{{ alo_errors?.staff[0] }}</p>
                            </div>
                        </div>
                        <div class="col-md-12 mt-3" v-if="allocation.category == 2">
                            <label for="">Departments</label>
                            <div class="form-group">

                                <div>
                                    <Multiselect v-model="allocation.departments" :options="deptDrop" :multiple="true"
                                        :close-on-select="true" placeholder="Pick Department" label="text"
                                        track-by="id" />
                                </div>
                                <p class="text-danger " v-if="alo_errors?.departments">{{ alo_errors?.departments[0] }}
                                </p>
                            </div>
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
import { useRouter } from 'vue-router';
import { Multiselect } from 'vue-multiselect';
import OModal from "@/components/OModal.vue";
import HolidayView from '@/components/shift/HolidayView.vue'
const router = useRouter()
let query = {}
router.push({ query: query })


const toggleModal = ref(false)
const openModal = () => {
    toggleModal.value = true;
};
const alloModal = ref(false)
const openAlloModal = () => {
    alloModal.value = true;
};



const closeModal = () => {
    toggleModal.value = false;
    alloModal.value = false;
};

const errors = ref({});
const alo_errors = ref({});
const shifts = ref({});
const shift = ref({
    shift : '' ,
    begin_clock : '' ,
    clock_in_start : '' ,
    end_clock : '' ,
    shift_start : '' ,
    shift_end : '' ,
    shift_days : '' ,
    working_days : '' ,
    late : ''
});


const editShift = (data) => {
    shift.value = {
        shift: data.shift ,
        begin_clock: data.begin_clock ,
        clock_in_start: data.clock_in_start ,
        end_clock: data.end_clock ,
        shift_start: data.shift_start ,
        shift_end: data.shift_end ,
        shift_days: data.shift_days ,
        working_days: data.working_days ,
        late: data.late ,
        pid: data.pid
    }
    toggleModal.value = true
}
const shiftDtail = (data) => {
    console.log(data);
}
const deleteShift = (pid) => {
    alert(pid)
}

const allocation = ref({
    shift_pid : '' ,
    staff : '' ,
    departments : '' ,
    category: '' ,
});

// .
function createShift() {
    errors.value = []
    store.dispatch('postMethod', { url: '/create-shift', param: shift.value }).then((data) => {
        if (data.status == 422) {
            errors.value = data.data
        } else if (data.status == 201) {
            shift.value = [];
        }
    })
}


// const toggleEvent = (event) => {
//     let option = event.target.value;
//     alert(option)
// }

function loadShifts() {
    store.dispatch('getMethod', { url: '/load-shifts' }).then((data) => {
        if (data.status == 200) {
            shifts.value = data.data
        } 
    })
}

const allocations = ref({});

function loadShiftAllocation() {
    store.dispatch('getMethod', { url: '/load-shift-allocation' }).then((data) => {
        if (data.status == 200) {
            allocations.value = data.data
        } 
    })
}

loadShifts()

function allocateShift() {
    alo_errors.value = []
    store.dispatch('postMethod', { url: '/allocate-shift', param: allocation.value }).then((data) => {
        if (data.status == 422) {
            alo_errors.value = data.data
        } else if (data.status == 201) {
            shift.value = [];
        }
    })
}



const shiftDrop = ref({});
function dropdownShifts() {
    store.dispatch('loadDropdown', 'shifts').then(({ data }) => {
        shiftDrop.value = data;
    })
}
dropdownShifts()
const userDrop = ref([]);
function dropdownUser() {
    store.dispatch('loadDropdown', 'users').then(({ data }) => {
        userDrop.value = data;
    })
}
dropdownUser()
const deptDrop = ref([]);
function dropdownDeptDrop() {
    store.dispatch('loadDropdown', 'departments').then(({ data }) => {
        deptDrop.value = data;
    })
}
dropdownDeptDrop()
onMounted(() => {
    // currentTab()
    let allocationTab = document.querySelector('#shift-allocation-tab');
    allocationTab.addEventListener('click', () => {
        loadShiftAllocation()
    })

    // let holidayTab = document.querySelector('#shift-holiday-tab');

    // holidayTab.addEventListener('click', () => {
    //     loadShiftHolidays()
    // })
    
})

</script>

<style scoped></style>
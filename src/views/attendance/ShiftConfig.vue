<template>
    <div>
        <div class="container-fluid mt-2">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Shifts</h5>

                    <!-- Default Tabs -->
                    <ul class="nav nav-tabs d-flex" id="myTabjustified" role="tablist">
                        <li class="nav-item flex-fill" role="presentation">
                            <button class="nav-link w-100 active" id="shifts-tab" data-bs-toggle="tab"
                                data-bs-target="#shifts" type="button" role="tab" aria-controls="shifts"
                                aria-selected="true">Shift</button>
                        </li>
                        <li class="nav-item flex-fill" role="presentation">
                            <button class="nav-link w-100" id="shift-allocation-tab" data-bs-toggle="tab" data-bs-target="#shift-allocation"
                                type="button" role="tab" aria-controls="shift-allocation" aria-selected="false">Shift Allocation</button>
                        </li>
                      
                        <li class="nav-item flex-fill" role="presentation">
                            <button class="nav-link w-100" id="shift-holiday-tab" data-bs-toggle="tab" data-bs-target="#shift-holiday"
                                type="button" role="tab" aria-controls="shift-holiday" aria-selected="false">shift-holiday Details</button>
                        </li>
                    </ul>
                    <div class="tab-content pt-2" id="myTabjustifiedContent">
                        <div class="tab-pane fade show active" id="shifts" role="tabpanel" aria-labelledby="shifts-tab">
                            <fieldset class="border rounded-3 p-2 m-1">
                                <legend class="float-none w-auto px-2">Persoanl Information</legend>
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
                                                    <label class="form-label">End of shift <span
                                                            class="text-danger">*</span></label>
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
                                                <p class="text-danger " v-if="errors?.clock_in_start">{{ errors?.clock_in_start[0] }}</p>
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
                                                <label class="form-label">Working Days <span
                                                        class="text-danger">*</span></label>
                                                <input type="text" v-model="shift.working_days" class="form-control"
                                                    placeholder="e.g Sanusi ">
                                                <p class="text-danger " v-if="errors?.working_days">{{ errors?.working_days[0] }}
                                                </p>
                                            </div>
                                        </div>
        
                                       
                                    </div>

                                    <button type="button" class="btn btn-success btn-sm mt-2"
                                        @click="createShift">Submit</button>
                                </form>

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
                                                <th> <i class="bi bi-pencil-fill"></i> </th>
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
                                                        <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                                            data-bs-toggle="dropdown">
                                                            <i class="bi bi-tools"></i>
                                                        </button>
                                                        <ul class="dropdown-menu">
                                                            <li class="bg-warning"><a class="dropdown-item pointer"
                                                                    @click="editShift(data)">Edit</a> </li>
                                                            <li class="bg-danger"><a class="dropdown-item pointer"
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
                        <div class="tab-pane fade" id="shift-allocation" role="tabpanel" aria-labelledby="shift-allocation-tab">
                            <fieldset class="border rounded-3 p-2 m-1">
                                <legend class="float-none w-auto px-2">shift-allocation Of Kin</legend>
                                <form>
                                    <div class="row">

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <select class="form-control"  v-model="allocation.shift_pid">
                                                    <option value="" selected>Select Shift</option>
                                                    <option v-for="sec in shiftDrop" :key="sec.pid" :value="sec.pid">{{ sec.shift }}</option>
                                                </select>
                                                <p class="text-danger " v-if="alo_errors?.shift_pid">{{ alo_errors?.shift_pid[0] }}</p>
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <select class="form-control"  @change="toggleEvent($event)">
                                                    <option value="" selected>Select Option</option>
                                                    <option value="1">All Staff</option>
                                                    <option value="2">Department</option>
                                                    <option value="3">Individual</option>
                                                   
                                                </select>
                                                <p class="text-danger " v-if="alo_errors?.shift_pid">{{ alo_errors?.shift_pid[0] }}</p>
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <select class="form-control"  v-model="allocation.user_pid">
                                                    <option value="" selected>Select Staff</option>
                                                    <option v-for="user in userDrop" :key="user.pid" :value="user.pid">{{ user.username }}</option>
                                                </select>
                                                <p class="text-danger " v-if="alo_errors?.user_pid">{{ alo_errors?.user_pid[0] }}</p>
                                            </div>
                                        </div>
                                       
                                    </div>

                                    <button type="button" class="btn btn-success btn-sm mt-2"
                                        @click="allocateShift">Submit</button>
                                </form>
                            </fieldset>
                        </div>

                        <div class="tab-pane fade" id="shift-holiday" role="tabpanel" aria-labelledby="shift-holiday-tab">
                            <fieldset class="border rounded-3 p-2 m-1">
                                <legend class="float-none w-auto px-2">shift holiday</legend>
                                <form>
                                    <div class="row">
                                         <div class="col-md-4">
                                                <div class="form-group">
                                                    <select class="form-control"  v-model="allocation.shift_pid">
                                                        <option value="" selected>Select Shift</option>
                                                        <option v-for="sec in shiftDrop" :key="sec.pid" :value="sec.pid">{{ sec.shift }}</option>
                                                    </select>
                                                    <p class="text-danger " v-if="alo_errors?.shift_pid">{{ alo_errors?.shift_pid[0] }}</p>
                                                </div>
                                            </div>
                                        
                                       
                                    </div>
                                   

                                    <button type="button" class="btn btn-success btn-sm mt-2" @click="markShiftHoliday">Submit</button>
                                </form>
                            </fieldset>
                        </div>
                    </div>
                    <!-- End  Tabs -->

                </div>
            </div>

        </div>
    </div>
</template>

<script setup>

import store from "@/store";
import { onMounted, ref } from "vue";
import { useRouter } from 'vue-router';
const router = useRouter()
let query = {}
router.push({ query: query })
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
}
const deleteShift = (pid) => {
    alert(pid)
}

const allocation = ref({
   shift_pid : '' ,
    user_pid : ''
});

const b_errors = ref({});
const holiday = ref({
    allocated_pid : '' ,
    user_pid : '' ,
    days : '' ,
    date : '' ,
});

// .
function createShift() {
    store.commit('setSpinner', true)
    errors.value = []
    store.dispatch('postMethod', { url: '/create-shift', param: shift.value }).then((data) => {
        if (data.status == 422) {
            errors.value = data.data
        } else if (data.status == 201) {
            shift.value = [];
        }
        store.commit('setSpinner', false)
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
    })
}


const toggleEvent = (event) => {
    let option = event.target.value;
    alert(option)
}

function loadShifts() {
    store.commit('setSpinner', true)
    store.dispatch('getMethod', { url: '/load-shifts' }).then((data) => {
        if (data.status == 200) {
            shifts.value = data.data
        } 
        store.commit('setSpinner', false)
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
    })
}

loadShifts()

function allocateShift() {
   store.commit('setSpinner', true)
    errors.value = []
    store.dispatch('postMethod', { url: '/allocate-shift', param: allocation.value }).then((data) => {
        if (data.status == 422) {
            errors.value = data.data
        } else if (data.status == 201) {
            shift.value = [];
        }
        store.commit('setSpinner', false)
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
    })
    
}


function markShiftHoliday() {
    store.commit('setSpinner', true)
    b_errors.value = []
    console.log(holiday.value);
    store.dispatch('holidayDetail', holiday.value).then((data) => {
        if (data.status == 422) {
            b_errors.value = data.data
        } else if (data.status == 201) {
            b_errors.value = []
            holiday.value = [];
           
        }
        store.commit('setSpinner', false)
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
    })
}

const shiftDrop = ref({});
function dropdownShifts() {
    store.dispatch('loadDropdown', 'shifts').then(({ data }) => {
        shiftDrop.value = data;
    }).catch(e => {
        console.log(e);
        alert('Something Went Wrong')
    })
}
dropdownShifts()
const userDrop = ref({});
function dropdownUser() {
    store.dispatch('loadDropdown', 'users').then(({ data }) => {
        userDrop.value = data;
    }).catch(e => {
        console.log(e);
        alert('Something Went Wrong')
    })
}
dropdownUser()
onMounted(() => {
    // currentTab()
})

</script>

<style scoped></style>
<template>
    <div>
        <div class="container mt-2">
            <div class="row">
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <fieldset class="border rounded-3 p-2 m-1">
                                <legend class="float-none w-auto px-2">Create Schedule</legend>
                                <form>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Activity</label>
                                                <input type="text" v-model="schedule.schedule" class="form-control"
                                                    placeholder="Name of department">
                                                <p class="text-danger " v-if="errors?.schedule">{{ errors?.schedule[0] }}</p>
                                            </div>
                                        </div>
                                       
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Begin Date</label>
                                                <input type="date" v-model="schedule.begin_time" class="form-control"
                                                    placeholder="Name of department">
                                                <p class="text-danger " v-if="errors?.begin_time">{{ errors?.begin_time[0] }}</p>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">End Date</label>
                                                <input type="date" v-model="schedule.end_time" class="form-control"
                                                    placeholder="Name of department">
                                                <p class="text-danger " v-if="errors?.end_time">{{ errors?.end_time[0] }}</p>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="form-label">Staff <span class="text-danger">*</span></label>
                                                    <Select2 v-model="schedule.staff" :options="users" :settings="{ width: '100%' }"  />
                                                    <p class="text-danger " v-if="errors?.log">{{ errors?.log[0] }}</p>
                                                </div>
                                            </div>
                                        
                                    </div>
                                    <button type="button" class="btn btn-success btn-sm mt-2"
                                        @click="createSchedule">Submit</button>
                                </form>

                            </fieldset>
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header">Md Schedules</div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table-hover table-stripped table-bordered table">
                                    <thead>
                                        <tr>
                                            <th>SN</th>
                                            <th>Activity</th>
                                            <th> Begin</th>
                                            <th> End</th>
                                            <th>STATUS</th>
                                            <th> <i class="bi bi-pencil-fill"></i> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(sch, loop) in schedules.data" :key="loop">
                                            <td>{{ loop + 1 }}</td>
                                            <td>{{ sch.schedule }}</td>
                                            <td>{{ sch.begin_time }}</td>
                                            <td>{{ sch.end_time }}</td>
                                            <td>{{ sch.status }}</td>
                                            <td>
                                                <div class="dropdown">
                                                    <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                                        data-bs-toggle="dropdown">
                                                        <i class="bi bi-tools"></i>
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                        <li class="bg-warning"><a class="dropdown-item pointer" @click="editSchedule(sch)">Details</a> </li>
                                                        <li class="bg-danger"><a class="dropdown-item pointer" @click="deleteSchedule(sch.id)">Delete</a> </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="flex justify-center mt-4">
                                    <nav class="relative justify-center rounded-md shadow pagination">
                                        <pagination-links v-for="(link, i) of schedules.links" :link="link" :key="i" @next="nextPage(link)"></pagination-links>
                                    </nav>
                                </div>
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
import { ref } from "vue";
import PaginationLinks from "@/components/PaginationLinks.vue";
import Select2 from 'vue3-select2-component';

const errors = ref({});
const schedules = ref({});
const schedule = ref({
    schedule : '' ,
    begin_time : '' ,
    end_time : '' ,
    staff : '' ,
});

const editSchedule = (sch)=>{
    schedule.value = {
        schedule: sch.schedule,
        begin_time: sch.begin_time,
        end_time: sch.end_time,
        staff: sch.staff,
        id: sch.id,
    }
}

function createSchedule() {
    store.commit('setSpinner', true)
    errors.value = []
    store.dispatch('postMethod', { url: '/create-md-schedule', param: schedule.value }).then((data) => {
        if (data.status == 422) {
            errors.value = data.data
        } else if (data.status == 201) {
            schedule.value = [];
        }
        store.commit('setSpinner', false)
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
    })
}

function loadLeaves() {
    store.commit('setSpinner', true)
    store.dispatch('getMethod', { url: '/load-md-schedule' }).then((data) => {
        store.commit('setSpinner', false)
        if (data.status == 200) {
            schedules.value = data.data;
        }
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
        alert('weting be this')
    })
} const users = ref([]);
function dropdownUser() {
    store.dispatch('loadDropdown', 'users').then(({ data }) => {
        users.value = data;
    }).catch(e => {
        console.log(e);
        alert('Something Went Wrong')
    })
}
dropdownUser()

loadLeaves()
function nextPage(link) {
    alert()
    if (!link.url || link.active) {
        return;
    }
    alert(link.url)
}
</script>

<style scoped></style>
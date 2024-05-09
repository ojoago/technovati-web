<template>
    <div>
        <div class="container mt-2">
            <div class="row">
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <fieldset class="border rounded-3 p-2 m-1">
                                <legend class="float-none w-auto px-2">Create Schedule</legend>
                                <form id="scheduleForm">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Activity</label>
                                                <textarea v-model="schedule.schedule" class="form-control"
                                                    placeholder="e.g meeting by 10am"></textarea>
                                                <p class="text-danger " v-if="errors?.schedule">{{ errors?.schedule[0]
                                                    }}</p>
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Begin Date</label>
                                                <input type="datetime-local" v-model="schedule.begin_time"
                                                    class="form-control">
                                                <p class="text-danger " v-if="errors?.begin_time">{{
                                                    errors?.begin_time[0] }}</p>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">End Date</label>
                                                <input type="date" v-model="schedule.end_time" class="form-control">
                                                <p class="text-danger " v-if="errors?.end_time">{{ errors?.end_time[0]
                                                    }}</p>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Staff <span
                                                        class="text-danger">*</span></label>
                                                <Select2 v-model="schedule.user_pid" :options="users"
                                                    :settings="{ width: '100%' }" />
                                                <p class="text-danger " v-if="errors?.user_pid">{{ errors?.user_pid[0]
                                                    }}</p>
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
                        <div class="card-header">Senior Staff Schedules</div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table-hover table-stripped table-bordered table">
                                    <thead>
                                        <tr>
                                            <th>SN</th>
                                            <th>Activity</th>
                                            <th>Begin</th>
                                            <th>End</th>
                                            <th>STATUS</th>
                                            <th> <i class="bi bi-gear-fill"></i> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(sch, loop) in schedules.data" :key="loop">
                                            <td>{{ loop + 1 }}</td>
                                            <td>{{ sch.schedule }}</td>
                                            <td>{{ sch.begin }}</td>
                                            <td>{{ sch.end }}</td>
                                            <td>{{ sch.sch_status }}</td>
                                            <td>
                                                <div class="dropdown">
                                                    <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                                        data-bs-toggle="dropdown">
                                                        <i class="bi bi-tools"></i>
                                                    </button>
                                                    <ul class="dropdown-menu">

                                                        <li><a class="dropdown-item pointer bg-warning"
                                                                @click="editSchedule(sch)">Edit</a> </li>

                                                        <!-- <li><a class="dropdown-item pointer bg-warning"
                                                                @click="editSchedule(sch)">Mark Comp</a> </li> -->

                                                        <li><a class="dropdown-item pointer bg-danger"
                                                                @click="deleteSchedule(sch.id)">Delete</a> </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="flex justify-center mt-4">
                                    <nav class="relative justify-center rounded-md shadow pagination">
                                        <pagination-links v-for="(link, i) of schedules.links" :link="link" :key="i"
                                            @next="nextPage(link)"></pagination-links>
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
    user_pid : '' ,
});

const resetAttr = () => {
    schedule.value = {
        schedule: '',
        begin_time: '',
        end_time: '',
        user_pid: '',
    }
}
const editSchedule = (sch)=>{
    schedule.value = {
        schedule: sch.schedule,
        begin_time: sch.begin_time,
        end_time: sch.end_time,
        user_pid: sch.user_pid,
        id: sch.id,
    }
}

function createSchedule() {
    errors.value = []
    store.dispatch('postMethod', { url: '/create-schedule', param: schedule.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data
        } else if (data?.status == 201) {
            resetAttr()
            loadSchedules()
        }
    })
}

function loadSchedules() {
    store.dispatch('getMethod', { url: '/load-schedules' }).then((data) => {
        if (data?.status == 200) {
            schedules.value = data.data;
        }
    })
} const users = ref([]);
function dropdownUser() {
    store.dispatch('loadDropdown', 'users').then(({ data }) => {
        users.value = data;
    }).catch(e => {
        console.log(e);
    })
}
dropdownUser()

loadSchedules()
function nextPage(link) {
    alert()
    if (!link.url || link.active) {
        return;
    }
    alert(link.url)
}
</script>

<style scoped></style>
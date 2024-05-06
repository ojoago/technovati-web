<template>
    <div>
        <div class="container mt-2">
            <div class="card">
                <div class="card-header">
                    Staff Attendance <button class="btn btn-sm btn-primary " @click="toggleModal = true">Filter</button>
                    <button class="btn btn-sm btn-secondary float-end" v-if="clea" @click="clearFilter"> <small
                            class="small">Clear Filter</small></button>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table-hover table-stripped table-bordered table">
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>Time In</th>
                                    <th>Time Out</th>
                                    <th>status</th>
                                    <th>location</th>
                                    <th>platform</th>
                                    <th>browser</th>
                                    <th>ip</th>
                                    <th>path</th>
                                    <!-- 'lat', 
                                    'long' ,
                                    'precision' , -->
                                    <!-- 'date' ,  -->
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(tend, loop) in attendance.data" :key="loop">
                                    <td>{{ loop + 1 }}</td>
                                    <td>{{ tend.week_day }} {{ tend.time_in }}</td>
                                    <td>{{ tend.time_out }}</td>
                                    <td>{{ tend.attendance_status }}</td>
                                    <td>{{ tend.location }}</td>
                                    <td>{{ tend.platform }}</td>
                                    <td>{{ tend.browser }}</td>
                                    <td>{{ tend.ip }}</td>
                                    <td>
                                        <img :src="tend.path" alt="" class="img img-responsive tend-image">
                                    </td>

                                </tr>
                            </tbody>
                        </table>
                        <div class="flex justify-center mt-4">
                            <nav class="relative justify-center rounded-md shadow pagination">
                                <pagination-links v-for="(link, i) of attendance.links" :link="link" :key="i"
                                    @next="nextPage(link)"></pagination-links>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <o-modal modal-class="modal-sm" :is-open="toggleModal" @submit="filterAttendance" subtitle="Filter Attandance"
            @modal-close="closeModal">
            <template #content>
                <form id="cForm">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="form-label">From</label>
                                <input type="date" v-model="filter.from" class="form-control"
                                    placeholder="e.g Ray Engineering">
                                <p class="text-danger " v-if="errors?.from">{{ errors?.from[0] }}</p>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="form-label">To</label>
                                <input type="date" v-model="filter.to" class="form-control" placeholder="e.g 20121212">
                                <p class="text-danger " v-if="errors?.to">{{ errors?.to[0] }}</p>
                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="form-label">Staff</label>
                                <Select2 v-model="filter.user_pid" :options="users" :settings="{ width: '100%' }" />
                                <p class="text-danger " v-if="errors?.user_pid">{{ errors?.user_pid[0] }}</p>
                            </div>
                        </div>

                    </div>
                </form>
            </template>
        </o-modal>
    </div>
</template>

<script setup>
import store from '@/store';
// import { ref,onMounted } from 'vue'
import { ref } from 'vue';
import PaginationLinks from "@/components/PaginationLinks.vue";
import OModal from "@/components/OModal.vue";
import Select2 from 'vue3-select2-component';
const clea = ref(false)



const toggleModal = ref(false)

const closeModal = () => {
    toggleModal.value = false;
};

const filter = ref({
    from:'' ,
    to:'',
    user_pid:''
})

const clearFilter = () =>{
    loadAttendance()
}

loadAttendance()

const attendance = ref({})
function loadAttendance() {
    clea.value = false
    store.dispatch('getMethod', { url: '/load-staff-attendance' }).then((data) => {
        if (data?.status == 200) {
            attendance.value = data.data;
        }
    })
}

const errors = ref({})
const filterAttendance = () => {
    errors.value = []
    store.dispatch('postMethod', { url: '/filter-staff-attendance', param: filter.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data
        } else if (data?.status == 200) {
            clea.value = true
            attendance.value = data.data;
            toggleModal.value = false;

        }
    })
}



const users = ref([]);
function dropdownAllow() {
    store.dispatch('loadDropdown', 'users').then(({ data }) => {
        users.value = data;
    }).catch(e => {
        console.log(e);
    })
}
dropdownAllow()

</script>

<style scoped>

.table-responsive {
    overflow: visible
}

/* dropdown  */
.dropdown .dropdown-menu {
    overflow: hidden;
    position: absolute;
}

.tend-image {
    width: 40px;
}

.tend-image:hover {
    width: 150px !important;
    height: auto !important;
    position: absolute !important;
    right: 20px !important;
}
</style>
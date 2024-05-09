<template>
    <div>
        <div class="container mt-2">

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
                                            <button type="button" @click="resolve(sch.id)"
                                                class="btn btn-primary btn-sm" >
                                                Resolve
                                            </button>
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
</template>

<script setup>
import store from "@/store";
import { ref } from "vue";
import PaginationLinks from "@/components/PaginationLinks.vue";

const schedules = ref({});

function loadSchedules() {
    store.dispatch('getMethod', { url: '/load-my-schedules' }).then((data) => {
        if (data?.status == 200) {
            schedules.value = data.data;
        }
    })
} 

const resolve = (id) => {
    store.dispatch('putMethod', { url: '/resolve-schedule/'+id , prompt: 'Are you sure, you want to resolve this schedule.' }).then((data) => {
        if (data?.status == 201) {
            loadSchedules()
        }
    })
}


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
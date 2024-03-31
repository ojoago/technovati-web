<template>
    <div>
        <div class="container mt-2">
            
                    <div class="card">
                        <div class="card-header">
                            Visitor's Log
                            <!-- <button class="btn btn-sm btn-primary" @click="openModal">Add New</button> -->
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table-hover table-stripped table-bordered table">
                                    <thead>
                                        <tr>
                                            <th>SN</th>
                                            <th>Names</th>
                                            <th>Phone Number</th>
                                            <th>Purpose</th>
                                            <th>Tag</th>
                                            <th>Time in</th>
                                            <th>Time out</th>
                                            <th> <i class="bi bi-gear-fill"></i> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(lg, loop) in logs.data" :key="loop">
                                            <td>{{ loop + 1 }}</td>
                                            <td>{{ lg.names }}</td>
                                            <td>{{ lg.gsm }}</td>
                                            <td>{{ lg.purpose }}</td>
                                            <td>{{ lg.tag }}</td>
                                            <td>{{ lg.time }}</td>
                                            <td>{{ lg.out }}</td>
                                            <td>
                                                <div class="dropdown" v-if="!lg.time_out">
                                                    <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                                        data-bs-toggle="dropdown">
                                                        <i class="bi bi-tools"></i>
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                        <li><a class="dropdown-item pointer bg-success"  @click="clockOut(lg.id)">Clock out</a> </li>
                                                        <li><a class="dropdown-item pointer bg-warning" @click="editlog(lg)">Edit</a> </li>
                                                        <li><a class="dropdown-item pointer bg-danger" @click="deleteLog(lg.id)">Delete</a> </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tfoot></tfoot>
                                </table>
                                <div class="flex justify-center mt-4">
                                    <nav class="relative justify-center rounded-md shadow pagination">
                                        <pagination-links v-for="(link, i) of logs.links" :link="link" :key="i"
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

const logs = ref({});


function loadLog() {
    store.dispatch('getMethod', { url: '/load-my-visitor-log' }).then((data) => {
        if (data.status == 200) {
            logs.value = data.data;
        }
    })
}

loadLog()
function nextPage(link) {
    alert()
    if (!link.url || link.active) {
        return;
    }
    alert(link.url)
}

</script>

<style scoped></style>
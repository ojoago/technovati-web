<template>
    <div>
        <div class="card">
                            <div class="card-header">Appraisal List</div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table-hover table-stripped table-bordered table">
                                        <thead>
                                            <tr>
                                                <th>SN</th>
                                                <th>Title</th>
                                                <th>Month</th>
                                                <th>Year</th>
                                                <th>Start</th>
                                                <th>End</th>
                                                <th> <i class="bi bi-gear-fill"></i> </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(data, loop) in titles.data" :key="loop">
                                                <td>{{ loop + 1 }}</td>
                                                <td>{{ data.title }}</td>
                                                <td>{{ data.month }}</td>
                                                <td>{{ data.year }}</td>
                                                <td>{{ data.from }}</td>
                                                <td>{{ data.to }}</td>
                                                <td>
                                                    <div class="dropdown">
                                                        <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                                            data-bs-toggle="dropdown">
                                                            <i class="bi bi-tools"></i>
                                                        </button>
                                                        <ul class="dropdown-menu">
                                                            <li class="bg-warning"><a class="dropdown-item pointer"
                                                                    @click="editTitle(data)">Evaluate</a> </li>
                                                            <li class="bg-danger"><a class="dropdown-item pointer"
                                                                    @click="deleteLog(data.id)">Delete</a> </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="flex justify-center mt-4">
                                        <nav class="relative justify-center rounded-md shadow pagination">
                                            <pagination-links v-for="(link, i) of titles.links" :link="link" :key="i"
                                                @next="nextPage(link)"></pagination-links>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
    </div>
</template>

<script setup>
     
    //  load-appraisal
import store from "@/store";
import { ref } from "vue";
import PaginationLinks from "@/components/PaginationLinks.vue";

const titles = ref({});


const deleteLog = (id) => {
    alert(id)
}


function loadLog() {
    store.commit('setSpinner', true)
    store.dispatch('getMethod', { url: '/load-appraisal' }).then((data) => {
        store.commit('setSpinner', false)
        if (data.status == 200) {
            titles.value = data.data;
        }
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
        alert('weting be this')
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

<style scoped>

</style>
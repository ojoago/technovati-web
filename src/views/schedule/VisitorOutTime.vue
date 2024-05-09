<template>
    <div>
        <div class="container mt-2">
            
                    <div class="card">
                        <div class="card-header">Visitor arround</div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table-hover table-stripped table-bordered table">
                                    <thead>
                                        <tr>
                                            <th>SN</th>
                                            <th>Names</th>
                                            <th> Number</th>
                                            <th> purpose</th>
                                            <th> Tag</th>
                                            <th>time in</th>
                                            <th>time out</th>
                                            <th> <i class="bi bi-pencil-fill"></i> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(lg, loop) in logs.data" :key="loop">
                                            <td>{{ loop + 1 }}</td>
                                            <td>{{ lg.names }}</td>
                                            <td>{{ lg.gsm }}</td>
                                            <td>{{ lg.purpose }}</td>
                                            <td>{{ lg.tag }}</td>
                                            <td>{{ lg.time_in }}</td>
                                            <td>{{ lg.time_out }}</td>
                                            <td>
                                                <button @click="logOut(lg.id)" type="button" class="btn btn-primary btn-sm">
                                                    <i class="bi bi-box-arrow-right"></i>
                                                </button>
                                            </td>
                                           
                                        </tr>
                                    </tbody>
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

const logOut = (id) => {
    store.dispatch('getMethod', { url: '/sign-visitor-out/'+id }).then(() => {
        loadLog()
    }).catch(e => {
        console.log(e);
    })
}


function loadLog() {
    store.dispatch('getMethod', { url: '/visitor-log' }).then((data) => {
        if (data?.status == 200) {
            logs.value = data.data;
        }else{
            logs.value = {}
        }
    }).catch(e => {
        console.log(e);
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
<template>
    <div>
        <div class="table-responsive" v-if="histories">
            <table class="table-hover table-stripped table-bordered table">
                <thead>
                    <tr>
                        <th>SN</th>
                        <th>Side </th>
                        <th>Brand</th>
                        <th>date purchased</th>
                        <th>date manufactured</th>
                        <th>expiring date</th>
                        <th>Date Change</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, loop) in histories" :key="loop">
                        <td>{{ loop + 1 }}</td>
                        <td>{{ item.side }}</td>
                        <td>{{ item.brand }} </td>
                        <td>{{ item.date_purchased }} </td>
                        <td>{{ item.date_manufactured }} </td>
                        <td>{{ item.expiring_date }} </td>
                        <td>{{ item.created_at }} </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else class="text-center text-uppercase">No Record Yet</div>
    </div>
</template>

<script setup>
     
import store from "@/store";
import { onMounted, ref } from "vue";


onMounted(() => {
    let dtl = localStorage.getItem('TVATI_VEHICLE_DETAIL') ? JSON.parse(localStorage.getItem('TVATI_VEHICLE_DETAIL')) : 'null'
    if (dtl != 'null') {
        loadVehicleTyreHistory(dtl?.pid)
    }
});

const histories = ref({})
function loadVehicleTyreHistory(pid) {
    store.dispatch('getMethod', { url: '/load-vehicle-tyre-history/' + pid }).then(({ data }) => {
        histories.value = data
    })
}



</script>

<style scoped>

</style>
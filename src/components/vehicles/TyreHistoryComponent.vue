<template>
    <div>
        
        <div class="table-responsive" >
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
                <tbody v-if="histories.data">
                    <tr v-for="(item, loop) in histories.data" :key="loop">
                        <td>{{ loop + 1 }}</td>
                        <td>{{ item.side }}</td>
                        <td>{{ item.brand }} </td>
                        <td>{{ item.date_purchased }} </td>
                        <td>{{ item.date_manufactured }} </td>
                        <td>{{ item.expiring_date }} </td>
                        <td>{{ item.created_at }} </td>
                    </tr>
                </tbody>
                <div v-else class="text-center text-uppercase">No Record Yet</div>
            </table>
            <div class="flex justify-center mt-4">
                                        <nav class="relative justify-center rounded-md shadow pagination">
                                            <pagination-links v-for="(link, i) of histories.links" :link="link" :key="i"
                                                @next="nextPage(link)"></pagination-links>
                                        </nav>
                                    </div>
        </div>
    </div>
</template>

<script setup>
     
import store from "@/store";
import { onMounted, ref } from "vue";
    import PaginationLinks from "@/components/PaginationLinks.vue";


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
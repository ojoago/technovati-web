<template>
    <div>
        <div class="container mt-2 mb-2">
            <div class="card">
                <div class="card-header"><h3 class="mx-4">Appraisal Records</h3></div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table-hover table-stripped table-bordered table">
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>username</th>
                                    <th>Appraisal Count </th>
                                    <th>Average Self Rating</th>
                                    <th>Average Supervisor Rating</th>
                                    <th> <i class="bi bi-gear-fill"></i> </th>
                                </tr>
                            </thead>
                            <tbody v-if="titles?.data">
                                <tr v-for="(data, loop) in titles?.data" :key="loop">
                                    <td>{{ loop + 1 }}</td>
                                    <td>{{ data?.username }}</td>
                                    <td>{{ data?.count }}</td>
                                    <td>{{ data?.self }}</td>
                                    <td>{{ data?.rating }}</td>
                                    <td>
                                        <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="dropdown">
                                            Details
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot v-else class="text-center" style="width: 100%" width="100%">
                                <tr>
                                    <td colspan="50"><small class="small">No Record Yet</small> </td>
                                </tr>
                            </tfoot>
                        </table>
                        <div class="flex justify-center mt-4">
                            <nav class="relative justify-center rounded-md shadow pagination">
                                <pagination-links v-for="(link, i) of titles?.links" :link="link" :key="i"
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
     
    //  load-appraisal
import store from "@/store";
import { ref } from "vue";
import PaginationLinks from "@/components/PaginationLinks.vue";


// import { useRouter } from 'vue-router';
// const router = useRouter()

const titles = ref({});


// const evaluateSelf = (data) => {
//     localStorage.setItem('TVATI_APPRAISAL', JSON.stringify(data, null, 2))
//     router.push({ path: 'self-appraisal-hr-comment', query: { param: data.pid } })
// }


function loadStafffAppraisalRecord(url='/load-staff-appraisal-record') {
    store.dispatch('getMethod', { url:url }).then((data) => {
        if (data?.status == 200) {
            titles.value = data.data;
        }
    }).catch(e => {
        console.log(e);
    })
}

loadStafffAppraisalRecord()
function nextPage(link) {
  
    if (!link.url || link.active) {
        return;
    }
    loadStafffAppraisalRecord(link.url)
}

</script>

<style scoped>

</style>
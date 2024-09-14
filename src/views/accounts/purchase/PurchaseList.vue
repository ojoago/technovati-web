<template>
    <div>
        <div class="container mt-2">

            <div class="card">
                <div class="card-header">
                    <h3>Purchase List</h3>
                </div>
                <div class="card-body">
                    <!-- {{ purchases.data }} -->
                    <div class="table-responsive">
                        <table class="table-hover table-stripped table-bordered table">
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Date</th>
                                    <th>Ref</th>
                                    <th>Account</th>
                                    <th>Supplier</th>
                                    <th>Status</th>
                                    <th>Grand Total</th>
                                    <th>Balance</th>
                                    <th>Store</th>
                                    <th> <i class="bi bi-gear-fill"></i> </th>
                                </tr>
                            </thead>
                            <tbody class="mb-2" v-if="purchases.data">
                                <tr v-for="(data, loop) in purchases.data" :key="loop">
                                    <td>{{ loop + 1 }}</td>
                                    <td>{{ data.date }}</td>
                                    <td>{{ data.purchase_no }}</td>
                                    <td>{{ data?.account?.name }}</td>
                                    <td>{{ data?.supplier?.name }}</td>
                                    <td>
                                        <span class="badge bg-success" v-if="data?.payment?.status">Paid</span>
                                        <span class="badge bg-warning" v-else>Incomplete</span>


                                    </td>
                                    <td>{{ data?.payment?.total }}</td>
                                    <td>{{ data?.payment?.balance }}</td>
                                    <td>{{ data?.store?.name }}</td>
                                    <td>
                                        <button type="button" @click="editEntry(data)"
                                            class="btn btn-primary btn-sm">
                                            Edit
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
                                <pagination-links v-for="(link, i) of purchases.links" :link="link" :key="i"
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
import { useRouter } from 'vue-router';
const router = useRouter()

const purchases = ref({})

function loadPurchase(url = '/load-purchase') {
    store.dispatch('getMethod', { url: url }).then((data) => {
        if (data?.status == 200) {
            purchases.value = data.data
        } else {
            purchases.value = {}
        }
    }).catch(e => {
        console.log(e);
    })
}

loadPurchase()

const editEntry = (data) => {
    localStorage.setItem('TVATI_EDIT_PRC', JSON.stringify(data, null, 2))
    router.push({ path: 'add-purchase', query: { id: data.pid, action: 'edit' } })
}


function nextPage(link) {
    if (!link.url || link.active) {
        return;
    }
    loadPurchase(link.url)
}

</script>

<style scoped></style>
<template>
    <div>
        <div class="container mt-2">

            <div class="card">
                <div class="card-header">
                    Purchase List
                </div>
                <div class="card-body">
                    <!-- {{ sales.data }} -->
                    <div class="table-responsive">
                        <table class="table-hover table-stripped table-bordered table">
                            <thead>
                                <tr>

                                    <th>SN</th>
                                    <th>Date</th>
                                    <th>Ref</th>
                                    <th>Account</th>
                                    <th>customer</th>
                                    <th>Status</th>
                                    <th>Grand Total</th>
                                    <th>Balance</th>
                                    <th>Store</th>
                                    <th> <i class="bi bi-gear-fill"></i> </th>
                                </tr>
                            </thead>
                            <tbody class="mb-2" v-if="sales.data">
                                <tr v-for="(data, loop) in sales.data" :key="loop">
                                    <td>{{ loop + 1 }}</td>
                                    <td>{{ data.date }}</td>
                                    <td>{{ data.sales_no }}</td>
                                    <td>{{ data?.account?.name }}</td>
                                    <td>{{ data?.customer?.name }}</td>
                                    <td>{{ data?.c_status }}</td>

                                    <td>{{ data?.sub_total }}</td>
                                    <td>{{ data?.payment?.balance }}</td>
                                    <td>{{ data?.store?.name }}</td>
                                    <td>
                                        <button type="button" @click="editEntry(data.pid)"
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
                                <pagination-links v-for="(link, i) of sales.links" :link="link" :key="i"
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


const sales = ref({})

function loadSales() {
    store.dispatch('getMethod', { url: '/load-sales' }).then((data) => {
        if (data?.status == 200) {
            sales.value = data.data
        } else {
            sales.value = {}
        }
    }).catch(e => {
        console.log(e);
    })
}

loadSales()

const editEntry = (pid) => {
    alert(pid)
}
</script>

<style scoped></style>
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

                                    <td>{{ data?.total }}</td>
                                    <td>{{ data?.payment?.balance }}</td>
                                    <td>{{ data?.store?.name }}</td>
                                    <td>
                                        <div class="dropdown">
                                            <button type="button"
                                                class="btn btn-primary btn-sm dropdown-toggle"
                                                data-bs-toggle="dropdown">
                                                <i class="bi bi-tools"></i>
                                            </button>
                                            <ul class="dropdown-menu">
                                                <li><a class="dropdown-item pointer bg-warning"
                                                        @click="editEntry(data.pid)">Edit</a></li>
                                                <li><a class="dropdown-item pointer bg-success"
                                                        @click="reActivateStaff(user.pid)">Details</a>
                                                </li>
                                            </ul>
                                        </div>
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

function loadSales(url ='/load-sales' ) {
    store.dispatch('getMethod', { url: url }).then((data) => {
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

   function nextPage(link) {
        if (!link.url || link.active) {
            return;
        }
        loadSales(link.url)
    }

</script>

<style scoped></style>
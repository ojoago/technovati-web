<template>
    <div>
        <div class="container mt-2">

            <div class="card">
                <div class="card-header">
                   <h3> Expense List</h3>
                </div>
                <div class="card-body">
                    <!-- {{ expense.data }} -->
                    <div class="table-responsive">
                        <table class="table-hover table-stripped table-bordered table">
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Date</th>
                                    <th>Ref</th>
                                    <th>Total</th>
                                    <th>discount</th>
                                    <th>Paid</th>
                                    <th> <i class="bi bi-gear-fill"></i> </th>
                                </tr>
                            </thead>
                            <tbody class="mb-2" v-if="expense.data">
                                <tr v-for="(data, loop) in expense.data" :key="loop">
                                    <td>{{ loop + 1 }}</td>
                                    <td>{{ data.expense_date }}</td>
                                    <td>{{ data.expense_number }}</td>
                                    <td>{{ numberFormat(data.sub_total) }}</td>
                                    <td>{{ numberFormat(data?.discount) }}</td>
                                    <td>{{ numberFormat(data?.paid) }}</td>

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
                                <pagination-links v-for="(link, i) of expense.links" :link="link" :key="i"
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
import { useHelper } from '@/composables/helper';
import { useRouter } from 'vue-router';
const router = useRouter()
const { numberFormat } = useHelper()

const expense = ref({})

function loadExpense(url = '/load-expense') {
    store.dispatch('getMethod', { url: url }).then((data) => {
        if (data?.status == 200) {
            expense.value = data.data
        } else {
            expense.value = {}
        }
    }).catch(e => {
        console.log(e);
    })
}

loadExpense()


function nextPage(link) {
    if (!link.url || link.active) {
        return;
    }
    loadExpense(link.url)
}

const editEntry = (data) => {
    localStorage.setItem('TVATI_EDIT_ESP', JSON.stringify(data, null, 2))
    router.push({ path: 'add-expense', query: { id: data.pid, action: 'edit' } })
}
</script>

<style scoped></style>
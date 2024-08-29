<template>
    <div>
        <div class="container mt-2">

            <div class="card">
                <div class="card-header">
                    Accounts
                </div>
                <div class="card-body">
                    {{ journals.data }}
                    <div class="table-responsive">
                        <table class="table-hover table-stripped table-bordered table">
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Date</th>
                                    <th>Ref</th>
                                    <th>Debit</th>
                                    <th>Credit</th>
                                    <th>Note</th>
                                    <th> <i class="bi bi-gear-fill"></i> </th>
                                </tr>
                            </thead>
                            <tbody class="mb-2" v-if="journals.data">
                                <tr v-for="(data, loop) in journals.data" :key="loop">
                                    <td>{{ loop + 1 }}</td>
                                    <td>{{ data.date }}</td>
                                    <td>{{ data.transaction_number }}</td>
                                    <td>{{ data?.entry[0].debit_account }}</td>
                                    <td>{{ data?.entry[0].credit_amount }}</td>
                                    <td>{{ data.comments }}</td>

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
                                <pagination-links v-for="(link, i) of journals.links" :link="link" :key="i"
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


const journals = ref({})

function loadAccount() {
    store.dispatch('getMethod', { url: '/load-journals' }).then((data) => {
        if (data?.status == 200) {
            journals.value = data.data
        } else {
            journals.value = {}
        }
    }).catch(e => {
        console.log(e);
    })
}

loadAccount()

const editEntry = (pid) => {
    alert(pid)
}
</script>

<style scoped></style>
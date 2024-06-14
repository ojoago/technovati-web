<template>
    <div>
        <div class="container mt-2">

            <div class="card">
                <div class="card-header">
                    Accounts
                    <button class="btn btn-primary btn-sm" @click="openModal">New</button>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-4">
                            <template v-for="(account,loop) in accounts" :key="loop">
                                <div class="accordion" id="accordionPanelsStayOpenExample">
                                    <div class="accordion-item">
                                        <h2 class="accordion-header" :id="`panelsStayOpen-heading${loop}`">
                                            <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                                :data-bs-target="`#panelsStayOpen-collapse${loop}`" aria-expanded="true"
                                                aria-controls="panelsStayOpen-collapseOne">
                                                {{account.name}}
                                            </button>
                                        </h2>
                                        <div v-if="loop == 0" :id="`panelsStayOpen-collapse${loop}`"
                                            class="accordion-collapse collapse show"
                                            aria-labelledby="panelsStayOpen-headingOne">
                                            <div class="accordion-body">
                                                <div class="account-detail" v-for="(sub,i) in account.accounts"
                                                    @click="loadJournal(sub.pid, sub.account_name)" :key="i">
                                                    <div>{{ sub.account_name }}</div>
                                                    <div>{{ sub.balance }}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else :id="`panelsStayOpen-collapse${loop}`"
                                            class="accordion-collapse collapse "
                                            aria-labelledby="panelsStayOpen-headingOne">
                                            <div class="accordion-body">
                                                <div class="account-detail" v-for="(sub,i) in account.accounts"
                                                    @click="loadJournal(sub.pid)" :key="i">
                                                    <div>{{ sub.account_name }}</div>
                                                    <div>{{ sub.balance }}</div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </template>
                        </div>
                        <div class="col-md-8">

                            <fieldset class="border rounded-3 p-2 m-1">
                                <legend class="float-none w-auto px-2">{{ formatUpperCase(journal) }}</legend>

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
                            </fieldset>
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
const { formatUpperCase } = useHelper()
const accounts = ref({})
loadAccount()
function loadAccount() {
    store.dispatch('getMethod', { url: '/load-account-list' }).then((data) => {
        if (data?.status == 200) {
            accounts.value = data.data
            let pid = data.data[0].accounts[0].pid;
            let name = data.data[0].accounts[0].account_name;
            loadJournal(pid,name)
        }else{
            accounts.value = {}
        }
    }).catch(e => {
        console.log(e);
    })
}

const journal = ref(null)
const journals = ref({})
const loadJournal = (pid,name) =>{
    journal.value = name;
    store.dispatch('getMethod', { url: '/load-account-journal/'+pid }).then((data) => {
        if (data?.status == 200) {
            journals.value = data.data
        } else {
            journals.value = {}
        }
    }).catch(e => {
        console.log(e);
    })
}

</script>

<style scoped>

.accordion-button{
    padding: 7px;
    background: #f1f1f1;
}

.account-detail{
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #f1f1f1;
    background: #fff;
}

.accordion-body{
    padding: 3px;
}

</style>
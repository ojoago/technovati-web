<template>
    <div>
        <div class="container mt-2">

            <div class="card">
                <div class="card-header">
                    Accounts
                </div>
                <div class="card-body">
                    
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
                                    <td>{{ data.dates }}</td>
                                    <td>{{ data.transaction_number }}</td>
                                    <td>{{ data?.debits }}</td>
                                    <td>{{ data?.credits }}</td>
                                    <td>{{ data.comments }}</td>
                                     <td>
                                        <div class="dropdown">
                                            <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                                data-bs-toggle="dropdown">
                                                <i class="bi bi-tools"></i>
                                            </button>
                                            <ul class="dropdown-menu">
                                                <li><a class="dropdown-item pointer bg-info"
                                                        @click="entryDetail(data)">Details</a> </li>
                                                <li><a class="dropdown-item pointer bg-warning"
                                                        @click="editEntry(data)">Edit</a> </li>
                                               
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
                                <pagination-links v-for="(link, i) of journals.links" :link="link" :key="i"
                                    @next="nextPage(link)"></pagination-links>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
          <o-modal :isOpen="toggleModal" modal-class="modal-lg" title="Journal Details"
            @modal-close="closeModal">
            <template #content>
                
                 Date: {{ entry.dates }}
                 Journal Voucer:   {{ entry.transaction_number }}
                                   
                    <table class="table-hover table-stripped table-bordered table text-sm">
                        <thead>
                            <tr>
                            <th>S/N</th>
                            <th>Account Name</th>
                            <th>Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(en, loop) in entry.entries" :key="loop">
                                <td>{{ loop+1 }}</td>
                                <td>{{ en.credit ? 'Cr | '+ en.credit?.account_name : 'Dr | '+ en.debit?.account_name }}</td>
                                <td>{{ en.credit_amount > 0 ? numberFormat(en.credit_amount) : numberFormat( en.debit_amount) }}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td> <b>Total</b></td>
                                <td>  
                                    Credit {{ entry.credits }}
                                </td>
                                <td>
                                    Debit {{ entry.debits }}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                     {{ entry.comments }} 
            </template>
            
        </o-modal>

    </div>
</template>

<script setup>
import store from "@/store";
import { ref } from "vue";
import PaginationLinks from "@/components/PaginationLinks.vue";
import OModal from "@/components/OModal.vue";
import { useHelper } from "@/composables/helper";
import { useRouter } from 'vue-router';
const router = useRouter()
const {numberFormat} =useHelper()

const journals = ref({})

function loadAccount(url = '/load-journals') {
    store.dispatch('getMethod', { url: url }).then((data) => {
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

const editEntry = (data) => {
    localStorage.setItem('TVATI_EDIT_JVC', JSON.stringify(data, null, 2))
    router.push({ path: 'journal-entry', query: { jvc: data.pid, action: 'edit' } })
}

const entry = ref({})
const toggleModal = ref(false)
const entryDetail = (data) => {
    entry.value = data
    toggleModal.value = true
}
const closeModal = () => {
    toggleModal.value = false;
   entry.value = {}
};


function nextPage(link) {
    if (!link.url || link.active) {
        return;
    }
    loadAccount(link.url)
}
</script>

<style scoped></style>
<template>
    <div>
        <div class="container mt-2">

            <div class="card">
                <div class="card-header">
                    <h3>Accounts</h3>
                    <button class="btn btn-primary btn-sm" @click="openModal">Add New</button> 
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
                                                    <div class="pointer">{{ sub.account_name }}</div>
                                                    <div>{{ sub.balance }}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else :id="`panelsStayOpen-collapse${loop}`"
                                            class="accordion-collapse collapse "
                                            aria-labelledby="panelsStayOpen-headingOne">
                                            <div class="accordion-body">
                                                <div class="account-detail" v-for="(sub,i) in account.accounts"
                                                    @click="loadJournal(sub.pid,sub.account_name)" :key="i">
                                                    <div class="pointer">{{ sub.account_name }}</div>
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
                                            </tr>
                                        </thead>
                                       <tbody class="mb-2" v-if="journals.data">
                                            <tr v-for="(data, loop) in journals.data" :key="loop">
                                                <td>{{ loop + 1 }}</td>
                                                <td>{{ data.journal?.dates }}</td>
                                                <td>{{ data?.journal?.transaction_number }}</td>
                                                <td>{{ numberFormat(data?.debit_amount) }}</td>
                                                <td>{{ numberFormat(data?.credit_amount)}}</td>
                                                <td>{{ data?.journal?.comments }}</td>
                                               
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


          <o-modal :isOpen="toggleModal" modal-class="modal-sm" title="Sub Account" @submit="createAccount"
            @modal-close="closeModal">
            <template #content>
                <form >

                    <div class="row">
                       
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="form-label">Account Type </label>
                                <input type="text" class="form-control form-control-sm" v-model="account.name"
                                    placeholder="e.g Salary Account">
                                <p v-if="errors.name" class="text-danger">{{ errors.name }} </p>

                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="form-label">Description </label>
                                <textarea type="text" class="form-control form-control-sm" v-model="account.description"
                                    placeholder="e.g Salary Account"></textarea>
                                <p v-if="errors.description" class="text-danger">{{ errors.description }} </p>

                            </div>
                        </div>

                    </div>
                </form>
            </template>
        </o-modal>



    </div>
</template>

<script setup>
import store from "@/store";
import { ref } from "vue";
import PaginationLinks from "@/components/PaginationLinks.vue";
import OModal from "@/components/OModal.vue";
import { useHelper } from '@/composables/helper';
const { formatUpperCase,numberFormat } = useHelper()
const accounts = ref({})
loadAccount()
function loadAccount() {
    store.dispatch('getMethod', { url: '/load-account-list' }).then((data) => {
        if (data?.status == 200) {
            accounts.value = data.data
            let pid = data?.data[0]?.accounts[0]?.pid;
            let name = data?.data[0]?.accounts[0]?.account_name;
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
    loadData('/load-account-journal/'+pid )
}

function loadData(url) {
    store.dispatch('getMethod', { url: url }).then((data) => {
        if (data?.status == 200) {
            journals.value = data?.data
        } else {
            journals.value = {}
        }
    }).catch(e => {
        console.log(e);
    })
    
}
function nextPage(link) {
    if (!link.url || link.active) {
        return;
    }
    loadData(link.url)
}

// create account type 

const toggleModal = ref(false)

const openModal = ()=>{
    toggleModal.value = true
    resetAttr()
}

const closeModal = () => {
    toggleModal.value = false
    resetAttr()
};
const account = ref({
    name: '' , 
    description: '' , 
})
const resetAttr = () => {
    account.value = {
        name: '' , 
        description: '' , 
    }
}
const errors = ref({});


const createAccount = () => {
   errors.value = []
    store.dispatch('postMethod', { url: '/create-account-type', param: account.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data
        } else if (data?.status == 201) {
            closeModal()
            loadAccount()
        }
    }).catch(e => {
        console.log(e);
    })
}


// const editAccount = (data) => {
//     account.value = {
//         type_pid: data.type_pid,
//         account_name: data.account_name,
//         account_code: data.account_code,
//         opening_balance: data.opening_balance,
//         opening_balance_type: data.opening_balance_type,
//         opening_date: data.opening_date,
//         note: data.note ,
//         status: data.status ,
//         pid: data.pid ,
//         edit: true  ,
//     }
//     toggleModal.value = true

// }


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
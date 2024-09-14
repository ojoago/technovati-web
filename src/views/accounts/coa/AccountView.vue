<template>
    <div>
        <div class="container mt-2">

            <div class="card">
                <div class="card-header">
                    <h3>Sub Accounts</h3>
                    <button class="btn btn-primary btn-sm" @click="openModal">New</button>
                </div>
                <div class="card-body">

                    <div class="table-responsive">
                        <table class="table-hover table-stripped table-bordered table">
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Type</th>
                                    <th>Name</th>
                                    <th>Code/ID</th>
                                    <th>opening balance</th>
                                    <th>Opened date</th>
                                    <th>Balance</th>
                                    <th>Note</th>
                                    <th>Status</th>
                                    <th> <i class="bi bi-gear-fill"></i> </th>
                                </tr>
                            </thead>
                            <tbody class="mb-2" v-if="accounts.data">
                                <tr v-for="(data, loop) in accounts.data" :key="loop">
                                    <td>{{ loop + 1 }}</td>
                                    <td>{{ data.type.name }}</td>
                                    <td>{{ data.account_name }}</td>
                                    <td>{{ data.account_code }}</td>
                                    <td>{{ data.opening }}</td>
                                    <td>{{ data.date }}</td>
                                    <td>{{ data.balance }}</td>
                                    <td>{{ data.note }}</td>
                                    <td>{{ data?.account_status }}</td>
                                    <td>
                                        <button type="button" v-if="data?.status == 1" @click="editAccount(data)"
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
                                <pagination-links v-for="(link, i) of accounts.links" :link="link" :key="i"
                                    @next="nextPage(link)"></pagination-links>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <o-modal :isOpen="toggleModal" modal-class="modal-sm" title="Sub Account" @submit="createAccount"
            @modal-close="closeModal">
            <template #content>
                <form id="configForm">

                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="form-label">Account Type</label>
                                <Select2 v-model="account.type_pid" :options="accountDrop"
                                    :settings="{ width: '100%' }" />
                                <p class="text-danger " v-if="errors?.type_pid">{{ errors?.type_pid[0] }}
                                </p>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="form-label">Account Name </label>
                                <input type="text" class="form-control form-control-sm" v-model="account.account_name"
                                    placeholder="e.g Salary Account">
                                <p v-if="errors.account_name" class="text-danger">{{ errors.account_name[0] }} </p>

                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="form-label">Account Code </label>
                                <input type="text" class="form-control form-control-sm" v-model="account.account_code"
                                    placeholder="e.g Salary Account">
                                <p v-if="errors.account_code" class="text-danger">{{ errors.account_code[0] }} </p>

                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="form-label">Account Balance </label>
                                <input type="number" step="0.5" class="form-control form-control-sm"
                                    placeholder="e.ng 1000000" v-model="account.opening_balance">
                                <p v-if="errors.opening_balance" class="text-danger">{{ errors.opening_balance[0] }}</p>
                            </div>
                        </div>

                        <template v-if="account.edit">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="form-label"> Status </label>
                                    <select class="form-control form-control-sm" v-model="account.status">
                                        <option value="" selected></option>
                                        <option value="1">Active</option>
                                        <option value="0">Disabled</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-md-8">
                                <div class="form-group">
                                    <label class="form-label">Account Opening Date </label>
                                    <input type="date" class="form-control form-control-sm"
                                        v-model="account.opening_date">
                                    <!-- <p v-if="errors.types" class="text-danger">{{ errors.types[0] }}</p> -->
                                </div>
                            </div>
                        </template>

                        <!-- <div class="col-md-12">
                            <div class="form-group">
                                <label class="form-label">Account Balance type </label>
                                <input type="text" class="form-control form-control-sm"
                                    v-model="account.opening_balance">
                                <p v-if="errors.types" class="text-danger">{{ errors.types[0] }}</p>
                            </div>
                        </div> -->

                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="form-label">Note </label>
                                <textarea type="text" class="form-control form-control-sm" v-model="account.note"
                                    placeholder="e.g cash account"></textarea>
                                <p v-if="errors.note" class="text-danger">{{ errors.note[0] }}</p>
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
import Select2 from 'vue3-select2-component';

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
    type_pid:'' , 
    account_name: '' , 
    account_code: '' , 
    opening_balance: '', 
    opening_balance_type:'' , 
    opening_date:'', 
    note:''
})
const resetAttr = () => {
    account.value = {
        type_pid: '',
        account_name: '',
        account_code: '',
        opening_balance: '',
        opening_balance_type: '',
        opening_date: '',
        note: ''
    }
}

const editAccount = (data) => {
    account.value = {
        type_pid: data.type_pid,
        account_name: data.account_name,
        account_code: data.account_code,
        opening_balance: data.opening_balance,
        opening_balance_type: data.opening_balance_type,
        opening_date: data.opening_date,
        note: data.note ,
        status: data.status ,
        pid: data.pid ,
        edit: true  ,
    }
    toggleModal.value = true

}

const errors = ref({});

function createAccount() {
    errors.value = []
    store.dispatch('postMethod', { url: '/create-account', param: account.value }).then((data) => {
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

const accounts = ref({})

function loadAccount(url = '/load-accounts') {
    store.dispatch('getMethod', { url: url }).then((data) => {
        if (data?.status == 200) {
            accounts.value = data.data
        }else{
            accounts.value = {}
        }
    }).catch(e => {
        console.log(e);
    })
}


const accountDrop = ref({});
function dropDownAccount() {
    store.dispatch('loadDropdown', 'account-types').then(({ data }) => {
        accountDrop.value = data;
    }).catch(e => {
        console.log(e);
    })
}
dropDownAccount()
loadAccount()

  function nextPage(link) {
        if (!link.url || link.active) {
            return;
        }
        loadAccount(link.url)
    }
</script>

<style scoped></style>
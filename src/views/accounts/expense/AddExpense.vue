<template>
    <div>
        <div class="container mt-2">

            <div class="card">
                <div class="card-header">
                    Expense
                </div>
                <div class="card-body">

                    <fieldset>
                        <form action="">

                            <fieldset class="border rounded-3 p-2 m-1">
                                <legend class="float-none w-auto px-2">Expense Details</legend>

                                <div class="row" v-for="(item, loop) in expense.details" :key="loop">

                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label small">Expense Type</label>
                                            <Select2 v-model="item.account_pid" :options="accountDrop"
                                                :settings="{ width: '100%' }" placeholder="Select Type" />
                                            <p v-if="errors.account_pid" class="text-danger"> {{
                                                errors.item_pid[0] }} </p>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label class="form-label small">Amount</label>
                                            <input type="number" step="0.5" @change="subTotal"
                                                class="form-control form-control-sm" v-model="item.amount"
                                                placeholder="e.g 300000">
                                            <p v-if="errors.amount" class="text-danger">
                                                {{ errors.rate[0] }} </p>
                                        </div>
                                    </div>
                                    <div class="col-md-5">
                                        <div class="form-group">
                                            <label class="form-label small">Description</label>
                                            <div class="input-group">
                                                <input type="text" class="form-control form-control-sm"
                                                    v-model="item.description" placeholder="e.g new consignment">
                                                <button type="button" class="btn btn-danger btn-sm"
                                                    @click="removeQualification(loop)">
                                                    <i class="bi bi-patch-minus"></i> </button>
                                            </div>
                                            <p v-if="errors.description" class="text-danger">
                                                {{ errors.description[0] }} </p>
                                        </div>
                                    </div>




                                </div>
                                <button type="button" class="btn btn-success btn-sm mt-2" @click="addProduct"> <i
                                        class="bi bi-plus"></i> </button>

                            </fieldset>


                            <div class="row">

                                <div class="col-md-4">
                                    <fieldset class="border rounded-3 p-2 m-1">
                                        <legend class="float-none w-auto px-2">Summary</legend>
                                        <input type="text" :value="numberFormat(expense.sub_total)"
                                            class="form-control form-control-sm" disabled placeholder="Sub Total">

                                        <div class="form-group">
                                            <label for="">Date</label>
                                            <input type="date" v-model="expense.date"
                                                class="form-control form-control-sm">
                                        </div>

                                        <div class="form-group">
                                            <label for="">Discount</label>
                                            <input type="number" step="0.5" v-model="expense.discount"
                                                class="form-control form-control-sm" placeholder="Discount">
                                        </div>

                                    </fieldset>
                                </div>

                                <div class="col-md-8">
                                    <fieldset class="border rounded-3 p-2 m-1">
                                        <legend class="float-none w-auto px-2">Payment</legend>
                                       
                                        <div class="row" v-for="(pay, loop) in expense.accounts" :key="loop">
                                            
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label small">Account</label>
                                                    <Select2 v-model="pay.account_pid" :options="accountDrop"
                                                        :settings="{ width: '100%' }" placeholder="Select Account" />
                                                    <p class="text-danger " v-if="errors?.account_pid">{{
                                                        errors?.account_pid[0] }}
                                                    </p>
                                                </div>
                                            </div>
                                            

                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label small">Amount</label>
                                                        <input type="number" v-model="pay.amount" step=".05"
                                                            class="form-control form-control-sm"
                                                            placeholder="Enter Amount" />
                                                        
                                                    <p class="text-danger " v-if="errors?.account_pid">{{
                                                        errors?.account_pid[0] }} </p>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label small">Amount</label>
                                                    <div class="input-group">
                                                        <input type="date" v-model="pay.date"
                                                            class="form-control form-control-sm" />
                                                        <button type="button" class="btn btn-danger btn-sm"
                                                            @click="removeAccount(loop)">
                                                            <i class="bi bi-patch-minus"></i> </button>
                                                    </div>
                                                    <p class="text-danger " v-if="errors?.account_pid">{{
                                                        errors?.account_pid[0] }} </p>
                                                </div>
                                            </div>

                                        </div>

                                        <button type="button" class="btn btn-success btn-sm mt-2" @click="addAccount">
                                            <i class="bi bi-plus"></i> </button>
                                    </fieldset>
                                </div>

                            </div>

                            <button type="button" class="btn btn-primary mt-2" @click="addexpense">Submit</button>
                        </form>
                    </fieldset>

                </div>
            </div>
        </div>


    </div>
</template>

<script setup>
import store from "@/store";
import { ref } from "vue";
import Select2 from 'vue3-select2-component';

import { useHelper } from '@/composables/helper';
const { numberFormat } = useHelper()

const expense = ref({
    sub_total : 0 ,
    discount: 0 ,
    date: '' ,
    details: [{
        account_pid : '' ,        
        description :'' ,
        amount :''
    }],
    accounts: [{
        date: '',
        account_pid: '',
        amount: '',
        note: '',
    }]
})

const resetAttr = () => {
    expense.value = {
        sub_total: 0,
        discount: 0,
        paid: 0,
        details: [{
            account_pid: '',
            description: '',
            amount: ''
        }],
        accounts: [{
            account_pid: '',
            description: '',
            amount: ''
        }]
    }
}

const addProduct = () => {
    expense.value.details.push({
        item_pid: '',
        quantity: '',
        rate: '',
        description: '',
    })
}


const removeQualification = (i) => {
    let len = expense.value.details.length;
    if (len === 1) {
        store.commit('notify', { message: 'One Item is required to proceed', type: 'warning' })
        return;
    }
    expense.value.details.splice(i, 1);
    subTotal()
}

const subTotal = () => {
    expense.value.sub_total = expense.value.details.reduce((n, { amount }) => Number(n) + Number(amount), 0);
}


const addAccount = () => {
    expense.value.accounts.push({
        account_pid: '',
        description: '',
        amount: ''
    })
}

const removeAccount = (i) => {
    let len = expense.value.accounts.length;
    if (len === 1) {
        store.commit('notify', { message: 'One Account is required', type: 'warning' })
        return;
    }
    expense.value.accounts.splice(i, 1);
}

const addexpense = () => {
    errors.value = []
    store.dispatch('postMethod', { url: '/add-expense', param: expense.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data
            console.log(data.data)
        } else if (data?.status == 201) {
            resetAttr()
        }
    }).catch(e => {
        console.log(e);
    })
}

const errors = ref({})

const accountDrop = ref({});
function dropDownAccount() {
    store.dispatch('loadDropdown', 'accounts').then(({ data }) => {
        accountDrop.value = data;
    }).catch(e => {
        console.log(e);
    })
}

dropDownSuppliers()
const supplierDrop = ref({});
function dropDownSuppliers() {
    store.dispatch('loadDropdown', 'suppliers').then(({ data }) => {
        supplierDrop.value = data;
    }).catch(e => {
        console.log(e);
    })
}
dropDownAccount()

// load-expense
</script>

<style scoped>

</style>
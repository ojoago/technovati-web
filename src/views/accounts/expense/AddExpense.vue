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
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="form-label small">Record Expense In</label>
                                    <select class="form-control form-control-sm" v-model="expense.account_type_pid"
                                        @change="dropDownAccount($event.target.value)">
                                        <option value="" selected>Select Type</option>
                                        <option v-for="sec in accountTypeDrop" :key="sec.id" :value="sec.id">{{
                                            sec.text }} </option>
                                    </select>
                                    <p class="text-danger " v-if="errors?.account_type_pid">{{
                                        errors?.account_type_pid}}
                                    </p>
                                </div>
                            </div>
                            <fieldset class="border rounded-3 p-2 m-1">
                                <legend class="float-none w-auto px-2">Expense Details</legend>

                                <div class="row" v-for="(item, loop) in expense.details" :key="loop">

                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label small">Expense Type</label>
                                            <Select2 v-model="item.account_pid" :options="accountDrop"
                                                :settings="{ width: '100%' }" placeholder="Select Type" />
                                            <p v-if="errors[`details.${loop}.account_pid`]" class="text-danger"> {{ errors[`details.${loop}.account_pid`] }} </p>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label class="form-label small">Amount</label>
                                            <input type="number" step="0.5" @change="subTotal"
                                                class="form-control form-control-sm" v-model="item.amount"
                                                placeholder="e.g 300000">
                                            <p v-if="errors[`details.${loop}.amount`]" class="text-danger">
                                                {{errors[`details.${loop}.amount`] }} </p>
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
                                            <p v-if="errors[`details.${loop}.description`]" class="text-danger">
                                                {{ errors[`details.${loop}.description`] }} </p>
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
                                                <p v-if="errors?.date" class="text-danger">
                                                {{ errors?.date }} </p>
                                        </div>

                                        <div class="form-group">
                                            <label for="">Discount</label>
                                            <input type="number" step="0.5" v-model="expense.discount"
                                                class="form-control form-control-sm" placeholder="Discount">
                                                <p v-if="errors?.discount" class="text-danger">
                                                {{ errors?.discount }} </p>
                                        </div>

                                    </fieldset>
                                </div>

                                <div class="col-md-8">
                                    <fieldset class="border rounded-3 p-2 m-1">
                                        <legend class="float-none w-auto px-2">Payment</legend>
                                        <select class="form-control form-control-sm" v-model="expense.payment_account"
                                            @change="dropDownPayment($event.target.value)">
                                            <option value="" selected>Select Type</option>
                                            <option v-for="sec in accountTypeDrop" :key="sec.id" :value="sec.id">{{
                                                sec.text }} </option>
                                        </select>
                                        <div class="row" v-for="(pay, loop) in expense.accounts" :key="loop">

                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label small">Account</label>
                                                    <Select2 v-model="pay.account_pid" :options="paymentDrop"
                                                        :settings="{ width: '100%' }" placeholder="Select Account" />
                                                     <p v-if="errors[`accounts.${loop}.account_pid`]" class="text-danger">{{ errors[`accounts.${loop}.account_pid`] }} </p>
                                                </div>
                                            </div>


                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label small">Amount</label>
                                                    <input type="number" v-model="pay.amount" step=".05"
                                                        class="form-control form-control-sm"
                                                        placeholder="Enter Amount" />
                                                        <p v-if="errors[`accounts.${loop}.amount`]" class="text-danger">{{ errors[`accounts.${loop}.amount`] }} </p>

                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label small">Date</label>
                                                    <div class="input-group">
                                                        <input type="date" v-model="pay.date"
                                                            class="form-control form-control-sm" />
                                                        <button type="button" class="btn btn-danger btn-sm"
                                                            @click="removeAccount(loop)">
                                                            <i class="bi bi-patch-minus"></i> </button>
                                                    </div>
                                                    <p v-if="errors[`accounts.${loop}.date`]" class="text-danger">{{ errors[`accounts.${loop}.date`] }} </p>
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
import { onMounted, ref } from "vue";
import Select2 from 'vue3-select2-component';

import { useHelper } from '@/composables/helper';
import { formatError } from "@/composables/formatError";
const { numberFormat } = useHelper()
const {transformValidationErrors} = formatError()

const expense = ref({
    account_type_pid : '' ,
    payment_account : '' ,
    sub_total : 0 ,
    discount: 0 ,
    date: '' ,
    details: [{
        account_pid : '' ,        
        description :'' ,
        amount :0
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
        payment_account: '',
        account_type_pid: '',
        sub_total: 0,
        discount: 0,
        paid: 0,
        details: [{
            account_pid: '',
            description: '',
            amount: 0
        }],
        accounts: [{
            date: '',

            account_pid: '',
            description: '',
            amount: 0
        }]
    }
}

const addProduct = () => {
    expense.value.details.push({
        account_pid: '',
        description: '',
        amount: 0
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
            errors.value = transformValidationErrors(data.data)
            console.log(errors.value);
            
        } else if (data?.status == 201) {
            resetAttr()
        }
    }).catch(e => {
        console.log(e);
    })
}

const errors = ref({})

const accountTypeDrop = ref({});
function dropDownAccountType() {
    store.dispatch('loadDropdown', 'account-types').then(({ data }) => {
        accountTypeDrop.value = data;
    }).catch(e => {
        console.log(e);
    })
}
dropDownAccountType()

const accountDrop = ref({});
function dropDownAccount(pid) {
    store.dispatch('loadDropdown', 'type-accounts/' + pid).then(({ data }) => {
        accountDrop.value = data;
    }).catch(e => {
        console.log(e);
    })
}

const paymentDrop = ref({});
function dropDownPayment(pid) {
    store.dispatch('loadDropdown', 'type-accounts/' + pid).then(({ data }) => {
        paymentDrop.value = data;
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

onMounted(() => {
      let tsk = localStorage.getItem('TVATI_EDIT_ESP') ? JSON.parse(localStorage.getItem('TVATI_EDIT_ESP')) : 'null'
         if (tsk != 'null') {
            dropDownAccount(tsk.account_type_pid)
            dropDownPayment(tsk.payment_account)
            expense.value = tsk;
         }
   
});

// load-expense
</script>

<style scoped>

</style>
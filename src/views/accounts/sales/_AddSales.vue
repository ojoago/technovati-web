<template>
    <div>
        <div class="container mt-2">

            <div class="card">
                <div class="card-header">
                    Sales
                </div>
                <div class="card-body">

                    <fieldset>
                        <form action="">
                            <div class="col-md-5">
                                <div class="form-group">
                                    <label class="form-label small">Remove from Store</label>
                                    <Select2 v-model="sales.store_pid" :options="storeDrop"
                                        :settings="{ width: '100%' }" placeholder="Select Store" />
                                    <p class="text-danger " v-if="errors?.store_pid">{{
                                        errors?.store_pid[0] }} </p>
                                </div>
                            </div>
                            <fieldset class="border rounded-3 p-2 m-1">
                                <legend class="float-none w-auto px-2">Products</legend>

                                <div class="row" v-for="(item, loop) in sales.items" :key="loop">

                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label class="form-label small">Item</label>
                                            <Select2 v-model="item.item_pid" :options="itemDrop"
                                                :settings="{ width: '100%' }" placeholder="Select Items" />
                                            <p v-if="errors.item_pid" class="text-danger"> {{
                                                errors.item_pid[0] }} </p>
                                        </div>
                                    </div>

                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label class="form-label small">Qty</label>
                                            <input type="number" step="0.5" @change="subTotal"
                                                class="form-control form-control-sm" v-model="item.quantity"
                                                placeholder="e.g 128">
                                            <p v-if="errors.quantity" class="text-danger">{{
                                                errors.quantity[0] }} </p>
                                        </div>
                                    </div>


                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label class="form-label small">Rate</label>
                                            <input type="number" step="0.5" @change="subTotal"
                                                class="form-control form-control-sm" v-model="item.rate"
                                                placeholder="e.g 300000">
                                            <p v-if="errors.rate" class="text-danger">
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
                                        <legend class="float-none w-auto px-2">Store</legend>
                                        <div class="form-group">
                                            <label class="form-label small">Record Sale In</label>
                                            <Select2 v-model="sales.account_pid" :options="accountDrop"
                                                :settings="{ width: '100%' }" placeholder="Select Account" />
                                            <p class="text-danger " v-if="errors?.account_pid">{{ errors?.account_pid[0]
                                                }}
                                            </p>
                                        </div>

                                        <div class="form-group">
                                            <label class="form-label small">Customer</label>
                                            <Select2 v-model="sales.customer_pid" :options="customerDrop"
                                                :settings="{ width: '100%' }" placeholder="Select Customer" />
                                            <p class="text-danger " v-if="errors?.customer_pid">{{
                                                errors?.customer_pid[0] }} </p>
                                        </div>

                                        <div class="form-group">
                                            <label class="form-label small">sales date</label>
                                            <input type="date" class="form-control form-control-sm"
                                                v-model="sales.sales_date">
                                            <p class="text-danger " v-if="errors?.sales_date">{{
                                                errors?.sales_date[0] }} </p>
                                        </div>

                                    </fieldset>

                                </div>

                                <div class="col-md-8">
                                    
                                    <fieldset class="border rounded-3 p-2 m-1">
                                        <legend class="float-none w-auto px-2">Payment, <small>Sub Total {{
                                                numberFormat(sales.sub_total) }}</small></legend>

                                        <br>


                                        <div class="row">
                                            <!-- <div class="col-md-6">
                                                <div class="form-group">
                                                    <input type="text" :value="numberFormat(sales.sub_total)"
                                                        class="form-control form-control-sm" disabled
                                                        placeholder="Sub Total">
                                                </div>
                                            </div> -->

                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="form-label small">Discount</label>
                                                    <input type="number" step="0.5" v-model="sales.discount"
                                                        class="form-control form-control-sm" placeholder="Discount">

                                                </div>
                                            </div>
                                            <div class="col-md-6">

                                                <div class="form-group">
                                                    <label class="form-label small">Tax</label>
                                                    <div class="input-group">
                                                        <input type="text" class="form-control form-control-sm"
                                                            v-model="sales.tax" placeholder="e.g 01234">
                                                        <select v-model="sales.tax_type" class=""
                                                            style="width: 60px !important;">
                                                            <option value="1" selected>%</option>
                                                            <option value="2">Flat</option>
                                                        </select>
                                                    </div>
                                                    <p v-if="errors.tax" class="text-danger">
                                                        {{ errors.tax[0] }} </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row" v-for="(pay,loop) in sales.accounts" :key="loop">

                                            <div class="col-md-5">
                                                <div class="form-group">
                                                    <label class="form-label small">Account</label>
                                                    <Select2 v-model="pay.account_pid" :options="accountDrop"
                                                        :settings="{ width: '100%' }" placeholder="Select Account" />
                                                    <p class="text-danger " v-if="errors?.account_pid">{{
                                                        errors?.account_pid[0]
                                                        }}
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label small">Amount</label>
                                                    <input type="number" v-model="pay.amount" step=".05"
                                                        class="form-control form-control-sm"
                                                        placeholder="Select Account" />

                                                    <p class="text-danger " v-if="errors?.account_pid">{{
                                                        errors?.account_pid[0] }} </p>
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="form-group">
                                                    <label class="form-label small">Date</label>
                                                    <div class="input-group">
                                                        <input type="date" v-model="pay.date" step=".05"
                                                            class="form-control form-control-sm"
                                                            placeholder="Select Account" />
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

                            <button type="button" class="btn btn-primary mt-2" @click="addsales">Submit</button>
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
const {  numberFormat } = useHelper()



const sales = ref({
    account_pid: '' , 
    customer_pid : '' ,
    store_pid : '' ,
    sales_date : '' ,
    tax : '' ,
    tax_type : 1 ,
    sales_no : '' ,
    due_date : '' ,
    bill_to : '' ,
    ship_to : '' ,
    discount: 0,
    sub_total: 0,
    paid: 0,
    balance: 0,
    items: [{
        item_pid: '',
        quantity: '',
        rate: '' ,
        description: '' ,
    }],
    accounts: [{
            account_pid : '' ,
            amount : '' ,
            date:'',
            note:''
        }],
})

const resetAttr = () => {
    sales.value = {
        account_pid: '',
        customer_pid: '',
        store_pid: '',
        sales_date: '',
        tax: '',
        tax_type: '',
        sales_no: '',
        due_date: '',
        bill_to: '',
        ship_to: '',
        discount: 0,
        sub_total: 0,
        paid: 0,
        balance: 0,
        items: [{
            item_pid: '',
            quantity: '',
            rate: '',
            description: '',
        }],
        accounts: [{
            account_pid: '',
            amount: '',
            date: '',
            note: ''
        }],
    }
}

const addProduct = ()=> {
    sales.value.items.push({
        item_pid: '',
        quantity: '',
        rate: '' ,
        description: '',
    })
}


const removeQualification = (i) => {
    let len = sales.value.items.length;
    if (len === 1) {
        store.commit('notify', { message: 'One Item is required to proceed', type: 'warning' })
        return;
    }
    sales.value.items.splice(i, 1);
    subTotal()
}

const subTotal = () => {
    sales.value.items.forEach((item)=>{
        if (item.quantity > 0 && item.rate > 0){
                sales.value.payment.sub_total += item.quantity * item.rate;
            }
    })
    // sales.value.payment.sub_total = sales.value.items.rate.reduce((n, { obtainable }) => n + Number(obtainable), 0);
}


const addAccount = () => {
    sales.value.accounts.push({
        account_pid: '',
        amount: '',
        date: '',
        note: ''
    })
}

const removeAccount = (i) => {
    let len = sales.value.accounts.length;
    if (len === 1) {
        store.commit('notify', { message: 'One Account is required', type: 'warning' })
        return;
    }
    sales.value.accounts.splice(i, 1);
}

const addsales = () => {
    errors.value = []
    store.dispatch('postMethod', { url: '/add-sales', param: sales.value }).then((data) => {
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
const customerDrop = ref({});
function dropDownSuppliers() {
    store.dispatch('loadDropdown', 'customers').then(({ data }) => {
        customerDrop.value = data;
    }).catch(e => {
        console.log(e);
    })
}
dropDownAccount()

const storeDrop = ref({});
function dropDownStore() {
    store.dispatch('loadDropdown', 'stores').then(({ data }) => {
        storeDrop.value = data;
    }).catch(e => {
        console.log(e);
    })
}
dropDownStore()

const itemDrop = ref({});
function dropDownItems() {
    store.dispatch('loadDropdown', 'items').then(({ data }) => {
        itemDrop.value = data;
    }).catch(e => {
        console.log(e);
    })
}
dropDownItems()
// window.$myGlobalMethod();
</script>

<style scoped>

</style>
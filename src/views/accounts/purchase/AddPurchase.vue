<template>
    <div>
        <div class="container mt-2">

            <div class="card">
                <div class="card-header">
                    Purchase
                </div>
                <div class="card-body">

                    <fieldset>
                        <form action="">

                            <fieldset class="border rounded-3 p-2 m-1">
                                <legend class="float-none w-auto px-2">Products</legend>

                                <div class="row" v-for="(item,loop) in purchase.items" :key="loop">

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
                                <div class="col-md-6">
                                    <fieldset class="border rounded-3 p-2 m-1">
                                        <legend class="float-none w-auto px-2">Store</legend>


                                        <div class="form-group">
                                            <label class="form-label small">Record Purchase In</label>
                                            <Select2 v-model="purchase.account_pid" :options="accountDrop"
                                                :settings="{ width: '100%' }" placeholder="Select Account" />
                                            <p class="text-danger " v-if="errors?.account_pid">{{ errors?.account_pid[0]
                                                }}
                                            </p>
                                        </div>
                                        <div class="row">

                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="form-label small">Supplier</label>
                                                    <Select2 v-model="purchase.supplier_pid" :options="supplierDrop"
                                                        :settings="{ width: '100%' }" placeholder="Select Supplier" />
                                                    <p class="text-danger " v-if="errors?.supplier_pid">{{
                                                        errors?.supplier_pid[0] }} </p>
                                                </div>
                                            </div>

                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="form-label small">Store</label>
                                                    <Select2 v-model="purchase.store_pid" :options="storeDrop"
                                                        :settings="{ width: '100%' }" placeholder="Select Store" />
                                                    <p class="text-danger " v-if="errors?.store_pid">{{
                                                        errors?.store_pid[0]
                                                        }} </p>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="form-label small">purchase date</label>
                                                    <input type="date" class="form-control form-control-sm"
                                                        v-model="purchase.purchase_date">
                                                    <p class="text-danger " v-if="errors?.purchase_date">{{
                                                        errors?.purchase_date[0] }} </p>
                                                </div>
                                            </div>
                                            <div class="col-md-6">

                                                <div class="form-group">
                                                    <label class="form-label small">reference Number</label>
                                                    <input type="text" class="form-control form-control-sm"
                                                        v-model="purchase.reference_number" placeholder="e.g 01234">
                                                    <p v-if="errors.reference_number" class="text-danger">
                                                        {{ errors.reference_number[0] }} </p>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>

                                </div>

                                <div class="col-md-6">
                                    <fieldset class="border rounded-3 p-2 m-1">
                                        <legend class="float-none w-auto px-2">Payment</legend>
                                        <input type="text" :value="numberFormat(purchase.payment.sub_total)"
                                            class="form-control form-control-sm" disabled placeholder="Sub Total">
                                        <br>
                                        <input type="number" step="0.5" v-model="purchase.payment.discount"
                                            class="form-control form-control-sm" placeholder="Discount">

                                        <div class="row" v-for="(pay,loop) in purchase.payment.accounts" :key="loop">

                                            <div class="col-md-6">
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
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="form-label small">Amount</label>
                                                    <div class="input-group">
                                                        <input type="number" v-model="pay.amount" step=".05"
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

                            <button type="button" class="btn btn-primary mt-2" @click="addPurchase">Submit</button>
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

import { useStringFormatter } from '@/composables/helper';
const {  numberFormat } = useStringFormatter()

const purchase = ref({
    account_pid: '' , 
    supplier_pid : '' ,
    store_pid : '' ,
    purchase_date : '' ,
    reference_number : '' ,
    purchase_no : '' ,
    due_date : '' ,
    bill_to : '' ,
    ship_to : '' ,
    items: [{
        item_pid: '',
        quantity: '',
        rate: '' ,
        description: '' ,
    }],
    payment:{
        discount : 0 ,
        sub_total : 0 ,
        accounts : [{
            account_pid : '' ,
            amount : '' ,
        }]
    }
})

const resetAttr = () => {
    purchase.value = {
        account_pid: '',
        supplier_pid: '',
        purchase_date: '',
        reference_number: '',
        purchase_no: '',
        due_date: '',
        bill_to: '',
        ship_to: '',
        items: [{
            item_pid : '' ,
            quantity : '' ,
            rate : '',
            description: '',
        }],
        payment: {
            discount: 0,
            sub_total: 0,
            accounts: [{
                account_pid: '',
                amount: '',
            }]
        }
    }
}

const addProduct = ()=> {
    purchase.value.items.push({
        item_pid: '',
        quantity: '',
        rate: '' ,
        description: '',
    })
}


const removeQualification = (i) => {
    let len = purchase.value.items.length;
    if (len === 1) {
        store.commit('notify', { message: 'One Item is required to proceed', type: 'warning' })
        return;
    }
    purchase.value.items.splice(i, 1);
    subTotal()
}

const subTotal = () => {
    purchase.value.items.forEach((item)=>{
        if (item.quantity > 0 && item.rate > 0){
                purchase.value.payment.sub_total += item.quantity * item.rate;
            }
    })
    // purchase.value.payment.sub_total = purchase.value.items.rate.reduce((n, { obtainable }) => n + Number(obtainable), 0);
}


const addAccount = () => {
    purchase.value.payment.accounts.push({
        account_pid: '',
        amount: '',
    })
}

const removeAccount = (i) => {
    let len = purchase.value.payment.accounts.length;
    if (len === 1) {
        store.commit('notify', { message: 'One Account is required', type: 'warning' })
        return;
    }
    purchase.value.payment.accounts.splice(i, 1);
}

const addPurchase = () => {
    errors.value = []
    store.dispatch('postMethod', { url: '/add-purchase', param: purchase.value }).then((data) => {
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
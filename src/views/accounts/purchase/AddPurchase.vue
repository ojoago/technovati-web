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
                                            <p v-if="errors[`item_pid${loop}`]" class="text-danger"> {{
                                                errors[`item_pid${loop}`] }} </p>
                                        </div>
                                    </div>

                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label class="form-label small">Qty</label>
                                            <input type="number" step="0.5" @change="subTotal"
                                                class="form-control form-control-sm" v-model="item.quantity"
                                                placeholder="e.g 128">
                                            <p v-if="errors[`quantity${loop}`]" class="text-danger">{{
                                                errors[`quantity${loop}`] }} </p>
                                        </div>
                                    </div>


                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label class="form-label small">Rate</label>
                                            <input type="number" step="0.5" @change="subTotal"
                                                class="form-control form-control-sm" v-model="item.rate"
                                                placeholder="e.g 300000">
                                            <p v-if="errors[`rate${loop}`]" class="text-danger">
                                                {{ errors[`rate${loop}`] }} </p>
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
                                                {{ errors.description }} </p>
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
                                            <select class="form-control form-control-sm" v-model="purchase.account_pid"
                                                @change="dropDownAccount($event.target.value)">
                                                <option value="" selected>Select Type</option>
                                                <option v-for="sec in accountTypeDrop" :key="sec.id" :value="sec.id">{{
                                                    sec.text }} </option>
                                            </select>
                                            <p class="text-danger " v-if="errors?.account_pid">{{ errors?.account_pid
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
                                                        errors?.supplier_pid }} </p>
                                                </div>
                                            </div>

                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="form-label small">Store</label>
                                                    <Select2 v-model="purchase.store_pid" :options="storeDrop"
                                                        :settings="{ width: '100%' }" placeholder="Select Store" />
                                                    <p class="text-danger " v-if="errors?.store_pid">{{
                                                        errors?.store_pid
                                                        }} </p>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="form-label small">purchase date</label>
                                                    <input type="date" class="form-control form-control-sm"
                                                        v-model="purchase.purchase_date">
                                                    <p class="text-danger " v-if="errors?.purchase_date">{{
                                                        errors?.purchase_date }} </p>
                                                </div>
                                            </div>
                                            <div class="col-md-6">

                                                <div class="form-group">
                                                    <label class="form-label small">reference Number</label>
                                                    <input type="text" class="form-control form-control-sm"
                                                        v-model="purchase.reference_number" placeholder="e.g 01234">
                                                    <p v-if="errors.reference_number" class="text-danger">
                                                        {{ errors.reference_number }} </p>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>

                                </div>

                                <div class="col-md-6">
                                    <fieldset class="border rounded-3 p-2 m-1">
                                        <legend class="float-none w-auto px-2">Payment</legend>
                                        <input type="text" :value="numberFormat(purchase.sub_total)"
                                            class="form-control form-control-sm" disabled placeholder="Sub Total">
                                        <br>
                                        <label for="">Discount</label>
                                        <input type="number" step="0.5" v-model="purchase.discount"
                                            class="form-control form-control-sm" placeholder="Discount">

                                        <div class="row" v-for="(pay,loop) in purchase.accounts" :key="loop">

                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="form-label small">Account</label>
                                                    <Select2 v-model="pay.account_pid" :options="accountDrop"
                                                        :settings="{ width: '100%' }" placeholder="Select Account" />
                                                    <p class="text-danger " v-if="errors[`account_pid${loop}`]">{{
                                                        errors[`account_pid${loop}`]
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
                                                    <p class="text-danger " v-if="errors[`amount${loop}`]">{{
                                                        errors[`amount${loop}`] }} </p>
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
import { onMounted, ref } from "vue";
import Select2 from 'vue3-select2-component';
import { useHelper } from '@/composables/helper';
import { formatError } from "@/composables/formatError";
const {  transformValidationErrors } = formatError()
const {  numberFormat } = useHelper()

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
    accounts : [{
            account_pid : '' ,
            amount : '' ,
        }],
        discount : 0 ,
        sub_total : 0 ,
    // payment:{
        
        
    // }
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
        accounts: [{
                account_pid: '',
                amount: '',
            }],
             discount : 0 ,
        sub_total : 0 ,
        // payment: {
        //     discount: 0,
        //     sub_total: 0,
            
        // }
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
                purchase.value.sub_total += item.quantity * item.rate;
            }
    })
    // purchase.value.payment.sub_total = purchase.value.items.rate.reduce((n, { obtainable }) => n + Number(obtainable), 0);
}


const addAccount = () => {
    purchase.value.accounts.push({
        account_pid: '',
        amount: '',
    })
}

const removeAccount = (i) => {
    let len = purchase.value.accounts.length;
    if (len === 1) {
        store.commit('notify', { message: 'One Account is required', type: 'warning' })
        return;
    }
    purchase.value.accounts.splice(i, 1);
}

const addPurchase = () => {
    errors.value = []
    store.dispatch('postMethod', { url: '/add-purchase', param: purchase.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = transformValidationErrors(data.data)
            // console.log(data.data)
        } else if (data?.status == 201) {
            resetAttr()
        }
    }).catch(e => {
        console.log(e);
    })
}

const errors = ref({})

const accountDrop = ref({});
function dropDownAccount(pid) {
    store.dispatch('loadDropdown', 'type-accounts/' + pid).then(({ data }) => {
        accountDrop.value = data;
    }).catch(e => {
        console.log(e);
    })
}



const accountTypeDrop = ref({});
function dropDownAccountType() {
    store.dispatch('loadDropdown', 'account-types').then(({ data }) => {
        accountTypeDrop.value = data;
    }).catch(e => {
        console.log(e);
    })
}
dropDownAccountType()

dropDownSuppliers()
const supplierDrop = ref({});
function dropDownSuppliers() {
    store.dispatch('loadDropdown', 'suppliers').then(({ data }) => {
        supplierDrop.value = data;
    }).catch(e => {
        console.log(e);
    })
}

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


onMounted(() => {
      let tsk = localStorage.getItem('TVATI_EDIT_PRC') ? JSON.parse(localStorage.getItem('TVATI_EDIT_PRC')) : 'null'
         if (tsk != 'null') {
            purchase.value = tsk;
            purchase.value.accounts = tsk?.payment?.payment_details
            purchase.value.account_pid = tsk?.account_type_pid
            dropDownAccount(tsk?.account_type_pid)
         }
   
});
// window.$myGlobalMethod();
</script>

<style scoped>

</style>
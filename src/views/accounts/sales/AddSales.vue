<template>
    <div>
        <div class="container mt-2">
            <div class="card">
                <div class="card-header">
                    <div class="row">
                        <div class="col-md-6">
                           <h3>Add Sales</h3>
                        </div>
                        
                    </div>
                </div>
                <div class="card-body">

                    <input type="text" class=" form-control form-control-sm" placeholder="search Item">
                    <div class="table-responsive">
                        <table class="table-hover table-stripped table-bordered table">
                            <thead>
                                <tr>
                                    <th width="5%">SN</th>
                                    <th>Name</th>
                                    <!-- <th>Model</th> -->
                                    <th>Quantity</th>
                                    <!-- <th>Description</th> -->
                                    <th align="center"> <i class="bi bi-gear-fill"></i> </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, loop) in items?.data" :key="loop">
                                    <td>{{ loop + 1 }}</td>
                                    <td>{{ item.name }}</td>
                                    <!-- <td>{{ item.model }} </td> -->
                                    <td>{{ item?.quantity ?? 0 }} {{ item.unit }}</td>
                                    <td>
                                        <button v-if="item?.quantity > 0" @click="addItem(item)" type="button"
                                            class="btn btn-primary btn-sm">
                                            <i class="bi bi-plus"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>

                    <form id="itemForm" v-if="sales.items.length">
                        <hr>

                        <div class="row">
                            <div class="col-md-5">
                                <fieldset class="border rounded-3 p-1" id="requestBody">
                                    <legend class="float-none w-auto px-2 h5">Request Items</legend>

                                    <fieldset class="border rounded-3 p-2 m-1">
                                        <div class="row" v-for="(item, loop) in sales.items" :key="loop">
                                            <div class="col-md-12">
                                                <label class="form-label">{{ item.name }} </label>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="form-label">Qty</label>
                                                    <div class="input-group">
                                                        <span class="bg-light p-1">#{{ item.qnt }}</span>
                                                        <input type="number" v-model="item.quantity" @change="subTotal"
                                                            class="form-control" placeholder="e.g 100">

                                                    </div>
                                                    <p class="text-danger " v-if="errors[`items.${loop}.quantity`]">{{ errors[`items.${loop}.quantity`] }} </p>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="" class="form-label">Rate</label>
                                                    <div class="input-group">
                                                        <input type="number" v-model="item.rate" @change="subTotal"
                                                            class="form-control" placeholder="e.g 30000">
                                                        <button type="button" class="btn btn-danger btn-sm"
                                                            @click="removeitem(loop)"> <i
                                                                class="bi bi-file-minus-fill"></i>
                                                        </button>
                                                    </div>
                                                    <p class="text-danger " v-if="errors[`items.${loop}.rate`]">{{ errors[`items.${loop}.rate`] }} </p>
                                                </div>
                                            </div>

                                        </div>
                                    </fieldset>

                                    <div class="row">

                                        <div class="col-md-12">
                                            <label class="form-label">Customer</label>
                                            <Select2 v-model="sales.customer_pid" :options="customerDrop"
                                                :settings="{ width: '100%' }" placeholder="Select Customer" />

                                            <p class="text-danger " v-if="errors?.customer_pid">{{
                                                errors?.customer_pid }} </p>
                                        </div>
                                    </div>



                                </fieldset>
                            </div>
                            <div class="col-md-7">
                                <fieldset class="border rounded-3 p-2 m-1">
                                    <legend class="float-none w-auto px-2">Payment, <small>Sub Total {{
                                            numberFormat(sales.sub_total) }}</small></legend>

                                    <br>


                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label for="">Bill to</label>
                                                <textarea class="form-control form-control-sm" placeholder="Bill to"
                                                    v-model="sales.bill_to"></textarea>
                                                <p class="text-danger " v-if="errors?.bill_to">{{ errors?.bill_to }} </p>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label for="">Ship to</label>
                                                <textarea class="form-control form-control-sm" placeholder="Ship to"
                                                    v-model="sales.ship_to"></textarea>
                                                <p class="text-danger " v-if="errors?.ship_to">{{ errors?.ship_to }} </p>
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="form-label small">Discount</label>
                                                <input type="number" step="0.5" @change="sumPaid"
                                                    v-model="sales.discount" class="form-control form-control-sm"
                                                    placeholder="Discount">
                                                <p class="text-danger " v-if="errors?.discount">{{ errors?.discount }} </p>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="form-label small">Tax</label>
                                                <div class="input-group">
                                                    <input type="text" class="form-control form-control-sm"
                                                        v-model="sales.tax" @change="sumPaid" placeholder="e.g 3%">
                                                    <select v-model="sales.tax_type" @change="sumPaid" class=""
                                                        style="width: 60px !important;">
                                                        <option value="1" selected>%</option>
                                                        <option value="2">Flat</option>
                                                    </select>
                                                </div>
                                                <p v-if="errors.tax" class="text-danger">
                                                    {{ errors.tax}} </p>
                                            </div>
                                        </div>

                                    </div>


                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class=" small">Total</label>
                                                <input type="text" readonly :value="grand_total"
                                                    class="form-control form-control-sm" placeholder="Total" />
                                            </div>

                                        </div>
                                        <div class="col-md-6">

                                            <div class="form-group">
                                                <label class=" small">Tax Value</label>
                                                <input type="text" readonly v-model="sales.tax_value"
                                                    class="form-control form-control-sm" placeholder="Tax Value" />
                                                <p class="text-danger " v-if="errors?.tax_value">{{errors?.tax_value }}</p>

                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class=" small">Grand Total</label>
                                        <input type="text" readonly :value="grand_total"
                                            class="form-control form-control-sm" placeholder="Select Account" />
                                    </div>

                                    
                                    <hr>

                                    <div class="col-md-12">
                                            <label class="form-label small">Record Sale In</label>
                                            <select class="form-control" v-model="sales.account_type_pid"
                                                @change="dropDownAccount($event.target.value)">
                                                <option value="" selected>Select Type</option>
                                                <option v-for="sec in accountTypeDrop" :key="sec.id" :value="sec.id">{{
                                                    sec.text }} </option>
                                            </select>

                                            <p class="text-danger " v-if="errors?.account_pid">{{
                                                errors?.account_pid }} </p>
                                        </div>

                                    <div class="row" v-for="(pay, loop) in sales.accounts" :key="loop">

                                        <div class="col-md-5">
                                            <div class="form-group">
                                                <label class="form-label small">Account</label>
                                                <Select2 v-model="pay.account_pid" :options="accountDrop"
                                                    :settings="{ width: '100%' }" placeholder="Select Account" />
                                                <p class="text-danger " v-if="errors[`accounts.${loop}.account_pid`]">{{errors[`accounts.${loop}.account_pid`] }}</p>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="form-label small">Amount</label>
                                                <input type="number" v-model="pay.amount" @change="sumPaid" step=".05"
                                                    class="form-control form-control-sm" placeholder="e.g 200000" />
                                                <p class="text-danger " v-if="errors[`accounts.${loop}.amount`]">{{errors[`accounts.${loop}.amount`] }}</p>

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
                                                <p class="text-danger " v-if="errors[`accounts.${loop}.date`]">{{errors[`accounts.${loop}.date`] }}</p>

                                            </div>
                                        </div>

                                    </div>
                                     <button type="button" class="btn btn-success btn-sm mt-2" @click="addAccount">
                                        <i class="bi bi-plus"></i> </button>
                                    <hr>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class=" small">Paid</label>
                                                <input type="text" readonly v-model="sales.paid"
                                                    class="form-control form-control-sm" placeholder="Amount Paid" />
                                            </div>

                                        </div>
                                        <div class="col-md-6">

                                            <div class="form-group">
                                                <label class=" small">Balance</label>
                                                <input type="text" readonly v-model="sales.balance"
                                                    class="form-control form-control-sm" placeholder="Balance" />
                                            </div>
                                        </div>
                                    </div>
                                   

                                </fieldset>
                                <div class="text-center">
                                    <button type="button" class="btn btn-success mt-2 mb-2"
                                        @click="addSales">Submit</button>
                                </div>
                            </div>


                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import store from "@/store";
import { onMounted, ref } from "vue";
import Select2 from 'vue3-select2-component';
// import { useRouter } from 'vue-router';
import { useHelper } from '@/composables/helper';
import { formatError } from "@/composables/formatError";
const { numberFormat } = useHelper()
const { transformValidationErrors } = formatError()
// const router = useRouter()
const errors = ref({});
const items = ref({});

const sales = ref({
    account_type_pid: '',
    customer_pid: '',
    store_pid: '',
    sales_date: '',
    tax: 0,
    tax_value: 0,
    tax_type: 1,
    sales_no: '',
    due_date: '',
    bill_to: '',
    ship_to: '',
    discount: 0,
    sub_total: 0,
    paid: 0,
    balance: 0,
    items: [],
    accounts: [{
        account_pid: '',
        amount: '',
        date: '',
        note: ''
    }],
});

const resetAttr = () => {
    sales.value = {
        account_type_pid: '',
        customer_pid: '',
        store_pid: '',
        sales_date: '',
        tax: 0,
        tax_value: 0,
        tax_type: 1,
        sales_no: '',
        due_date: '',
        bill_to: '',
        ship_to: '',
        discount: 0,
        sub_total: 0,
        paid: 0,
        balance: 0,
        items: [],
        accounts: [{
            account_pid: '',
            amount: '',
            date: '',
            note: ''
        }],
    }
}

const addItem = (item) => {
    var index = sales.value.items.findIndex(x => x.item_pid == item.pid)
    if (index === -1) {
        sales.value.items.push({
            item_pid: item.pid,
            quantity: 1,
            rate: '',
            qnt: item?.quantity,
            name: item.name,
        })
    } else {
        if (sales.value.items[index].quantity < item?.quantity) {
            sales.value.items[index].quantity++
            subTotal()
        } else {
            store.commit('notify', { message: `quantity remaining is : ${sales.value.items[index].quantity}`, type: 'warninig' })
        }
    }
}

const removeitem = (i) => {
    // let len = request.value.items.length;
    // if (len === 1) {
    //     store.commit('notify', { message: 'Qualification requires at least one instituion', type: 'warning' })
    //     return;
    // }
    sales.value.items.splice(i, 1);
    subTotal()
}


const subTotal = () => {
    sales.value.sub_total = 0
    sales.value.items.forEach((item) => {
        if (item.quantity > 0 && item.rate > 0) {
            sales.value.sub_total += item.quantity * item.rate;
        }
        sumPaid()
    })
}

const grand_total = ref(0)

const sumPaid = () => {
    let s=0
    sales.value.accounts.forEach((item) => {
        if (item.amount > 0) {
            s += item.amount;
        }
    })
    if (sales.value.tax_type == 1) {
        sales.value.tax_value = sales.value.tax * sales.value.sub_total / 100
    } else {
        sales.value.tax_value = sales.value.tax + sales.value.sub_total
    }
    let b = sales.value.sub_total + sales.value.tax_value - sales.value.discount - s;
    grand_total.value = numberFormat(sales.value.sub_total + sales.value.tax_value - sales.value.discount)
    sales.value.paid = numberFormat(s)
    sales.value.balance =  numberFormat(b)
    let value = sales.value.tax_value
    sales.value.tax_value = numberFormat(value)
}

// const vat = () => {
//     if (sales.value.tax_type == 1) {
//         sales.value.tax_value = sales.value.tax * sales.value.sub_total / 100
//     } else {
//         sales.value.tax_value = sales.value.tax + sales.value.sub_total
//     }
//     sumPaid()
// }


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


const addSales = () => {
    errors.value = []
    sales.value.store_pid = selectedStore.value
    store.dispatch('postMethod', { url: '/add-sales', param: sales.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = transformValidationErrors(data.data) 
        } else if (data?.status == 201) {
            resetAttr()
        }
    }).catch(e => {
        console.log(e);
    })
}

const selectedStore = ref('finisedproducts')

loadItem()

function loadItem() {
    resetAttr()
   
    store.dispatch('getMethod', { url: '/load-cr-out-items'}).then((data) => {
        if (data?.status == 200) {
            items.value = data.data;
        }else{
            items.value = []
        }
       
    }).catch(e => {
        console.log(e);
    })
}

if (sales.value.items){
    loadStateRes()
}

const customerDrop = ref([]);

function loadStateRes() {
    store.dispatch('loadDropdown', 'customers' ).then(({ data }) => {
        customerDrop.value = data;
    }).catch(e => {
        console.log(e);
    })
}

const stores = ref({})
function dropdownSection() {
    store.dispatch('loadDropdown', 'stores').then(({ data }) => {
        if (data.length == 1) {
            loadItem(data[0].id)
        }
        stores.value = data;
    }).catch(e => {
        console.log(e);
    })
}
dropdownSection()

const accountDrop = ref({});
function dropDownAccount(pid) {
    sales.value.accounts = [{
        account_pid: '',
        amount: '',
        date: '',
        note: ''
    }]
    store.dispatch('loadDropdown', 'type-accounts/'+pid).then(({ data }) => {
        accountDrop.value = data;
    }).catch(e => {
        console.log(e);
    })
}
dropDownAccount()

const accountTypeDrop = ref({});
function dropDownAccountType() {
    store.dispatch('loadDropdown', 'account-types').then(({ data }) => {
        accountTypeDrop.value = data;
    }).catch(e => {
        console.log(e);
    })
}
dropDownAccountType()


onMounted(() => {
      let tsk = localStorage.getItem('TVATI_EDIT_SLS') ? JSON.parse(localStorage.getItem('TVATI_EDIT_SLS')) : 'null'
         if (tsk != 'null') {
            loadItem(tsk.store_pid)
            dropDownAccount(tsk.account_type_pid)
            sales.value  = tsk;
            sales.value.old_accounts  = tsk.accounts;
            subTotal()
         }
   
});

</script>

<style scoped>


</style>
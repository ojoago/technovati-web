<template>
    <div>
        <div class="container mt-2">

            <div class="card">
                <div class="card-header">
                    Add Journal
                </div>
                <div class="card-body">
                    <form>
                        <fieldset class="border rounded-3 p-1 m-1">
                            <legend class="float-none w-auto px-2  small">Entries</legend>
                            <div class="row">
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label class="form-label small">Date</label>
                                        <input v-model="journal.date" type="date" class="form-control form-control-sm"
                                            placeholder="e.g 2000000">
                                        <p class="text-danger " v-if="errors?.date">{{ errors?.date[0] }} </p>
                                    </div>
                                </div>
                                <div class="col-md-9">
                                    <div class="form-group">
                                        <label class="form-label small">Comment</label>
                                        <input v-model="journal.comments" type="text"
                                            class="form-control form-control-sm" placeholder="e.g all entries for today">
                                        <p class="text-danger " v-if="errors?.comments">{{ errors?.comments[0] }} </p>
                                    </div>
                                </div>
                            </div>
                            <template v-for="(entry, i) in journal.entries" :key="i">


                                <div class="row">
                                    <div class="col-md-5">
                                        <div class="form-group">
                                            <label class="form-label small">Account</label>
                                            <select v-model="entry.account" @change="reduceArray($event)"
                                                class="form-control form-control-sm">
                                                <option value="" selected>Select Account</option>
                                                <option v-for="(op,i) in accountDrop" :value="op.id" :key="i"> {{
                                                    op.text }}</option>
                                            </select>
                                            <!-- <p class="text-danger " v-if="errors?.customer_pid">{{ errors?.customer_pid[0] }} </p> -->
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label small">Amount</label>
                                            <input v-model="entry.amount" step="0.5" type="number"
                                                class="form-control form-control-sm" placeholder="e.g 2000000">
                                            <!-- <p class="text-danger " v-if="errors?.customer_pid">{{ errors?.customer_pid[0] }} </p> -->
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label class="form-label small">Type</label>
                                            <div class="input-group">
                                                <CustomRadio v-model="entry.type" value1="cr" label1="Credit"
                                                    value2="dr" label2="Debit" :name="`${i}`" :checked="entry.check" />
                                                <i class="mx-1">|</i> <button type="button"
                                                    class="btn btn-danger btn-sm" @click="removeKey"> <i
                                                        class="bi bi-file-minus-fill"></i>
                                                </button>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </template>
                        </fieldset>

                        <button @click="addItem(item)" type="button" class="btn btn-primary btn-sm">
                            <i class="bi bi-plus"></i>
                        </button>
                        <hr>
                        <button @click="addJournal" type="button" class="btn btn-primary btn-sm">
                            Submit
                        </button>


                    </form>

                </div>
            </div>
        </div>



    </div>
</template>

<script setup>
import store from "@/store";
import { ref } from "vue";
// import Select2 from 'vue3-select2-component';
import CustomRadio from '@/components/forms/CustomRadioReadOnly.vue';
const journal = ref({
    date : '',
    comments : '' ,
    entries:[
        {
            account : '', 
            amount: '', 
            type : 'cr',
            check:1,
        }
    ]
})
const resetAttr = () => {
    journal.value = {
        type_pid: '',
        account_name: '',
        opening_balance: '',
        opening_balance_type: '',
        opening_date: '',
        note: ''
    }
}

// const editAccount = (data) => {
//     journal.value = {
//         type_pid: data.type_pid,
//         account_name: data.account_name,
//         opening_balance: data.opening_balance,
//         opening_balance_type: data.opening_balance_type,
//         opening_date: data.opening_date,
//         note: data.note,
//         status: data.status,
//         pid: data.pid,
//         edit: true,
//     }
//     toggleModal.value = true
//     addJournal()
// }

const reduceArray = (event) => {
    let x = accountDrop.value.filter(obj => obj.id !== event.target.value);
   console.log(x);
    // accountDrop.value = x
}
let iteration = 1;

const addItem = () => {
    iteration++
    journal.value.entries.push({
        account: '',
        amount: '',
        type: checkEvenOdd(iteration) , 
        check: checkEvenOdd(iteration) == 'cr' ? 1 : 0 , 
    })
}

function checkEvenOdd(number) {
    if (number % 2 === 0) {
        return 'dr';
    } else {
        return 'cr';
    }
}

const removeKey = (i) => {
    
    journal.value.entries.splice(i, 1);
}


const errors = ref({});

function addJournal() {
    errors.value = []
    store.dispatch('postMethod', { url: '/add-journal', param: journal.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data
        } else if (data?.status == 201) {
            resetAttr()
            loadAccount()
        }
    }).catch(e => {
        console.log(e);
    })
}

const accounts = ref({})

function loadAccount() {
    store.dispatch('getMethod', { url: '/load-accounts' }).then((data) => {
        if (data?.status == 200) {
            accounts.value = data.data
        } else {
            accounts.value = {}
        }
    }).catch(e => {
        console.log(e);
    })
}


const accountDrop = ref({});
function dropDownAccount() {
    store.dispatch('loadDropdown', 'accounts').then(({ data }) => {
        accountDrop.value = data;
    }).catch(e => {
        console.log(e);
    })
}
dropDownAccount()
loadAccount()

</script>

<style scoped>

</style>
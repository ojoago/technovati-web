<template>
    <div>
         <fieldset class="border rounded-3 p-2 m-1">
                                        <legend class="float-none w-auto px-2">Bank</legend>
                                        <form >
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Bank Name <span class="text-danger">*</span></label>
                                                        <input type="text" v-model="bank.bank" class="form-control form-control-sm" placeholder="e.g intercontinental bank plc ">
                                                        <p class="text-danger " v-if="b_errors?.bank">{{ b_errors?.bank[0] }}</p>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Account Name <span class="text-danger">*</span></label>
                                                        <input type="text" v-model="bank.account_name" class="form-control form-control-sm" placeholder="e.g tripleseventh ltd ">
                                                        <p class="text-danger " v-if="b_errors?.account_name">{{ b_errors?.account_name[0] }}</p>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Account Number </label>
                                                        <input type="text" minlength="10" v-model="bank.account_number" maxlength="10" class="form-control form-control-sm" placeholder="e.g xxxxxxxxxx">
                                                        <p class="text-danger " v-if="b_errors?.account_number">{{ b_errors?.account_number[0] }}</p>
                                                    </div>
                                                </div>

                                            </div>
    
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">BVN </label>
                                                        <input type="text" v-model="bank.bvn" maxlength="11" class="form-control form-control-sm" placeholder=" xxxxxxxxxx">
                                                        <p class="text-danger " v-if="b_errors?.bvn">{{ b_errors?.bvn[0] }}</p>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">account Type </label>
                                                        <select v-model="bank.account_type" class="form-control form-control-sm">
                                                            <option value="" selected>Select Option</option>
                                                            <option >Savings</option>
                                                            <option >Current</option>
                                                        </select>
                                                        <p class="text-danger " v-if="b_errors?.account_type">{{ b_errors?.account_type[0] }}</p>
                                                    </div>
                                               
                                                </div>
                                                <div class="col-md-4">
                                               
                                                    <div class="form-group">
                                                        <label class="form-label">sort code </label>
                                                        <input type="text" v-model="bank.sort_code" class="form-control form-control-sm" placeholder="e.g 301">
                                                        <p class="text-danger " v-if="b_errors?.sort_code">{{ b_errors?.sort_code[0] }}</p>
                                                    </div>
                                                </div>

                                            </div>
                                     

                                            <button type="button" class="btn btn-success btn-sm mt-2" @click="staffBankDetail">Submit</button>
                                        </form>
                            </fieldset>
    </div>
</template>

<script setup>
import store from "@/store";
import { ref,onMounted } from "vue";
const props = defineProps({
    user_pid: String,
});
const b_errors = ref({});
const bank = ref({
    'bank': '',
    'account_name': '',
    'sort_code': '',
    'account_number': '',
    'bvn': '',
    'account_type': '',
    'user_pid': props.user_pid,
});

let query = {}
function staffBankDetail() {
           b_errors.value = []
    store.commit('setSpinner', true)
    store.dispatch('postMethod', { url: '/add-bank-detail', param: bank.value }).then((data) => {
        store.commit('setSpinner', false)
        if (data.status == 422) {
             b_errors.value = data.data
        } else if (data.status == 201) {
           b_errors.value = []
            bank.value = [];
            query = { tab: 'work-tab', 'id': data?.data?.user_pid }
            localStorage.setItem('TVATI_ONBOARD_TAB', JSON.stringify(query, null, 2))
            switchTab()
        }
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
        alert('weting be this')
    })
}


const emit = defineEmits(['currentTab'])

function switchTab() {
    emit('currentTab')
}
onMounted(() => {
    let q = localStorage.getItem('TVATI_ONBOARD_TAB') ? JSON.parse(localStorage.getItem('TVATI_ONBOARD_TAB')) : 'null'
    if (q != 'null') {
        bank.value.user_pid = q.id
    }
})

</script>

<style scoped></style>
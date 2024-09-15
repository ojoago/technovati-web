<template>
    <div>
        <div class="container my-2">

            <div class="card">
                <div class="card-body">
                    <RequestDetail :data="details" />

                    <hr>

                    <div class="row">
                        <div class="col-md-6">
                            <label for="" class="h4">Budgets</label>
                            <!-- <button class="btn btn-primary btn-sm m-1">Add</button> -->
                            {{ budget_status }}
                            <div class="table-responsive">
                                <table class="table table-hover table-stripped table-bordered">
                                    <thead>
                                        <tr>
                                            <th width="5%">S/N</th>
                                            <th>Item</th>
                                            <th>Amount</th>
                                            <th>Approved Amount</th>
                                            <th>Status</th>
                                            <th> Approve? </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(budget,loop) in budgets" :key="loop">
                                            <td>{{ loop + 1 }}</td>
                                            <td>{{ budget.budget }}</td>
                                            <td>{{ budget.amount }}</td>
                                            <td> <input type="number" step=".5" v-model="budget.approved" class="form-control form-control-sm"> </td>
                                            <td>{{ status[budget.status] }}</td>
                                            <td>

                                                <div class="input-group">
                                                    <input type="radio" id="yes" :name="budget.id" value="1" v-model="budget.status" />
                                                    <label for="yes">Yes</label> <i class="m-2"></i>
                                                    <input type="radio" id="no" :name="budget.id" value="2" v-model="budget.status" />
                                                    <label for="no">No</label>
                                                </div>

                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody >
                                        <tr>
                                            <td colspan="5"></td>
                                            <td>
                                                <button class="btn btn-sm btn-success"
                                                    @click="approveBudget">Update</button>

                                            </td>
                                           <!--  <td>
                                                <button class="btn btn-sm btn-secondary"
                                                    @click="rejectBudget">Reject</button>
                                            </td> -->
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <label for="" class="h4">Expenses</label>
                            <!-- <button class="btn btn-primary btn-sm m-1">Add</button> -->
                            <div class="table-responsive">
                                <table class="table table-hover table-stripped table-bordered">
                                    <thead>
                                        <tr>
                                            <th width="5%">S/N</th>
                                            <th>Item</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                            <th> <i class="bi bi-gear-fill"></i> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(expense, loop) in expenses" :key="loop">
                                            <td>{{ loop + 1 }}</td>
                                            <td>{{ expense.expense }}</td>
                                            <td>{{ expense.amount }}</td>
                                            <td>{{ status[expense.status] }}</td>
                                            <td>
                                                <input type="checkbox" v-if="!expense.status" :value="expense.id"
                                                    v-model="reject.expenses">
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody v-if="reject.expenses.length">
                                        <tr>
                                            <td colspan="3"></td>
                                            <td>
                                                <button class="btn btn-sm btn-success"
                                                    @click="approveExpense">Approve</button>
                                            </td>
                                            <td>
                                                <button class="btn btn-sm btn-secondary"
                                                    @click="rejectExpense">Reject</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>




    </div>
</template>

<script setup>
import { ref , onMounted } from "vue";
import store from "@/store";

import RequestDetail from '@/components/travel/RequestDetailComponent.vue'
// import { useRouter } from 'vue-router';

// const router = useRouter()
// let query = {}
// router.push({ query: query })

const details = ref({});

const status = ['Pending','Approved', 'Rejected','Cancel'];

const expenses = ref({})

const budgets = ref({})
onMounted(() => {
    let rqs = localStorage.getItem('TVATI_TRV_RQS_DETAIL') ? JSON.parse(localStorage.getItem('TVATI_TRV_RQS_DETAIL')) : 'null'
    // console.log(rqs);
    if (rqs != 'null') {
        expenses.value = rqs.expenses;
        budgets.value = rqs.budgets;
    }
    details.value = rqs;
});

// approve and reject budgets
// const approval = ref({
//     travel_pid: '',
//     budgets: []
// })

const approveBudget = () =>{
    // approval.value.travel_pid = details.value.pid;
    store.dispatch('putMethod', { url: '/approve-travel-request-budget/', prompt: 'Are you sure you want to approve the selected budget(s)?', param:budgets.value }).then((data) => {
        if (data?.status == 201) {
            // approval.value.budgets = []
            loadBudget()
        }
    })
}

// const rejectBudget = () =>{
//     approval.value.travel_pid = details.value.pid;
//     store.dispatch('putMethod', { url: '/reject-travel-request-budgets/', prompt: 'Are you sure you want to reject the selected budget(s)?', param:approval.value }).then((data) => {
//         if (data?.status == 201) {
//             approval.value.budgets = []
//             loadBudget()
//         }
//     })
// }

const loadBudget = () => {
    store.dispatch('getMethod', { url: '/load-travel-request-budgets/'+ details.value.pid }).then((data) => {
        if (data?.status == 200) {
            budgets.value = data.data
        }
    })
}

const reject = ref({
    travel_pid: details.value.pid,
    expenses: []
})

const approveExpense = () => {
    reject.value.travel_pid = details.value.pid;
    store.dispatch('putMethod', { url: '/approve-travel-expense', prompt: 'Are you sure you want to approve the selected expense(s)?', param: reject.value }).then((data) => {
        if (data?.status == 201) {
            reject.value.expenses = []
            loadExpense()
        }
    })
}

const rejectExpense = () => {
    reject.value.travel_pid = details.value.pid;
    store.dispatch('putMethod', { url: '/reject-travel-expense', prompt: 'Are you sure you want to reject the selected expense(s)?', param: reject.value }).then((data) => {
        if (data?.status == 201) {
            reject.value.expenses = []
            loadExpense()
        }
    })
}

const loadExpense = () => {
    store.dispatch('getMethod', { url: '/load-travel-expense/' + details.value.pid }).then((data) => {
        if (data?.status == 200) {
            expenses.value = data.data
        }
    })
}



</script>

<style scoped>

</style>
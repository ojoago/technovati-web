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
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(budget,loop) in budgets" :key="loop">
                                            <td>{{ loop + 1 }}</td>
                                            <td>{{ budget.budget }}</td>
                                            <td>{{ budget.amount }}</td>
                                            <td>{{ budget.approved }}</td>
                                            <td>{{ status[budget.status] }}</td>

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
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(expense, loop) in expenses" :key="loop">
                                            <td>{{ loop + 1 }}</td>
                                            <td>{{ expense.expense }}</td>
                                            <td>{{ expense.amount }}</td>
                                            <td>{{ status[expense.status] }}</td>

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
import RequestDetail from '@/components/travel/RequestDetailComponent.vue'


const details = ref({});

const status = ['Pending','Approved', 'Rejected','Cancel'];

const expenses = ref({})

const budgets = ref({})
onMounted(() => {
    let rqs = localStorage.getItem('TVATI_TRV_RQS_DETAIL') ? JSON.parse(localStorage.getItem('TVATI_TRV_RQS_DETAIL')) : 'null'
    console.log(rqs);
    if (rqs != 'null') {
        expenses.value = rqs.expenses;
        budgets.value = rqs.budgets;
    }
    details.value = rqs;
});






</script>

<style scoped>

</style>
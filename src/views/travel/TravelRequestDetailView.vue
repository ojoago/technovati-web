<template>
    <div>
        <div class="container my-2">
            
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{{ details.title }} <span class="badge bg-info p-1 m-1">
                            <small>Status: {{ status[details?.status] }} </small> 
                        </span> <small>{{ details.begin }} to {{ details.end }} </small> </h5>
                    <span class="badge bg-dark p-1 m-1">
                        <i class="bi bi-person"></i> {{ details?.user?.username }}
                    </span>
                    
                    <p> Destination: {{ details.destination }}</p>
                    Crew
                    <hr>
                    <span v-for="em in details.crew" :key="em.pid" class="badge bg-dark p-1 m-1">
                        {{ em.text }}
                    </span>
                    <br>
                    Items
                    <hr>
                    <span class="badge bg-dark p-1 m-1">
                        {{ details.itinerary }}
                    </span>
                    <div class="row">
                        <div class="col-md-6">
                            <label for="">Budgets</label>
                            <button class="btn btn-primary btn-sm m-1">Add</button>
                            <div class="table-responsive">
                                <table class="table table-hover table-stripped table-bordered">
                                    <thead>
                                        <tr>
                                            <th width="5%" >S/N</th>
                                            <th>Item</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                            <th> <i class="bi bi-gear-fill"></i> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(budget,loop) in budgets" :key="loop">
                                            <td>{{ loop + 1 }}</td>
                                            <td>{{ budget.budget }}</td>
                                            <td>{{ budget.amount }}</td>
                                            <td>{{ status[budget.status] }}</td>
                                            <td> 
                                                <input type="checkbox" v-if="!budget.status" name="" id="">
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label for="">Expenses</label>
                            <button class="btn btn-primary btn-sm m-1">Add</button>
                                <div class="table-responsive">
                                    <table class="table table-hover table-stripped table-bordered">
                                        <thead>
                                            <tr>
                                                <th width="5%" >S/N</th>
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
                                                    <input type="checkbox" v-if="!expense.status" name="" id="">
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
// import store from "@/store";

// import { useRouter } from 'vue-router';

// const router = useRouter()
// let query = {}
// router.push({ query: query })

const details = ref({});

const status = ['Pending','Approved', 'Successfull Trip','Cancel'];

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
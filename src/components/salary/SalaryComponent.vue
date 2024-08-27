<template>
    <div>

        <div class="table-responsive">
            <table class="table table-stripped table-hover table-bordered">
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Month</th>
                        <th>Status</th>
                        <th>Basic</th>
                        <th>Allowance</th>
                        <th>Deduction</th>
                        <th> Payment Date</th>
                        <th> <i class="bi bi-gear-fill"></i> </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(data, loop) in salaries.data" :key="loop">
                        <td>{{ loop + 1 }}</td>
                        <td>{{ data?.month }}, {{ data?.year }}</td>
                        <td>{{ data?.payment_status }}</td>
                        <td>{{ numberFormat(data?.basic) }} </td>
                        <td>{{ numberFormat(data?.allowance) }}</td>
                        <td>{{ numberFormat(data?.deduction) }}</td>
                        <td>{{ data?.paid_on }}</td>
                        <td> <button v-if="data.status==0" class="btn btn-sm btn-primary"
                                @click="paySalary(data.pid)">Pay</button> </td>

                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import store from "@/store";
import { ref } from "vue";
import { useHelper } from '@/composables/helper';
const { numberFormat } = useHelper()
const salaries = ref({})

function loadSalary() {
    store.dispatch('getMethod', { url: '/load-salary' }).then((data) => {
        if (data?.status == 200) {
            salaries.value = data.data;
        }
    }).catch(e => {
        console.log(e);
    })
}
loadSalary()

const paySalary = (pid) => {
    store.dispatch('putMethod',{url:'pay-salary/'+pid,prompt:'are you sure, you want to pay this salary?'}).then((data)=>{
        if(data?.status==201){
            loadSalary()
        }
    }).catch(e=>{
        console.log(e);
    })
}
</script>

<style scoped>

</style>
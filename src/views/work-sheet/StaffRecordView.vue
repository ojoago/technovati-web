<template>
    <div>
        <div class="container mt-2">

            <div class="card">
                <div class="card-header h3">Work Sheet
                    <span class="badge bg-dark px-2" id="totalCount">Total: {{ total }}</span>
                    <div class="float-end">
                        <select class="form-control" @change="loadStaffRecords($event)">
                            <option value="" selected>Make Section</option>
                            <option v-for="(worker,loop) in workers" :key="loop" :value="worker.id">{{ worker.text }}</option>
                        </select>
                    </div>
                </div>
                <div class="card-body">
                    

                    <Chart :length="monthlyColumn.data.length" chart="ColumnChart" :data="monthlyColumn.data" :options="monthlyColumn.options" />
                    
                    <Chart :length="daillyColumn.data.length" chart="LineChart" :data="daillyColumn.data" :options="daillyColumn.options" />
                    <Chart :length="yearlyColumn.data.length" chart="ColumnChart" :data="yearlyColumn.data" :options="yearlyColumn.options" />

                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import store from "@/store";
import { ref } from "vue";
import Chart from '@/components/ChartComponent.vue';

const worker_pid = ref({})


const monthlyColumn = ref({
    options:  {
            title: 'Assembled, Monthly',
            // subtitle: 'Sales, Expenses, and Profit: 2014-2017',        
},
 data:[]})
const yearlyColumn = ref({
    options:  {
            title: 'Assembled, Yearly',
            // subtitle: 'Sales, Expenses, and Profit: 2014-2017',        
},
 data:[]})


const daillyColumn = ref({
    options:  {
            title: 'Assembled, Daily In a Month',
            // subtitle: 'Sales, Expenses, and Profit: 2014-2017',        
},
 data:[]})

 const total = ref(0)
const loadStaffRecords = (event) => {
    worker_pid.value = event.target.value
    store.dispatch('getMethod', { url: '/load-staff-records/'+ event.target.value }).then((data) => {
        if (data?.status == 200) {
            total.value = data.data.count
            let monthly = data.data.monthly
            yearlyColumn.value.data = []
            monthlyColumn.value.data = []
            daillyColumn.value.data = []
            monthlyColumn.value.data.push(['Month','total'])
            monthly.forEach((element) => {
                monthlyColumn.value.data.push([element?.month , element.total])
            })

            let daily = data.data.daily
            daillyColumn.value.data.push(['Date','total'])
            daily.forEach((element) => {
                daillyColumn.value.data.push([element?.date , element.total])
            })
            let yearly = data.data.yearly
            yearlyColumn.value.data.push(['Year','total'])
            yearly.forEach((element) => {
                yearlyColumn.value.data.push([element?.year.toString() , element.total])
            })
            console.log(monthly);
        }else{
            yearlyColumn.value.data = []
            monthlyColumn.value.data = []
            daillyColumn.value.data = []
             total.value = 0
        }
    })
}


const deviceDrop = ref({});
function dropdownDevice() {
    store.dispatch('loadDropdown', 'device').then(({ data }) => {
        deviceDrop.value = data;
    }).catch(e => {
        console.log(e);
        alert('Something Went Wrong')
    })
}
dropdownDevice()

const workers = ref({});
function dropdownWorker() {
    store.dispatch('loadDropdown', 'workers').then(({ data }) => {
        workers.value = data;
    })
}
dropdownWorker()



</script>

<style scoped></style>
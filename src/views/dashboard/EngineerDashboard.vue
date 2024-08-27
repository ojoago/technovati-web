<template>
    <div>
        <div class="container mt-2">
            
        <div class="card">
            <div class="card-header">
                 <h5 class="card-title">Engineer Dashboard </h5>

            </div>
            <div class="card-body">
            <div class="row">
                <div class="col-md-4">
                    <AttendanceComponent />
                </div>
                <div class="col-md-8">
                    <div class="row">
                        <div class="col-md-4">
                            <Card title="Number of Team" :count="assembling.teams"  icon="bi-hash" />
                        </div>
                        <div class="col-md-4">
                            <Card title="Full Time Staff" :count="staff.total_staff"  icon="bi-hash" />
                        </div>
                        <div class="col-md-4">
                            <Card title="Casual Staff" :count="staff.casual_staff"  icon="bi-hash" />
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="row">
                <div class="col-md-5">
                    <Chart :length="pieChart.data.length" chart="PieChart" :data="pieChart.data" :options="pieChart.options" />
                     <!-- <GChart v-if="pieChart.data.length> 1" type="PieChart" :data="pieChart.data"
                        :options="pieChart.options" />
                        <span v-else> {{ pieChart.options.title }}, No Data loaded</span> -->
                </div>

                <div class="col-md-7">
                    <Chart :length="dailyColumn.data.length" chart="ColumnChart" :data="dailyColumn.data" :options="dailyColumn.options" />
                    
                </div>
            </div>
            <div class="row">
                <div class="col-md-8">
                    <GChart type="ColumnChart" v-if="monthlyColumn.data.length>1" :data="monthlyColumn.data"
                        :options="monthlyColumn.options" />
                    <span v-else>No Data loaded</span>
                    <Chart :length="monthlyColumn.data.length" chart="ColumnChart" :data="monthlyColumn.data" :options="monthlyColumn.options" />

                </div>

                <div class="col-md-4">
                    <Chart :length="pieYearly.data.length" chart="ColumnChart" :data="pieYearly.data" :options="pieYearly.options" />
                </div>
            </div>
                
            </div>
        </div>
        <!-- Engineering
        {{ assembling }} -->
    </div>
    </div>
</template>

<script setup>
    

import store from "@/store";
import { onMounted, ref } from "vue";
import AttendanceComponent from '@/components/shift/AttendanceComponent.vue';
import Chart from '@/components/ChartComponent.vue';
import Card from '@/components/CardComponent.vue'

const monthNames = ['','Jan','Feb', 'Mar', 'Apr', 'May', 'Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const pieChart = ref({options: {
    title: 'Assembled, this Month',
    width: 400,
    height: 400,
}, data:[]})

const pieYearly = ref({options: {
    title: 'Assembled, Yearly',
    width: 300,
    height: 300,
}, data:[]})

const dailyColumn = ref({
    options:  {
            title: 'Assembled, Today',
            // subtitle: 'Sales, Expenses, and Profit: 2014-2017',        
},
 data:[]})


 
const monthlyColumn = ref({
    options:  {
            title: 'Assembled, Monthly',
            // subtitle: 'Sales, Expenses, and Profit: 2014-2017',        
},
 data:[]})

 

const assembling = ref({})
const staffAssembled = () => {
    store.dispatch('getMethod', { url: '/load-engineer-dashboard' }).then((data) => {
        if (data?.status == 200) {
            assembling.value = data.data;
            // pie chart data 
            let pie = data.data.team_monthly
            pieChart.value.data.push(['Team','Assembled, this Month'])
            pie.forEach((element) => {
                pieChart.value.data.push([element?.team  , element.total])
            })

            let daily = data.data.team_daily
            dailyColumn.value.data.push(['Date','total'])
            daily.forEach((element) => {
                dailyColumn.value.data.push([element?.team , element.total])
            })
            let monthly = data?.data?.monthly
            monthlyColumn.value.data.push(['Month','total'])
            monthly.forEach((element) => {
                monthlyColumn.value.data.push([monthNames[element?.month] , element.total])
            })

            let yearly = data?.data?.yearly
            pieYearly.value.data.push(['Year','total'])
            yearly.forEach((element) => {
                pieYearly.value.data.push([element?.year+'.' , element.total])
            })


        }
    })
}

const staff = ref({})
const staffCount = () => {
    store.dispatch('getMethod', { url: '/load-staff-count' }).then((data) => {
        if (data?.status == 200) {
            staff.value = data.data;
        }
    })
}



onMounted(() => {
    staffCount()
    staffAssembled()
})


// load-engineer-dashboard
</script>

<style scoped>

</style>
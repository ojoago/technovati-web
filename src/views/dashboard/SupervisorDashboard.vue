<template>
    <div>
        <div class="container mt-2">
           
            <div class="card">
                <div class="card-header">
                 <h5 class="card-title">Supervisor Dashboard </h5>

            </div>
                <div class="card-body">
                    <div class="row">
                <div class="col-md-4">
                    <AttendanceComponent />
                </div>
                <div class="col-md-8">
                    <div class="row">
                        <div class="col-md-3">
                            <Card title="Number of Team" :count="assembling.teams"  icon="bi-hash" />
                        </div>
                        <div class="col-md-3">
                            <Card title="Full Time Staff" :count="assembling.staff" icon="bi-hash" />
                        </div>
                        <div class="col-md-3">
                            <Card title="Casual Staff" :count="assembling.casual" icon="bi-hash" />
                        </div>
                        <div class="col-md-3">
                            <Card title="Assembled, Today" :count="assembling.today"  icon="bi-hash" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                

                <div class="col-md-12">
                    <GChart type="ColumnChart" v-if="dailyColumn.data.length" :data="dailyColumn.data"
                        :options="dailyColumn.options" />
                </div>
            </div>
            <div class="row">
                <div class="col-md-8">
                    <GChart type="ColumnChart" v-if="monthlyColumn.data.length" :data="monthlyColumn.data"
                        :options="monthlyColumn.options" />
                    
                </div>

                <div class="col-md-4">
                    <GChart type="PieChart" v-if="pieYearly.data.length" :data="pieYearly.data"
                        :options="pieYearly.options" />
                </div>
            </div>


                </div>
            </div>

        </div>
        <!-- Engineering
        {{ assembling }} -->
    </div>
</template>

<script setup>
    

import store from "@/store";
import { onMounted, ref } from "vue";
import AttendanceComponent from '@/components/shift/AttendanceComponent.vue';
import { GChart } from 'vue-google-charts'
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
            title: 'Assembled Daily, this month',
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
    store.dispatch('getMethod', { url: '/load-supervisor-dashboard' }).then((data) => {
        if (data?.status == 200) {
            assembling.value = data.data;
            let pie = data.data.team_monthly
            pieChart.value.data.push(['Team','Assembled, this Month'])
            pie.forEach((element) => {
                pieChart.value.data.push([element?.team  , element.total])
            })

            let daily = data.data.daily
            dailyColumn.value.data.push(['Date','total'])
            daily.forEach((element) => {
                dailyColumn.value.data.push([element?.date , element.total])
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



onMounted(() => {
    staffAssembled()
})


// load-engineer-dashboard
</script>

<style scoped>

</style>
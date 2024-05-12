<template>
    <div>
        <div class="container">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3 mb-1">
                            <Card title="Assembled Today" :count="assembling.today"  icon="bi-hash" />
                        </div>

                        <div class="col-md-3 mb-1">
                            <Card title="Assembled this Month" :count="assembling.current_month"  icon="bi-hash" />
                        </div>

                        <div class="col-md-3 mb-1">
                            <Card title="Assembled this Year" :count="assembling.current_year"  icon="bi-hash" />
                        </div>
                        <div class="col-md-3 mb-1">
                            <Card title="Total Assembled" :count="assembling.total"  icon="bi-hash" />
                        </div>

                    </div>


                    <div class="row">
                        <div class="col-md-3 mb-1">
                            <Card title="Number of Vehicles" :count="logistics.vehicle"  icon="bi-hash" />
                        </div>

                        <div class="col-md-3 mb-1">
                            <Card title="Spent on Fuel, this month" :count="logistics.fuel_month"  icon="bi-cash" />
                        </div>

                        <div class="col-md-3 mb-1">
                            <Card title="Spent on Fuel, this year" :count="logistics.fuel_year"  icon="bi-cash" />
                        </div>
                        <div class="col-md-3 mb-1">
                            <Card title="Spent on Oil, this month" :count="logistics.oil_month"  icon="bi-cash" />
                        </div>

                    </div>
 

                    <div class="row">
                        <div class="col-md-3 mb-1">
                            <Card title="Full time Staff" :count="staff.total_staff"  icon="bi-hash" />
                        </div>

                        <div class="col-md-3 mb-1">
                            <Card title="Casual Staff" :count="staff.casual_staff"  icon="bi-hash" />
                        </div>

                        <div class="col-md-3 mb-1">
                            <Card title="Departments" :count="staff.dept"  icon="bi-hash" />
                        </div>
                        <div class="col-md-3 mb-1">
                            <Card title="Sub Department" :count="staff.sub"  icon="bi-hash" />
                        </div>

                    </div>

                    <div class="row">
                        <div class="col-md-7">
                            <GChart type="ColumnChart" v-if="dailyColumn.data.length" :data="dailyColumn.data"
                                :options="dailyColumn.options" />
                        </div>

                        <div class="col-md-5">
                            <GChart type="ColumnChart" v-if="monthlyColumn.data.length" :data="monthlyColumn.data"
                                :options="monthlyColumn.options" />
                        </div>
                        
                    </div>



                </div>
            </div>
              
           
            store
            <div class="row">
                {{ inventory }}
                <div class="col-md-6">
                    Suppliers
                </div>
                <div class="col-md-6">
                    Discos/Customers
                </div>
                <div class="col-md-3">
                    items count
                </div>
                <div class="col-md-3">
                    items given out
                </div>
                <div class="col-md-3">
                    damage item
                </div>
            </div>

            <hr>
            logistics
            <div class="row">
                {{ logistics }}
                <div class="col-md-4">
                    staff
                </div>
                <div class="col-md-4">
                    Vehicle
                </div>
                <div class="col-md-4">
                    Espense
                </div>
            </div>
            

        </div>
    </div>
</template>

<script setup>
    

import store from "@/store";
import { onMounted, ref } from "vue";
import Card from '@/components/CardComponent.vue'
import { GChart } from 'vue-google-charts'

const monthNames = ['','Jan','Feb', 'Mar', 'Apr', 'May', 'Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const monthlyColumn = ref({
    options:  {
            title: 'Assembled Monthly',
            // subtitle: 'Sales, Expenses, and Profit: 2014-2017',        
},
 data:[]})
const dailyColumn = ref({
    options:  {
            title: 'Assembled Daily',
            // subtitle: 'Sales, Expenses, and Profit: 2014-2017',        
},
 data:[]})


const staff = ref({})
const staffCount = () => {
    store.dispatch('getMethod', { url: '/load-staff-count' }).then((data) => {
        if (data?.status == 200) {
            staff.value = data.data;
        }
    })
}
const assembling = ref({})
const staffAssembled = () => {
    store.dispatch('getMethod', { url: '/load-assembly-count' }).then((data) => {
        if (data?.status == 200) {
            assembling.value = data.data;
            let daily = data.data.daily
            let monthly = data.data.monthly
            
        monthlyColumn.value.data.push(['Month','total'])
        monthly.forEach((element) => {
            monthlyColumn.value.data.push([monthNames[element?.month] , element.total])
        })
        dailyColumn.value.data.push(['Date','total'])
        daily.forEach((element) => {
            dailyColumn.value.data.push([element?.date , element.total])
        })
        }
    })
}

const logistics = ref({})
const logisticsCount = () => {
    store.dispatch('getMethod', { url: '/load-logistics-count' }).then((data) => {
        if (data?.status == 200) {
            logistics.value = data.data;
        }
    })
}
const inventory = ref({})
const inventoryCount = () => {
    store.dispatch('getMethod', { url: '/load-store-count' }).then((data) => {
        if (data?.status == 200) {
            inventory.value = data.data;
        }
    })
}



onMounted(() => {
  staffCount()  
    staffAssembled()  
    logisticsCount()  
    inventoryCount()  
})


</script>

<style scoped>

</style>
<template>
    <div>
        <div class="container mt-2">

            <div class="card">
                <div class="card-header h3">Work Sheet
                    <!--<button class="btn btn-sm btn-primary m-2" @click="openDeviceModal">Add Device</button>-->

                    <div class="float-end">
                        <form >
                        <div class="row  w-full">
                                <div class="col-md-6">
                                    <input type="date" v-model="dates.from" class="form-control form-control-sm">
                                </div>
                                <div class="col-md-6">
                                     <div class="input-group">
                                        <input type="date" v-model="dates.to" class="form-control form-control-sm">
                                        <button class="btn btn-sm btn-primary" type="button" @click="filter"> <i class="bi bi-filter"></i> </button>
                                     </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    
                </div>
                <div class="card-body">
                  
                    <div class="row">
                        <div class="col-md-6">
                            <div class="table-responsive">
                                    <table class="table-hover table-stripped table-bordered table">
                                        <thead>
                                            <tr>
                                                <th>Staff</th>
                                                <th>Date</th>
                                                <th align="right">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(data, loop) in records.records" :key="loop">
                                                <td>{{ data?.casual ? data?.casual?.username : data?.user?.username  }}</td>
                                                <td>{{ data?.date }}</td>
                                                <td align="right">{{ data.total }}</td>
                                               
                                            </tr>
                                        </tbody>
                                    </table>
                                   
                                </div>
                                
                        </div>
                        <div class="col-md-6">
                            <Chart :length="pieChart.data.length" chart="PieChart" :data="pieChart.data" :options="pieChart.options" />

                            <div class="table-responsive">
                                    <table class="table-hover table-stripped table-bordered table">
                                        <thead>
                                            <tr>
                                                <th>Staff</th>
                                                <th align="right">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(data, loop) in records.groups" :key="loop">
                                                <td>{{ data?.casual ? data?.casual?.username : data?.user?.username  }}</td>
                                                <td align="right">{{ data.total }}</td>
                                               
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
import store from "@/store";
import { ref } from "vue";
import Chart from '@/components/ChartComponent.vue';


const pieChart = ref({options: {
    title: 'Assembled this Month',
    width: 500,
    height: 500,
}, data:[]})


const errors = ref({})
const dates = ref({from:'',to:''})
const filter = () =>{
    errors.value = []
    store.dispatch('postMethod', { url: '/filter-records', param: dates.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data
        } else if (data?.status == 200) {
            records.value = data.data;
            let pie = data.data.groups
            pieChart.value.title = 'Selected Range'
            pieChart.value.data = []
            pieChart.value.data.push(['Worker','Total'])
            pie.forEach((element) => {
                pieChart.value.data.push([element?.casual ? element?.casual?.username : element?.user?.username  , element.total])
            })
        }else{
            records.value = {}
            pieChart.value.data = []
        }
    })
}

const team_data = ref({})
function loadTeam() {
    store.dispatch('getMethod', { url: '/load-team/' + store?.state?.activeRole }).then((data) => {
        if (data?.status == 200) {
            team_data.value = data.data;
        }
    })

}
loadTeam()

const records = ref({})
function loadRecords() {
    store.dispatch('getMethod', { url: '/load-records' }).then((data) => {
        if (data?.status == 200) {
            records.value = data.data;
            let pie = data.data.groups
            pieChart.value.data.push(['Worker','Total'])
            pie.forEach((element) => {
                pieChart.value.data.push([element?.casual ? element?.casual?.username : element?.user?.username  , element.total])
            })
        }
    })

}
loadRecords()


const deviceDrop = ref({});
function dropdownDevice() {
    store.dispatch('loadDropdown', 'device').then(({ data }) => {
        deviceDrop.value = data;
    }).catch(e => {
        console.log(e);
    })
}
dropdownDevice()

 

</script>

<style scoped></style>
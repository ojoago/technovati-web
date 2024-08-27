<template>
    <div>
        <div class="container">
            <div class="card m-2">
                <div class="card-header">
                    <h5 class="card-title"> {{ team.team }} </h5>
                    <span class="badge bg-dark p-1 m-1 ellipsis">
                        Status: {{ team?.team_status }}
                    </span>
                    <p>{{ team.description }}</p>
                    <!-- {{ team }} -->
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-5">
                            {{ pieChart }}
                            <Chart :length="pieChart.data.length" chart="PieChart" :data="pieChart.data" :options="pieChart.options" />

                        </div>
                        <div class="col-md-7">
                            <Chart :length="totalChart.data.length" chart="PieChart" :data="totalChart.data" :options="totalChart.options" />

                        </div>

                        <div class="col-md-12">
                            <Chart :length="monthlyColumn.data.length" chart="ColumnChart" :data="monthlyColumn.data" :options="monthlyColumn.options" />
                            
                        </div>
                        <div class="col-md-12">
                            <Chart :length="yearlyColumn.data.length" chart="ColumnChart" :data="yearlyColumn.data" :options="yearlyColumn.options" />
                            
                        </div>
                    </div>
                    gcahrt
                    <p>load work done by each member in the current month </p>
                    <p>load work done by team group by month</p>
                    <p>load work done by team group by year</p>
                    <p>load work done by team group</p>
                    {{ reports }}
                    <hr>
                    <label for="">Team Members</label>
                    <div class="table-responsive">
                        <table class="table-hover table-stripped table-bordered table">
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Phone Number</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Type</th>
                                    <!-- <th> <i class="bi bi-gear-fill"></i> </th> -->
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(data, loop) in members.data" :key="loop">
                                    <td>{{ loop + 1 }}</td>
                                    <td>{{ data.type == 1 ? data.user.gsm : data.casual.gsm }}</td>
                                    <td>{{ data.type == 1 ? data.user.username : data.casual.username }}</td>
                                    <td>{{ data.type == 1 ? data.user.email : data.casual.email }}</td>
                                    <td>{{ data.cat }}</td>

                                </tr>
                            </tbody>
                        </table>
                        <div class="flex justify-center mt-4">
                            <nav class="relative justify-center rounded-md shadow pagination">
                                <pagination-links v-for="(link, i) of members.links" :link="link" :key="i"
                                    @next="nextPage(link)"></pagination-links>
                            </nav>
                        </div>
                    </div>
                </div>
                <div class="card-footer">

                </div>
            </div>
        </div>




    </div>
</template>

<script setup>
import store from "@/store";
import { onMounted, ref } from "vue";
import Chart from '@/components/ChartComponent.vue';


// const chartOptions = {
//     title: 'Assembled this Month',
//     width: 400,
//     height: 400,
// }

// const chartData = [
//     ['Year', 'Sales', 'Expenses', 'Profit'],
//     ['2014', 1000, 400, 200],
//     ['2015', 1170, 460, 250],
//     ['2016', 660, 1120, 300],
//     ['2017', 1030, 540, 350]
// ];

const team = ref({})

//load-team-member
onMounted(() => {
    let tsk = localStorage.getItem('TVATI_TEAM_DETAIL') ? JSON.parse(localStorage.getItem('TVATI_TEAM_DETAIL')) : 'null'
    if (tsk != 'null') {
        team.value = tsk;
        loadTeamMember(tsk.pid)
        loadTeamRecord(tsk.pid)
    }
   
});

const members = ref({})

function loadTeamMember(pid) {
    store.dispatch('getMethod', { url: '/load-team-members/' + pid }).then(({ data }) => {
        members.value = data;
    })
}

const pieChart = ref({options: {
    title: 'Assembled this Month',
    width: 400,
    height: 400,
}, data:[]})

const monthlyColumn = ref({
    options:  {
            title: 'Assembled Monthly',
            // subtitle: 'Sales, Expenses, and Profit: 2014-2017',        
},
 data:[]})
const yearlyColumn = ref({
    options:  {
            title: 'Assembled Yearly',
            // subtitle: 'Sales, Expenses, and Profit: 2014-2017',        
},
 data:[]})

const totalChart = ref({
    options: 
    {
        title: 'Assembled so far',
        width: 500,
        height: 500, 
    }, 
    data: []
    }
)
const monthNames = ['','Jan','Feb', 'Mar', 'Apr', 'May', 'Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const reports = ref({})
function loadTeamRecord(pid) {
    store.dispatch('getMethod', { url: '/load-team-records/' + pid }).then(({ data }) => {
        reports.value = data;
        let pie = data?.indMonthly;
        let total = data?.indTotal;
        let monthly = data?.monthly;
        let yearly = data?.yearly;
        pieChart.value.data.push(['Worker','Assembled this Month'])
        pie.forEach((element) => {
            pieChart.value.data.push([element?.casual ? element?.casual?.username : element?.user?.username  , element.total])
        })

        
        totalChart.value.data.push(['Worker','total'])
        total.forEach((element) => {
            totalChart.value.data.push([element?.casual ? element?.casual?.username : element?.user?.username  , element.total])
        })

        monthlyColumn.value.data.push(['Month','total'])
        monthly.forEach((element) => {
            monthlyColumn.value.data.push([monthNames[element?.month] , element.total])
        })
        yearlyColumn.value.data.push(['Year','total'])
        yearly.forEach((element) => {
            yearlyColumn.value.data.push([element?.year+'.' , element.total])
        })


    })
}


const users = ref([]);
function dropdownUser() {
    store.dispatch('loadDropdown', 'users').then(({ data }) => {
        users.value = data;
    }).catch(e => {
        console.log(e);
        alert('Something Went Wrong')
    })
}
dropdownUser()

</script>

<style scoped>


</style>
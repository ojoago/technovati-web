<template>
    <div>

        <div class="container">
            <div class="card">
                <div class="card-header"></div>
                <div class="card-body">

                    <div class="row">

                        <div class="col-md-6 left">
                            <div class="inner-card">
                                <div class="left">
                                    <p>Sales</p>
                                    ₦ 2,000,000
                                    <div class="child-card">
                                        <div class="col-one h-col">
                                            0
                                            <small>Paid</small>
                                        </div>
                                        <div class="col-two h-col">
                                            0
                                            <small>Unpaid</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="right add-margin">
                                    <p>Purchase</p>
                                    ₦ 2,500,000
                                    <div class="child-card">
                                        <div class="col-one h-col">
                                            0
                                            <small>Paid</small>
                                        </div>
                                        <div class="col-two h-col">
                                            0
                                            <small>unPaid</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="col-md-6 right">
                            <div class="inner-card">
                                <div class="left">
                                    <p>Payment</p>

                                    <div class="left-card">
                                        <div class="col-one v-col">
                                            <small>Received</small>
                                            ₦ 0
                                        </div>
                                        <div class="col-two v-col">
                                            <small>Paid</small>
                                            ₦ 0
                                        </div>
                                    </div>
                                </div>
                                <div class="right">
                                    <p>Receivable</p>

                                    <div class="right-card">
                                        <div class="col-one v-col">
                                            <small>
                                                Receivable from Customer
                                            </small>
                                            ₦ 0
                                        </div>

                                        <div class="col-two v-col">
                                            <small>Payable to supplier</small>
                                            ₦ 0
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="row">

                        <div class="col-md-6">
                            <div class="flat-card">
                                <GChart v-if="pieChart.data.length" type="PieChart" :data="pieChart.data"
                                    :options="pieChart.options" />
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="flat-card">
                                <p>Cash/Bank Fund Transfer</p>
                                <CardContent class="content" title="Cash Account" />

                                <CardContent class="content" title="Bank Account" />
                            </div>
                        </div>

                    </div>

                    <div class="row">

                        <div class="col-md-6">
                            <div class="flat-card">
                                <p>Profit/loss </p>
                                <CardContent class="content" title="Sales" />

                                <CardContent class="content" title="Purchase" />
                                <CardContent class="content" title="Expense" />
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="flat-card">
                                <p>Tax</p>
                                <CardContent class="content" title="Sales Tax" />
                                <CardContent class="content" title="Input Available" />

                            </div>
                        </div>

                    </div>

                    <div class="row">

                        <div class="col-md-6">
                            <div class="inner-card">
                                <div class="left">
                                    <p>Sales</p>
                                    ₦ 0
                                    <div class="child-card">
                                        <div class="col-one h-col">
                                            0
                                            <small>Pending</small>
                                        </div>
                                        <div class="col-two h-col">
                                            0
                                            <small>Completed</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="right add-margin">
                                    <p>Purchase</p>
                                    ₦ 0
                                    <div class="child-card">
                                        <div class="col-one h-col">
                                            0
                                            <small>Pending</small>
                                        </div>
                                        <div class="col-two h-col">
                                            0
                                            <small>Completed</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">

                            <div class="flat-card">
                                <AttendanceComponent />

                            </div>
                        </div>

                    </div>


                </div>
            </div>
        </div>


    </div>
</template>

<script setup>
import AttendanceComponent from '@/components/shift/AttendanceComponent.vue';

    import CardContent from '@/components/dashboard/CardContent.vue';
import { ref } from 'vue';
import { GChart } from 'vue-google-charts'

const pieChart = ref({
    options: {
        title: 'Expense',
        width: 400,
        height: 150,
    }, data: []
})

// pieChart.value.data.push(['Team', 'Assembled, this Month'])
let pie = [
    ['Task', 'Hours per Day'],
    ['test', 10001],
    ['discount', 20000],
    ['others', 200000],
    
]
pie.forEach((element) => {
    pieChart.value.data.push([element[0], element[1]])
})
</script>

<style scoped>


.inner-card,.flat-card{
    border: 1px solid #f1f1f1;
        padding: 5px;
        border-radius: 10px;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
        margin-bottom: 10px;
        height: 180px;
}
.inner-card:hover,.flat-card:hover{
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
}

.flat-card .content{
    margin-bottom: 2px;
    border-bottom: 1px solid #f1f1f1;
}
.inner-card{
    display: flex;
    justify-content: space-between;
    
}

.inner-card .left, 
.inner-card .right{
    flex-basis: 50%;
    padding: 3px;
} 



.inner-card .left, 
.inner-card .right{
    flex-basis: 50%;
} 
.add-margin{
    border-left: 1px solid #000;
}

 .child-card{
    display: flex;
    justify-content: space-between;
}


 .child-card div{
    flex-basis: 48%;
    margin-top: 25px;
}
 .child-card div small{
    display: block;
}


.h-col {
    display: block;
    border-bottom: 3px solid #0c249c;
}

.left-card,.right-card{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.v-col{
    border-left: 3px solid #0c249c;
    padding-left: 10px;
    margin: 3px;
}
.v-col small{
    display: block;
}
.child-card {
    padding-left: 15px;
}



</style>
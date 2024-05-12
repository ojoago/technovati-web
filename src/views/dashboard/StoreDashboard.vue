<template>
    <div>

            <div class="container mt-2">
               <div class="card">
                <div class="card-body">
                     <div class="row">
                    <div class="col-md-6">
                        <AttendanceComponent />
                        <div class="row mt-2">
                            <div class="col-md-6">
                                <Card title="Pending Request" :count="datas.request"  icon="bi-cash" />
                            </div>
                            <div class="col-md-6">
                                <Card title="Pending Request" :count="datas.request"  icon="bi-cash" />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <Qal :data="eventData" title="Events" />

                    </div>

                </div>

                <div class="row my-2">
                    <div class="col-md-4">
                         <Card title="Pending Request" :count="datas.request"  icon="bi-cash" />
                    </div>
                    <div class="col-md-4">
                         <Card title="Stock Items" :count="datas.items"  icon="bi-hash" />
                    </div>
                    <div class="col-md-4">
                         <Card title="Consignments" :count="datas.consignment"  icon="bi-hash" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3">
                         <Card title="Clients" :count="datas.customers"  icon="bi-hash" />
                    </div>
                    <div class="col-md-3">
                         <Card title="Suppliers" :count="datas.suppliers"  icon="bi-hash" />
                    </div>
                     <div class="col-md-3">
                         <Card title="Raw Materials" :count="datas.raw"  icon="bi-hash" />
                    </div>
                    <div class="col-md-3">
                         <Card title="Items" :count="datas.items"  icon="bi-hash" />
                    </div>
                   
                </div>

              
                </div>
               </div>

            </div>

        <!-- {{ datas }}
        suppliers
        <br>
        customer
        <hr>
        item head count

        <hr>
        pending request
        <hr>

        raw material
        <hr> -->
    </div>

</template>

<script setup>


import store from "@/store";
import { onMounted, ref } from "vue";
import AttendanceComponent from '@/components/shift/AttendanceComponent.vue';
import Qal from '@/components/dashboard/CalComponent.vue'
import Card from '@/components/CardComponent.vue'

const eventData = ref([])

const datas = ref({})
const staffAssembled = () => {
    store.dispatch('getMethod', { url: '/load-store-dashboard' }).then((data) => {
        if (data?.status == 200) {
            datas.value = data.data;
        }
    })
}



onMounted(() => {
    staffAssembled()
})


// load-store-dashboard
</script>

<style scoped>

</style>
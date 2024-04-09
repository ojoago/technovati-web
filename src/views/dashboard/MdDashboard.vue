<template>
    <div>
        <div class="container">
            {{ staff }}
            <div class="row">
                <div class="col-md-3">total staff</div>
                <div class="col-md-3">casual staff</div>
                <div class="col-md-3">Dept</div>
                <div class="col-md-3">Sub Dept</div>
            </div>
            <hr>
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
            <hr>
            <div class="row">
                {{ assembling }}
                <div class="col-md-4">
                    assembled today
                </div>
                <div class="col-md-4">
                    assembled this month
                </div>
                <div class="col-md-4">
                    assembled so far
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
    

import store from "@/store";
import { onMounted, ref } from "vue";

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
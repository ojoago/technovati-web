<template>
    <div>
        <div class="container mt-2">
            {{ logistics }}
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-4">
                            <AttendanceComponent />
                        </div>
                        <div class="col-md-8">
                            <div class="row">
                                <div class="col-md-6">
                                    <Card title="Number of Vehicle" :count="logistics.vehicle"  icon="bi-cash" />
                                </div>
                                <div class="col-md-6">
                                    <Card title="Drivers" :count="logistics.vehicle"  icon="bi-hash" />

                                </div>
                            </div>
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
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import AttendanceComponent from '@/components/shift/AttendanceComponent.vue';
import store from '@/store';
import { onMounted, ref } from 'vue';
import Card from '@/components/CardComponent.vue'


const logistics = ref({})
const logisticsCount = () => {
    store.dispatch('getMethod', { url: '/load-logistics-count' }).then((data) => {
        if (data?.status == 200) {
            logistics.value = data.data;
        }
    })
}

onMounted(() => {
    logisticsCount()
})
// const data = store?.state?.user?.roles;
// const activeRole = store?.state?.activeRole;
</script>

<style scoped>

</style>
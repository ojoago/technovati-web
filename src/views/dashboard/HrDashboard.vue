<template>
    <div>
        <div class="container mt-2">
            <div class="row">
                <div class="col-md-5">
                    <AttendanceComponent />


                </div>
                <div class="col-md-7">
                    <Qal :data="eventData" v-if="eventData.length" />
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
    import Qal from '@/components/dashboard/CalComponent.vue'
import AttendanceComponent from '@/components/shift/AttendanceComponent.vue';
import store from '@/store';
import { ref } from 'vue';
const eventData = ref([])

function loadEvents() {
    store.dispatch('getMethod', { url: '/load-shift-holidays' }).then((data) => {
        if (data.status == 200) {
            eventData.value = data.data;
        }
    })
}

loadEvents()
</script>

<style scoped>

</style>
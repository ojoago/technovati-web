<template>
    <div>
        <div class="container mt-2">
            <div class="row">
                <div class="col-md-4">
                    <AttendanceComponent />
                </div>
            </div>
        </div>
        Engineering
        {{ assembling }}
    </div>
</template>

<script setup>
    

import store from "@/store";
import { onMounted, ref } from "vue";
import AttendanceComponent from '@/components/shift/AttendanceComponent.vue';


const assembling = ref({})
const staffAssembled = () => {
    store.dispatch('getMethod', { url: '/load-engineer-dashboard' }).then((data) => {
        if (data?.status == 200) {
            assembling.value = data.data;
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
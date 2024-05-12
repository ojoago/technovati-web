<template>
    <div>
        <div class="container mt-3">
           
            <div class="row">
                <div class="col-md-6">
                    <AttendanceComponent />
                    <Todo/>
                </div>
                <div class="col-md-6">
                    <Qal :data="eventData" v-if="eventData?.length" />

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import AttendanceComponent from '@/components/shift/AttendanceComponent.vue';
    import Qal from '@/components/dashboard/CalComponent.vue'
    import Todo from '@/components/TodoComponent.vue'
    
    import store from '@/store';
    import { ref } from 'vue';
    // const data = store?.state?.user?.roles;
    // const activeRole = store?.state?.activeRole;
const eventData = ref([])

function loadEvents() {
    store.dispatch('getMethod', { url: '/load-shift-holidays' }).then((data) => {
        if (data?.status == 200) {
            eventData.value = data.data;
        }
    })
}

loadEvents()
</script>

<style scoped>

</style>
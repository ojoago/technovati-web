<template>
    <div>
        <div class="container mt-2">
            <div class="row">
                <div class="col-md-6">
                    <AttendanceComponent />
                    <Todo/>
                </div>
                <div class="col-md-6">
                    <Qal :data="eventData" title="Events" />
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
    import Qal from '@/components/dashboard/CalComponent.vue'
    import AttendanceComponent from '@/components/shift/AttendanceComponent.vue';
    import store from '@/store';
    import { onMounted, ref } from 'vue';
    import Todo from '@/components/TodoComponent.vue'

const eventData = ref([])
const counts = ref({})
function loadEvents() {
    store.dispatch('getMethod', { url: '/load-shift-holidays' }).then((data) => {
        if (data?.status == 200) {
            eventData.value = data.data;
        }
    })
}


const loadData = () => {
    // load-hr-dashboard
    store.dispatch('getMethod', { url: '/load-hr-dashboard' }).then((data) => {
        if (data?.status == 200) {
            counts.value = data.data;
        }
    })
}

onMounted(() => {
    loadEvents()
    loadData()
    
})

</script>

<style scoped>

</style>
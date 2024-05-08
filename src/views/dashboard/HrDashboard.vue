<template>
    <div>
        <div class="container mt-2">
            <div class="row">
                <div class="col-md-6">
                    <AttendanceComponent />
                    <fieldset>
                        
                        <div class="row mt-1">
                            <div class="col-md-4 mb-1">
                                <Card title="Staff" :count="counts.staff" link="staff-list" icon="bi-people-fill" />
                            </div>
                            <div class="col-md-4 mb-1">
                                <Card :count="counts.department" title="Department" link="department"
                                    icon="bi bi-view-stacked" />
                            </div>
                            <div class="col-md-4 mb-1">
                                <Card :count="counts.sub_department" icon="bi bi-view-stacked" title="Sub Department" />
                            </div>
                        </div>
                        <div class="row mt-1">
                            <div class="col-md-4 mb-1">
                                <Card title="Leave Request" :count="counts.leave" link="leave-request"
                                    icon="bi bi-bootstrap-reboot" />
                            </div>
                            <div class="col-md-4 mb-1">
                                <Card :count="counts.travel" title="Travel Request" link="staff-travel-request"
                                    icon="bi bi-bootstrap-reboot" />
                            </div>
                            <div class="col-md-4 mb-1">
                                <Card title="Store Items" :count="counts.item" link="announcement"
                                    icon="bi bi-bell-fill" />
                            </div>
                        </div>
                    </fieldset>

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
    import Card from '@/components/CardComponent.vue'
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
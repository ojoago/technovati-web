<template>
    <div>
        <div class="container mt-3">
           
            <div class="row">
                <div class="col-md-6">
                    <AttendanceComponent />
                    <hr>
                    Announcements
                    <div class="table-responsive">
                        <table class="table table-bordered table-stripped table-hover">
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Title</th>
                                    <th>status</th>
                                    <th> <i class="bi bi-gear-fill"></i> </th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                    <hr>
                    Memo
                    <div class="table-responsive">
                        <table class="table table-bordered table-stripped table-hover">
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Title</th>
                                    <th>status</th>
                                    <th> <i class="bi bi-gear-fill"></i> </th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
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
    
    import store from '@/store';
    import { ref } from 'vue';
    // const data = store?.state?.user?.roles;
    // const activeRole = store?.state?.activeRole;
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
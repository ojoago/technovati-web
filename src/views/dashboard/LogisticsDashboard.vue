<template>
    <div>
        <div class="container mt-2">
            {{ logistics }}
            <div class="row">
                <div class="col-md-4">
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
                <div class="col-md-8">
                    Leave Request
                    <div class="table-responsive">
                        <table class="table table-bordered table-stripped table-hover">
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Leave</th>
                                    <th>From</th>
                                    <th>to</th>
                                    <th>status</th>
                                    <th> <i class="bi bi-gear-fill"></i> </th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                    <hr>
                    Visitor
                    <div class="table-responsive">
                        <table class="table table-bordered table-stripped table-hover">
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Leave</th>
                                    <th>From</th>
                                    <th>to</th>
                                    <th>status</th>
                                    <th> <i class="bi bi-gear-fill"></i> </th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
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
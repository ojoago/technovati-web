<template>
    <div>
        <div class="container">
            <div class="card">
                <div class="card-header">
                    Attendance 
                    <AttendanceComponent/>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table-hover table-stripped table-bordered table">
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>Time In</th>
                                    <th>Time Out</th>
                                    <th>status</th>
                                    <th>location</th>
                                    <th>platform</th>
                                    <th>browser</th>
                                    <th>ip</th>
                                    <th>path</th>
                                    <!-- 'lat', 
                                    'long' ,
                                    'precision' , -->
                                    <!-- 'date' ,  -->
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(tend, loop) in attendance.data" :key="loop">
                                    <td>{{ loop + 1 }}</td>
                                    <td>{{ tend.time_in }}</td>
                                    <td>{{ tend.time_out }}</td>
                                    <td>{{ tend.attendance_status }}</td>
                                    <td>{{ tend.location }}</td>
                                    <td>{{ tend.platform }}</td>
                                    <td>{{ tend.browser }}</td>
                                    <td>{{ tend.ip }}</td>
                                    <td>
                                        <img :src="tend.path" alt = "" class="img img-responsive tend-image" id = "student-img" >

                                     </td>
                                    
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import store from '@/store';
    // import { ref,onMounted } from 'vue'
    import AttendanceComponent from '@/components/shift/AttendanceComponent.vue';
import { ref } from 'vue';
    loadAttendance()
    
    const attendance = ref({})
    function loadAttendance() {
    store.dispatch('getMethod', { url: '/load-attendance' }).then((data) => {
         if (data.status == 200) {
            attendance.value = data.data;
        }
    })
}
</script>

<style scoped>
    .tend-image{
        width:40px;
    }
    
    .tend-image:hover{
        width:150px;
        position: relative;
    }

</style>
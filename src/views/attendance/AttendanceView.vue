<template>
    <div>
        <div class="container">
            <div class="card">
                <div class="card-header">
                    Attendance
                    <AttendanceComponent />
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
                                    <!--<th>location</th> -->
                                    <th>platform</th>
                                    <!--<th>browser</th> -->
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
                                    <td>{{ tend.week_day }} {{ tend.time_in }}</td>
                                    <td>{{ tend.time_out }}</td>
                                    <td>{{ tend.attendance_status }}</td>
                                    <!--<td>{{ tend.location }}</td> -->
                                    <td>{{ tend.platform }}</td>
                                    <!-- <td>{{ tend.browser }}</td> -->
                                    <td>{{ tend.ip }}</td>
                                    <td>
                                        <img :src="tend.path" alt="" class="img img-responsive tend-image"
                                            id="student-img">

                                    </td>

                                </tr>
                            </tbody>
                        </table>
                        <div class="flex justify-center mt-4">
                            <nav class="relative justify-center rounded-md shadow pagination">
                                <pagination-links v-for="(link, i) of attendance.links" :link="link" :key="i"
                                    @next="nextPage(link)"></pagination-links>
                            </nav>
                        </div>
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
    function loadAttendance(url= '/load-attendance') {
    store.dispatch('getMethod', { url: url }).then((data) => {
         if (data?.status == 200) {
            attendance.value = data.data;
        }
    })
}

 function nextPage(link) {
        if (!link.url || link.active) {
            return;
        }
        loadAttendance(link.url)
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
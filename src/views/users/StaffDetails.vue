<template>
    <div>
        <!-- {{ staff }} -->
        <div class="container">
            {{ detail }}
            <div class="flex-row">
                <div class="personal-detail">
                    <table class="table table-hover table-striped table-bordered">
                        <tr>
                            <td colspan="2" class="text-center" style="padding: 20px!important;">
                                {{ staff.lastname }} {{ staff.firstname }} {{ staff.othername }}
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" class="text-center text-uppercase" style="padding: 10px!important;">
                                personal Data
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Gender
                            </td>
                            <td>
                                {{ staff.gender }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Religion
                            </td>
                            <td>
                                {{ staff.religion }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                D.O.B
                            </td>
                            <td>
                                {{ staff.dob }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Status
                            </td>
                            <td>
                                {{ detail.marital_status }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                State
                            </td>
                            <td>
                                {{ detail?.origin?.state }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                State LGA
                            </td>
                            <td>
                                {{ detail?.origin_lga?.lga }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                State Of Residence
                            </td>
                            <td>
                                {{ detail?.residence?.state }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                State LGA
                            </td>
                            <td>
                                {{ detail?.residence_lga?.lga }}
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="flex-col">
                    <table class="table table-hover table-striped table-bordered">
                        <tr>
                            <td colspan="2" align="center">
                                Official info
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Staff ID
                            </td>
                            <td>
                                {{ staff?.staff_id }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Department
                            </td>
                            <td>
                                {{ detail?.department?.department }}
                                <small>{{ staff?.sub?.name }}</small>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Designation
                            </td>
                            <td>
                                {{ staff?.designation?.name }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Employment Status
                            </td>
                            <td>
                                {{ staff?.designation?.name }}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Account Status
                            </td>
                            <td>
                                {{ staff?.status }}
                            </td>
                        </tr>

                        <tr>
                                <td colspan="2" align="center">
                                     Attendance
                                </td>
                            </tr>
                            <tr>
                                <td align="center">
                                    Days Active
                                </td>
                                <td>
                                    {{ 302 }}
                                </td>
                            </tr>
                            <tr>
                                    <td align="center">
                                        days present
                                    </td>
                                    <td>
                                        {{ 295 }}
                                    </td>
                                </tr>

                    </table>
                    
                </div>
                <div class="img img-responsive student-img">
                   
                    <img :src="detail?.path" alt="" class="img img-responsive" id="student-img">
                </div>
            </div>
            <hr>
            <div class="qualification">

            </div>
            <hr>
            <div class="flex-row">
                <div class="skills">321</div>
                <div class="hobbies">123</div>
            </div>

        </div>
    </div>
</template>

<script setup>
import store from "@/store";
import { onMounted,ref } from "vue";
// import { useRoute, useRouter } from 'vue-router';

const staff = ref({});
const detail = ref({});
const staff_pid = ref(null);

    
onMounted(() => {
    let user = localStorage.getItem('TVATI_STAFF_DETAIL') ? JSON.parse(localStorage.getItem('TVATI_STAFF_DETAIL')) : 'null'
    console.log(user);
    if (user != 'null') {
        staff.value = user;
        staff_pid.value = user.pid 
    }
    loadStaffDetail()
});


function loadStaffDetail() {
    store.dispatch('getMethod', { url: '/ataff-detail/' + staff_pid.value }).then(({ data }) => {
        detail.value = data;
    })
}



</script>

<style scoped>

     body {
            margin: 20px 160px;
        }

        .flex-container,
        .flex-row {
            display: flex;
            justify-content: space-between;
        }

        .text-content {
            flex-basis: 60%;
            text-align: center;
        }

        .text-content>.h4,
        .text-content>.h3 {
            margin-bottom: 1px;
        }

        .text-content>p {
            margin: 1px;
            font-size: small;
        }

        .logo-image {
            width: 100px !important;
            border-radius: 15px;
        }

        .logo-image>img {
            width: 100%;
        }

        .flex-row {
            /* height: 200px; */
            justify-content: space-between;
        }

        .personal-detail,
        .flex-col {
            flex-basis: 40%;
            margin: 3px;
            /* justify-content: space-between; */
        }

        .student-img {
            flex-basis: 15%;
            border-radius: 5px;
            align-items: center;
            justify-content: center;
            border: 1px solid #000;
            max-height: 200px;
        }

        .student-img>img {
            width: 100%;
            height: 100%;
        }

</style>
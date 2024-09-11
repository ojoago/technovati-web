<template>
    <div>
        <div class="container mt-2">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{{ staff.lastname }} {{ staff.firstname }} {{ staff.othername }} </h5>
                    <div class="personal-info">
                        <div class="personal-data">
                            <table class="table table-hover table-striped table-bordered">

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
                                        {{ detail?.gender }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Religion
                                    </td>
                                    <td>
                                        {{ detail?.religion }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Date of Birth
                                    </td>
                                    <td>
                                        {{ detail?.birthday }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Blood Group
                                    </td>
                                    <td>
                                        {{ detail?.blood_group }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Geno Type
                                    </td>
                                    <td>
                                        {{ detail?.geno_type }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Marital Status
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
                                <tr>
                                    <td>
                                        Address
                                    </td>
                                    <td>
                                        {{ detail?.address }}
                                    </td>
                                </tr>


                            </table>
                        </div>

                        <div class="official-data">

                            <div id="img-container">
                                <img :src="detail?.path" alt="" class="img img-responsive" id="staff-img">
                            </div>

                            <table class="table table-hover table-striped table-bordered">
                                <tr>
                                    <td colspan="2" align="center"
                                        style="padding: 10px!important; text-transform: uppercase">
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
                                        Username
                                    </td>
                                    <td>
                                        {{ detail?.user?.username }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Department
                                    </td>
                                    <td>
                                        {{ detail?.department?.department }}

                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Sub Department
                                    </td>
                                    <td>
                                        {{ detail?.sub?.name }}

                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Designation
                                    </td>
                                    <td>
                                        {{ detail?.designation?.name }}
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        Account Status
                                    </td>
                                    <td>
                                        {{ `${detail?.user?.sts}` }}
                                    </td>
                                </tr>

                                <!-- <tr>
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
                                </tr> -->

                            </table>
                        </div>


                    </div>
                    <div class="ref-section">
                        <fieldset class="border rounded-3 p-2 m-1 next">
                            <legend class="float-none w-auto px-2">Next Of Kin</legend>
                            <table class="table table-hover table-striped table-bordered">

                                <tr>
                                    <td>
                                        Names
                                    </td>
                                    <td>
                                        {{ detail?.next?.fullname.toUpperCase() }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Religion
                                    </td>
                                    <td>
                                        {{ detail?.next?.religion }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Relationship
                                    </td>
                                    <td>
                                        {{ detail?.next?.relationship }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>

                                        Phone Number
                                    </td>
                                    <td>
                                        {{ detail?.next?.gsm }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Email
                                    </td>
                                    <td>
                                        {{ detail?.next?.email }}
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        Address
                                    </td>
                                    <td>
                                        {{ detail?.next?.address }}
                                    </td>
                                </tr>


                            </table>
                        </fieldset>

                        <fieldset class="border rounded-3 p-2 m-1 bank">
                            <legend class="float-none w-auto px-2">Bank Detail</legend>
                            <table class="table table-hover table-striped table-bordered">

                                <tr>
                                    <td>
                                        Account Name
                                    </td>
                                    <td>
                                        {{ detail?.bank?.account_name }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Account Number
                                    </td>
                                    <td>
                                        {{ detail?.bank?.account_number }}
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        Account Type
                                    </td>
                                    <td>
                                        {{ detail?.bank?.account_type }}
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        Bank
                                    </td>
                                    <td>
                                        {{ detail?.bank?.bank }}
                                    </td>
                                </tr>
                                <!--
                                <tr>
                                    <td>
                                        Sort Code
                                    </td>
                                    <td>
                                        {{ detail?.bank?.sort_code }}
                                    </td>
                                </tr> -->


                            </table>
                        </fieldset>
                    </div>

                    <div class="expirience">
                        <fieldset class="border rounded-3 p-2 m-1 exp-item" v-for="(exp, i) in detail?.experience"
                            :key="i">
                            <legend class="float-none w-auto px-2">{{ exp.company.toUpperCase() }}</legend>
                            <table class="table table-hover table-striped table-bordered">

                                <tr>
                                    <td>
                                        Designation
                                    </td>
                                    <td>
                                        {{ exp.designation }}
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        Primary Job
                                    </td>
                                    <td>
                                        {{ exp.job }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        From
                                    </td>
                                    <td>
                                        {{ exp.from }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        End
                                    </td>
                                    <td>
                                        {{ exp.to }}
                                    </td>
                                </tr>

                            </table>
                        </fieldset>
                    </div>

                    <div class="qualifiactions">
                        <fieldset class="border rounded-3 p-2 m-1 qualifiaction"
                            v-for="(qal, i) in detail?.qualifiaction" :key="i">
                            <legend class="float-none w-auto px-2">{{ qal.degree.toUpperCase() }}</legend>
                            <table class="table table-hover table-striped table-bordered">

                                <tr>
                                    <td>
                                        Field
                                    </td>
                                    <td>
                                        {{ qal.field }}
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        Grade
                                    </td>
                                    <td>
                                        {{ qal.degree }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Grade
                                    </td>
                                    <td>
                                        {{ qal.institution }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Year
                                    </td>
                                    <td>
                                        {{ qal.year }}
                                    </td>
                                </tr>

                            </table>
                        </fieldset>
                    </div>

                    <div class="documents">
                        <fieldset class="border rounded-3 p-2 m-1 document" v-for="(doc, i) in detail?.documents"
                            :key="i">
                            <legend class="float-none w-auto px-2">{{ doc.name.toUpperCase() }}</legend>
                            <div v-if="doc.type == 'pdf'">
                                <!-- <VuePDF :pdf="`${detail?.url}/${doc?.path}`" /> -->
                                <a :href="`${detail?.url}/${doc?.path}`" target="_blank" rel="noopener noreferrer"
                                    :download="doc?.name">View {{ doc.name.toUpperCase() }} on new tab</a>
                            </div>
                            <img v-else :src="`${detail?.url}/${doc?.path}`" alt="" class="img img-responsive doc">

                        </fieldset>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import store from "@/store";
import { onMounted,ref } from "vue";
// import { useRoute, useRouter } from 'vue-router';
// import { VuePDF } from '@tato30/vue-pdf';
// import '@tato30/vue-pdf/style.css';

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
    store.dispatch('getMethod', { url: '/staff-detail/' + staff_pid.value }).then(({ data }) => {
        detail.value = data;
    })
}



</script>

<style scoped>

     .ref-section,.personal-info,.expirience,.qualifiactions{
        display: flex;
        justify-content: space-between;
     }
    .personal-data {
        flex-basis: 60%;
    }
    .official-data {
        flex-basis: 40%;
        border-left: 2px solid #f1f1f1;
    }

    #img-container{
            border-radius: 5px;
            align-items: center;
            justify-content: center;
            /* border: 1px solid #000; */
            max-height: 200px !important;
            margin-top: 5px;
            text-align: center;
            margin-bottom: 20px;
    }
        #staff-img {
            width: 120px;
            height: auto;
            align-items: center
        }

    .next,.bank{
        flex-basis: 50%;
    }

    .exp-item,.qualifiaction{
        width: 50%;
    }

    .document{
            align-items: center
    }
    .doc{
        max-width: 80%;
    }

</style>
<template>
    <div>
        <div class="container mt-2">

            <div class="card">
                <div class="card-header h3">Work Sheet
                    <!--<button class="btn btn-sm btn-primary m-2" @click="openDeviceModal">Add Device</button>-->

                    <div class="row float-right">
                        <div class="col-md-6">
                            <div class="row">
                                <div class="col-md-6">
                                    <input type="date" class="form-control form-control-sm">
                                </div>
                                <div class="col-md-6">
                                     <input type="date" class="form-control form-control-sm">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    {{ records }}
                    <div class="row">
                        <div class="col-md-6">
                            <div class="table-responsive">
                                    <table class="table-hover table-stripped table-bordered table">
                                        <thead>
                                            <tr>
                                                <th>TEAM</th>
                                                <th>TEAM lead</th>
                                                <th>Member</th>
                                                <th> <i class="bi bi-gear"></i> </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(team, loop) in team_data.data" :key="loop">
                                                <td>{{ team.team }}</td>
                                                <td>{{ team?.lead?.username }}</td>
                                                <td>{{ team.teams_count }}</td>
                                                <td>
                                                  <i class="bi bi-forward pointer" @click="loadTeamMember(team)"></i>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                   
                                </div>
                                
                        </div>
                       
                    </div>
                
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import store from "@/store";
import { ref } from "vue";
// import OModal from "@/components/OModal.vue";


// const deviceModal = ref(false)
// const openDeviceModal = () => {
//     deviceModal.value = true;
// };

// const closeModal = () => {
//     deviceModal.value = false;
// };



const team_data = ref({})
function loadTeam() {
    store.dispatch('getMethod', { url: '/load-team/' + store?.state?.activeRole }).then((data) => {
        if (data?.status == 200) {
            team_data.value = data.data;
        }
    })

}
loadTeam()
const records = ref({})
function loadRecords() {
    store.dispatch('getMethod', { url: '/load-records' }).then((data) => {
        if (data?.status == 200) {
            records.value = data.data;
        }
    })

}
loadRecords()


const deviceDrop = ref({});
function dropdownDevice() {
    store.dispatch('loadDropdown', 'device').then(({ data }) => {
        deviceDrop.value = data;
    }).catch(e => {
        console.log(e);
        alert('Something Went Wrong')
    })
}
dropdownDevice()

 

</script>

<style scoped></style>
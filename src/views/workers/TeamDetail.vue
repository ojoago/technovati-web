<template>
    <div>
        <div class="container">
            <div class="card m-2">
                <div class="card-header">
                    <h5 class="card-title"> {{ team.team }} </h5>
                    <span class="badge bg-dark p-1 m-1 ellipsis">
                         Status:   {{ team?.team_status }}
                        </span>
                        <p>{{ team.description }}</p>
                   <!-- {{ team }} -->
                </div>
                <div class="card-body">
                   <hr>
                   <label for="">Team Members</label>
                   <div class="table-responsive">
                                            <table class="table-hover table-stripped table-bordered table">
                                                <thead>
                                                    <tr>
                                                        <th>SN</th>
                                                        <th>Phone Number</th>
                                                        <th>Username</th>
                                                        <th>Email</th>
                                                        <th>Type</th>
                                                        <th> <i class="bi bi-gear-fill"></i> </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(data, loop) in members.data" :key="loop">
                                                        <td>{{ loop + 1 }}</td>
                                                        <td>{{ data.type == 1 ? data.user.gsm : data.casual.gsm }}</td>
                                                        <td>{{ data.type == 1 ? data.user.username : data.casual.username }}</td>
                                                        <td>{{ data.type == 1 ? data.user.email : data.casual.email }}</td>
                                                        <td>{{ data.cat }}</td>
                                                        <td>
                                                            <div class="dropdown">
                                                                <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                                                    data-bs-toggle="dropdown">
                                                                    <i class="bi bi-tools"></i>
                                                                </button>
                                                                <ul class="dropdown-menu">
                                                                    <li class="bg-warning" v-if="data.type == 2"><a class="dropdown-item pointer" @click="editAnnounce(data)">Edit</a> </li>
                                                                    <li class="bg-danger" v-if="data.type == 2"><a class="dropdown-item pointer" @click="deleteAnnounce(data.pid)">Delete</a> </li>
                                                                    <li class="bg-primary"><a class="dropdown-item pointer" @click="assignTeamModal(data.pid)">Asign Team</a> </li>
                                                                </ul>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div class="flex justify-center mt-4">
                                                <nav class="relative justify-center rounded-md shadow pagination">
                                                    <pagination-links v-for="(link, i) of members.links" :link="link" :key="i"
                                                        @next="nextPage(link)"></pagination-links>
                                                </nav>
                                            </div>
                                        </div>
                </div>
                <div class="card-footer">
                    <!-- Team
                    <span v-for="tsk in task.teams" :key="tsk.id" class="badge bg-dark p-1 m-1 ellipsis">
                        {{ tsk.text }}
                    </span> -->
                    <!-- <i class="bi bi-person"></i> <label>{{ task.user?.username }}</label> -->
                </div>
            </div>
        </div>
  



    </div>
</template>

<script setup>
import store from "@/store";
import { onMounted, ref } from "vue";
// import OModal from "@/components/OModal.vue";
// import { Multiselect } from 'vue-multiselect';

const team = ref({})

//load-team-member
onMounted(() => {
    let tsk = localStorage.getItem('TVATI_TEAM_DETAIL') ? JSON.parse(localStorage.getItem('TVATI_TEAM_DETAIL')) : 'null'
    if (tsk != 'null') {
        team.value = tsk;
        loadTeamMember(tsk.pid)
    }
   
});

const members = ref({})

function loadTeamMember(pid) {
    store.dispatch('getMethod', { url: '/load-team-members/' + pid }).then(({ data }) => {
        members.value = data;
    })
}


const users = ref([]);
function dropdownUser() {
    store.dispatch('loadDropdown', 'users').then(({ data }) => {
        users.value = data;
    }).catch(e => {
        console.log(e);
        alert('Something Went Wrong')
    })
}
dropdownUser()

</script>

<style scoped>
.horizontal-scrollable {
    padding: 5px !important;
    padding-bottom: 10px !important;
}

.horizontal-scrollable>.row {
    overflow-x: auto;
    white-space: nowrap;
}

.row,
.flex-nowrap {
    margin-bottom: 5px !important;
    padding-bottom: 10px !important;
}



.col-4:nth-child(3n+1) {
    background: #c69;
}

.col-4:nth-child(3n+2) {
    background: #9c6;
}

.col-4:nth-child(3n+3) {
    background: #69c;
}

.sub-task-card {
    overflow-y: scroll;
    position: relative;
    max-height: 350px;
    padding: 5px 10px;
    justify-content: center;
}

/* .sub-task-card {
    scrollbar-width: thin;
}

.sub-task-card::-webkit-scrollbar {
    width: 10px !important;
} */</style>
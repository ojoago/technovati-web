<template>
    <div>
        <div class="container mt-2">
          
                    <div class="card">
                        <div class="card-header h3">Teams</div>
                        <div class="card-body">
                            <button class="btn btn-sm btn-primary m-2" @click="openTeamModal">Add New</button>
                            <div class="table-responsive">
                                <table class="table-hover table-stripped table-bordered table">
                                    <thead>
                                        <tr>
                                            <th>SN</th>
                                            <th>TASK</th>
                                            <th>DESCRIPTION</th>
                                            <th>TEAM lead</th>
                                            <th>Status</th>
                                            <th>Member</th>
                                            <th> <i class="bi bi-gear-fill"></i> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(team, loop) in team_data.data" :key="loop">
                                            <td>{{ loop + 1 }}</td>
                                            <td>{{ team.team }}</td>
                                            <td>{{ team.description }}</td>
                                            <td>{{ team?.lead?.username }}</td>
                                            <td>{{ team.team_status }}</td>
                                            <td>{{ team.teams_count }}</td>
                                            <td>
                                                <div class="dropdown">
                                                    <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                                        data-bs-toggle="dropdown">
                                                        <i class="bi bi-tools"></i>
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                        <li><a class="dropdown-item pointer bg-info" @click="teamDetail(team)">Details</a> </li>
                                                        <!-- <li><a class="dropdown-item pointer" @click="addMember(team.pid)">Add Member</a> </li> -->
                                                        <li><a class="dropdown-item pointer bg-warning" @click="editTeam(team)">Edit Team</a> </li>
                                                        <li><a class="bg-danger dropdown-item pointer" @click="detletTeam(team.pid)">Delete Team</a> </li>
                                                      
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="flex justify-center mt-4">
                                                <nav class="relative justify-center rounded-md shadow pagination">
                                                    <pagination-links v-for="(link, i) of team_data.links" :link="link" :key="i"
                                                        @next="nextPage(link)"></pagination-links>
                                                </nav>
                                            </div>
                            </div>
                        </div>
                    </div>
                </div>
          
         <o-modal :isOpen="teamModal" modal-class="modal-xs" title="Create Team" @submit="createTeam" @modal-close="closeModal" >
                <template #content>
                    <form id="teamForm">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="form-label">Team</label>
                                    <input type="text" v-model="team.team" class="form-control"
                                        placeholder="e.g Team A">
                                    <p class="text-danger " v-if="errors?.team">{{ errors?.team[0] }}</p>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="form-label">Description</label>
                                    <textarea type="text" v-model="team.description" class="form-control" placeholder="describe the team"></textarea>
                                    <p class="text-danger " v-if="errors?.description">{{ errors?.description[0] }}</p>
                                </div>
                            </div>
                                <div class="col-md-12">
                                <label class="form-label">Team Lead</label>
                                <Select2 v-model="team.team_lead" :options="userDrop"  />
                                <p class="text-danger " v-if="errors?.team_lead">{{ errors?.team_lead[0] }} </p>
                            </div>
                        </div>
                    </form>
                </template>
        
        </o-modal>

         <o-modal :isOpen="assignModal" modal-class="modal-xs" title="Create Team" @submit="createTeam" @modal-close="closeModal" >
                <template #content>
                    <form id="teamForm">
                        <div class="row">
                            
                            <div class="col-md-12">
                                                <Multiselect class="zindex" :options="userDrop" :multiple="true"
                                                    :close-on-select="true" placeholder="Pick Department" label="text"
                                                    track-by="id" />
                            </div>
                                <div class="col-md-12">
                                <label class="form-label">Team Lead</label>
                                <Select2 v-model="team.team_lead" :options="userDrop"  />
                                <p class="text-danger " v-if="errors?.team_lead">{{ errors?.team_lead[0] }} </p>
                            </div>
                        </div>
                    </form>
                </template>
        
        </o-modal>
    </div>
</template>

<script setup>
import store from "@/store";
import { ref } from "vue";
import Select2 from 'vue3-select2-component';
import PaginationLinks from "@/components/PaginationLinks.vue";
import OModal from "@/components/OModal.vue";
import { Multiselect } from 'vue-multiselect';

import { useRouter } from 'vue-router';
const router = useRouter()

const teamModal = ref(false)
const assignModal = ref(false)
const openTeamModal = () => {
    teamModal.value = true;
};

const closeModal = () => {
    teamModal.value = false;
    assignModal.value = false;
};

const errors = ref({});
const team_data = ref({});
const team = ref({
    team : '',
    description : '',
    team_lead : '',
    pid : '',
});

const editTeam = (tm)=>{
    team.value = {
        'team': tm.team ,
        'description': tm.description ,
        'team_lead': tm.team_lead ,
        'pid': tm.pid ,
    }
    teamModal.value = true;
}

const detletTeam = (pid) => {
      store.dispatch('putMethod', { url: '/toggle-team-status/'+pid }).then((data) => {
       if (data?.status == 201) {
            let form = document.querySelector('#teamForm');
            form.reset();
        }
    })
}
// function editDept(data) {
//     task.value = {
//         'department': data.task,
//         'description': data.description,
//         'from': data.from,
//         'to': data.to,
//         'pid': data.pid
//     }
// }
const teamDetail = (data) =>{
    localStorage.setItem('TVATI_TEAM_DETAIL', JSON.stringify(data, null, 2))
    router.push({ path: 'team-detail', query: { team: data.pid } })
}

// const member = ref({})
// const addMember = (pid) => {
//     assignModal.value = true;
//     member.value.team_pid = pid
// }

function createTeam() {
    errors.value = []
        store.dispatch('postMethod', { url: '/create-team', param: team.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data
        } else if (data?.status == 201) {
            let form = document.querySelector('#teamForm');
            form.reset();
            loadTeam()
        }
    })
}

function loadTeam() {
    store.commit('setSpinner', true)
    store.dispatch('getMethod', { url: '/load-team' }).then((data) => {
        store.commit('setSpinner', false)
        if (data?.status == 200) {
            team_data.value = data.data;
        }
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
        alert('weting be this')
    })
   
}


loadTeam()


const userDrop = ref({});
function dropdownUser() {
    store.dispatch('loadDropdown', 'users').then(({ data }) => {
        userDrop.value = data;
    }).catch(e => {
        console.log(e);
        alert('Something Went Wrong')
    })
}
dropdownUser()

function nextPage(link) {
    alert()
    if (!link.url || link.active) {
        return;
    }
    alert(link.url)
}

</script>

<style scoped></style>
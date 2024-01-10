<template>
    <div>
        <div class="container mt-2">
            <div class="row">
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <fieldset class="border rounded-3 p-2 m-1">
                                <legend class="float-none w-auto px-2">Create Team</legend>
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
                                                <textarea type="text" v-model="team.description" class="form-control" placeholder="Name of department"></textarea>
                                                <p class="text-danger " v-if="errors?.description">{{ errors?.description[0]
                                                }}</p>
                                            </div>
                                        </div>
                                         <div class="col-md-12">
                                            <label class="form-label">Team Lead</label>
                                            <Select2 v-model="team.team_lead" :options="userDrop"  />
                                            <p class="text-danger " v-if="errors?.team_lead">{{ errors?.team_lead[0] }} </p>
                                        </div>
                                    </div>
                                    <button type="button" class="btn btn-success btn-sm mt-2"
                                        @click="createTeam">Submit</button>
                                </form>

                            </fieldset>
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header h3">Teams</div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table-hover table-stripped table-bordered table">
                                    <thead>
                                        <tr>
                                            <th>SN</th>
                                            <th>TASK</th>
                                            <th>DESCRIPTION</th>
                                            <th>TEAM lead</th>
                                            <th>Count</th>
                                            <th> <i class="bi bi-pencil-fill"></i> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(team, loop) in team_data.data" :key="loop">
                                            <td>{{ loop + 1 }}</td>
                                            <td>{{ team.team }}</td>
                                            <td>{{ team.description }}</td>
                                            <td>{{ team.lead.username }}</td>
                                            <td>{{ team.teams_count }}</td>
                                            <td>
                                                <div class="dropdown">
                                                    <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                                        data-bs-toggle="dropdown">
                                                        <i class="bi bi-tools"></i>
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                        <li><a class="dropdown-item pointer" click="editDept(dp)">Asign Member</a> </li>
                                                        <li><a class="dropdown-item pointer" click="editDept(dp)">Update Team Lead</a> </li>
                                                        <li><a class="dropdown-item pointer" @click="editTeam(team)">Edit Team</a> </li>
                                                        <!-- <li><a class="dropdown-item pointer" data-bs-toggle="modal"
                                                                data-bs-target="">Assign</a></li> -->
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
            </div>
        </div>
    </div>
</template>

<script setup>
import store from "@/store";
import { ref } from "vue";
import Select2 from 'vue3-select2-component';
import PaginationLinks from "@/components/PaginationLinks.vue";


const errors = ref({});
const team_data = ref({});
const team = ref({
    'team': '',
    'description': '',
    'team_lead': '',
    'pid': '',
});

const editTeam = (tm)=>{
    team.value = {
        'team': tm.team ,
        'description': tm.description ,
        'team_lead': tm.team_lead ,
        'pid': tm.pid ,
    }
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



function createTeam() {
    errors.value = []
    store.commit('setSpinner', true)
        store.dispatch('postMethod', { url: '/create-team', param: team.value }).then((data) => {
        if (data.status == 422) {
            errors.value = data.data
            store.commit('setSpinner', false)
        } else if (data.status == 201) {
            let form = document.querySelector('#teamForm');
            form.reset();
            store.commit('setSpinner', false)
        }else{
            store.commit('setSpinner', false)
        }
        return data;
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
    })
}

function loadTeam() {
    store.commit('setSpinner', true)
    store.dispatch('getMethod', { url: '/load-team' }).then((data) => {
        store.commit('setSpinner', false)
        if (data.status == 200) {
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
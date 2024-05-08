<template>
    <div>
        <div class="container mt-2">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">Engineering Teams</div>
                        <ul class="nav nav-tabs d-flex" id="myTabjustified" role="tablist">
                            <li class="nav-item flex-fill" role="presentation">
                                <button class="nav-link w-100 active" id="worker-tab" data-bs-toggle="tab" data-bs-target="#worker" type="button" role="tab" aria-controls="worker" aria-selected="true">Workers</button>
                            </li>
                            <li class="nav-item flex-fill" role="presentation">
                                <button class="nav-link w-100" id="casual-tab" data-bs-toggle="tab" data-bs-target="#casual" type="button" role="tab" aria-controls="casual" aria-selected="false">Add Casual Staff</button>
                            </li>

                            <!-- <li class="nav-item flex-fill" role="presentation">
                            <button class="nav-link w-100" id="qualification-tab" data-bs-toggle="tab" data-bs-target="#qualification" type="button" role="tab" aria-controls="qualification" aria-selected="false">Qualification</button>
                            </li>
                            <li class="nav-item flex-fill" role="presentation">
                            <button class="nav-link w-100" id="bank-tab" data-bs-toggle="tab" data-bs-target="#bank" type="button" role="tab" aria-controls="bank" aria-selected="false">Bank Details</button>
                            </li> -->

                        </ul>
                       
                        <div class="card-body">
                         <div class="tab-content pt-2" id="myTabjustifiedContent">
                            <div class="tab-pane fade show active" id="worker" role="tabpanel" aria-labelledby="worker-tab">
                                 <fieldset class="border rounded-3 p-2 m-1">
                                    <legend class="float-none w-auto px-2">Lists</legend>
                                     <!-- <button type="button" class="btn btn-success btn-sm m-1">Add Casual Staff</button> -->
                                    <button type="button" class="btn btn-success btn-sm m-1" @click="openTeamModal"> Add Fulltime Staff</button>
                                    <div class="table-responsive">
                                        <table class="table-hover table-stripped table-bordered table">
                                            <thead>
                                                <tr>
                                                    <th>SN</th>
                                                    <th>Phone Number</th>
                                                    <th>Username</th>
                                                    <th>Email</th>
                                                    <th>Type</th>
                                                    <th>Team</th>
                                                    <!-- <th>Image</th> -->
                                                    <th> <i class="bi bi-gear-fill"></i> </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(data, loop) in worker.data" :key="loop">
                                                    <td>{{ loop + 1 }}</td>
                                                    <td>{{ data.type == 1 ? data.user.gsm : data.casual.gsm }}</td>
                                                    <td>{{ data.type == 1 ? data.user.username : data.casual.username }}</td>
                                                    <td>{{ data.type == 1 ? data.user.email : data.casual.email }}</td>
                                                    <td>{{ data.cat }}</td>
                                                    <td>{{ data?.team?.team }}</td>
                                                    <!-- <td>{{ data.type == 1 ? data.staff.path : data.casual.path }}</td> -->
                                                    <td>
                                                        <div class="dropdown">
                                                            <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                                                data-bs-toggle="dropdown">
                                                                <i class="bi bi-tools"></i>
                                                            </button>
                                                            <ul class="dropdown-menu">
                                                                <!-- <li v-if="data.type == 2"><a class="dropdown-item pointer bg-warning" @click="editWorker(data.pid)">Edit</a> </li> -->
                                                                <li v-if="data.type == 2 && data?.status == 1"><a class="bg-danger dropdown-item pointer" @click="deleteCasualStaff(data.pid)">Delete</a> </li>
                                                                <li v-if="data.type == 2 && data?.status == 0"><a class="bg-secondary dropdown-item pointer" @click="enableCasualStaff(data.pid)">Enable</a> </li>
                                                                <li><a class="bg-primary dropdown-item pointer" @click="assignTeamModal(data.pid)">Asign Team</a> </li>
                                                                <li v-if="data?.team"><a class="bg-warning dropdown-item pointer" @click="deAssignTeamModal(data.pid)">Remove from Team</a> </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div class="flex justify-center mt-4">
                                            <nav class="relative justify-center rounded-md shadow pagination">
                                                <pagination-links v-for="(link, i) of worker.links" :link="link" :key="i"
                                                    @next="nextPage(link)"></pagination-links>
                                            </nav>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                            <div class="tab-pane fade" id="casual" role="tabpanel" aria-labelledby="casual-tab">
                                 <fieldset class="border rounded-3 p-2 m-1">
                                    <legend class="float-none w-auto px-2">Add Casual Workers</legend>
                                         <worker-form></worker-form>
                                </fieldset>
                            </div>

                          </div>
                        </div>
                    </div>
                </div>
            </div>

            <o-modal :isOpen="teamModal" modal-class="modal-xs" title="Add Full time Staff" @submit="addStaff" @modal-close="closeModal" >
                    <template #content>
                        <form id="teamForm">
                            <div class="row">
                                <!-- <div class="col-md-12">
                                    <label class="form-label">Departments</label>
                                    <Select2 :options="deptDrop"  />
                                </div> -->

                                <div class="col-md-12">
                                    <label class="form-label">Staff</label>
                                    <Select2 v-model="team.user_pid" :options="userDrop"  />
                                    <p class="text-danger " v-if="errors?.user_pid">{{ errors?.user_pid[0] }} </p>
                                </div>
                                <div class="col-md-12">
                                    <label class="form-label">Team</label>
                                    <Select2 v-model="team.term_pid" :options="teamDrop"  />
                                    <p class="text-danger " v-if="errors?.term_pid">{{ errors?.term_pid[0] }} </p>
                                </div>
                            </div>
                        </form>
                    </template>
            </o-modal>

            <o-modal :isOpen="assignModal" modal-class="modal-xs" title="Assign Staff to team" @submit="addTeam" @modal-close="closeModal" >
                    <template #content>
                        <form id="assignForm">
                            <div class="row">
                                <div class="col-md-12">
                                    <label class="form-label">Team</label>
                                    <Select2 v-model="team.team_pid" :options="teamDrop"  />
                                    <p class="text-danger " v-if="errors?.team_pid">{{ errors?.team_pid[0] }} </p>
                                </div>
                            </div>
                        </form>
                    </template>
        
            </o-modal>
    </div>
</template>

<script setup>
    import Select2 from 'vue3-select2-component';
    import store from "@/store";
    import { ref } from "vue";
    import PaginationLinks from "@/components/PaginationLinks.vue";
    import WorkerForm from "@/components/forms/casual/WorkerForm.vue"
    import OModal from "@/components/OModal.vue";
    import { useRouter } from 'vue-router';
    const router = useRouter()
    let query = {}
    router.push({ query: query })
    // const user_pid = ref(null);
   
    const teamModal = ref(false)
    const openTeamModal = () => {
        teamModal.value = true;
    };
    const assignModal = ref(false)
    const assignTeamModal = (pid) => {
        team.value.user_pid = pid;
        assignModal.value = true;
    };

    const closeModal = () => {
        teamModal.value = false;
        assignModal.value = false;
    };

const team = ref({
    user_pid: '' , 
    team_pid : '' ,
})

const resetTeam = ()=>{
    team.value = {
        user_pid: '',
        team_pid: '',
    }
}
const errors = ref({});

function addStaff() {
    errors.value = []
    store.dispatch('postMethod', { url: '/add-staff-to-team', param: team.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data
        } else if (data?.status == 201) {
            resetTeam();
            loadWorker()
        }
    })

}
function deAssignTeamModal(pid) {
    store.dispatch('putMethod', { url: '/remove-staff-from-team/'+pid, prompt: 'Are You sure you want to remove staff from the team?' }).then((data) => {
         if (data?.status == 201) {
            loadWorker()
        }
    })
}
function addTeam() {
    errors.value = []
    // let data = new FormData;
    // const  header = { "Content-Type": "multipart/form-data" };
    store.dispatch('postMethod', { url: '/assign-team', param: team.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data
        } else if (data?.status == 201) {
            resetTeam()
            loadWorker()
        }
    })
}

const deleteCasualStaff = (pid) => {
    store.dispatch('deleteMethod', { url: '/delete-casual-staff/'+pid}).then((data) => {
        if (data?.status == 201) {
            loadWorker()
        }
    })
}
// const editWorker = (pid) => {
//     localStorage.clear()
//     query = { action: 'edit', tab: 'casual-tab', 'id': pid }
//     localStorage.setItem('TVATI_CASAUL_TAB', JSON.stringify(query, null, 2))
//     router.push({ path: 'workers', query: query })
//     let resultsTab = document.getElementById('casual-tab');
//     //show the results tab:
//     resultsTab.click();
// }
const worker = ref({});

loadWorker()
function loadWorker() {
    store.dispatch('getMethod', { url: '/load-workers' }).then((data) => {
        if (data?.status == 200) {
            worker.value = data.data;
        }
    })
}
const teamDrop = ref({});
function dropDownTeam() {
    store.dispatch('loadDropdown', 'team').then(({ data }) => {
        teamDrop.value = data;
    })
}
dropDownTeam()


const deptDrop = ref({});
function dropdownDept() {
    store.dispatch('loadDropdown', 'departments').then(({ data }) => {
        deptDrop.value = data;
    })
}
dropdownDept()
const userDrop = ref({});
function dropdownUser() {
    store.dispatch('loadDropdown', 'users').then(({ data }) => {
        userDrop.value = data;
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

<style scoped>

</style>
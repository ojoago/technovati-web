<template>
    <div>
        <div class="container">
           <div class="card m-2">
            <div class="card-header">
                <h5 class="card-title"> {{ task.task }}</h5>
                <p>{{ task.description }}</p>
                <nav class="d-flex float-start">
                    <ol class="breadcrumb">
                      <li class="breadcrumb-item"> {{ task.from }}</li>
                      <li class="breadcrumb-item"> {{ task.to }}</li>
                      <li class="breadcrumb-item active">Day(s) left: 12</li>
                    </ol>
                  </nav>
                  <div class="float-end">
                    <button class="btn btn-sm btn-primary m-2"  @click="addSubTask(task)">Add Sub Task</button>
                    <!-- <button class="btn btn-sm btn-primary m-2" @click="addTeamModal">Add Team M</button> -->
                  </div>
            </div>
            <div class="card-body">
                <div class="horizontal-scrollable">
                <div class="row flex-nowrap">
                    <div class="col-4" v-for="(heading, lp) in task.headings" :key="lp">
                        <label class="h3 text-center">{{ heading.toUpperCase() }}</label>
                           <div class="sub-task-card">
                                <template v-for="sub in subtasks" :key="sub.pid" >
                                    <div class="card mb-2 " v-if="lp == task.status">
                                    <div class="card-body">
                                        <h4 class="card-title h5">{{ sub.name }}</h4>
                                    </div>
                                    <div class="card-body">
                                        <span v-for="team in sub.teams" :key="team.id" class="badge bg-dark p-1 m-1 ellipsis">
                                            {{ team.text }}
                                        </span>
                                    </div>
                                    <div class="card-footer">
                                        <i class="bi bi-info-circle-fill pointer" @click="subTaskDetail(sub, heading)"></i> 
                                        <i class="bi bi-person"></i> <label>{{ sub.user?.username }}</label>
                                        <span class="float-end small text-danger"><i class="bi bi-calendar-x"></i> <label>{{ sub.to }}</label></span>
                                    </div>
                                </div>
                                </template>
                           </div>
                    </div>
            
                </div>
            </div>

            <!-- draggable  -->
            <div class="col-4" v-for="(heading, lp) in task.headings" :key="lp"></div>
            <draggable v-for="sub in subtasks" :key="sub.pid" tag="ul" group="heading">
                        <label class="h3 text-center">{{ heading.toUpperCase() }}</label>
                         <template #item="{ element: sub }">
                            <li>{{ sub.name }}</li>
                        </template>
            </draggable>

             <h1>Terrible Foods</h1>
                <draggable v-model="subtasks" tag="ul" :group="subtasks">
                    <template #item="{ element: sub }">
                        <li>{{ sub.name }}</li>
                        </template>
                </draggable>



            </div>



            <div class="card-footer">
                Team
                <span v-for="tsk in task.teams" :key="tsk.id" class="badge bg-dark p-1 m-1 ellipsis">
                    {{ tsk.text }}
                </span>
                <i class="bi bi-person"></i> <label>{{ task.user?.username }}</label>
            </div>
           </div>
        </div>
             <o-modal :isOpen="toggleModal" modal-class="modal-sm" subtitle="add sub task to task" @modal-close="closeModal" >
                        <template #content>
                            <SubTaskForm :task="task" />
                        </template>
                        <template #footer>
                            <div></div>
                        </template>
                    </o-modal>

             <o-modal :isOpen="dtlModal" subtitle="sub task details" @modal-close="closeModal" >
                        <template #content>
                             <div class="card mb-2 " >
                                        <div class="card-body">
                                            <h4 class="card-title h5">Task: {{ dtlSub.name }}</h4>
                                            <p>Current Status: <span class="text-info"><i class="bi bi-info-circle"></i> <label>{{ dtlSub.status }}</label></span></p>
                                            Task Begin: <span class="text-primary"><i class="bi bi-calendar-x"></i> <label>{{ dtlSub.from }}</label></span>
                                            <span class="float-end">Task End: <span class="text-danger"> <i class="bi bi-calendar-x"></i> <label>{{ dtlSub.to }}</label></span> </span>

                                        </div>
                                        <div class="card-body">
                                           Description <p>{{ dtlSub.description }}</p>
                                            <hr>
                                            Teams:
                                            <span v-for="team in dtlSub.teams" :key="team.id" class="badge bg-dark p-1 m-1">
                                                {{ team.text }}
                                            </span>
                                        </div>
                                        <div class="card-footer">
                                            <i class="bi bi-person"></i> <label>{{ dtlSub.user?.username }}</label>
                                        </div>
                                    </div>
                        </template>
                        <template #footer>
                            <div>
                            
                            </div>
                        </template>
                    </o-modal>

             <o-modal :isOpen="teamModal" :subtitle="`add staff to ${task.task}`" @modal-close="closeModal" >
                <template #content>
                       
                        <div>
                            
                        </div>
                </template>
                <template #footer>
                    <div>
                        <div class="card" style="width: 100% !important;">
                            <div class="card-body">
                                <div>
                                    <Multiselect v-model="teams" :options="users" :multiple="true"
                                        :close-on-select="true" placeholder="Pick Staff" label="text"
                                        track-by="id" style="width: 100% !important;" />
                                </div>
                                <p class="text-danger " v-if="errors?.teams">{{ errors?.teams[0] }}</p>
                            </div>
                            <div class="card-footer">
                                <button class="btn btn-sm btn-success m-1" @click="updateTask" >Update</button>
                                <button class="btn btn-sm btn-secondary m-1" @modal-close="closeModal">Close</button>
                            </div>
                        </div>
                    </div>
                </template>
            </o-modal>
        
        
    </div>
</template>

<script setup>    
import store from "@/store";
import { onMounted, ref } from "vue";
import { useRoute,useRouter  } from 'vue-router';
import SubTaskForm from "@/components/task/forms/SubTaskForm.vue";
import OModal from "@/components/OModal.vue";
import { Multiselect } from 'vue-multiselect';
import draggable from 'vuedraggable';
const header = ref([])
const router = useRouter()
const route = useRoute()
const task = ref({});
const subtasks = ref({});
const task_pid = ref(null);
function addSubTask() {
    toggleModal.value = true;
}

header.value = task.value.headings

const toggleModal = ref(false);
const closeModal = () => {
    toggleModal.value = false;
    dtlModal.value = false;
    teamModal.value = false;
};

onMounted(() => {
      let tsk = localStorage.getItem('TVATI_TASK_DETAIL') ? JSON.parse(localStorage.getItem('TVATI_TASK_DETAIL')) : 'null'
         if (tsk != 'null') {
            task.value = tsk;
         }
    getUrlQueryParams()
    loadSubTask()
});

 async function  getUrlQueryParams(){
     await router.isReady()
     task_pid.value = route.query.task;
}

function loadSubTask() {
   store.dispatch('getMethod', {url:'/task-detail/'+ route.query.task }).then(({data}) => {
        subtasks.value = data;
    })
}

// view sub task details on modal 
const dtlModal = ref(false)
const dtlSub = ref({})
const subTaskDetail = (sb,sts)=>{
    dtlSub.value = sb;
    dtlSub.value.status = sts
    dtlModal.value = true
}
// view sub task details on modal 
const teamModal = ref(false)
const teams = ref({})

// const addTeamModal = ()=>{
//     teams.value = task.value.teams;
//     teamModal.value = true
// }

const errors = ref({})
function updateTask() {
    errors.value = [];
    task.value.teams = teams.value;
    store.dispatch('postMethod', { url: '/update-task', param: task.value }).then((data) => {
        if (data.status == 422) {
            errors.value = data.data;
        } else if (data.status == 201) {
            errors.value = [];
            // memoForm.value = [];
            // loadTask()
        }
    })
}
const users = ref([]);
function dropdownUser() {
    store.dispatch('loadDropdown', 'users').then(({ data }) => {
        users.value = data;
    })
}
dropdownUser()

</script>

<style scoped>
 .horizontal-scrollable  {
        padding: 5px !important;
        padding-bottom:10px !important ;
    }
 .horizontal-scrollable > .row {
        overflow-x: auto;
        white-space: nowrap;
    }
.row,.flex-nowrap{
    margin-bottom: 5px !important;
    padding-bottom: 10px !important;
}



.col-4:nth-child(3n+1) { background: #c69; }
.col-4:nth-child(3n+2) { background: #9c6; }
.col-4:nth-child(3n+3) { background: #69c; }

.sub-task-card{
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
} */

</style>
<template>
    <div>
        <div class="container mt-2">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title"> {{ task.task }}</h5>
                    <p>{{ task.description }}</p>
                    <nav class="d-flex float-start">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"> {{ task.start }}</li>
                            <li class="breadcrumb-item"> {{ task.end }}</li>
                            <li class="breadcrumb-item active">Day(s) left: {{ task.left}}</li>
                        </ol>
                    </nav>
                    <div class="float-end">
                        <button class="btn btn-sm btn-primary m-2" @click="addSubTask(task)">Add Sub Task</button>
                        <!-- <button class="btn btn-sm btn-primary m-2" @click="addTeamModal">Add Team M</button> -->
                    </div>
                    <!-- <small>click on a task for details and right click to edit</small> -->
                </div>
                <div class="card-body">
                    <div class="horizontal-scrollable" v-if="subtasks.length> 0">
                        <div class="row flex-nowrap">
                            <!-- <div class="kanban"> -->
                            <div class="column" v-for="(column, columnIndex) in subtasks" :key="columnIndex">
                                <h4 class="task-header text-ellipsis">{{ column.title }} </h4>
                                <draggable class="task-list" :id="columnIndex" v-model="column.tasks" group="kanban"
                                    @end="onDragEnd($event, column.title)" @change="handleChange">
                                    <template #item="{ element, index }">
                                        <div @click="subTaskDetail(column.title,element)"
                                            @contextmenu="handleRightClick($event,  element)" class="task" :key="index">
                                            {{
                                            element.name }}</div>
                                    </template>
                                </draggable>
                            </div>
                            <!-- </div> -->
                        </div>
                    </div>

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



        <o-modal :isOpen="toggleModal" modal-class="modal-sm" subtitle="add sub task to task" @modal-close="closeModal">
            <template #content>
                <SubTaskForm :task="task" />
            </template>
            <template #footer>
                <div></div>
            </template>
        </o-modal>

        <o-modal :isOpen="subTaskModal" modal-class="modal-sm" @submit="editSubTask" subtitle="Edit sub task"
            @modal-close="closeModal">
            <template #content>
                <form>
                    <!-- {{ subTask }} -->
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="form-label">Sub Task</label>
                                <input type="text" v-model="subTask.name" class="form-control"
                                    placeholder="enter sub task">
                                <p class="text-danger " v-if="errors?.name">{{ errors?.name[0] }}</p>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">Begin Date</label>
                                <input type="date" v-model="subTask.from" class="form-control">
                                <p class="text-danger " v-if="errors?.from">{{ errors?.from[0] }}</p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">End Date</label>
                                <input type="date" v-model="subTask.to" class="form-control">
                                <p class="text-danger " v-if="errors?.to">{{ errors?.to[0] }}</p>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="form-label">Description</label>
                                <textarea type="text" v-model="subTask.description" class="form-control"
                                    placeholder="enter description"></textarea>
                                <p class="text-danger " v-if="errors?.description">{{ errors?.description[0] }}</p>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="form-label">Assign</label>
                                <div v-for="team in task.teams" :key="team.pid">
                                    <input type="checkbox" id="checkbox" :value="team" v-model="subTask.teams" />
                                    &nbsp; <label for="checkbox"> {{ team.text }}</label>
                                </div>
                                <p class="text-danger " v-if="errors?.teams">{{ errors?.teams[0] }}</p>
                            </div>
                        </div>
                    </div>
                    <!-- <button type="button" class="btn btn-success btn-sm mt-2" @click="createTask">Submit</button> -->
                </form>
            </template>

        </o-modal>

        <o-modal :isOpen="dtlModal" subtitle="sub task details" @modal-close="closeModal">
            <template #content>
                <div class="card mb-2 ">
                    <div class="card-body">
                        <h4 class="card-title h5">Task: {{ dtlSub.name }}</h4>
                        <p>Current Status: <span class="text-info"><i class="bi bi-info-circle"></i> <label>{{
                                    dtlSub.title }}</label></span></p>
                        Task Begin: <span class="text-primary"><i class="bi bi-calendar-x"></i> <label> {{
                                dtlSub.start
                                }}</label></span> <br>
                        <span class="">Task End: <span class="text-danger"> <i class="bi bi-calendar-x"></i>
                                <label> &nbsp; {{ dtlSub.end }}</label></span> </span>

                    </div>
                    <div class="card-body">

                        Description
                        <hr>
                        <p>{{ dtlSub.description }}</p>
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
                    <!-- <button class="btn btn-sm btn-warning" @click="editSubTaskModal(dtlSub)">Edit</button> -->
                </div>
            </template>
        </o-modal>

        <o-modal :isOpen="teamModal" :subtitle="`add staff to ${task.task}`" @modal-close="closeModal">
            <template #content>

                <div>

                </div>
            </template>
            <template #footer>
                <div>
                    <div class="card" style="width: 100% !important;">
                        <div class="card-body">
                            <div>
                                <Multiselect v-model="teams" :options="users" :multiple="true" :close-on-select="true"
                                    placeholder="Pick Staff" label="text" track-by="id"
                                    style="width: 100% !important;" />
                            </div>
                            <p class="text-danger " v-if="errors?.teams">{{ errors?.teams[0] }}</p>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-sm btn-success m-1" @click="updateTask">Update</button>
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
import Draggable from 'vuedraggable';

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
    subTaskModal.value = false;
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

const subTaskDetail = (status,data)=>{
    dtlSub.value = data;
    dtlSub.value.title = status
    dtlModal.value = true
}

const handleRightClick = (event,data) => {
    event.preventDefault();
    dtlModal.value = false
    subTaskModal.value = true
    subTask.value = data;
}

const subTask = ref({})
const subTaskModal = ref(false)
// const editSubTaskModal = (data) =>{
//     dtlModal.value = false
//     subTaskModal.value = true
//     subTask.value = data;
// }

const editSubTask = ()=>{
    store.dispatch('postMethod', { url: '/create-sub-task', param: subTask.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data;
        } else if (data?.status == 201) {
            subTask.value = {}
        }
    })
}


// view sub task details on modal 
const teamModal = ref(false)
const teams = ref({})

const taskParam = ref({ status: '', sub_task_id: '', pid: '', task :'',title:''})
const onDragEnd = (event,title) => {
    taskParam.value.status = event['to'].id
    taskParam.value.title = title
    if (taskParam.value.sub_task_id) {
        updateSubTask()
    }
}
const handleChange = (event) => {
    if (event['added'] != undefined){
        taskParam.value.sub_task_id = event['added']['element'].id; 
        taskParam.value.pid = event['added']['element'].pid; 
        taskParam.value.task = event['added']['element'].name; 
    }
}

const updateSubTask = () => {
    store.dispatch('putMethod', { url: '/update-sub-task-status', param: taskParam.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data;
        } else if (data?.status == 201) {
            errors.value = [];
        
        }
    })
}

// const addTeamModal = ()=>{
//     teams.value = task.value.teams;
//     teamModal.value = true
// }

const errors = ref({})
function updateTask() {
    errors.value = [];
    task.value.teams = teams.value;
    store.dispatch('postMethod', { url: '/update-task', param: task.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data;
        } else if (data?.status == 201) {
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



.column:nth-child(3n+1) { background: #c69; }
.column:nth-child(3n+2) { background: #9c6; }
.column:nth-child(3n+3) { background: #69c; }

/* .sub-task-card{
    overflow-y: scroll;
    position: relative;
    max-height: 350px;
    padding: 5px 10px;
    justify-content: center;
} */
/* .sub-task-card {
    scrollbar-width: thin;
}

.sub-task-card::-webkit-scrollbar {
    width: 10px !important;
} */



.kanban {
    display: flex;
    justify-content: space-between;
}

.column {
    /* flex: 1; */
    padding: 5px 10px;
    margin: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 280px;
}


.task-header{
    text-align: center;
    color: #f0f0f0;
    background-color: #737070;
        border: 1px solid #ccc;
        padding: 5px;
        margin-bottom: 5px;
        border-radius: 5px;
    width: 100% !important;
    align-content: center;
}

.task-list {
    min-height: 100px;
    margin-top: 10px;
}
.task-list{
    overflow-y: scroll;
        position: relative;
        max-height: 350px;
        padding: 5px 10px;
        justify-content: center;
        scrollbar-width: thin;
}

.task-list::-webkit-scrollbar {
    width: 8px ;
}

.task {
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 5px;
    border-radius: 5px;
    white-space: pre-wrap;
    cursor: grab;
    /* width: 200px; */
}
</style>
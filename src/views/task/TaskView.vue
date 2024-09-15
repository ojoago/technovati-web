<template>
    <div>
        <div class="container mt-2">

            <div class="card">

                <div class="card-header">
                    <h3>Tasks</h3>
                    <button class="btn btn-sm btn-primary" @click="addTask">Add Task</button>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table-hover table-stripped table-bordered table">
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>TASK</th>
                                    <th>SUB TASK</th>
                                    <th>DESCRIPTION</th>
                                    <th>Deadline</th>
                                    <th>STATUS</th>
                                    <th> <i class="bi bi-gear-fill"></i> </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(task, loop) in tasks.data" :key="loop">
                                    <td>{{ loop + 1 }}</td>
                                    <td>{{ task.task }}</td>
                                    <td>{{ task.sub_task_count }}</td>
                                    <td>{{ task.description }}</td>
                                    <td>{{ task.end }}</td>
                                    <td>{{ task.status == 0 ? 'Not Completed' : 'Completed' }}</td>
                                    <td>
                                        <div class="dropdown">
                                            <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                                data-bs-toggle="dropdown">
                                                <i class="bi bi-tools"></i>
                                            </button>
                                            <ul class="dropdown-menu">
                                                <li><a class="dropdown-item pointer"
                                                        @click="taskDetail(task)">Details</a> </li>
                                                <li><a class="dropdown-item pointer" v-if="task.status==0"
                                                        @click="addSubTask(task)">Add Sub Task</a> </li>
                                                <li><a class="dropdown-item pointer"
                                                        v-if="task.creator == creator && task.status==0"
                                                        @click="editTask(task)">Edit Task</a> </li>
                                                <li><a class="dropdown-item pointer bg-danger"
                                                        v-if="task.creator == creator && task.status==0"
                                                        @click="deleteTask(task)">Delete</a></li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="flex justify-center mt-4">
                            <nav class="relative justify-center rounded-md shadow pagination">
                                <pagination-links v-for="(link, i) of tasks.links" :link="link" :key="i"
                                    @next="nextPage(link)"></pagination-links>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <o-modal :isOpen="toggleModal" modal-class="modal-sm" titles="Add Sub Task" subtitle="add sub task to task"
            @modal-close="closeModal">
            <template #content>
                <SubTaskForm :task="_task" @customEvent="closeModal" />
            </template>
            <template #footer>
                <div></div>
            </template>
        </o-modal>

        <o-modal :isOpen="lgModal" modal-class="modal-lg" title="Create Task" @submit="createTask"
            @modal-close="closeModal">
            <template #content>
                <form>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="form-label">Task/Project</label>
                                <input type="text" v-model="task.task" class="form-control" placeholder="e.g task one">
                                <p class="text-danger " v-if="errors?.task">{{ errors?.task[0] }}</p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">Description</label>
                                <textarea type="text" v-model="task.description" class="form-control"
                                    placeholder="e.g how to add task"></textarea>
                                <p class="text-danger " v-if="errors?.description">{{ errors?.description[0] }}</p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">Status Heading</label> <i class="bi bi-info-cycle"></i>
                                <textarea type="text" v-model="task.headings" class="form-control"
                                    placeholder="e.g PENDING, IN PROGRESS, COMPLETED, DAMAGED"></textarea>
                                <p class="text-danger " v-if="errors?.headings">{{ errors?.headings[0] }}</p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">Begin Date</label>
                                <input type="date" v-model="task.from" class="form-control"
                                    placeholder="Name of department">
                                <p class="text-danger " v-if="errors?.from">{{ errors?.from[0] }}</p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">End Date</label>
                                <input type="date" v-model="task.to" class="form-control"
                                    placeholder="Name of department">
                                <p class="text-danger " v-if="errors?.to">{{ errors?.to[0] }}</p>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="form-label">Assign</label>
                                <div>
                                    <Multiselect v-model="task.teams" :options="users" :multiple="true"
                                        :close-on-select="true" placeholder="Pick Staff" label="text" track-by="id" />
                                </div>
                                <p class="text-danger " v-if="errors?.teams">{{ errors?.teams[0] }}</p>
                            </div>
                        </div>
                    </div>
                    <!-- <button type="button" class="btn btn-success btn-sm mt-2"
                                        @click="">Submit</button> -->
                </form>
            </template>

        </o-modal>
    </div>
</template>

<script setup>
import store from "@/store";
import { ref } from "vue";
import { Multiselect } from 'vue-multiselect';
import PaginationLinks from "@/components/PaginationLinks.vue";
import SubTaskForm from "@/components/task/forms/SubTaskForm.vue";
import OModal from "@/components/OModal.vue";
import { useRouter } from 'vue-router';
const router = useRouter()
const creator = ref(null);
creator.value = store?.state?.user?.data?.pid;

 
const errors = ref({});
const tasks = ref({});
const task = ref({
    'task': '',
    'description': '',
    'from': '',
    'to': '',
    teams:'',
    heading:''
});

const toggleModal = ref(false);
const lgModal = ref(false);
const closeModal = () => {
    toggleModal.value = false;
    lgModal.value = false;
    resetAttr()
};

const addTask = () => {
    lgModal.value = true
}

const resetAttr = () => {
    task.value = {
        'task': '',
        'description': '',
        'from': '',
        'to': '',
        teams: '',
        heading: ''
    }
}



function createTask() {
    errors.value = [];
    store.dispatch('postMethod', { url: '/create-task', param: task.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data;
        } else if (data?.status == 201) {
            errors.value = [];
            closeModal()
            loadTask()
        }
    }).catch(e => {
        console.log(e);
        alert('weting be this')
    })
}

function deleteTask(tsk) {
    if(confirm(`are you sure you want to delete ${tsk.task} ?`)){
        
        store.dispatch('getMethod', { url: '/delete-task/' + tsk.pid }).then((data) => {
            
            if (data?.status == 201) {
                loadTask()
            }
        }).catch(e => {
            
            console.log(e);
        })
    }
}

loadTask()

function loadTask(url= '/load-task') {
   
    store.dispatch('getMethod', { url: url }).then((data) => {
        
        if (data?.status == 200) {
            tasks.value = data.data
        }else{
            tasks.value = {}
        }
    }).catch(e => {
       
        console.log(e);
    })
}

function nextPage(link) {
        if (!link.url || link.active) {
            return;
        }
        loadTask(link.url)
    }
  
    function taskDetail(task) {
        localStorage.setItem('TVATI_TASK_DETAIL', JSON.stringify(task, null, 2))
        router.push({ path: 'task-detail', query: { task: task.pid } })
    }
    function editTask(tsk) {
       lgModal.value = true;
       task.value = tsk;
    }
    const _task = ref({})
    function addSubTask(task) {
        _task.value = task;
        toggleModal.value = true;
    }
 
 

    const users = ref([]);
function dropdownUser() {
    store.dispatch('loadDropdown', 'users').then(({ data }) => {
        users.value = data;
    }).catch(e => {
        console.log(e);
    })
}
dropdownUser()


 
</script>

<style scoped>
</style>
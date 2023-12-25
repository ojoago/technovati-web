<template>
    <div>
        <div class="container mt-2">
            <div class="row">
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <fieldset class="border rounded-3 p-2 m-1">
                            <legend class="float-none w-auto px-2">Create Task</legend>

                            <form>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="form-label">Task/Project</label>
                                            <input type="text" v-model="task.task" class="form-control"
                                                placeholder="Name of department">
                                            <p class="text-danger " v-if="errors?.task">{{ errors?.task[0] }}</p>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="form-label">Description</label>
                                            <textarea type="text" v-model="task.description" class="form-control"  placeholder="Name of department"></textarea>
                                            <p class="text-danger " v-if="errors?.description">{{ errors?.description[0] }}</p>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Begin Date</label>
                                                <input type="date" v-model="task.from" class="form-control"
                                                    placeholder="Name of department">
                                                <p class="text-danger " v-if="errors?.from">{{ errors?.from[0] }}</p>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">End Date</label>
                                                <input type="date" v-model="task.to" class="form-control"
                                                    placeholder="Name of department">
                                                <p class="text-danger " v-if="errors?.to">{{ errors?.to[0] }}</p>
                                            </div>
                                        </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="form-label">Head of Department</label>
                                            <input type="text" v-model="task.head" class="form-control"
                                                placeholder="Name of department">
                                            <!-- <p class="text-danger " v-if="errors?.head[0]">{{ errors?.head[0] }}</p> -->
                                        </div>
                                    </div>
                                </div>
                                <button type="button" class="btn btn-success btn-sm mt-2"
                                    @click="createTask">Submit</button>
                            </form>

                        </fieldset>
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header">Departments</div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table-hover table-stripped table-bordered table">
                                    <thead>
                                        <tr>
                                            <th>SN</th>
                                            <th>TASK</th>
                                            <th>DESCRIPTION</th>
                                            <th>STATUS</th>
                                            <th> <i class="bi bi-pencil-fill"></i> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(task, loop) in tasks" :key="loop">
                                            <td>{{ loop + 1 }}</td>
                                            <td>{{ task.task }}</td>
                                            <td>{{ task.description }}</td>
                                            <td>{{ task.status }}</td>
                                            <td>
                                                <div class="dropdown">
                                                    <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                                        data-bs-toggle="dropdown">
                                                        <i class="bi bi-tools"></i>
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                        <li><a class="dropdown-item pointer" @click="taskDetail(task)">Details</a> </li>
                                                        <li><a class="dropdown-item pointer" click="editDept(dp)">ADD SUB TASK</a> </li>
                                                        <li><a class="dropdown-item pointer" click="editDept(dp)">Add Team</a> </li>
                                                        <li><a class="dropdown-item pointer" click="editDept(dp)">Edit Task</a> </li>
                                                        <li><a class="dropdown-item pointer" data-bs-toggle="modal" data-bs-target="">Assign</a></li>
                                                    </ul>
                                                </div>
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
import axiosClient from "@/axios";
import store from "@/store";
import { ref } from "vue";
import { useRouter } from 'vue-router';
const router = useRouter()

const errors = ref({});
const tasks = ref({});
const task = ref({
    'task': '',
    'description': '',
    'from': '',
    'to': '',
});

// const editDept = ()=>{

// }
// function editDept(data) {
//     task.value = {
//         'department': data.task,
//         'description': data.description,
//         'from': data.from,
//         'to': data.to,
//         'pid': data.pid
//     }
// }



 function createTask(){
        store.commit('setSpinner', true)
    return axiosClient.post('/create-task',task.value)
        .then(({ data }) => {
            if (data.status == 201 ) {
                store.commit('notify', { message: data.message })
                console.log(data.data);
                task.value = []
        store.commit('setSpinner', false)

            }else if(data.status == 422){
                errors.value = data.data;
        store.commit('setSpinner', false)

                 store.commit('notify', { message: data.message, type: 'warninig' })
            } else {
                store.commit('notify', { message: data.message, type: 'danger' })
        store.commit('setSpinner', false)

            }
            return data;
        })
}

    function loadTask(){
        store.commit('setSpinner', true)
        return axiosClient.get('/load-task')
        .then(({ data }) => {
            if (data.status == 200 ) {
                store.commit('notify', { message: data.message })
                console.log(data.data);
                tasks.value = data.data.data
                store.commit('setSpinner', false)
            } else {
                store.commit('notify', { message: data.message, type: 'danger' })
                store.commit('setSpinner', false)
            }
            return data;
        })
    }

    function taskDetail(task) {
        localStorage.setItem('TVATI_TASK_DETAIL', JSON.stringify(task, null, 2))
        router.push({ path: 'task-detail', query: { task: task.pid } })
    }
 

    loadTask()
 
</script>

<style scoped>
</style>
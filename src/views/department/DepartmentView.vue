<template>
    <div>
        <div class="container mt-2">
           <div class="row">
                <div class="col-md-4">
                    
                    <div class="card">
                        <div class="card-body">
                            <fieldset class="border rounded-3 p-2 m-1">
                            <legend class="float-none w-auto px-2">Create Department</legend>
                            <form >
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="form-label">Department</label>
                                            <input type="text" v-model="dept.department" class="form-control" placeholder="Name of department">
                                            <!-- <p class="text-danger " v-if="errors?.department[0]">{{ errors?.department[0] }}</p> -->
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="form-label">Description</label>
                                            <input type="text" v-model="dept.description" class="form-control" placeholder="Name of department">
                                            <!-- <p class="text-danger " v-if="errors?.description[0]">{{ errors?.description[0] }}</p> -->
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="form-label">Head of Department</label>
                                            <input type="text" v-model="dept.head" class="form-control" placeholder="Name of department">
                                            <!-- <p class="text-danger " v-if="errors?.head[0]">{{ errors?.head[0] }}</p> -->
                                        </div>
                                    </div>
                                </div>
                                <button type="button" class="btn btn-success btn-sm mt-2" @click="createDepartment">Submit</button>
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
                                            <th>DEPARTMENT</th>
                                            <th>DESCRIPTION</th>
                                            <th>HEAD</th>
                                            <th> <i class="bi bi-pencil-fill"></i> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(dp,loop) in departments" :key="dp.pid">
                                            <td>{{ loop+1 }}</td>
                                            <td>{{ dp.department }}</td>
                                            <td>{{ dp.description }}</td>
                                            <td>{{ dp.head }}</td>
                                            <td>
                                                <div class="dropdown">
                                                    <button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-bs-toggle="dropdown">
                                                        <i class="bi bi-tools"></i>
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                        <li><a class="dropdown-item pointer" @click="editDept(dp)">Edit</a></li>
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
import store from "@/store";
import { ref } from "vue";
// import { useRouter } from 'vue-router';
// const router = useRouter()

    
    // const errors = ref({});
    const departments = ref({});
    const dept = ref({
        'department':'' ,
        'description':'' , 
        'head':'' , 
    });

    // const editDept = ()=>{

    // }
    function editDept(data){
        dept.value = {
            'department': data.department ,
            'description': data.description,
            'head': data.head,
            'pid': data.pid
        }
    }


    function createDepartment() {
        // store.commit('notify',{ message :'depa'});
        store.commit('setSpinner', true)
        store.dispatch('createDepartment', dept.value).then(() => {
            store.commit('setSpinner', false)
        }).catch(e => {
            store.commit('setSpinner', false)
            console.log(e);
            alert('weting be this')
        })
    }

    loadDepartment()
    function loadDepartment() {
        store.commit('setSpinner', true)
        store.dispatch('loadDepartment').then((data) => {
            store.commit('setSpinner', false)
            departments.value = data.data;
        }).catch(e => {
            store.commit('setSpinner', false)
            console.log(e);
            alert('weting be this')
        })
    }
</script>

<style scoped>

</style>
<template>
    <div>
        <div class="row">
                                    <div class="col-md-4">
                                        <fieldset class="border rounded-3 p-2 m-1">
                                    <legend class="float-none w-auto px-2 h5">Create Sub Department</legend>
                                    <form >
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="form-label">Department</label>
                                                    <Select2 v-model="sub.department_pid" :options="deptDrop" :settings="{ width: '100%' }"  />
                                                    <p class="text-danger " v-if="sub_error?.department_pid">{{ sub_error?.department_pid[0] }}</p>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="form-label">Sub Department</label>
                                                    <input type="text" v-model="sub.name" class="form-control" placeholder="e.g sub operation">
                                                    <p class="text-danger " v-if="sub_error?.name">{{ sub_error?.name[0] }}</p>
                                                </div>
                                            </div>

                                            <!-- <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="form-label">Description</label>
                                            <textarea type="text" v-model="sub.description" class="form-control" placeholder="Name of department"></textarea>
                                            <p class="text-danger " v-if="sub_error?.description">{{ sub_error?.description[0] }}</p>
                                        </div>
                                    </div> -->

                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="form-label">Head of Department</label>
                                                    <Select2 v-model="sub.head_pid" :options="users" :settings="{ width: '100%' }"  />
                                                    <p class="text-danger " v-if="sub_error?.head_pid">{{ sub_error?.head_pid[0] }}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="button" class="btn btn-success btn-sm mt-2" @click="createSubDepartment">Submit</button>
                                    </form>
                                </fieldset>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="table-responsive">
                                        <table class="table-hover table-stripped table-bordered table">
                                            <thead>
                                                <tr>
                                                    <th>SN</th>
                                                    <th>DEPARTMENT</th>
                                                    <th>Sub Department</th>
                                                    <th>HEAD</th>
                                                    <th> <i class="bi bi-gear-fill"></i> </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(dp, loop) in sub_depts.data" :key="dp.pid">
                                                    <td>{{ loop + 1 }}</td>
                                                    <td>{{ dp.department.department }}</td>
                                                    <td>{{ dp.name }}</td>
                                                    <td>{{ dp?.head?.username }}</td>
                                                    <td>
                                                        <div class="dropdown">
                                                            <button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-bs-toggle="dropdown">
                                                                <i class="bi bi-tools"></i>
                                                            </button>
                                                            <ul class="dropdown-menu">
                                                                <li><a class="dropdown-item pointer" @click="editSubDept(dp)">Edit</a></li>
                                                                <!-- <li><a class="dropdown-item pointer" @click="showModal(dp.pid)">Assign</a></li> -->
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
</template>

<script setup>
    import store from "@/store";
    import { ref } from "vue";
    import Select2 from 'vue3-select2-component';

const sub = ref({
    'department_pid': '',
    'name': '',
    'description': '',
    'head_pid': '',
});

const editSubDept = (data) => {
    sub.value = {
        department_pid: data.department_pid ,
        name: data.name , 
        description: data.description , 
        head_pid: data.head_pid ,
        pid: data.pid
    }
}

const sub_error = ref({})
function createSubDepartment() {
    sub_error.value = []
    store.dispatch('postMethod', { url: '/create-sub-department', param: sub.value }).then((data) => {
        if (data.status == 422) {
            sub_error.value = data.data
        } else if (data.status == 201) {
            sub.value = [];
        }
    })
}


loadSubDepartment()

const sub_depts = ref({})
function loadSubDepartment() {
    store.dispatch('getMethod', { url: '/load-sub-departments' }).then((data) => {
        if (data.status == 200) {
            sub_depts.value = data.data;
        }
    })
}


const users = ref([]);
function dropdownAllow() {
    store.dispatch('loadDropdown', 'users').then(({ data }) => {
        users.value = data;
    }).catch(e => {
        console.log(e);
        alert('Something Went Wrong')
    })
}
dropdownAllow()

const deptDrop = ref([]);
function dropdownDepts() {
    store.dispatch('loadDropdown', 'departments').then(({ data }) => {
        deptDrop.value = data;
    })
}
dropdownDepts()

</script>

<style scoped>

</style>
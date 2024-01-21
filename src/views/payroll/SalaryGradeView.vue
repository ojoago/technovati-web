<template>
    <div>
        <div class="container mt-2">
            <div class="row">
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-body">
                            <fieldset class="border rounded-3 p-2 m-1">
                                <legend class="float-none w-auto px-2">Salary grades</legend>
                                <form>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Grade</label>
                                                <input type="text" v-model="grade.grade" class="form-control form-control-sm"
                                                    placeholder="e.g grade 1">
                                                <p class="text-danger " v-if="errors?.grade">{{ errors?.grade[0] }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Salary Structure</label>
                                                <Select2 v-model="grade.structure_pid" :options="structureDrop" :settings="{ width: '100%' }"  />

                                                <p class="text-danger " v-if="errors?.structure_pid">{{ errors?.structure_pid[0] }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                                 <label class="form-label">Pensionable?</label>
                                                <div class="form-group">
                                                    <input type="radio" v-model="grade.pensionable" value="1"> yes
                                                    <input type="radio" v-model="grade.pensionable" value="0"> No
                                                </div>
                                                <p class="text-danger " v-if="errors?.pensionable">{{ errors?.pensionable[0] }}
                                                </p>
                                        </div>
                                    </div>
                                    <button type="button" class="btn btn-success btn-sm mt-2" @click="createSalaryGrade">Submit</button>
                                </form>
                            </fieldset>
                        </div>
                    </div>
                </div>
                <div class="col-md-7">
                    <div class="card">
                        <div class="card-header">Departments</div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table-hover table-stripped table-bordered table">
                                    <thead>
                                        <tr>
                                            <th>SN</th>
                                            <th>Structure</th>
                                            <th> Grade</th>
                                            <th> pensionable</th>
                                            <th> <i class="bi bi-pencil-fill"></i> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(lg, loop) in grades.data" :key="loop">
                                            <td>{{ loop + 1 }}</td>
                                            <td>{{ lg.structure.structure }}</td>
                                            <td>{{ lg.grade }}</td>
                                            <td>{{ lg.pensionable }}</td>
                                            <td>
                                                <div class="dropdown">
                                                    <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                                        data-bs-toggle="dropdown">
                                                        <i class="bi bi-tools"></i>
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                        <li class="bg-warning"><a class="dropdown-item pointer"
                                                                @click="editlog(lg)">Edit</a> </li>
                                                        <li class="bg-danger"><a class="dropdown-item pointer"
                                                                @click="deleteLog(lg.id)">Delete</a> </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="flex justify-center mt-4">
                                    <nav class="relative justify-center rounded-md shadow pagination">
                                        <pagination-links v-for="(link, i) of grades.links" :link="link" :key="i"
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
import PaginationLinks from "@/components/PaginationLinks.vue";
import Select2 from 'vue3-select2-component';

const errors = ref({});
const grades = ref({});
const grade = ref({
    grade : '',
    structure_pid: '',
    pensionable: '',
});

const editlog = (stp) => {
    grade.value = {
        grade: stp.grade,
        structure_pid: stp.structure_pid,
        pid: stp.pid,
        pensionable: stp.pensionable == 'Yes' ? 1 : 0,
    }
}
const deleteLog = (pid) => {
    alert(pid)
}

function createSalaryGrade() {
    store.commit('setSpinner', true)
    errors.value = []
    store.dispatch('postMethod', { url: '/create-salary-grade', param: grade.value }).then((data) => {
        if (data.status == 422) {
            errors.value = data.data
        } else if (data.status == 201) {
            grade.value = [];
            loadGrades()
        }
        store.commit('setSpinner', false)
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
    })
}

function loadGrades() {
    store.commit('setSpinner', true)
    store.dispatch('getMethod', { url: '/load-salary-grade' }).then((data) => {
        store.commit('setSpinner', false)
        if (data.status == 200) {
            grades.value = data.data;
        }
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
        alert('weting be this')
    })
}

loadGrades()

const structureDrop = ref({});
function dropdownStructure() {
    store.dispatch('loadDropdown', 'salary-structure').then(({ data }) => {
        structureDrop.value = data;
    }).catch(e => {
        console.log(e);
        alert('Something Went Wrong')
    })
}
dropdownStructure()
function nextPage(link) {
    alert()
    if (!link.url || link.active) {
        return;
    }
    alert(link.url)
}

</script>

<style scoped></style>
<template>
    <div>
        <div class="container mt-2">
            <div class="card">
                <div class="card-header">Salary Structures</div>
                <div class="card-body">
                    <select class="form-control" v-model="basic.structure" @change="loadGrades($event)">
                        <option value="" selected>Make Selection</option>
                        <option v-for="sec in structureDrop" :key="sec.id" :value="sec.id">{{ sec.text }} </option>
                    </select>
                    {{gradeDrop}}
                    <div class="table-responsive">
                        <table class="table-hover table-stripped table-bordered table">
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Structure</th>
                                    <th>Has any Step</th>
                                    <th> <i class="bi bi-gear-fill"></i> </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(lg, loop) in structures.data" :key="loop">
                                    <td>{{ loop + 1 }}</td>
                                    <td>{{ lg.structure }}</td>
                                    <td>{{ lg.step }}</td>
                                    <!-- <td>{{ lg.time_out }}</td> -->
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
                                <pagination-links v-for="(link, i) of structures.links" :link="link" :key="i"
                                    @next="nextPage(link)"></pagination-links>
                            </nav>
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
// import Select2 from 'vue3-select2-component';

const structures = ref({});
const structure = ref({
    structure: '',
    step: '',
});

const basic = ref({
    structure
})

const editlog = (stp) => {
    structure.value = {
        structure: stp.structure,
        step: stp.step == 'Yes' ? 1 : 0,
        pid: stp.pid,
    }
}
const deleteLog = (pid) => {
    alert(pid)
}

const loadGrades = (event) => {
    dropdownGrade(event.target.value)
}

function loadLog() {
    store.commit('setSpinner', true)
    store.dispatch('getMethod', { url: '/load-salary-structure' }).then((data) => {
        store.commit('setSpinner', false)
        if (data.status == 200) {
            structures.value = data.data;
        }
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
        alert('weting be this')
    })
}


//salary-structure

const structureDrop = ref({});
function dropdownStructure() {
    store.dispatch('loadDropdown', 'salary-structure').then(({ data }) => {
        structureDrop.value = data;
    }).catch(e => {
        console.log(e);
    })
}
const gradeDrop = ref({});
function dropdownGrade(id) {
    store.dispatch('loadDropdown', 'salary-grade/'+id).then(({ data }) => {
        gradeDrop.value = data;
    }).catch(e => {
        console.log(e);
    })
}

dropdownStructure()
loadLog()
function nextPage(link) {
    alert()
    if (!link.url || link.active) {
        return;
    }
    alert(link.url)
}

</script>

<style scoped></style>
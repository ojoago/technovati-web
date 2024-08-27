<template>
    <div>
        <div class="container mt-2">
            <div class="row">
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <fieldset class="border rounded-3 p-2 m-1">
                                <legend class="float-none w-auto px-2">Salary Structure</legend>
                                <form>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Name</label>
                                                <input type="text" v-model="structure.structure" class="form-control"
                                                    placeholder="e.g  of level one">
                                                <p class="text-danger " v-if="errors?.structure">{{ errors?.structure[0] }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <label class="form-label">Has any Step</label>
                                            <div class="form-group">
                                                <input type="radio" v-model="structure.step" value="1"> yes
                                                <input type="radio" v-model="structure.step" value="0"> No
                                                <p class="text-danger " v-if="errors?.step">{{ errors?.step[0]  }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="button" class="btn btn-success btn-sm mt-2"  @click="createSalaryStructure">Submit</button>
                                </form>
                            </fieldset>
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header">Salary Structures</div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table-hover table-stripped table-bordered table">
                                    <thead>
                                        <tr>
                                            <th>SN</th>
                                            <th>Structure</th>
                                            <th> Has any Step</th>
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
                                                        <!-- <li class="bg-danger"><a class="dropdown-item pointer"
                                                                @click="deleteLog(lg.pid)">Delete</a> </li> -->
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
        </div>
    </div>
</template>

<script setup>
import store from "@/store";
import { ref } from "vue";
import PaginationLinks from "@/components/PaginationLinks.vue";

const errors = ref({});
const structures = ref({});
const structure = ref({
    structure: '',
    step: '',
});

const editlog = (stp) => {
    structure.value = {
        structure: stp.structure,
        step: stp.step == 'Yes' ? 1 : 0,
        pid: stp.pid,
    }
}
// const deleteLog = (pid) => {
//     alert(pid)
// }

function createSalaryStructure() {
   
    errors.value = []
    store.dispatch('postMethod', { url: '/create-salary-structure', param: structure.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data
        } else if (data?.status == 201) {
            structure.value = [];
            loadLog()
        }
        
    }).catch(e => {
        
        console.log(e);
    })
}

function loadLog(url ='/load-salary-structure') {
    store.dispatch('getMethod', { url: url }).then((data) => {
        if (data?.status == 200) {
            structures.value = data.data;
        }else{
            structures.value = {}
        }
    }).catch(e => {
        console.log(e);
    })
}



loadLog()
function nextPage(link) {
    if (!link.url || link.active) {
        return;
    }
    loadLog(link.url)
}

</script>

<style scoped></style>
<template>
    <div>
        <div class="container mt-2">
            <div class="row">
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <fieldset class="border rounded-3 p-2 m-1">
                                <legend class="float-none w-auto px-2 h5">Create Appraisal Section</legend>
                                <form>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Section</label>
                                                <input type="text" v-model="section.name" class="form-control"
                                                    placeholder="e.g first half apparisal">
                                                <p class="text-danger " v-if="errors?.name">{{ errors?.name[0] }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Note</label>
                                                <textarea type="text" v-model="section.note" class="form-control"
                                                    placeholder="note of visit"></textarea>
                                                <p class="text-danger " v-if="errors?.note">{{ errors?.note[0]
                                                }}
                                                </p>
                                            </div>
                                        </div>


                                    </div>
                                    <button type="button" class="btn btn-success btn-sm mt-2"
                                        @click="createAppraisalSection">Submit</button>
                                </form>

                            </fieldset>
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header">Appraisal Section</div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table-hover table-stripped table-bordered table">
                                    <thead>
                                        <tr>
                                            <th>SN</th>
                                            <th>Names</th>
                                            <th>Description</th>
                                            <th> <i class="bi bi-pencil-fill"></i> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(data, loop) in sections.data" :key="loop">
                                            <td>{{ loop + 1 }}</td>
                                            <td>{{ data.name }}</td>
                                            <td>{{ data.description }}</td>
                                            <td>
                                                <div class="dropdown">
                                                    <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                                        data-bs-toggle="dropdown">
                                                        <i class="bi bi-tools"></i>
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                        <li class="bg-warning"><a class="dropdown-item pointer"
                                                                @click="editSection(data)">Edit</a> </li>
                                                        <li class="bg-danger"><a class="dropdown-item pointer"
                                                                @click="deleteLog(data.pid)">Delete</a> </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="flex justify-center mt-4">
                                    <nav class="relative justify-center rounded-md shadow pagination">
                                        <pagination-links v-for="(link, i) of sections.links" :link="link" :key="i"
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
const sections = ref({});
const section = ref({
    name: '',
    note: '' ,
});

const editSection = (sec) => {
    section.value = {
        name: sec.name,
        note: sec.note,
        pid: sec.pid,
    }
}
const deleteLog = (id) => {
    alert(id)
}

function createAppraisalSection() {
    store.commit('setSpinner', true)
    errors.value = []
    store.dispatch('postMethod', { url: '/create-appraisal-section', param: section.value }).then((data) => {
        if (data.status == 422) {
            errors.value = data.data
        } else if (data.status == 201) {
            section.value = [];
        }
        store.commit('setSpinner', false)
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
    })
}

function loadLog() {
    store.commit('setSpinner', true)
    store.dispatch('getMethod', { url: '/load-appraisal-section' }).then((data) => {
        store.commit('setSpinner', false)
        if (data.status == 200) {
            sections.value = data.data;
        }
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
        alert('weting be this')
    })
}

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
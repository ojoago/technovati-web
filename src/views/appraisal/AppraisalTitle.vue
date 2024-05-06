<template>
    <div>
        <div class="container mt-2">
            <div class="row">
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <fieldset class="border rounded-3 p-2 m-1">
                                <legend class="float-none w-auto px-2 h5">Create Appraisal Title</legend>
                                <form>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Title</label>
                                                <input type="text" v-model="appraisal.title" class="form-control"
                                                    placeholder="e.g first half apparisal">
                                                <p class="text-danger " v-if="errors?.title">{{ errors?.title[0] }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Description</label>
                                                <textarea type="text" v-model="appraisal.description"
                                                    class="form-control" placeholder="any description"></textarea>
                                                <p class="text-danger " v-if="errors?.description">{{
                                                    errors?.description[0] }}
                                                </p>
                                            </div>
                                        </div>


                                    </div>
                                    <button type="button" class="btn btn-success btn-sm mt-2"
                                        @click="createAppraisalTitle">Submit</button>
                                </form>

                            </fieldset>
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header">Appraisal Titles</div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table-hover table-stripped table-bordered table">
                                    <thead>
                                        <tr>
                                            <th>SN</th>
                                            <th>Names</th>
                                            <th>Description</th>
                                            <th>Status</th>
                                            <th> <i class="bi bi-gear-fill"></i> </th>
                                        </tr>
                                    </thead>
                                    <tbody v-if="titles.data">
                                        <tr v-for="(data, loop) in titles.data" :key="loop">
                                            <td>{{ loop + 1 }}</td>
                                            <td>{{ data.title }}</td>
                                            <td>{{ data.description }}</td>
                                            <td>{{ data.title_status }}</td>
                                            <td>
                                                <div class="dropdown">
                                                    <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                                        data-bs-toggle="dropdown">
                                                        <i class="bi bi-tools"></i>
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                        <li class="bg-warning"><a class="dropdown-item pointer"
                                                                @click="editTitle(data)">Edit</a> </li>

                                                        <li class="bg-danger" v-if="data.status==1"><a class="dropdown-item pointer"
                                                                @click="deleteLog(data.id)">Disable</a> </li>
                                                        <li class="bg-success"  v-if="data.status==0"><a class="dropdown-item pointer"
                                                                @click="activate(data.id)">Enable</a> </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tfoot v-else class="text-center" style="width: 100%" width="100%">
                                        <tr>
                                            <td colspan="50">No Record Yet</td>
                                        </tr>
                                    </tfoot>
                                </table>
                                <div class="flex justify-center mt-4">
                                    <nav class="relative justify-center rounded-md shadow pagination">
                                        <pagination-links v-for="(link, i) of titles.links" :link="link" :key="i"
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
const titles = ref({});
const appraisal = ref({
    title: '',
    description: '',
});

const editTitle = (apr) => {
    appraisal.value = {
        title: apr.title,
        description: apr.description,
        pid: apr.pid,
    }
}

const resetAttr = ()=>{
    appraisal.value = {
        title: '',
        description: '',
        pid: '',
    }
}
const deleteLog = (id) => {
    store.dispatch('putMethod', { url: '/update-appraisal-title-status/0/' + id,prompt:'are you sure, you want to disable this ?' }).then((data) => {
        if (data?.status == 201) {
            loadLog()
        }
    })
}

const activate = (id) => {
    store.dispatch('putMethod', { url: '/update-appraisal-title-status/1/' + id ,prompt:'are you sure, you want to enable this ?'}).then((data) => {
        if (data?.status == 201) {
            loadLog()
        }
    })
}

function createAppraisalTitle() {
    errors.value = []
    store.dispatch('postMethod', { url: '/create-appraisal-title', param: appraisal.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data
        } else if (data?.status == 201) {
            resetAttr()
            loadLog()
        }
    })
}

function loadLog() {
    store.dispatch('getMethod', { url: '/load-appraisal-titles' }).then((data) => {
        if (data?.status == 200) {
            titles.value = data.data;
        }
    }).catch(e => {
        console.log(e);
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
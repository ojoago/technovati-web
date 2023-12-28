<template>
    <div>
        <div class="container mt-2">
            <div class="row">
                
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <fieldset class="border rounded-3 p-2 m-1">
                                <legend class="float-none w-auto px-2 h5">Create Appraisal Section</legend>
                                <form>
                                    <div class="col-md-12">
                                        <label class="form-label">Title</label>
                                        <input class="form-control form-control-sm" placeholder="meeting by 2pm" v-model="announce.title">
                                        <p class="text-danger " v-if="errors?.title">{{ errors?.title[0] }} </p>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Body</label>
                                                <textarea type="text" v-model="announce.body" class="form-control" placeholder="e.g attend or get queried"></textarea>
                                                <p class="text-danger " v-if="errors?.body">{{ errors?.body[0] }} </p>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="button" class="btn btn-success btn-sm mt-2"  @click="makeAnnouncement">Submit</button>
                                </form>

                            </fieldset>
                        </div>
                    </div>
                </div>

                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">Appraisal Section</div>
                        <div class="card-body">

                            <div class="table-responsive">
                                <table class="table-hover table-stripped table-bordered table">
                                    <thead>
                                        <tr>
                                            <th>SN</th>
                                            <th>Title</th>
                                            <th>Body</th>
                                            <!-- <th>Status</th> -->
                                            <th> <i class="bi bi-pencil-fill"></i> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(data, loop) in announcements.data" :key="loop">
                                            <td>{{ loop + 1 }}</td>
                                            <td>{{ data.title }}</td>
                                            <td>{{ data.body }}</td>
                                            <td>
                                                <div class="dropdown">
                                                    <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                                        data-bs-toggle="dropdown">
                                                        <i class="bi bi-tools"></i>
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                        <li class="bg-warning"><a class="dropdown-item pointer"  @click="editAnnounce(data)">Edit</a> </li>
                                                        <li class="bg-danger"><a class="dropdown-item pointer"
                                                                @click="deleteAnnounce(data.pid)">Delete</a> </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="flex justify-center mt-4">
                                    <nav class="relative justify-center rounded-md shadow pagination">
                                        <pagination-links v-for="(link, i) of announcements.links" :link="link" :key="i"
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
const announcements = ref({});


const announce = ref({
    title: '',
    body: '',
});

const editAnnounce = (ann) => {
    announce.value = {
        title: ann.title,
        body: ann.body,
        pid: ann.pid,
    }
}
const deleteAnnounce = (pid) => {
    alert(pid)
}



function makeAnnouncement() {
    store.commit('setSpinner', true)
    errors.value = []
    store.dispatch('postMethod', { url: '/make-announcement', param: announce.value }).then((data) => {
        if (data.status == 422) {
            errors.value = data.data
        } else if (data.status == 201) {
            announce.value = []
        }
        store.commit('setSpinner', false)
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
    })
}
loadAnnouncements()
function loadAnnouncements() {
    store.commit('setSpinner', true)
    store.dispatch('getMethod', { url: '/load-announcements' }).then((data) => {
        store.commit('setSpinner', false)
        if (data.status == 200) {
            announcements.value = data.data;
        }
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
        alert('weting be this')
    })
}
 
function nextPage(link) {
    alert()
    if (!link.url || link.active) {
        return;
    }
    alert(link.url)
}


</script>

<style scoped></style>
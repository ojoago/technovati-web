<template>
    <div>
        <div class="container mt-2">
            <div class="card">
                <div class="card-header">Announcements <button class="btn btn-sm btn-primary" @click="anounceModal">Add
                        New</button> </div>
                <div class="card-body">

                    <div class="table-responsive">
                        <input type="text" class="form-control form-control-sm" placeholder="Search">
                        <table class="table-hover table-stripped table-bordered table" width="100%">
                            <thead>
                                <tr>
                                    <th width="5%">SN</th>
                                    <th width="20%">Title</th>
                                    <th width="45%">
                                        Body</th>
                                    <th width="15%">Category</th>
                                    <th width="15%">Date</th>
                                    <th width="5%"> <i class="bi bi-gear-fill"></i> </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(data, loop) in announcements.data" :key="loop">
                                    <td>{{ loop + 1 }}</td>
                                    <td class="line-break">{{ data.title }}</td>
                                    <td class="line-break " style="width: 10% !important;">{{ data.body }}</td>
                                    <td class="">{{ data.announce_category }}</td>
                                    <td class="">{{ data.created_at }}</td>
                                    <td>
                                        <div class="dropdown" v-if="data?.status == 0">
                                            <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                                data-bs-toggle="dropdown">
                                                <i class="bi bi-tools"></i>
                                            </button>
                                            <ul class="dropdown-menu">
                                                <li><a class="dropdown-item pointer bg-success"
                                                        @click="publishAnnouncement(data.pid)">Publish</a> </li>
                                                <li><a class="dropdown-item pointer bg-warning"
                                                        @click="editAnnounce(data)">Edit</a> </li>
                                                <li><a class="dropdown-item pointer bg-danger"
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

        <o-modal :isOpen="toggleModal" modal-class="modal-md" title="Make Announcement" @submit="makeAnnouncement"
            @modal-close="closeModal">
            <template #content>
                <form id="anForm">
                    <div class="row">
                        <div class="col-md-12">
                            <label class="form-label">Title</label>
                            <input class="form-control form-control-sm" placeholder="meeting by 2pm"
                                v-model="announce.title">
                            <p class="text-danger " v-if="errors?.title">{{ errors?.title[0] }} </p>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="form-label">Body</label>
                                <textarea type="text" v-model="announce.body" class="form-control"
                                    placeholder="e.g attend or get queried"></textarea>
                                <p class="text-danger " v-if="errors?.body">{{ errors?.body[0] }} </p>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="form-label">Category</label>
                            <select v-model="announce.category" class="form-control form-control-sm">
                                <option value="" selected>Make Selection</option>
                                <option value="1">General</option>
                                <option value="2">Department</option>
                                <option value="3">Staff</option>
                            </select>
                            <p class="text-danger " v-if="errors?.category">{{ errors?.category[0] }}</p>
                        </div>

                        <div class="col-md-12">
                            <label class="form-label">Publish ?</label>
                            <div class="form-group">
                                <input type="radio" v-model="announce.status" value="1"> yes
                                <input type="radio" v-model="announce.status" value="0"> No
                            </div>
                            <p class="text-danger " v-if="errors?.status">{{ errors?.status[0] }} </p>
                        </div>
                        <div class="col-md-12" v-if="announce.category == 3">
                            <div class="form-group">
                                <label class="form-label">Staff</label>
                                <div>
                                    <Multiselect v-model="announce.staff" :options="users" :multiple="true"
                                        :close-on-select="true" placeholder="Pick staff" label="text" track-by="id" />
                                </div>
                                <p class="text-danger " v-if="errors?.staff">{{ errors?.staff[0] }}</p>
                            </div>
                        </div>

                        <div class="col-md-12" v-if="announce.category == 2">
                            <div class="form-group">
                                <label class="form-label">Departments</label>
                                <div>
                                    <Multiselect v-model="announce.department" :options="departments" :multiple="true"
                                        :close-on-select="true" placeholder="Pick Department" label="text"
                                        track-by="id" />
                                </div>
                                <p class="text-danger " v-if="errors?.department">{{ errors?.department[0] }}</p>
                            </div>
                        </div>
                    </div>

                </form>
            </template>

        </o-modal>
    </div>
</template>

<script setup>
import store from "@/store";
import { ref } from "vue";
import PaginationLinks from "@/components/PaginationLinks.vue";
import OModal from "@/components/OModal.vue";
import { Multiselect } from 'vue-multiselect';
const errors = ref({});
const announcements = ref({});
const toggleModal = ref(false);
// const md = 'modal-md';
const closeModal = () => {
    toggleModal.value = false;
    resetAttr()
};
const anounceModal = () => {
    toggleModal.value = true;
};

const announce = ref({
    title : '',
    body : '',
    category : '',
    staff : '',
    department : '',
    status : 0
});

const resetAttr = () => {
    announce.value = {
        title: '',
        body: '',
        category: '',
        staff: '',
        department: '',
        status: 0
    }
}

const editAnnounce = (ann) => {
    announce.value = {
        title: ann.title,
        body: ann.body,
        pid: ann.pid,
        department: ann.department,
        staff: ann.staff,
        category: ann.category ,
        status: ann.status ,
    }
    toggleModal.value = true;
}


const deleteAnnounce = (pid) => {
    store.dispatch('deleteMethod', { url: '/delete-memo-record/' + pid }).then((data) => {
        if (data?.status == 200) {
            store.commit('notify', { message: 'Reloading Records...', type: 'secondary' })
            loadAnnouncements()
        }
    })
}

const publishAnnouncement = (pid) => {
    store.dispatch('putMethod', { url: '/publish-announcement/' + pid }).then((data) => {
        if (data?.status == 201) {
            store.commit('notify', { message: 'Reloading Records...', type: 'secondary' })
            loadAnnouncements()
        }
    })
}



function makeAnnouncement() {
    store.commit('setSpinner', true)
    errors.value = []
    store.dispatch('postMethod', { url: '/make-announcement', param: announce.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data
        } else if (data?.status == 201) {
            resetAttr()
            loadAnnouncements()
            toggleModal.value = false;
        }
    }).catch(e => {
        console.log(e);
    })
}
loadAnnouncements()
function loadAnnouncements() {
    store.dispatch('getMethod', { url: '/load-announcements' }).then((data) => {
        if (data?.status == 200) {
            announcements.value = data.data;
        }
    }).catch(e => {
        console.log(e);
        alert('weting be this')
    })
}

const users = ref([]);
function dropdownUser() {
    store.dispatch('loadDropdown', 'users').then(({ data }) => {
        users.value = data;
    }).catch(e => {
        console.log(e);
        alert('Something Went Wrong')
    })
}
dropdownUser()

const departments = ref([]);
function dropdownDepts() {
    store.dispatch('loadDropdown', 'departments').then(({ data }) => {
        departments.value = data;
    }).catch(e => {
        console.log(e);
        alert('Something Went Wrong')
    })
}
dropdownDepts()
 
function nextPage(link) {
    alert()
    if (!link.url || link.active) {
        return;
    }
    alert(link.url)
}


</script>

<style scoped>


</style>
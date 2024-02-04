<template>
    <div>
        <div class="container mt-2">
                    <div class="card">
                        <div class="card-header">Announcements  <button class="btn btn-sm btn-primary" @click="anounceModal">New</button> </div>
                        <div class="card-body">

                            <div class="table-responsive">
                                <table class="table-hover table-stripped table-bordered table">
                                    <thead>
                                        <tr>
                                            <th>SN</th>
                                            <th>Title</th>
                                            <th>Body</th>
                                            <th>Category</th>
                                            <th>Date</th>
                                            <th> <i class="bi bi-gear-fill"></i> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(data, loop) in announcements.data" :key="loop">
                                            <td>{{ loop + 1 }}</td>
                                            <td class="ellipsis">{{ data.title }}</td>
                                            <td class="ellipsis">{{ data.body }}</td>
                                            <td class="">{{ status[data.category] }}</td>
                                            <td class="">{{ data.created_at }}</td>
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
          
        <o-modal :isOpen="toggleModal" :modal-class="md" title="Make Announcement" @submit="makeAnnouncement" @modal-close="closeModal" >
                        <template #content>
                              <form>
                                        <div class="row">
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
                                           
                                           <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="form-label">Category</label>
                                                 <select v-model="announce.category" class="form-control form-control-sm">
                                                    <option disabled selected>Select Section</option>
                                                    <option value="1">General</option>
                                                    <option value="2">Department</option>
                                                    <option value="3">Staff</option>
                                                </select>
                                            <p class="text-danger " v-if="errors?.category">{{ errors?.category[0] }}</p>
                                        </div>
                                    </div>
                                    <div class="col-md-12" v-if="announce.category == 3">
                                        <div class="form-group">
                                             <label class="form-label">Staff</label>
                                            <div>
                                                <Multiselect v-model="announce.staff" :options="users" :multiple="true"
                                                    :close-on-select="true" placeholder="Pick staff" label="text"
                                                    track-by="id" />
                                            </div>
                                            <p class="text-danger " v-if="errors?.staff">{{ errors?.staff[0] }}</p>
                                        </div>
                                    </div>

                                    <div class="col-md-12" v-if="announce.category == 2">
                                        <div class="form-group">
                                             <label class="form-label">Departments</label>
                                            <div>
                                                <Multiselect v-model="announce.departments" :options="departments" :multiple="true"
                                                    :close-on-select="true" placeholder="Pick Department" label="text"
                                                    track-by="id" />
                                            </div>
                                            <p class="text-danger " v-if="errors?.departments">{{ errors?.departments[0] }}</p>
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
const md = 'modal-md';
const closeModal = () => {
    toggleModal.value = false;
};
const anounceModal = () => {
    toggleModal.value = true;
};
const status = store.state.memoStatus;

const announce = ref({
    title: '',
    body: '',
    category: '',
    staff:'',
    department:''
});

const editAnnounce = (ann) => {
    announce.value = {
        title: ann.title,
        body: ann.body,
        pid: ann.pid,
        department: ann.department,
        staff: ann.staff,
        category: ann.category,
    }
    toggleModal.value = true;
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
            loadAnnouncements()
            toggleModal.value = false;
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

<style scoped></style>
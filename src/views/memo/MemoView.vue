<template>
    <div>
        <div class="container mt-2">
          
                 <div class="card">
                    <div class="card-header">Memos
                        <button class="btn btn-sm btn-primary" @click="openModal">Add New</button>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table-hover table-stripped table-bordered table">
                                <thead>
                                    <tr>
                                        <th>SN</th>
                                        <th>Subject</th>
                                        <th>Body</th>
                                        <th>Category</th>
                                        <th>Status</th>
                                        <th> <i class="bi bi-gear-fill"></i> </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(memo, loop) in memos.data" :key="loop">
                                        <td>{{ loop + 1 }}</td>
                                        <td>{{ memo.subject }}</td>
                                        <td>{{ memo.body }}</td>
                                        <td>{{ memo.memo_category }}</td>
                                        <td>{{ memo.memo_status }}</td>
                                        <td>
                                            <div class="dropdown" v-if="memo.status==0">
                                                <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                                    data-bs-toggle="dropdown">
                                                    <i class="bi bi-tools"></i>
                                                </button>
                                                <ul class="dropdown-menu">
                                                    <li><a class="dropdown-item pointer bg-success" @click="publishMemo(memo.pid)">Publish</a> </li>
                                                    <li><a class="dropdown-item pointer bg-warning" @click="editMemo(memo)">Edit</a> </li>
                                                    <li><a class="dropdown-item pointer bg-danger" @click="deleteMemo(memo.pid)">Delete</a> </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="flex justify-center mt-4">
                                <nav class="relative justify-center rounded-md shadow pagination">
                                    <pagination-links v-for="(link, i) of memos.links" :link="link" :key="i" @next="nextPage(link)"></pagination-links>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
         <o-modal :isOpen="toggleModal" @submit="createMemo" modal-class="modal-xs" title="Create Memo" @modal-close="closeModal">
            <template #content>
                <div>
                    <form id="memoForm">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="form-label">subject</label>
                                        <input type="text" v-model="memoForm.subject" class="form-control" placeholder="Enter subject">
                                        <p class="text-danger " v-if="errors?.subject">{{ errors?.subject[0] }}</p>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="form-label">Body</label>
                                        <textarea type="text" v-model="memoForm.body" class="form-control"  placeholder="Enter Message"></textarea>
                                        <p class="text-danger " v-if="errors?.body">{{ errors?.body[0] }}</p>
                                    </div>
                                </div>
                    
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="form-label">Category</label>
                                            <select v-model="memoForm.category" class="form-control form-control-sm">
                                                <option value="" selected>Make Selection</option>
                                                <option value="1">General</option>
                                                <option value="2">Department</option>
                                                <option value="3">Staff</option>
                                            </select>
                                        <p class="text-danger " v-if="errors?.category">{{ errors?.category[0] }}</p>
                                    </div>
                                </div>
                                <div class="col-md-12" v-if="memoForm.category == 3">
                                    <div class="form-group">
                                        <label class="form-label">Staff</label>
                                        <div>
                                            <Multiselect v-model="memoForm.staff" :options="users" :multiple="true"
                                                :close-on-select="true" placeholder="Pick staff" label="text"
                                                track-by="id" />
                                        </div>
                                        <p class="text-danger " v-if="errors?.staff">{{ errors?.staff[0] }}</p>
                                    </div>
                                </div>

                                <div class="col-md-12" v-if="memoForm.category == 2">
                                    <div class="form-group">
                                        <label class="form-label">Departments</label>
                                        <div>
                                            <Multiselect v-model="memoForm.departments" :options="departments" :multiple="true"
                                                :close-on-select="true" placeholder="Pick Department" label="text"
                                                track-by="id" />
                                        </div>
                                        <p class="text-danger " v-if="errors?.departments">{{ errors?.departments[0] }}</p>
                                    </div>
                                </div>
                            </div>
                    </form>
                </div>
            </template>
        </o-modal>

    </div>
</template>

<script setup>
import { ref } from "vue";
import store from "@/store";
import PaginationLinks from "@/components/PaginationLinks.vue";
import { Multiselect } from 'vue-multiselect';
import OModal from "@/components/OModal.vue";
const toggleModal = ref(false)
const openModal = () => {
    toggleModal.value = true
}
const closeModal = () => {
    toggleModal.value = false;
};
    const memoForm = ref({
            subject : '',
            body : '' , 
            category : '' , 
            staff : '' , 
            departments : '' , 
    });
     

    
    // const cast = [
    //     Request memo,
    //     Confirmation,
    //     Periodic,
    //     Ideas and suggestions,
    //     Informal study results
    // ];


    const errors = ref({})
    const memos = ref({})
    
    function createMemo(){
        errors.value = [];
        store.dispatch('postMethod', { url: '/create-memo', param: memoForm.value }).then((data) => {
            if (data.status == 422) {
                errors.value = data.data;
            } else if (data.status == 201) {
                let form = document.querySelector('#memoForm')
                form.reset()
                loadMemo()
            }
        })
    }
   const editMemo = (memo) => {
        memoForm.value = {
            subject: memo.subject ,
            body: memo.body ,
            category: memo.category ,
            staff: memo.staff ,
            departments: memo.departments ,
            pid: memo.pid ,
        }
        toggleModal.value = true
   }

   const deleteMemo = (pid) => {
       store.dispatch('deleteMethod', { url: '/delete-memo-record/' + pid }).then((data) => {
        if (data.status == 200) {
            store.commit('notify', { message: 'Reloading Records...', type: 'secondary' })
            loadMemo()
        }
    })
   }
   
   const publishMemo = (pid) => {
       store.dispatch('putMethod', { url: '/publish-memo/' + pid}).then((data) => {
        if (data?.status == 201) {
            store.commit('notify', { message: 'Reloading Records...', type: 'secondary' })
            loadMemo()
        }
    })
   }

    loadMemo()
    function loadMemo(){
       store.commit('setSpinner', true)
        store.dispatch('getMethod', { url: '/load-memo', param: memoForm.value }).then((data) => {
            store.commit('setSpinner', false)
              if (data.status == 200) {
                memos.value = data.data;
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

<style scoped>

</style>
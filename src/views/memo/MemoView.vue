<template>
    <div>
        <div class="container">
           <div class="row">
            <div class="col-md-4">
                <div class="card">
                    <fieldset class="border rounded-3 p-2 m-1">
                            <legend class="float-none w-auto px-2">Create Memo</legend>
                         <form>
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
                                                <option disabled selected>Select Section</option>
                                                <option value="1">General</option>
                                                <option value="2">Department</option>
                                                <option value="3">Staff</option>
                                            </select>
                                        <p class="text-danger " v-if="errors?.category">{{ errors?.category[0] }}</p>
                                    </div>
                                </div>
                                <div class="col-md-12" v-if="memoForm.category==3">
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
                            <button type="button" class="btn btn-success btn-sm mt-2" @click="createMemo">Submit</button>
                        </form>
                    </fieldset>
                </div>
            </div>
            <div class="col-md-8">
                 <div class="card">
                    <div class="card-header">Memos</div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table-hover table-stripped table-bordered table">
                                <thead>
                                    <tr>
                                        <th>SN</th>
                                        <th>Subject</th>
                                        <th>Body</th>
                                        <th>Category</th>
                                        <th> <i class="bi bi-gear-fill"></i> </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(memo, loop) in memos.data" :key="loop">
                                        <td>{{ loop + 1 }}</td>
                                        <td>{{ memo.subject }}</td>
                                        <td>{{ memo.body }}</td>
                                        <td>{{ status[memo.category] }}</td>
                                        <td>
                                            <div class="dropdown">
                                                <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                                    data-bs-toggle="dropdown">
                                                    <i class="bi bi-tools"></i>
                                                </button>
                                                <ul class="dropdown-menu">
                                                    <li><a class="dropdown-item pointer" @click="editMemo(memo)">Edit</a> </li>
                                                    <li><a class="dropdown-item pointer" @click="deleteMemo(memo.pid)">Delete</a> </li>
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
                <button @click="openModal">Open Modal</button>
    
                <dynamic-modal :isOpen="isModalOpened" @modal-close="closeModal" @submit="submitHandler" name="first-modal">
                    <template #header>Custom header</template>
                    <template #content>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis culpa iusto repellat provident necessitatibus maiores inventore numquam exercitationem quibusdam modi? Reprehenderit aut dolore assumenda id deserunt explicabo ratione facere eius!
                    </template>
                    <!-- <template #footer>Custom content</template> -->
                </dynamic-modal>
            </div>
           </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import store from "@/store";
import PaginationLinks from "@/components/PaginationLinks.vue";
import DynamicModal from "@/components/DynamicModal.vue";
import { Multiselect } from 'vue-multiselect';

const isModalOpened = ref(false);

const openModal = () => {
    isModalOpened.value = true;
};
const closeModal = () => {
    isModalOpened.value = false;
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
    const status = store.state.memoStatus;
    
    function createMemo(){
       store.commit('setSpinner', true)
        store.dispatch('postMethod', { url: '/create-memo', param: memoForm.value }).then((data) => {
            store.commit('setSpinner', false)
            if (data.status == 422) {
                errors.value = data.data;
            } else if (data.status == 201) {
                errors.value = [];
                memoForm.value = [];
                loadMemo()
            }
        }).catch(e => {
            store.commit('setSpinner', false)
            console.log(e);
            alert('weting be this')
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
   }
   const deleteMemo = (pid) => {
        alert(pid)
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
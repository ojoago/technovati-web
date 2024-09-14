<template>
    <div>
        <div class="container mt-2">

            <div class="card">
                <div class="card-header">
                    <h3>Memo</h3>
                    <button class="btn btn-sm btn-primary" @click="openModal">Add New</button>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table-hover table-stripped table-bordered table">
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Author</th>
                                    <th>Subject</th>
                                    <th>Body</th>
                                    <!-- <th>Category</th> -->
                                    <th>File</th>
                                    <th>Status</th>
                                    <th> <i class="bi bi-gear-fill"></i> </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(memo, loop) in memos.data" :key="loop">
                                    <td>{{ loop + 1 }}</td>
                                    <td class="line-break">{{ memo?.author?.username }}</td>
                                    <td class="line-break">{{ memo.subject }}</td>
                                    <td class="line-break">{{ memo.body }}</td>
                                   <!-- <td>{{ memo.memo_category }}</td> -->
                                    <td>{{ memo.memo_status }}</td>
                                    <td>
                                        
                                        <a :href="memo.path"  v-if="memo.path" target="_blank" rel="noopener noreferrer"
                                            :download="memo?.path"> Download</a>
                                    </td>
                                    <td>
                                        <div class="dropdown" v-if="memo.status==0">
                                            <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                                data-bs-toggle="dropdown">
                                                <i class="bi bi-tools"></i>
                                            </button>
                                            <ul class="dropdown-menu">
                                                <li><a class="dropdown-item pointer bg-success"
                                                        @click="publishMemo(memo.pid)">Publish</a> </li>
                                                <li><a class="dropdown-item pointer bg-warning"
                                                        @click="editMemo(memo)">Edit</a> </li>
                                                <li><a class="dropdown-item pointer bg-danger"
                                                        @click="deleteMemo(memo.pid)">Delete</a> </li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="flex justify-center mt-4">
                            <nav class="relative justify-center rounded-md shadow pagination">
                                <pagination-links v-for="(link, i) of memos.links" :link="link" :key="i"
                                    @next="nextPage(link)"></pagination-links>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <o-modal :isOpen="toggleModal" @submit="createMemo" modal-class="modal-lg" title="Create Memo"
            @modal-close="closeModal">
            <template #content>
                <div>
                    <form id="memoForm">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="form-label">subject</label>
                                    <input type="text" v-model="memoForm.subject" class="form-control"
                                        placeholder="Enter subject">
                                    <p class="text-danger " v-if="errors?.subject">{{ errors?.subject[0] }}</p>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="form-label">Body</label>
                                    <textarea type="text" v-model="memoForm.body" class="form-control"
                                        placeholder="Enter Message"></textarea>
                                    <p class="text-danger " v-if="errors?.body">{{ errors?.body[0] }}</p>
                                </div>
                            </div>

                            <!-- <div class="col-md-12">
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
                            </div> -->
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="form-label">File <span class="text-danger">*</span></label>
                                    <input type="file" class="form-control form-control-sm" id="image"
                                        @change="handleImageChange" accept=".pdf,.docs,.png,.jpg,.jpeg" a required />
                                    <p class="text-danger " v-if="errors?.image">{{ errors?.image[0] }}</p>
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
                                        <Multiselect v-model="memoForm.departments" :options="departments"
                                            :multiple="true" :close-on-select="true" placeholder="Pick Department"
                                            label="text" track-by="id" />
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
    resetAttr()
};
    const memoForm = ref({
            subject : '',
            body : '' , 
            category : '1' , 
            staff : '' , 
            departments : '' , 
            image : '' , 
    });
     

    const resetAttr = () => {
        memoForm.value = {
            subject: '',
            body: '',
            category: '1',
            staff: '',
            departments: '', 
            image: '', 
        }
    }
    
    // const cast = [
    //     Request memo,
    //     Confirmation,
    //     Periodic,
    //     Ideas and suggestions,
    //     Informal study results
    // ];


const handleImageChange = (event) => {
     const file = event.target.files[0];
    if (file) {
        var ext = file['name'].substring(file['name'].lastIndexOf('.') + 1);
        if (!['png', 'jpeg', 'jpg','docs','pdf'].includes(ext)) {
            event.target.value = null;
            store.commit('notify', { message: 'Only Image is allowed', type: 'warning' })
            return;
        }
        if (file.size > 1024 * 1024) {
            event.target.value = null;
            store.commit('notify', { message: 'Image cannot be more 1MB', type: 'warning' })
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            memoForm.value.image = reader.result;
        };
        reader.readAsDataURL(file);
    }
}

    const errors = ref({})
    const memos = ref({})
    
    function createMemo(){
        errors.value = [];
        store.dispatch('postMethod', { url: '/create-memo', param: memoForm.value }).then((data) => {
            if (data?.status == 422) {
                errors.value = data.data;
                console.log(data.data);
                
            } else if (data?.status == 201) {
                closeModal()
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
        if (data?.status == 200) {
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
    function loadMemo(url= '/load-memo'){
        store.dispatch('getMethod', { url: url}).then((data) => {
              if (data?.status == 200) {
                memos.value = data.data;
            }else{
                memos.value ={}
            }
        }).catch(e => {
            console.log(e);
        })
    }
    const users = ref([]);
    function dropdownUser() {
        store.dispatch('loadDropdown', 'users').then(({ data }) => {
            users.value = data;
        }).catch(e => {
            console.log(e);
        })
    }
    dropdownUser()

    const departments = ref([]);
    function dropdownDepts() {
        store.dispatch('loadDropdown', 'departments').then(({ data }) => {
            departments.value = data;
        }).catch(e => {
            console.log(e);
        })
    }
    dropdownDepts()

    function nextPage(link) {
        if (!link.url || link.active) {
            return;
        }
        loadMemo(link.url)
    }
</script>

<style scoped>

</style>
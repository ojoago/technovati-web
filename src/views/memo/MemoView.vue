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
                                        <input type="text" v-model="memoForm.subject" class="form-control"
                                            placeholder="Name of department">
                                        <p class="text-danger " v-if="errors?.subject">{{ errors?.subject[0] }}</p>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="form-label">Body</label>
                                        <textarea type="text" v-model="memoForm.body" class="form-control"  placeholder="Name of department"></textarea>
                                        <p class="text-danger " v-if="errors?.body">{{ errors?.body[0] }}</p>
                                    </div>
                                </div>
                           
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="form-label">Category</label>
                                        <input type="text" v-model="memoForm.type_pid" class="form-control"
                                            placeholder="Name of department">
                                        <p class="text-danger " v-if="errors?.type_pid">{{ errors?.type_pid[0] }}</p>
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
                                        <th> <i class="bi bi-pencil-fill"></i> </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(memo, loop) in memos.data" :key="loop">
                                        <td>{{ loop + 1 }}</td>
                                        <td>{{ memo.subject }}</td>
                                        <td>{{ memo.body }}</td>
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
    
                <g-modal :showModal="open" @closeModal="closeModal">
                <!-- Your modal content goes here -->
                <p>This is the modal content.</p>
                </g-modal>
            </div>
           </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import store from "@/store";
import PaginationLinks from "@/components/PaginationLinks.vue";
import GModal from "@/components/GModal.vue";

    const memoForm = ref({
            subject : '',
            body : '' , 
            type_pid : '1' 
    });
    const open = ref(true)
    const openModal = ()=>{
        open.value = true
    }
    const closeModal = ()=>{
        open.value = false
    }

    
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
       store.commit('setSpinner', true)
        store.dispatch('postMethod', { url: '/create-memo', param: memoForm.value }).then((data) => {
            store.commit('setSpinner', false)
            if (data.status == 422) {
                errors.value = data.data;
            } else if (data.status == 201) {
                errors.value = [];
                memoForm.value = [];
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
            type_pid: memo.type_pid ,
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
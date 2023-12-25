<template>
    <div>
        <div class="container">
           <div class="row">
            <div class="col-md-5">
                <div class="card">
                    <fieldset class="border rounded-3 p-2 m-1">
                            <legend class="float-none w-auto px-2">Create Memo</legend>
                         <form>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="form-label">Task</label>
                                        <input type="text" v-model="memoForm.subject" class="form-control"
                                            placeholder="Name of department">
                                        <p class="text-danger " v-if="errors?.subject">{{ errors?.subject[0] }}</p>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="form-label">Description</label>
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
            <div class="col-md-7">

            </div>
           </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import store from "@/store";

    const memoForm = ref({
            subject : '',
            body : '' , 
            type_pid : '' 
    });
    const errors = ref({})
    
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
</script>

<style scoped>

</style>
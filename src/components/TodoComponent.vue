<template>
    <div>
        <div class="card mt-2">
                        <fieldset class="border  rounded-3 p-2 m-1">
                            <legend class="float-none w-auto px-1"> Todo List </legend>
                            <div class="input-group mb-2">
                                <input type="text" v-model="todo.item" class="form-control form-control-sm"
                                    placeholder="e.g Todo list">
                                <button type="button" class="btn btn-primary btn-sm"
                                    @click="addTodo"> <i class="bi bi-plus"></i> </button>
                            </div>
                            <template v-for="(item,i) in todos" :key="i">
                                <div v-if="item.status==1">
                                    <input type="checkbox" checked> {{item.item}} <hr>
                                </div>
                                <input type="checkbox" v-else> {{item.item}} <hr>
                            </template>
                        
                        </fieldset>
                    </div>
    </div>
</template>

<script setup>
    import store from '@/store';
import { ref } from 'vue';
    
    
    const todos = ref({})
const loadTodo = () => {
    // load-hr-dashboard
    store.dispatch('getMethod', { url: '/load-todo' }).then((data) => {
        if (data?.status == 200) {
            todos.value = data.data;
        }
    })
}

const todo = ref({item:''})
function addTodo() {
    if(todo.value.item){
        store.dispatch('postMethod', { url: '/add-todo', param: todo.value }).then((data) => {
            if (data?.status == 201) {
                todo.value.item = ''
                loadTodo();
            }
        }).catch(e => {
            console.log(e);
        })
    }
}

    loadTodo()

</script>

<style scoped>

</style>
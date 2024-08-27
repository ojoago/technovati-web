<template>
    <div>
        <div class="card mt-2">
            <fieldset class="border  rounded-3 p-2 m-1">
                <legend class="float-none w-auto px-1"> Todo List </legend>
                <div class="input-group mb-2">
                    <input type="text" v-model="todo" class="form-control form-control-sm"
                        placeholder="e.g Todo list">
                    <button type="button" class="btn btn-primary btn-sm" @click="newTodo"> <i class="bi bi-plus"></i>
                    </button>
                </div>
                <!-- {{ todoArray }} -->
                
                
                <template v-for="(todo,i) in todoArray" :key="i">
                        <input type="checkbox" :class="todo.done && `strike`" @change="checkValue" checked>
                        {{todo.item}}
                        <hr>
                    
                </template>

            </fieldset>
        </div>
    </div>
</template>

<script setup>
import store from '@/store';
import { ref,watch } from 'vue';
    
    
    const todo = ref(null)
    const todos = ref([])
    
    // const array_asc = computed(() => todos.value.sort((a,b)=>{
    //     return a.createdAt - b.createdAt
    // }))

    watch(todos,newValue =>{
        addTodo(newValue)

    },{deep:true})

// const loadTodo = () => {
//     // load-hr-dashboard
//     store.dispatch('getMethod', { url: '/load-todo' }).then((data) => {
//         if (data?.status == 200) {
//             todos.value = data.data;
//         }
//     })
// }

const todoArray = ref([])
const newTodo = () =>{
    if(todo.value.trim() != '')
    todoArray.value.push({
        item:todo.value,
        done:false,
        createdAt: new Date().getTime()
    })
    todo.value = ''
}
function addTodo(newValue) {
    // if(todo.value.item){
        store.dispatch('postMethod', { url: '/add-todo', param: newValue }).then((data) => {
            if (data?.status == 201) {
                // loadTodo();
            }
        }).catch(e => {
            console.log(e);
        })
    // }
}

// loadTodo()

// const checkValue = (event) =>{
//     console.log(event);
    
    
// }
</script>

<style scoped>

.strike{
    text-decoration: line-through;
}
</style>
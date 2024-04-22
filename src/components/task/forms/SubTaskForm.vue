<template>
    <div>
         <form>
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label class="form-label">Sub Task</label>
                        <input type="text" v-model="subTask.name" class="form-control" placeholder="enter sub task">
                        <p class="text-danger " v-if="errors?.name">{{ errors?.name[0] }}</p>
                    </div>
                </div>
               
                <div class="col-md-6">
                        <div class="form-group">
                            <label class="form-label">Begin Date</label>
                            <input type="date" v-model="subTask.from" class="form-control">
                            <p class="text-danger " v-if="errors?.from">{{ errors?.from[0] }}</p>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="form-label">End Date</label>
                            <input type="date" v-model="subTask.to" class="form-control">
                            <p class="text-danger " v-if="errors?.to">{{ errors?.to[0] }}</p>
                        </div>
                    </div>
                     <div class="col-md-12">
                        <div class="form-group">
                            <label class="form-label">Description</label>
                            <textarea type="text" v-model="subTask.description" class="form-control"  placeholder="enter description"></textarea>
                            <p class="text-danger " v-if="errors?.description">{{ errors?.description[0] }}</p>
                        </div>
                    </div>
                <div class="col-md-12">
                    <div class="form-group">
                        <label class="form-label">Assign</label>
                            <div v-for="team in task.teams" :key="team.pid">
                                <input type="checkbox" id="checkbox" :value="team" v-model="subTask.teams" />
                                &nbsp; <label for="checkbox"> {{ team.text }}</label>
                            </div>
                        <p class="text-danger " v-if="errors?.teams">{{ errors?.teams[0] }}</p>
                    </div>
                </div>
            </div>
            <button type="button" class="btn btn-success btn-sm mt-2"
                @click="createTask">Submit</button>
        </form>
    </div>
</template>

<script setup>
import store from "@/store";
import { defineProps, defineEmits, ref } from "vue";
// import { Multiselect } from 'vue-multiselect';

defineEmits(['next'])
// @click="$emit('next',link)"
const props = defineProps({
    
    task: {
        type:Object,
    },
   
});
const subTask = ref({
    'task': '',
    'description': '',
    'from': '',
    'to': '',
    teams:[],
    task_pid: props.task?.pid ,

});

const resetAttr = () =>{
    subTask.value = {
        'task': '',
        'description': '',
        'from': '',
        'to': '',
        teams: [],
        task_pid: props.task?.pid,
    }
}

const errors = ref({})
function createTask() {
    errors.value = [];
    store.dispatch('postMethod', { url: '/create-sub-task', param: subTask.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data;
        } else if (data?.status == 201) {
            resetAttr()
        }
    })
}

const users = ref([]);
function dropdownUser() {
    store.dispatch('loadDropdown', 'users').then(({ data }) => {
        users.value = data;
    })
}
dropdownUser()


</script>

<style scoped>

</style>
<template>
    <div>
        <div class="container">
           <div class="card m-2">
            <div class="card-header">
                <h5 class="card-title"> {{ task.task }}</h5>
               
                <nav class="d-flex float-start">
                    <ol class="breadcrumb">
                      <li class="breadcrumb-item"> {{ task.from }}</li>
                      <li class="breadcrumb-item"> {{ task.to }}</li>
                      <li class="breadcrumb-item active">Day(s) left: 12</li>
                    </ol>
                  </nav>
                  <div class="float-end">
                    <button class="btn btn-sm btn-primary">Add Sub Task</button>
                    <button class="btn btn-sm btn-primary">Add Team M</button>
                  </div>
            </div>
            <div class="card-body">
                <div class="horizontal-scrollable">
                <div class="row flex-nowrap">
                    <div class="col-4" v-for="(sts, lp) in status" :key="lp">
                            <label class="h3">{{ sts.toUpperCase() }}</label>
                            <template v-for="task in subtasks.task" :key="task.pid" >
                                <div class="card mb-2" v-if="lp == task.status">
                                <div class="card-body">
                                    <h4 class="card-title">{{ task.name }}</h4>
                                </div>
                                <div class="card-body">

                                </div>
                                <div class="card-footer">
                                    <i class="bi bi-person"></i> <label>{{ task.username }}</label>
                                    <span class="float-end"><i class="bi bi-calendar-x"></i> <label>{{ task.to }}</label></span>
                                </div>
                            </div>
                            </template>
                    </div>
            
                </div>
            </div>
                <!-- <DoModal :is-open="false">

                </DoModal> -->
                
                <form>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="form-label">Task</label>
                                <input type="text" v-model="sub_task.name" class="form-control"
                                    placeholder="Name of department">
                                <p class="text-danger " v-if="errors?.name">{{ errors?.name[0] }}</p>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="form-label">Description</label>
                                <textarea type="text" v-model="sub_task.description" class="form-control"  placeholder="Name of department"></textarea>
                                <p class="text-danger " v-if="errors?.description">{{ errors?.description[0] }}</p>
                            </div>
                        </div>
                        <div class="col-md-12">
                                <div class="form-group">
                                    <label class="form-label">Begin Date</label>
                                    <input type="date" v-model="sub_task.from" class="form-control"
                                        placeholder="Name of department">
                                    <p class="text-danger " v-if="errors?.from">{{ errors?.from[0] }}</p>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="form-label">End Date</label>
                                    <input type="date" v-model="sub_task.to" class="form-control"
                                        placeholder="Name of department">
                                    <p class="text-danger " v-if="errors?.to">{{ errors?.to[0] }}</p>
                                </div>
                            </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="form-label">Image</label>
                                <input type="text" v-model="sub_task.head" class="form-control"
                                    placeholder="Name of department">
                                <!-- <p class="text-danger " v-if="errors?.head[0]">{{ errors?.head[0] }}</p> -->
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="form-label">Head of Department</label>
                                <input type="text" v-model="sub_task.head" class="form-control"
                                    placeholder="Name of department">
                                <!-- <p class="text-danger " v-if="errors?.head[0]">{{ errors?.head[0] }}</p> -->
                            </div>
                        </div>
                    </div>
                    <button type="button" class="btn btn-success btn-sm mt-2"
                        @click="createSubTask">Submit</button>
                </form>
            </div>
           </div>
        </div>

        
        
    </div>
</template>

<script setup>
// import DynamicModal from "@/components/DynamicModal.vue";
// import ModalConponent from "@/components/ModalComp.vue";
// import DoModal from "@/components/DoModal.vue";
    
import store from "@/store";
import { onMounted, ref } from "vue";
import { useRoute,useRouter  } from 'vue-router';
const router = useRouter()
const route = useRoute()
const errors = ref({});
const status = ref(['PENDING','IN PROGRESS','COMPLETED','DAMAGED'])
const task = ref({});
const subtasks = ref({});
const task_pid = ref(null);

const sub_task = ref({
    'name': '',
    'description': '',
    'from': '',
    'to': '',
    task_pid: task_pid
});


function createSubTask() {
    store.commit('setSpinner', true)
    store.dispatch('postMethod', { url: '/create-sub-task' , param: sub_task.value }).then((data) => {
        store.commit('setSpinner', false)
        if (data.status == 422) {
            errors.value = data.data;
        } else if(data.status == 201){
            errors.value = [];
            sub_task.value = [];
        }
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
        alert('weting be this')
    })
}


onMounted(() => {
      let tsk = localStorage.getItem('TVATI_TASK_DETAIL') ? JSON.parse(localStorage.getItem('TVATI_TASK_DETAIL')) : 'null'
         if (tsk != 'null') {
            task.value = tsk;
         }
    getUrlQueryParams()
    loadTaskDetail()
});

 async function  getUrlQueryParams(){
     await router.isReady()
     task_pid.value = route.query.task;
}

function loadTaskDetail() {
    store.commit('setSpinner', true)
   store.dispatch('getMethod', {url:'/task-detail/'+ route.query.task }).then(({data}) => {
        subtasks.value = data;
        store.commit('setSpinner', false)
        
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
        alert('weting be this')
    })
}




</script>

<style scoped>
 .horizontal-scrollable  {
        padding: 5px !important;
    }
 .horizontal-scrollable > .row {
        overflow-x: auto;
        white-space: nowrap;
    }


.col-4:nth-child(3n+1) { background: #c69; }
.col-4:nth-child(3n+2) { background: #9c6; }
.col-4:nth-child(3n+3) { background: #69c; }
</style>
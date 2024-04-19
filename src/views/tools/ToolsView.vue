<template>
    <div>
        <div class="container mt-2">
            <div class="card">
                <div class="card-body">
                    <div class="card-header">Engineering Tools</div>
                    <ul class="nav nav-tabs d-flex" id="myTabjustified" role="tablist">
                        <li class="nav-item flex-fill" role="presentation">
                            <button class="nav-link w-100 active" id="worker-tab" data-bs-toggle="tab"
                                data-bs-target="#worker" type="button" role="tab" aria-controls="worker"
                                aria-selected="true">Tool</button>
                        </li>
                        <li class="nav-item flex-fill" role="presentation">
                            <button class="nav-link w-100" id="casual-tab" data-bs-toggle="tab" data-bs-target="#casual"
                                type="button" role="tab" aria-controls="casual" aria-selected="false">Tools
                                History</button>
                        </li>

                    </ul>
                    <div class="tab-content pt-2" id="myTabjustifiedContent">
                        <div class="tab-pane fade show active" id="worker" role="tabpanel" aria-labelledby="worker-tab">

                            <button class="btn btn-primary btn-sm m-2" @click="ToggleToolModal=true">Add New</button>

                            <div class="table-responsive">
                                <table class="table-hover table-stripped table-bordered  table">
                                    <thead>
                                        <tr>
                                            <th>Tool</th>
                                            <th>Description</th>
                                            <th>quantity</th>
                                            <th> <i class="bi bi-gear-fill"></i> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, loop) in tools.data" :key="loop">
                                            <td>{{ item.name }}</td>
                                            <td>{{ item?.description }}</td>
                                            <td>{{ item.quantity }}</td>
                                            <td>
                                                <div class="dropdown">
                                                    <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                                        data-bs-toggle="dropdown">
                                                        <i class="bi bi-tools"></i>
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                        <li><a class="dropdown-item pointer bg-warning" @click="editTool(item)">Edit</a></li>
                                                        <li><a class="dropdown-item pointer bg-primary" @click="staffDetail(item)">Add Quantity</a></li>
                                                        <li><a class="dropdown-item pointer bg-info" @click="assignWorker(item.pid)">Assign </a> </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                        </div>
                        <div class="tab-pane fade" id="casual" role="tabpanel" aria-labelledby="casual-tab">
                            <fieldset class="border rounded-3 p-2 m-1">
                                <legend class="float-none w-auto px-2">Add Casual Workers</legend>

                            </fieldset>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <o-modal :isOpen="ToggleToolModal" modal-class="modal-xs" title="Add New Tool" @submit="createTool"
            @modal-close="closeModal">
            <template #content>
                <form id="toolForm">
                    <div class="row">
                        <div class="col-md-12">
                            <label class="form-label">Tool</label>
                            <input type="text" v-model="tool.name" placeholder="e.g tape"
                                class="form-control form-control-sm">
                            <p class="text-danger " v-if="errors?.name">{{ errors?.name[0] }} </p>
                        </div>
                        <div class="col-md-12">
                            <label class="form-label">Description</label>
                            <textarea type="text" v-model="tool.description" placeholder="e.g for measuring"
                                class="form-control form-control-sm"></textarea>
                            <p class="text-danger " v-if="errors?.description">{{ errors?.description[0] }} </p>
                        </div>
                    </div>
                </form>
            </template>
        </o-modal>

        <o-modal :isOpen="assignModal" :modal-class="xs" title="Assign Staff to team" @submit="addTeam"
            @modal-close="closeModal">
            <template #content>
                <form id="assignForm">
                    <div class="row">
                        <div class="col-md-12">
                            <label class="form-label">Team</label>
                            <Select2 v-model="team.team_pid" :options="teamDrop" />
                            <p class="text-danger " v-if="errors?.team_pid">{{ errors?.team_pid[0] }} </p>
                        </div>
                    </div>
                </form>
            </template>

        </o-modal>
    </div>
</template>

<script setup>
import Select2 from 'vue3-select2-component';
import store from "@/store";
import { ref } from "vue";
// import ItemRequestView from '@/views/inventory/ItemRequestView.vue';

// import WorkerForm from "@/components/forms/casual/WorkerForm.vue"
import OModal from "@/components/OModal.vue";

// const user_pid = ref(null);

const xs = 'modal-xs';
const toolModal = ref(false)
const ToggleToolModal = ref(false)

const assignModal = ref(false)


const closeModal = () => {
    toolModal.value = false;
    assignModal.value = false;
    ToggleToolModal.value = false;
};

const tool = ref({
    name: '',
    description: '',
})
const errors = ref({});

function createTool() {
    errors.value = []
    store.dispatch('postMethod', { url: '/create-tool', param: tool.value}).then((data) => {
        if (data.status == 422) {
            errors.value = data.data
        } 
        else if (data.status == 201) {
            let form = document.querySelector('#toolForm');
            form.reset();
            loadTools()
        }
    }).catch(e => {
        console.log(e);
    })

}

const editTool = (data) => {
    tool.value ={
        name:data.name ,
        description:data.description ,
        pid:data.pid ,
    }
    ToggleToolModal.value= true;
}


const tools = ref({});



loadTools()
function loadTools() {
    store.dispatch('getMethod', { url: '/load-tools' }).then((data) => {
        if (data.status == 200) {
            tools.value = data.data;
        }
    }).catch(e => {
        console.log(e);
    })
}
const teamDrop = ref({});
function dropDownTeam() {
    store.dispatch('loadDropdown', 'team').then(({ data }) => {
        teamDrop.value = data;
    }).catch(e => {
        console.log(e);
        alert('Something Went Wrong')
    })
}
dropDownTeam()


const deptDrop = ref({});
function dropdownDept() {
    store.dispatch('loadDropdown', 'departments').then(({ data }) => {
        deptDrop.value = data;
    }).catch(e => {
        console.log(e);
        alert('Something Went Wrong')
    })
}
dropdownDept()



</script>

<style scoped></style>
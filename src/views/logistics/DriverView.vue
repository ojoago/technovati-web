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
                                type="button" role="tab" aria-controls="casual" aria-selected="false">Tools History</button>
                        </li>

                    </ul>
                    <div class="tab-content pt-2" id="myTabjustifiedContent">
                        <div class="tab-pane fade show active" id="worker" role="tabpanel" aria-labelledby="worker-tab">
                            <ItemRequestView />
                        </div>
                        <div class="tab-pane fade" id="casual" role="tabpanel" aria-labelledby="casual-tab">
                            <fieldset class="border rounded-3 p-2 m-1">
                                <legend class="float-none w-auto px-2">Add Casual Workers</legend>
                                <worker-form></worker-form>
                            </fieldset>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <o-modal :isOpen="toolModal" :modal-class="xs" title="Add New Tool" @submit="createTool" @modal-close="closeModal">
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
import ItemRequestView from '@/views/inventory/ItemRequestView.vue';

import WorkerForm from "@/components/forms/casual/WorkerForm.vue"
import OModal from "@/components/OModal.vue";

// const user_pid = ref(null);

const xs = 'modal-xs';
const toolModal = ref(false)

const assignModal = ref(false)


const closeModal = () => {
    toolModal.value = false;
    assignModal.value = false;
};

const tool = ref({
    name: '',
    description: '',
})
const errors = ref({});

function createTool() {
    store.commit('setSpinner', true)
    errors.value = []
    let form = document.querySelector('#toolForm');
    store.dispatch('postMethod', { url: '/create-tool', param: tool.value, form: form }).then((data) => {
        if (data.status == 422) {
            errors.value = data.data
        }
        // else if (data.status == 201) {
        //     let form = document.querySelector('#teamForm');
        //     form.reset();
        // }
        store.commit('setSpinner', false)
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
    })

}
function addTeam() {
    store.commit('setSpinner', true)
    errors.value = []
    // let data = new FormData;
    // const  header = { "Content-Type": "multipart/form-data" };
    store.dispatch('postMethod', { url: '/assign-team', param: tool.value }).then((data) => {
        if (data.status == 422) {
            errors.value = data.data
        } else if (data.status == 201) {
            let form = document.querySelector('#assignForm');
            form.reset();
        }
        store.commit('setSpinner', false)
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
    })

}

const worker = ref({});



loadWorker()
function loadWorker() {
    store.commit('setSpinner', true)
    store.dispatch('getMethod', { url: '/load-workers' }).then((data) => {
        store.commit('setSpinner', false)
        if (data.status == 200) {
            worker.value = data.data;
        }
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
        alert('weting be this')
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
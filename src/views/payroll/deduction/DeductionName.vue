<template>
    <div>
        <div class="container mt-2">
            <div class="card">
                <div class="card-header">
                    Deduction Names
                    <button class="btn btn btn-primary ml-2" @click="openModal">Add New</button>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table-hover table-stripped table-bordered table">
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Deduction</th>
                                    <th>Payment</th>
                                    <th>Description</th>
                                    <th> <i class="bi bi-pencil-fill"></i> </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(dd, loop) in deductions.data" :key="loop">
                                    <td>{{ loop + 1 }}</td>
                                    <td>{{ dd.name }}</td>
                                    <td>{{ dd.payment == 1 ? 'YES' : 'NO' }}</td>
                                    <td>{{ dd.description }}</td>
                                    <td>
                                        <div class="dropdown">
                                            <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                                data-bs-toggle="dropdown">
                                                <i class="bi bi-tools"></i>
                                            </button>
                                            <ul class="dropdown-menu">
                                                <li class="bg-warning"><a class="dropdown-item pointer"
                                                        @click="editData(dd)">Details</a> </li>
                                                <li class="bg-danger"><a class="dropdown-item pointer"
                                                        @click="deleteLog(dd.id)">Delete</a> </li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="flex justify-center mt-4">
                            <nav class="relative justify-center rounded-md shadow pagination">
                                <pagination-links v-for="(link, i) of deductions.links" :link="link" :key="i"
                                    @next="nextPage(link)"></pagination-links>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>

         <o-modal :isOpen="toggleModal" @submit="createDeductionName" modal-class="modal-xs" title="Deduction Name" @modal-close="closeModal">
            <template #content>
                <div>
                     <form>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="form-label">Name</label>
                                        <input type="text" v-model="deduction.name" class="form-control"
                                            placeholder="e.g deductable">
                                        <p class="text-danger " v-if="errors?.name">{{ errors?.name[0] }}
                                        </p>
                                    </div>
                                </div>
                        
                                <div class="col-md-12">
                                        <label class="form-label">Payable ?</label>
                                        <div class="form-group">
                                            <input type="radio" v-model="deduction.payment" value="1"> yes
                                            <input type="radio" v-model="deduction.payment" value="0"> No
                                        </div>
                                        <p class="text-danger " v-if="errors?.payment">{{ errors?.payment[0] }} </p>
                                </div>
                        
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="form-label">Description</label>
                                        <textarea type="text" v-model="deduction.description" class="form-control"
                                            placeholder="e.g for senior staff"></textarea>
                                        <p class="text-danger " v-if="errors?.description">{{ errors?.description[0] }}  </p>
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
import store from "@/store";
import { ref } from "vue";
import PaginationLinks from "@/components/PaginationLinks.vue";
import OModal from "@/components/OModal.vue";
const toggleModal = ref(false)


const openModal = () => {
    toggleModal.value = true
}
const closeModal = () => {
    toggleModal.value = false;
    resetAttr()
};
const errors = ref({});
const deduction = ref({
    name: '',
    description: '',
    payment: 0,
});

const editData = (stp) => {
    deduction.value = {
        name: stp.name,
        description: stp.description,
        payment: stp.payment,
        pid: stp.pid,
    }
    toggleModal.value = true
}

const resetAttr = () => {
    deduction.value = {
        name: '',
        description: '',
        payment: 0,
    }
}
const deleteLog = (pid) => {
    alert(pid)
}

function createDeductionName() {
    errors.value = []
    store.dispatch('postMethod', { url: '/create-deduction-name', param: deduction.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data
        } else if (data?.status == 201) {
            closeModal()
            loadDeductionName()
            // deduction.value = [];
        }
    }).catch(e => {
        console.log(e);
    })
}


const deductions = ref({});

function loadDeductionName(url = '/load-deduction-names') {
    store.dispatch('getMethod', { url: url }).then((data) => {
        if (data?.status == 200) {
            deductions.value = data.data;
        }else{
            deductions.value = {}
        }
    }).catch(e => {
        console.log(e);
    })
}

loadDeductionName()
function nextPage(link) {

    if (!link.url || link.active) {
        return;
    }
    loadDeductionName(link.url)
}

</script>

<style scoped></style>
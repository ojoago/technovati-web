<template>
    <div>
        <div class="container mt-2">
            <div class="row">
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <fieldset class="border rounded-3 p-2 m-1">
                                <legend class="float-none w-auto px-2">Allowance Name</legend>
                                <form>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Name</label>
                                                <input type="text" v-model="allowance.name" class="form-control"
                                                    placeholder="e.g housing allowance">
                                                <p class="text-danger " v-if="errors?.name">{{ errors?.name[0] }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Type</label>
                                                <select v-model="allowance.type" class="form-control">
                                                    <option value="" selected>Select Type</option>
                                                    <option value="1"> Taxable </option>
                                                    <option value="2"> Non Taxable </option>
                                                </select>
                                                <p class="text-danger " v-if="errors?.type">{{ errors?.type[0] }} </p>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Description</label>
                                                <textarea type="text" v-model="allowance.description" class="form-control"
                                                    placeholder="description of visit"></textarea>
                                                <p class="text-danger " v-if="errors?.description">{{ errors?.description[0] }}  </p>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="button" class="btn btn-success btn-sm mt-2"
                                        @click="createSalaryAllowance">Submit</button>
                                </form>
                            </fieldset>
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header">Allowance Names</div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table-hover table-stripped table-bordered table">
                                    <thead>
                                        <tr>
                                            <th>SN</th>
                                            <th>Allowance</th>
                                            <th>type</th>
                                            <th> Description</th>
                                            <th> <i class="bi bi-gear-fill"></i> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(lg, loop) in allowances.data" :key="loop">
                                            <td>{{ loop + 1 }}</td>
                                            <td>{{ lg.name }}</td>
                                            <td>{{ lg.types }}</td>
                                            <td>{{ lg.description }}</td>
                                            <td>
                                                <div class="dropdown">
                                                    <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                                        data-bs-toggle="dropdown">
                                                        <i class="bi bi-tools"></i>
                                                    </button>
                                                    <ul class="dropdown-menu">
                                                        <li class="bg-warning"><a class="dropdown-item pointer"
                                                                @click="editAllow(lg)">Edit</a> </li>
                                                        <li class="bg-danger"><a class="dropdown-item pointer"
                                                                @click="deleteLog(lg.id)">Delete</a> </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="flex justify-center mt-4">
                                    <nav class="relative justify-center rounded-md shadow pagination">
                                        <pagination-links v-for="(link, i) of allowances.links" :link="link" :key="i"
                                            @next="nextPage(link)"></pagination-links>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import store from "@/store";
import { ref } from "vue";
import PaginationLinks from "@/components/PaginationLinks.vue";

const errors = ref({});
const allowances = ref({});
const allowance = ref({
    name: '',
    description: '',
    type: '',
});

const editAllow = (stp) => {
    allowance.value = {
        name: stp.name,
        description: stp.description,
        pid: stp.pid,
        type: stp.type,
    }
}
const deleteLog = (pid) => {
    alert(pid)
}

const resetAttr = () => {
    allowance.value = {
        name: '',
        description: '',
        pid: '',
        type: '',
    }
}

function createSalaryAllowance() {
    errors.value = []
    store.dispatch('postMethod', { url: '/create-allowance-name', param: allowance.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data
        } else if (data?.status == 201) {
            resetAttr()
            loadAllowance()
        }
    }).catch(e => {
        console.log(e);
    })
}

function loadAllowance() {
    store.dispatch('getMethod', { url: '/load-allowance-names' }).then((data) => {
        if (data?.status == 200) {
            allowances.value = data.data;
        }
    }).catch(e => {
        console.log(e);
    })
}

loadAllowance()
function nextPage(link) {
    alert()
    if (!link.url || link.active) {
        return;
    }
    alert(link.url)
}

</script>

<style scoped></style>
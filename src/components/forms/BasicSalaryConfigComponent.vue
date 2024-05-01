<template>
    <div>
        <div class="container mt-2">
            <div class="card">
                <div class="card-header">Basic Salary Configuration</div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">Salary Structure</label>
                                <select class="form-control form-control-sm" v-model="basic.structure_pid"
                                    @change="loadGrades($event)">
                                    <option value="" selected>Make Selection</option>
                                    <option v-for="sec in structureDrop" :key="sec.id" :value="sec.id">{{ sec.text }}
                                    </option>
                                </select>
                                <p class="text-danger " v-if="errors?.structure_pid">{{ errors?.structure_pid[0] }} </p>
                            </div>

                        </div>

                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">Salary Grade</label>
                                <Select2 v-model="basic.grade_pid" :options="gradeDrop" id="pid" lable="grade"
                                    :settings="{ width: '100%' }" />
                                <p class="text-danger " v-if="errors?.grade_pid">{{ errors?.grade_pid[0] }} </p>
                            </div>
                        </div>
                    </div>
                    <fieldset class="border rounded-3 p-2 m-1" v-if="basic.grade_pid">
                        <legend class="float-none w-auto px-2 h5"> Steps</legend>
                        <div class="row">
                            <div class="col-md-6 " v-for="(step, loop) in basic.step" :key="loop">
                                <div class="input-group mb-1">
                                    <label class="bg-light p-1">Step {{ loop+1 }} </label>
                                    <input type="number" v-model="step.amount" step="0.1"
                                        class="form-control form-control-sm">
                                    <button class="btn btn-sm btn-danger" @click="removeStep"> <i
                                            class="bi bi-file-minus"></i> </button>
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-sm btn-primary" @click="addStep"> <i class="bi bi-plus"></i> </button>

                        <hr>
                        <button class="btn btn-sm btn-primary" @click="addSalarySteps"> Submit </button>

                    </fieldset>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import store from "@/store";
import { ref } from "vue";
import Select2 from 'vue3-select2-component';

const basic = ref({
    structure_pid:'',
    grade_pid:'' ,
    step: [{ amount: '' }]
})

const resetAttr = () => {
    basic.value = {
        structure_pid: '',
        grade_pid: '',
        step: [{ amount: '' }]
    }
}
const addStep = () => {
    basic.value.step.push({ amount:''})
}
const removeStep = (i) => {
    let len = basic.value.step.length;
    if (len === 1) {
        store.commit('notify', { message: 'One Step is required to proceed ', type: 'warning' })
        return;
    }
    basic.value.step.splice(i, 1);
}


const loadGrades = (event) => {
    dropdownGrade(event.target.value)
}

const errors = ref({})
function addSalarySteps() {
    store.dispatch('postMethod', { url: '/add-salary-step',param:basic.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data;
        }
        else if (data?.status == 201) {
            resetAttr()
        }
    }).catch(e => {
        console.log(e);
    })
}

//salary-structure

const structureDrop = ref({});
function dropdownStructure() {
    store.dispatch('loadDropdown', 'salary-structure').then(({ data }) => {
        structureDrop.value = data;
    }).catch(e => {
        console.log(e);
    })
}
const gradeDrop = ref([]);
function dropdownGrade(id) {
    store.dispatch('loadDropdown', 'salary-grade/'+id).then(({ data }) => {
        gradeDrop.value = data;
    }).catch(e => {
        console.log(e);
    })
}

dropdownStructure()

</script>

<style scoped></style>
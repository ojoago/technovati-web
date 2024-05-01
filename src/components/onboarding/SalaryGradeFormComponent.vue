<template>
    <div>
        <fieldset class="border rounded-3 p-2 m-1">
            <legend class="float-none w-auto px-2">Salary Grade</legend>
            <form>

                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">Salary Structure</label>
                            <select class="form-control form-control-sm" v-model="salary.structure_pid"
                                @change="loadGrades($event)">
                                <option value="" selected>Make Selection</option>
                                <option v-for="sec in structureDrop" :key="sec.id" :value="sec.id">{{ sec.text }}
                                </option>
                            </select>
                            <p class="text-danger " v-if="errors?.structure_pid">{{ errors?.structure_pid[0] }} </p>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">Salary Grade</label>
                            <select class="form-control form-control-sm" v-model="salary.grade_pid"
                                @change="loadSteps($event)">
                                <option value="" selected>Make Selection</option>
                                <option v-for="sec in grades" :key="sec.id" :value="sec.id">{{ sec.text }} </option>
                            </select>
                            <p class="text-danger " v-if="errors?.grade_pid">{{ errors?.grade_pid[0] }} </p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">Salary Step</label>
                            <Select2 v-model="salary.step" :options="steps" id="pid" :settings="{ width: '100%' }" />
                            <p class="text-danger " v-if="errors?.step">{{ errors?.step[0] }} </p>
                        </div>
                    </div>
                </div>
                <button type="button" class="btn btn-success btn-sm mt-2" @click="staffQualification">Submit</button>
            </form>
        </fieldset>
    </div>
</template>

<script setup>
import store from "@/store";
import { ref,onMounted } from "vue";
import Select2 from 'vue3-select2-component';

const props = defineProps({
    user_pid: String,
});


const salary = ref({
    structure_pid: '' ,
    grade_pid: '' ,
    step: '' ,
    user_pid: props.user_pid,
});

const resetAttr = () => {
    salary.value = {
        structure_pid: '',
        grade_pid: '',
        step: '',
        user_pid: ''
    }
} 

const errors = ref({})

let query = {}
function staffQualification() {
    errors.value = []
    let str = localStorage.getItem('TVATI_ONBOARD_TAB') ? JSON.parse(localStorage.getItem('TVATI_ONBOARD_TAB')) : 'null'
    salary.value.user_pid = str.id;
    store.dispatch('postMethod', { url: '/add-staff-grade-step', param: salary.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data;
        } else if (data?.status == 201) {
            resetAttr()
            query = { tab: 'personal-tab' }
            localStorage.setItem('TVATI_ONBOARD_TAB', JSON.stringify(query, null, 2))
            switchTab()
        }
    })
}

const emit = defineEmits(['currentTab'])

function switchTab() {
    emit('currentTab')
}
onMounted(() => {
    let q = localStorage.getItem('TVATI_ONBOARD_TAB') ? JSON.parse(localStorage.getItem('TVATI_ONBOARD_TAB')) : 'null'
    if (q != 'null') {
        salary.value.user_pid = q.id
    }
    let tsk = localStorage.getItem('TVATI_EDIT_STAFF') ? JSON.parse(localStorage.getItem('TVATI_EDIT_STAFF')) : 'null'
    if (tsk != 'null') {
        if (tsk.action == 'edit') {
            loadDocuments(tsk?.staff?.pid)
        }
    }
})


const loadDocuments = (pid) => {
    store.dispatch('getMethod', { url: '/load-documents/' + pid }).then((data) => {
        if (data?.status == 200) {
            salary.value.items = data?.data;
        }
    })
}


const grades = ref({})

const steps = ref({})
function loadSteps(event) {
    dropdownStep(event.target.value)
}


const loadGrades = (event) => {
    dropdownGrade(event.target.value)
}

function dropdownStep(id) {
    store.dispatch('loadDropdown', 'grade-step/'+id).then(({ data }) => {
        steps.value = data;
    }).catch(e => {
        console.log(e);
    })
}
function dropdownGrade(id) {
    store.dispatch('loadDropdown', 'salary-grade/'+id).then(({ data }) => {
        grades.value = data;
    }).catch(e => {
        console.log(e);
    })
}


const structureDrop = ref({});
function dropdownStructure() {
    store.dispatch('loadDropdown', 'salary-structure').then(({ data }) => {
        structureDrop.value = data;
    }).catch(e => {
        console.log(e);
    })
}
dropdownStructure()


</script>

<style scoped></style>
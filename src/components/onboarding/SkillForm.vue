<template>
    <div>
        <fieldset class="border rounded-3 p-2 m-1">
            <legend class="float-none w-auto px-2">Qualification</legend>
            <form>
                <fieldset class="border rounded-3">
                    <template v-for="(inst, loop) in skills.skills" :key="loop">

                        <fieldset class="border rounded-3 p-2 m-1">
                            <div class="row">
                                <div class="float-end">
                                    <button type="button" class="btn btn-danger btn-sm" @click="removeQualification(loop)">
                                        <i class="bi bi-patch-minus"></i> </button>
                                </div>
                            </div>
                            <!-- {{ q_errors+'.'+loop }} -->
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="form-label">Skill <span class="text-danger">*</span></label>
                                        <input type="text" v-model="inst.skill" maxlength="250"
                                            class="form-control form-control-sm" placeholder="e.g cyber security ">
                                        <!-- <p class="text-danger " v-if="q_errors?.institutions?.institution">{{ 'q_errors?.institutions?[loop]?.institution[loop]' }}</p> -->
                                    </div>
                                </div>

                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="form-label">Certification </label>
                                        <input type="text" v-model="inst.certification" maxlength="100"
                                            class="form-control form-control-sm" placeholder="e.g diploma">
                                        <!-- <p class="text-danger " v-if="q_errors?.field">{{ q_errors?.loop?.field[0] }}</p> -->
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="form-label">Years of Experience </label>
                                        <input type="number" v-model="inst.years" maxlength="2" class="form-control form-control-sm" placeholder="e.g 2 years">
                                        <!-- <p class="text-danger " v-if="q_errors?.field">{{ q_errors?.loop?.field[0] }}</p> -->
                                    </div>
                                </div>

                            </div>

                            
                        </fieldset>
                    </template>
                    <div class="float-end p-2">
                        <button type="button" class="btn btn-success btn-sm mt-2" @click="addQualification"> <i
                                class="bi bi-plus"></i> </button>
                    </div>
                </fieldset>

                <button type="button" class="btn btn-success btn-sm mt-2" @click="saveSkill">Save & Exit</button>
                <i class="m-3"></i>
                <button type="button" class="btn btn-success btn-sm mt-2" @click="staffSkill">Save & Continue</button>
            </form>
        </fieldset>
    </div>
</template>

<script setup>
import store from "@/store";
import { ref,onMounted } from "vue";
// import { useRouter } from 'vue-router';

const props = defineProps({
    user_pid: String,
});
const q_errors = ref({});

const skills = ref({
    skills: [{
        skill : '' ,
        certification : '' ,
        years : ''
    }],
    user_pid: props.user_pid,
});
const addQualification = () => {
    skills.value.skills.push({
         skill: '',
        certification: '',
        years: ''
    })
}
const removeQualification = (i) => {
    let len = skills.value.skills.length;
    if (len === 1) {
        store.commit('notify', { message: 'one skill is required to proceed', type: 'warning' })
        return;
    }
    skills.value.skills.splice(i, 1);
}
let query = {}

function staffSkill() {
    let str = localStorage.getItem('TVATI_ONBOARD_TAB') ? JSON.parse(localStorage.getItem('TVATI_ONBOARD_TAB')) : 'null'
    skills.value.user_pid = str.id;
    store.dispatch('postMethod', { url: '/add-skills', param: skills.value }).then((data) => {
        if (data?.status == 422) {
            q_errors.value = data.data;
        } else if (data?.status == 201) {
            q_errors.value = []
            skills.value = [];
            query = { tab: 'document-tab', 'id': data?.data?.user_pid }
            localStorage.setItem('TVATI_ONBOARD_TAB', JSON.stringify(query, null, 2))
            switchTab()
        }
    })
}
function saveSkill() {
    let str = localStorage.getItem('TVATI_ONBOARD_TAB') ? JSON.parse(localStorage.getItem('TVATI_ONBOARD_TAB')) : 'null'
    skills.value.user_pid = str.id;
    store.dispatch('postMethod', { url: '/add-skills', param: skills.value }).then((data) => {
        if (data?.status == 422) {
            q_errors.value = data.data;
        } else if (data?.status == 201) {
            q_errors.value = []
            query = { tab: 'personal-tab' }
            localStorage.setItem('TVATI_ONBOARD_TAB', JSON.stringify(query, null, 2))
            localStorage.setItem('TVATI_EDIT_STAFF', JSON.stringify(query, null, 2))
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
        skills.value.user_pid = q.id
    }
    let tsk = localStorage.getItem('TVATI_EDIT_STAFF') ? JSON.parse(localStorage.getItem('TVATI_EDIT_STAFF')) : 'null'
    if (tsk != 'null') {
        if (tsk.action == 'edit') {
            loadExperience(tsk?.staff?.pid)
        }
    }
})


const loadExperience = (pid) => {
    store.dispatch('getMethod', { url: '/load-experience/' + pid }).then((data) => {
        if (data?.status == 200) {
            skills.value.skills = data?.data;
        }
    })
}


</script>

<style scoped></style>
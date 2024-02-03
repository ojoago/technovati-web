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

                <button type="button" class="btn btn-success btn-sm mt-2" @click="staffQualification">Submit</button>
            </form>
        </fieldset>
    </div>
</template>

<script setup>
import store from "@/store";
import { ref,onMounted } from "vue";
// import { useRouter } from 'vue-router';


const q_errors = ref({});

const skills = ref({
    skills: [{
        skill : '' ,
        certification : '' ,
        years : ''
    }],
    user_pid: '',
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
    skills.value.skill.splice(i, 1);
}
let query = {}
function staffQualification() {
    store.commit('setSpinner', true)
    store.dispatch('postMethod', { url: '/add-skills', param: skills.value }).then((data) => {
        store.commit('setSpinner', false)
        if (data.status == 422) {
            q_errors.value = data.data;
        } else if (data.status == 201) {
            q_errors.value = []
            skills.value = [];
            query = { tab: 'document-tab', 'id': data?.data?.user_pid }
            localStorage.setItem('TVATI_ONBOARD_TAB', JSON.stringify(query, null, 2))
            switchTab()
        }
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
        alert('weting be this')
    })
}

// function staffQualification() {
//     store.commit('setSpinner', true)
//     q_errors.value = []
//     store.dispatch('addQualifiaction', qualification.value).then((data) => {
//         if (data.status == 422) {
//             q_errors.value = data.data
//             console.log(data.data);
//             console.log(q_errors.value.institutions[0])
//             console.log(data.data);
//         } else if (data.status == 201) {
//             q_errors.value = []
//             qualification.value = [];
//             query = { tab: 'bank-tab', 'id': data?.data?.user_pid }
//             localStorage.setItem('TVATI_ONBOARD_TAB', JSON.stringify(query, null, 2))
//             // currentTab()
//         }
//         store.commit('setSpinner', false)
//     }).catch(e => {
//         store.commit('setSpinner', false)
//         console.log(e);
//     })
// }
const emit = defineEmits(['currentTab'])

function switchTab() {
    emit('currentTab')
}
onMounted(() => {
    let q = localStorage.getItem('TVATI_ONBOARD_TAB') ? JSON.parse(localStorage.getItem('TVATI_ONBOARD_TAB')) : 'null'
    if (q != 'null') {
        skills.value.user_pid = q.id
    }
})
</script>

<style scoped></style>
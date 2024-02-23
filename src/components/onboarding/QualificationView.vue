<template>
    <div>
        <fieldset class="border rounded-3 p-2 m-1">
                                <legend class="float-none w-auto px-2">Qualification</legend>
                                <form id="qualForm">
                                    <fieldset class="border rounded-3">
                                        <template v-for="(inst, loop) in qualification.institutions" :key="loop">
                                        
                                            <fieldset class="border rounded-3 p-2 m-1">
                                                <div class="row">
                                                    <div class="float-end">
                                                        <button type="button" class="btn btn-danger btn-sm" @click="removeQualification(loop)"> <i class="bi bi-patch-minus"></i> </button>
                                                    </div>
                                                </div>
                                                <!-- {{ q_errors+'.'+loop }} -->
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label class="form-label">institution <span class="text-danger">*</span></label>
                                                            <input type="text" v-model="inst.institution" maxlength="250" class="form-control form-control-sm" placeholder="e.g ABU Zaria">
                                                            <!-- <p class="text-danger " v-if="q_errors?.institutions?.institution">{{ 'q_errors?.institutions?[loop]?.institution[loop]' }}</p> -->
                                                        </div>
                                                    </div>
                                           
                                                    <div class="col-md-6">
                                                        <div class="form-group">
                                                            <label class="form-label">Field/Course of Study </label>
                                                            <input type="text" v-model="inst.field" maxlength="100" class="form-control form-control-sm" placeholder="e.g electrical engineering">
                                                            <!-- <p class="text-danger " v-if="q_errors?.field">{{ q_errors?.loop?.field[0] }}</p> -->
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                            <div class="form-group">
                                                                <label class="form-label">Year <span class="text-danger">*</span></label>
                                                                <input type="text" v-model="inst.year" class="form-control form-control-sm" placeholder="e.g 2018 ">
                                                                <!-- <p class="text-danger " v-if="q_errors?.degree">{{ q_errors?.loop?.degree[0] }}</p> -->
                                                            </div>
                                                        </div>
                                                        <div class="col-md-4">
                                                            <div class="form-group">
                                                                <label class="form-label">Degree <span class="text-danger">*</span></label>
                                                                <input type="text" v-model="inst.degree" class="form-control form-control-sm" placeholder="e.g BSC ">
                                                                <!-- <p class="text-danger " v-if="q_errors?.degree">{{ q_errors?.loop?.degree[0] }}</p> -->
                                                            </div>
                                                        </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label class="form-label">Grade </label>
                                                            <input type="text" v-model="inst.grade" class="form-control form-control-sm" placeholder="e.g 2.1">
                                                            <!-- <p class="text-danger " v-if="q_errors?.loop?.grade">{{ q_errors?.loop?.grade[0] }}</p> -->
                                                        </div>
                                                    </div>
                                                
                                                
                                                </div>

                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label class="form-label">Address <span class="text-danger">*</span></label>
                                                            <textarea v-model="inst.address" class="form-control form-control-sm" placeholder="e.g Zaira, Kaduna, kaduna state"></textarea>
                                                            <!-- <p class="text-danger " v-if="q_errors?.address">{{ q_errors?.loop?.address[0] }}</p> -->
                                                        </div>
                                                    </div>
                                
                                                </div>
                                            </fieldset>
                                        </template>
                                        <div class="float-end p-2">
                                            <button type="button" class="btn btn-success btn-sm mt-2" @click="addQualification"> <i class="bi bi-plus"></i> </button>
                                        </div>
                                    </fieldset>
                                 
                                    <button type="button" class="btn btn-success btn-sm mt-2" @click="staffQualification">Submit</button>
                                </form>
                            </fieldset>
    </div>
</template>

<script setup>
import store from "@/store";
import {  ref,onMounted } from "vue";
// import { useRouter } from 'vue-router';

const q_errors = ref({});
const props = defineProps({
    user_pid: String,
});
const qualification = ref({
    institutions: [{
        institution: '',
        degree: '',
        year: '',
        field: '',
        grade: '',
        address: '',
    }],
    'user_pid': props.user_pid,
});
const addQualification = () => {
    qualification.value.institutions.push({
        'institution': '',
        'degree': '',
        'year': '',
        'field': '',
        'grade': '',
        'address': '',
    })
}
const removeQualification = (i) => {
    let len = qualification.value.institutions.length;
    if (len === 1) {
        store.commit('notify', { message: 'One Qualification is required to proceed ', type: 'warning' })
        return;
    }
    qualification.value.institutions.splice(i, 1);
}
let query = {}
function staffQualification() {
    store.dispatch('postMethod', { url: '/add-qualification', param: qualification.value }).then((data) => {
        if (data.status == 422) {
            q_errors.value = data.data;
        } else if (data.status == 201) {
            q_errors.value = []
            let form = document.querySelector('#qualForm');
            form.reset()
            query = { tab: 'bank-tab', 'id': data?.data?.user_pid }
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
        qualification.value.user_pid = q.id
    }
})
</script>

<style scoped>

</style>
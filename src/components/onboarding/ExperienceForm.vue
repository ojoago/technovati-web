<template>
    <div>
        <fieldset class="border rounded-3 p-2 m-1">
            <legend class="float-none w-auto px-2">Experience</legend>
            <form>
                <fieldset class="border rounded-3">
                    <template v-for="(inst, loop) in work.expirence" :key="loop">
                        <fieldset class="border rounded-3 p-2 m-1">
                            <div class="row">
                                <div class="float-end">
                                    <button type="button" class="btn btn-danger btn-sm" @click="removeQualification(loop)">
                                        <i class="bi bi-patch-minus"></i> </button>
                                </div>
                            </div>
                            <!-- {{ q_errors+'.'+loop }} -->
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="form-label">Company <span class="text-danger">*</span></label>
                                        <input type="text" v-model="inst.company" maxlength="250" class="form-control form-control-sm" placeholder="e.g Optimal Soft Ltd">
                                        <!-- <p class="text-danger " v-if="q_errors?.institutions?.institution">{{ 'q_errors?.institutions?[loop]?.institution[loop]' }}</p> -->
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label">Designation <span class="text-danger">*</span></label>
                                        <input type="text" v-model="inst.designation" maxlength="250"
                                            class="form-control form-control-sm" placeholder="e.g Optimal Soft Ltd">
                                        <!-- <p class="text-danger " v-if="q_errors?.institutions?.institution">{{ 'q_errors?.institutions?[loop]?.institution[loop]' }}</p> -->
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label">Primay Role </label>
                                        <input type="text" v-model="inst.job" maxlength="100"
                                            class="form-control form-control-sm" placeholder="e.g electrical engineering">
                                        <!-- <p class="text-danger " v-if="q_errors?.field">{{ q_errors?.loop?.field[0] }}</p> -->
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label">date Employeed <span class="text-danger">*</span></label>
                                        <input type="date" v-model="inst.from" maxlength="250" class="form-control form-control-sm" placeholder="e.g Optimal Soft Ltd">
                                        <!-- <p class="text-danger " v-if="q_errors?.institutions?.institution">{{ 'q_errors?.institutions?[loop]?.institution[loop]' }}</p> -->
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label">Date Left </label>
                                        <input type="date" v-model="inst.to" maxlength="100"
                                            class="form-control form-control-sm" placeholder="e.g electrical engineering">
                                        <!-- <p class="text-danger " v-if="q_errors?.field">{{ q_errors?.loop?.field[0] }}</p> -->
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </template>
                    <div class="float-end p-2">
                        <button type="button" class="btn btn-success btn-sm mt-2" @click="addQualification"> <i
                                class="bi bi-patch-plus-fill"></i> </button>
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

const props = defineProps({
    user_pid: String,
});
const q_errors = ref({});

const work = ref({
    'expirence': [{
        company : '',
        designation : '' ,
        job: '' ,
        from: '' ,
        to: ''
    }],
    'user_pid': props.user_pid,
});
const addQualification = () => {
    work.value.expirence.push({
        company: '',
        designation: '',
        job: '',
        from: '',
        to: ''
    })
}
const removeQualification = (i) => {
    let len = work.value.expirence.length;
    if (len === 1) {
        store.commit('notify', { message: 'One Experience is required to proceed', type: 'warning' })
        return;
    }
    work.value.expirence.splice(i, 1);
}
let query = {}
function staffQualification() {
    store.commit('setSpinner', true)
    store.dispatch('postMethod', { url: '/add-experience', param: work.value }).then((data) => {
        store.commit('setSpinner', false)
        if (data.status == 422) {
            q_errors.value = data.data;
        } else if (data.status == 201) {
            q_errors.value = []
            work.value = [];
            query = { tab: 'skill-tab', 'id': data?.data?.user_pid }
            localStorage.setItem('TVATI_ONBOARD_TAB', JSON.stringify(query, null, 2))
            switchTab()
        }
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
        alert('weting be this')
    })
}

const emit = defineEmits(['currentTab'])

function switchTab() {
    emit('currentTab')
}
onMounted(() => {
    let q = localStorage.getItem('TVATI_ONBOARD_TAB') ? JSON.parse(localStorage.getItem('TVATI_ONBOARD_TAB')) : 'null'
    if (q != 'null') {
        work.value.user_pid = q.id
    }
})

</script>

<style scoped></style>
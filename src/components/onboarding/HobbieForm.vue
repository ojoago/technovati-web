<template>
    <div>
        <fieldset class="border rounded-3 p-2 m-1">
            <legend class="float-none w-auto px-2">Qualification</legend>
            <form>
                <fieldset class="border rounded-3">
                    <template v-for="(inst, loop) in hobbies.hobby" :key="loop">

                        <fieldset class="border rounded-3 p-2 m-1">
                            <div class="row">
                                <div class="float-end">
                                    <button type="button" class="btn btn-danger btn-sm" @click="removeQualification(loop)">
                                        <i class="bi bi-patch-minus"></i> </button>
                                </div>
                            </div>
                            <!-- {{ q_errors+'.'+loop }} -->
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label">Hobby <span class="text-danger">*</span></label>
                                        <input type="text" v-model="inst.hobby" maxlength="250"
                                            class="form-control form-control-sm" placeholder="e.g swimming">
                                        <!-- <p class="text-danger " v-if="q_errors?.institutions?.institution">{{ 'q_errors?.institutions?[loop]?.institution[loop]' }}</p> -->
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


const q_errors = ref({});

const hobbies = ref({
    'hobby': [{
        hobby:''
    }],
    'user_pid': '',
});
const addQualification = () => {
    hobbies.value.hobby.push({
        hobby: ''
    })
}
const removeQualification = (i) => {
    let len = hobbies.value.hobby.length;
    if (len === 1) {
        store.commit('notify', { message: 'hobbies requires at least one instituion', type: 'warning' })
        return;
    }
    hobbies.value.hobby.splice(i, 1);
}
let query = {}
function staffQualification() {
    store.commit('setSpinner', true)
    store.dispatch('postMethod', { url: '/add-hobbies', param: hobbies.value }).then((data) => {
        store.commit('setSpinner', false)
        if (data.status == 422) {
            q_errors.value = data.data;
        } else if (data.status == 201) {
            q_errors.value = []
            hobbies.value = [];
            // query = { tab: 'bank-tab', 'id': data?.data?.user_pid }
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
        hobbies.value.user_pid = q.id
    }
})

</script>

<style scoped></style>
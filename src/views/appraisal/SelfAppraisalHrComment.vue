<template>
    <div>
        <div class="container mt-2 mb-2">
            <router-link to="/staff-appraisal-list"><button class="btn btn-sm btn-primary text-white mb-1">Appraisal
                    List </button></router-link>
            <div class="card mb-2" v-if="status">

                <fieldset class="border rounded-3 p-2 m-1" v-for="(object,loop) in keys" :key="loop">
                    <legend class="float-none w-auto px-2 h5"> {{object[0].type.name}}</legend>
                    <form id="workForm">
                        <div class="row p-2">
                            <div class="col-md-6">KPI</div>
                            <div class="col-md-3">Staff Rating</div>
                            <div class="col-md-3">Supervisor Rating</div>
                        </div>
                        <fieldset class="border rounded-3 p-2 m-1">
                            <div class="row shadow m-2 rounded-3 px-3" v-for="(key, l) in object" :key="l">
                                <!-- {{ key }} -->
                                <div class="col-md-6">
                                    <p class="question">{{ key.key }}</p>
                                </div>
                                <div class="col-md-3">
                                    <RangeSlider v-model="key.self_rating" disable="true" min="0" :max="key.obtainable"
                                        :score="key.self_rating" />
                                </div>

                                <div class="col-md-3">
                                    <RangeSlider v-model="key.supervisor_rating" :disable="true" min="0"
                                        :max="key.obtainable" :score="key.supervisor_rating" />
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </fieldset>
                <div class="float-end p-4">
                    <textarea v-model="comment.hr_comment" cols="30" placeholder="Hr Comments" rows="5"
                        class="form-control form-controm-sm"></textarea>
                    <p class="text-danger" v-if="errors?.hr_comment">{{ errors?.hr_comment[0] }} </p>

                    <button type="button" class="btn btn-success btn-sm m-4" @click="submitComment">Submit</button>
                </div>
            </div>

        </div>


    </div>
</template>

<script setup>
import store from "@/store";
import { ref,onMounted } from "vue";
import RangeSlider from '@/components/forms/RangeSlider.vue'
const assessment = ref({});
const keys = ref([]);
const status = ref(false);
const summary = ref({})


function loadSelfAssessment(pid) {
    store.dispatch('getMethod', { url: '/load-self-assessment/'+pid }).then((data) => {
        if (data?.status == 200) {
            keys.value = data.data;
            status.value = true
        }
    }).catch(e => {
        console.log(e);
    })
}
const errors = ref({})
function submitComment() {
    errors.value = {}
    comment.value.pid = assessment.value.pid
    store.dispatch('postMethod', { url: '/submit-hr-comment' , param: comment.value }).then((data) => {
        if (data.status == 422) {
            errors.value = data.data
        } else if (data?.status == 201) {
            summary.value = data.data;
        }
    }).catch(e => {
        console.log(e);
    })
}


const comment = ref({
    hr_comment: '' ,
    pid: '' ,
})
onMounted(() => {
      let tsk = localStorage.getItem('TVATI_APPRAISAL') ? JSON.parse(localStorage.getItem('TVATI_APPRAISAL')) : 'null'
         if (tsk != 'null') {
            assessment.value = tsk;
         }
    loadSelfAssessment(assessment.value.pid)
});



</script>

<style scoped>

/* .key_question{
    border-bottom: 2px solid #000 ;
    padding: 3px;
} */


</style>
<template>
    <div>
        <div class="container mt-2 mb-2">
            <div class="card mb-2">
                <fieldset class="border rounded-3 p-2 m-1" v-for="(object,loop) in keys" :key="loop">
                    <legend class="float-none w-auto px-2 h5"> {{object[0].type.name}}</legend>
                    <form id="workForm">
                        <fieldset class="border rounded-3 p-2 m-1">
                            <div class="row shadow m-2 rounded-3 px-3" v-for="(key, l) in object" :key="l">
                                <!-- {{ key }} -->
                                <div class="col-md-9">
                                    <p class="question">{{ key.key }}</p>
                                </div>
                                <div class="col-md-3">
                                    <RangeSlider v-model="key.self_rating" min="0" :max="key.obtainable"
                                        :score="key.self_rating" />
                                </div>
                            </div>

                        </fieldset>

                    </form>
                </fieldset>
                <div class="float-end">
                    <button type="button" class="btn btn-success btn-sm m-4" @click="submitSelfRating">Submit</button>
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
const keys = ref({});

function loadSelfAssessment(pid) {
    store.dispatch('getMethod', { url: '/load-self-assessment/'+pid }).then((data) => {
        if (data?.status == 200) {
            keys.value = data.data;
        }
    }).catch(e => {
        console.log(e);
    })
}
function submitSelfRating() {
    store.dispatch('postMethod', { url: '/submit-self-assessment',param:keys.value }).then((data) => {
        if (data?.status == 201) {
            keys.value = data.data;
        }
    }).catch(e => {
        console.log(e);
    })
}

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
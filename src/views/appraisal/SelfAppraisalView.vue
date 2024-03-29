<template>
    <div>
        <div class="container">
            <div class="card mb-4">
                <fieldset class="border rounded-3 p-2 m-1" v-for="(object,loop) in keys" :key="loop" >
                                <legend class="float-none w-auto px-2 h5"> {{object[0].type.name}}</legend>
                                <form id="workForm">
                                    <fieldset class="border rounded-3 p-2 m-1">
                                        <div class="row" v-for="(key, l) in object" :key="l">
                                            <div class="col-md-9">
                                                <p>{{ key.key }}</p>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="range"  step="0.5" min="0" :max="key.obtainable" value="0" class="slider" id="myRange">
                                                <p>Value: <span id="demo"></span></p>
                                            </div>
                                        </div>
                                        
                                    </fieldset>
                                    
                                </form>
                </fieldset>
                <div class="float-end">
                    <button type="button" class="btn btn-success btn-sm m-4"
                    @click="submitWorkSheet">Submit</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import store from "@/store";
import { ref,onMounted } from "vue";
   
const assessment = ref({});
const keys = ref({});
function loadSelfAssessment(pid) {
    store.dispatch('getMethod', { url: '/load-self-assessment/'+pid }).then((data) => {
        store.commit('setSpinner', false)
        if (data?.status == 200) {
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


// var slider = document.getElementById("myRange");
// var output = document.getElementById("demo");
// // output.innerHTML = slider.value;

// slider.oninput = function() {
//   output.innerHTML = this.value;
// }

// const value = document.querySelector("#myRange");
// const input = document.querySelector("#demo");
// value.textContent = input?.value;
// input.addEventListener("input", (event) => {
//   value.textContent = event.target.value;
// });

</script>

<style scoped>
.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 15px;
  border-radius: 5px;  
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%; 
  background: #dd43d3;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #dd43d3;
  cursor: pointer;
}

</style>
<template>
    <div>
        <div class="container mt-2">
            <div class="card">
                <div class="card-header">Basic Salary</div>
                <div class="card-body">

                    <ul class="nav nav-tabs d-flex" id="myTabjustified" role="tablist">
                        <li class="nav-item flex-fill" role="presentation">
                            <button class="nav-link w-100 active" id="personal-tab" data-bs-toggle="tab"
                                data-bs-target="#view" type="button" role="tab" aria-controls="personal"
                                aria-selected="true">Basic Salaries</button>
                        </li>
                        <li class="nav-item flex-fill" role="presentation">
                            <button class="nav-link w-100" id="next-tab" data-bs-toggle="tab" data-bs-target="#config"
                                type="button" role="tab" aria-controls="next"
                                aria-selected="false">Configuartion</button>
                        </li>

                    </ul>
                    
                    <div class="tab-content pt-2" id="myTabjustifiedContent">
                        <div class="tab-pane fade show active" id="view" role="tabpanel" aria-labelledby="personal-tab">
                            <fieldset class="border rounded-3 p-2 m-1" v-for="(object, loop) in basics" :key="loop">
                                <legend class="float-none w-auto px-2 h5"> {{ object[0].structure.toUpperCase() }}
                                </legend>
                                <fieldset class="border rounded-3 p-3">
                                    <span v-for="(key, l) in object" :key="l" class="badge bg-dark p-2 m-1 ellipsis">
                                        Step {{ key.step }} : {{ key.amount }}
                                    </span>

                                </fieldset>
                            </fieldset>

                        </div>

                        <div class="tab-pane fade" id="config" role="tabpanel" aria-labelledby="salary-tab">

                            <SalaryConfig />
                    </div>

                </div>




            </div>
        </div>
    </div>
    </div>
</template>

<script setup>
import store from "@/store";
import { ref } from "vue";
import SalaryConfig from '@/components/forms/BasicSalaryConfigComponent.vue'

const basics = ref({})
function loadGrades() {
    store.dispatch('getMethod', { url: '/load-basic-salary' }).then((data) => {
        if (data?.status == 200) {
            basics.value = data.data;
        }
    }).catch(e => {
        console.log(e);
    })
}

loadGrades()
</script>

<style scoped></style>
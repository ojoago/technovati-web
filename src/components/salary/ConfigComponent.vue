<template>
    <div>
        <form id="unitForm">
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label class="form-label">Tax %</label>
                        <input v-model="config.tax" type="number" step="0.5" class="form-control form-control-sm">
                        <p class="text-danger " v-if="errors?.tax">{{ errors?.tax[0] }} </p>
                    </div>
                </div>

                <!-- <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Company Contribution %</label>
                        <input v-model="config.company" type="number" step="0.5" class="form-control form-control-sm">

                        <p class="text-danger " v-if="errors?.company">{{ errors?.company[0] }}
                        </p>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Personal Contribution %</label>
                        <input v-model="config.staff" type="number" step="0.5" placeholder="e.g 3000.5"
                            class="form-control form-control-sm">
                        <p class="text-danger " v-if="errors?.staff">{{ errors?.staff[0] }} </p>
                    </div>
                </div> -->


            </div>
            <button type="button" class="btn btn-success btn-sm mt-2" @click="updatePension">Update</button>
        </form>
    </div>
</template>

<script setup>
    import store from "@/store";
import { ref } from "vue";

const errors = ref({})
    
    const config = ref({
        tax:0,
        company:0,
        staff:0
    })
    const updatePension = ()=>{
        errors.value = []
        store.dispatch('postMethod', { url: '/update-deduction-percent', param: config.value }).then((data) => {
            if (data?.status == 422) {
                errors.value = data.data
            }
        }).catch(e => {
            console.log(e);
        })
    }

function load() {
    store.dispatch('getMethod', { url: '/load-deduction-percent' }).then((data) => {
        if (data?.status == 200) {
            config.value = data.data;
        }
    }).catch(e => {
        console.log(e);
    })
}

load()
    // 
</script>

<style scoped>

</style>
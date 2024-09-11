<template>
    <div>
         <form id="uForm">
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label class="form-label">Name</label>
                        <input type="text" v-model="unit.name" class="form-control" placeholder="e.g meter">
                        <p class="text-danger " v-if="errors?.name">{{ errors?.name[0] }}</p>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="form-group">
                        <label class="form-label">Description</label>
                        <textarea type="text" v-model="unit.description" class="form-control" placeholder="e.g this is "></textarea>
                        <p class="text-danger " v-if="errors?.description">{{ errors?.description[0] }}</p>
                    </div>
                </div>
            </div>
            <button type="button" class="btn btn-success btn-sm mt-2" @click="addItemUnit">Submit</button>
        </form>
    </div>
</template>

<script setup>

import store from "@/store";
import { ref } from "vue";
const errors = ref({});

const unit = ref({
    name: '',
    description: '',
});

const resetAttr = ()=>{
    unit.value = {
        name: '',
        description: '',
    }
}

function addItemUnit() {
    errors.value = []
    store.dispatch('postMethod', { url: '/create-item-unit', param: unit.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data
        } else if (data?.status == 201) {
            resetAttr()
        }
    })
}


</script>

<style scoped>

</style>
<template>
    <div>
        <form id="rForm">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label">Name</label>
                        <input type="text" v-model="raw.name" class="form-control" placeholder="e.g box">
                        <p class="text-danger " v-if="errors?.name">{{ errors?.name[0] }}</p>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label">model</label>
                        <input type="text" v-model="raw.model" class="form-control" placeholder="e.g 20121212">
                        <p class="text-danger " v-if="errors?.model">{{ errors?.model[0] }}</p>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="form-group">
                        <label class="form-label">description</label>
                        <textarea type="text" v-model="raw.description" class="form-control" placeholder="e.g this is from japan"></textarea>
                        <p class="text-danger " v-if="errors?.description">{{ errors?.description[0] }}</p>
                    </div>
                </div>
                
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="form-label">Unit</label>
                            <Select2 v-model="raw.unit" :options="units" :settings="{ width: '100%' }"  />
                            <p class="text-danger " v-if="errors?.unit">{{ errors?.unit[0] }}</p>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="form-label">manufacturer</label>
                            <Select2 v-model="raw.manufacturer" :options="suppliers" :settings="{ width: '100%' }"  />
                            <p class="text-danger " v-if="errors?.manufacturer">{{ errors?.manufacturer[0] }}</p>
                        </div>
                    </div>
            </div>
            <button type="button" class="btn btn-success btn-sm mt-2" @click="addMaterial">Submit</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Select2 from 'vue3-select2-component';
import store from "@/store";


const raw = ref({
    name: '',
    model: '',
    description: '',
    unit: '',
    manufacturer: '',
});

const resetAttr = () => {
    raw.value = {
        name: '',
        model: '',
        description: '',
        unit: '',
        manufacturer: '',
    }
}

const errors = ref({})
function addMaterial() {
    errors.value = []
    store.dispatch('postMethod', { url: '/create-material', param: raw.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data
        } else if (data?.status == 201) {
            resetAttr()
        }
    })
}




const suppliers = ref({});

function dropdownSupplier() {
    store.dispatch('loadDropdown', 'suppliers').then(({ data }) => {
        suppliers.value = data;
    })
}
dropdownSupplier()

const units = ref({});

function dropdownUnits() {
    store.dispatch('loadDropdown', 'units').then(({ data }) => {
        units.value = data;
    })
}
dropdownUnits()
</script>

<style scoped>

</style>
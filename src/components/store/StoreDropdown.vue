<template>
    <div>
        <select class="form-control" @input="$emit('update:modelValue', $event.target.value)" >
            <option value="" selected>Make Selection</option>
            <template v-for="sec in stores" :key="sec.id">
                <option v-if="stores.length == 1" selected :value="sec.id">{{ sec.text }}
                </option>
                <option v-else :value="sec.id">{{ sec.text }} </option>
            </template>
        </select>
    </div>
</template>

<script setup>
import store from "@/store";
import { ref } from "vue";
// import { defineProps, defineEmits } from "vue";

const stores = ref({})
function dropdownSection() {
    store.dispatch('loadDropdown', 'stores').then(({ data }) => {
        stores.value = data;
    }).catch(e => {
        console.log(e);
    })
}
dropdownSection()
</script>

<style scoped>

</style>
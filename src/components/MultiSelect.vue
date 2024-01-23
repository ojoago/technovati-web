<template>
    <div>
        <li class="page-item" @click="$emit('next', link)"><span class="page-link" href="#" :disabled="!link.url"
                v-html="link.label"></span></li>
        <Multiselect
            v-model="unit.employees"
            :options="options"
            :multiple="true"
            :close-on-select="true"
            placeholder="Select Option"
            label="text"
            track-by="id"
            />
    </div>
</template>

<script setup>
import { Multiselect } from 'vue-multiselect';

import { defineProps, defineEmits } from "vue";
defineProps({
    options: Object,
});
defineEmits(['next'])

</script>

<style scoped></style>
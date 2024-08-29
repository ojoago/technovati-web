<template>
    <div>
        <li  class="page-item" @click="$emit('next',link)" ><span class="page-link pointer" href="#" :disabled="!link.url" v-html="link.label"></span></li>
    </div>
</template>

<script setup>
    import { defineProps, defineEmits } from "vue";
    defineProps({
        link: Object,
    });
    defineEmits(['next'])

</script>

<style scoped>

</style>
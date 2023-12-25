<template>
    <div>
        <div class="flex justify-center mt-4">
            <nav class="relative justify-center rounded-md shadow pagination">
                <li v-for="(link, i) of links" :key="i" class="page-item" @click="$emit('next',link)" ><span class="page-link" href="#" :disabled="!link.url" v-html="link.label"></span></li>
            </nav>
        </div>
    </div>
</template>

<script setup>
    import { defineProps, defineEmits } from "vue";
    defineProps({
        links: Object,
    });
    defineEmits(['next'])

</script>

<style scoped>

</style>
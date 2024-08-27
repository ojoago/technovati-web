<template>
    <div class="form-group">
        <label class="form-label">Purpose <span class="text-danger">*</span></label>
        <input type="text" v-model="expense.expense" class="form-control form-control-sm"
            placeholder="e.g feeding">
        <p class="text-danger " v-if="ex_errors?.expense">{{ ex_errors?.expense[0] }}</p>
    </div>
</template>

<script setup>



defineProps({
    isOpen: Boolean,
    title: String,
    subtitle: String,
    // icon: String,
    modalClass: {
        type: String,
        default: 'modal-sm'
    },
    buttonText: {
        type: String,
        default: 'Submit'
    },
});

</script>

<style  scoped>

</style>
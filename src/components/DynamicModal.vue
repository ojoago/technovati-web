<script setup>
import { defineProps, defineEmits, ref } from "vue";
import { onClickOutside } from '@vueuse/core'

defineProps({
    isOpen: Boolean,
    title: String,
    subtitle: String,
    icon: String,
    modal: {
        type: String,
        default: 'modal-medium'
    },
    buttonText: {
        type: String,
        default: 'Submit'
    },
});

const emit = defineEmits(["modal-close",'submit']);

const target = ref(null)
onClickOutside(target, () => emit('modal-close'))

</script>

<template>
    <div v-if="isOpen" class="modal-mask">

        <div class="modal-wrapper">
            <div :class="modal" ref="target">
                <div class="modal-header bg-light">
                    <slot name="header"> default header </slot>
                </div>
                <div class="modal-body">
                    <slot name="content"> default content </slot>
                </div>
                <div class="modal-footer">
                    <slot name="footer">
                        <div>
                            <button class="btn btn-sm btn-success m-1" @click="$emit('submit')">{{buttonText}}</button>
                            <button class="btn btn-sm btn-secondary m-1" @click.stop="emit('modal-close')">Close</button>
                        </div>
                    </slot>
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-medium {
    width: 500px;
    margin: 150px auto;
    padding: 20px 20px 0 20px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}
.modal-small {
    width: 300px;
    margin: 150px auto;
    padding: 20px 20px 0 20px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}

.modal-footer {
    border-top: 1px solid #000;
    padding-top: 3px;
}

/* Responsive Styles */
@media only screen and (max-width: 600px) {
    .container {
        max-width: 90%;
    }
}
</style>
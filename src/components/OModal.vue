<template>
    <div>
        <Teleport to="body">
            <Transition enter-active-class="transition ease-out duration-2000 transform" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition ease-in duration-2000 transform" leave-from-class="opacity-100" leave-to-class="opacity-0">
                <div v-if="isOpen">
                    <div class="modal-base">
                        <div class="modal-content">
                            <div class="inner-content">
                                <Transition name="slide-fade">
                                    <div class="main-content" v-if="true" :class="modalClass" ref="target">
                                         <div class="modal-header bg-light shadow">
                                                <slot name="header">
                                                    <div >
                                                        <span class="h6">{{ title }}</span>
                                                        <p class="flex-col">{{ subtitle }}</p>
                                                    </div> 
                                                </slot>
                                                <div class="icon pointer bg-secondary text-white"  @click.stop="emit('modal-close')"> X </div>
                                            </div>
                                            <div class="modal-body">
                                                <div class="card m-2">
                                                    <div class="card-body">
                                                        <slot name="content"> </slot>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal-footer bg-light">
                                                <slot name="footer">
                                                    <div>
                                                        <button class="btn btn-sm btn-success m-1" @click="$emit('submit')">{{ buttonText }}</button>
                                                        <button class="btn btn-sm btn-secondary m-1" @click.stop="emit('modal-close')">Close</button>
                                                    </div>
                                                </slot>
                                            </div>
                                    </div>
                                </Transition>
                            </div>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>    
</template>

<script setup>
import { defineProps, defineEmits, ref } from "vue";
import { onClickOutside } from '@vueuse/core'

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

const emit = defineEmits(["modal-close", 'submit']);

const target = ref(null)
onClickOutside(target, () => emit('modal-close'))

</script>

<style scoped>
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}
body.modal-base {
    overflow: hidden;
}
.modal-base {
    position: fixed;
    height: 100vh;
    width: 100vw;
    top: 0;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.5);
}
.modal-content{
    position: absolute;
    top: 0;
}

.inner-content{
    display: grid;
    place-items: center;
    width: 100vw;
    height: 100vh;
}

.main-content {
    max-height: 90%;
    z-index: 9999;
    /* overflow-y: scroll; */
    /* position: relative; */
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    border-radius: 10px !important;
}

.main-content {
    scrollbar-width: thin;
}

.main-content::-webkit-scrollbar {
    width: 8px !important;
}


.modal-lg {
    width: 55% !important;
}

.modal-md {
    width: 45% !important;
}

.modal-sm {
    width: 35% !important;
}

.modal-xs {
    width: 25% !important;
}

.modal-xl {
    width: 70% !important;
    margin: 10px 50px;
}
.modal-xxl {
    width: 100% !important;
    margin: 10px 50px;
}

.header{
    text-align: center;
    margin-top: 10px;
}

.modal-header{
    border-bottom: 1px solid #252729;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 5px 20px;
    background: #f0f4f7 !important;
    text-align: center;

    /* padding-bottom: 10px; */
}
.icon {
    font-size: 16px;
    border: 1px solid #e2e8f0;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    text-align: center;
    font-size: 12px;
    padding-top: 2px;
}
.icon:hover,.btn-secondary:hover{
    background-color: brown !important;
}
.modal-body{
    overflow-y: scroll;
    position: relative;
    max-height: 400px;
    padding: 5px 20px;
    justify-content: center;
}

.modal-body {
    scrollbar-width: thin;
}

.modal-body::-webkit-scrollbar {
    width: 5px !important;
}


.modal-footer{
    border-top: 1px solid #252729;
    padding: 5px 25px;
}

@media only screen and (max-width: 600px) {
    
.modal-xl {
    width: 90% !important;
}
.modal-lg {
    width: 90% !important;
}

.modal-md {
    width: 90% !important;
}

.modal-sm {
    width: 90% !important;
}

.modal-xs {
    width: 90% !important;
}
}

</style>
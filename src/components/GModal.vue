<template>
    <div>
        <teleport to="body">
            <Transition enter-active-class="transition ease-out duration-2000 transform" enter-from-class="opacity-0"
                enter-to-class="opacity-100" leave-active-class="transition ease-in duration-2000 transform"
                leave-from-class="opacity-100" leave-to-class="opacity-0">
                <div v-if="true">
                    <div class="modal-base" >
                    <div class="modal-container">
                        <div class="inner-container">
                            <Transition name="slide-fade">
                                <div class="modal-card" :class="w" v-if="true">
                                    <div class="modal-header">
                                        <div class="header-info">
                                            <div v-if="icon" class="icon">  <i :class="icon"></i> </div>
                                            <slot name="header">
                                                <h4 class="font-bold">{{ title }}</h4>
                                                <p class="flex-col">{{ subtitle }}</p>
                                            </slot>
                                        </div>
                                        <div @class="close">
                                            <span click="close">X</span>
                                        </div>
                                    </div>
                                    <div class="modal-body">
                                        <slot name="content"></slot>
                                    </div>
                                    <div class="modal-footer">
                                        <slot name="footer">
                                            <div>
                                                <button class="btn btn-sm btn-success m-1" @click="submit">Submit</button>
                                                <button class="btn btn-sm btn-secondary m-1" @click.stop="emit('modal-close')">Cancel</button>
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
        </teleport>
    </div>
</template>

<script setup>
import { defineEmits,ref } from "vue";
import { onClickOutside } from '@vueuse/core'
const emit = defineEmits(["modal-close", 'submit']);

const target = ref(null)
onClickOutside(target, () => emit('modal-close'))
 defineProps({
    title: String,
    subtitle: String,
    w: String,
    icon: String,
});
// const emit = defineEmits(["close"]);
const close = () => emit("close");
</script>

<style scoped>
.modal-base {
    height: 100vh;
    width: 100vw;
    background-color: #f7f8f9;
    opacity: 0.5;
    position: fixed;
    top: 0;
    z-index: 200;
}

.modal-container {
    position: absolute;
    top: 0;
}

.inner-container {
    display: grid;
    place-items: center;
    width: 100vw;
    height: 100vh;
}

.modal-card {
    /* / width: 40%;/  */
    max-height: 90%;
    background-color: #fff;
    border-radius: 10px;
    /* / padding: 10px;/  */
    box-shadow: 0px 198px 119px rgba(0, 0, 0, 0.05);
    z-index: 9999;
    overflow-y: scroll;
    position: relative;
}

.modal-card {
    scrollbar-width: thin;
}

.modal-card::-webkit-scrollbar {
    width: 8px !important;
}

/* .modal_card_mobile {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 10px;
    padding: 10px;
    /* / box-shadow: 0px 198px 119px rgba(0, 0, 0, 0.05);/ z-index: 400; */
/* } */ *

.modal-60 {
    width: 60% !important;
}

.modal-50 {
    width: 50% !important;
}

.modal-40 {
    width: 40% !important;
}

.modal-30 {
    width: 30% !important;
}

.modal-100 {
    width: 100% !important;
}

.close {
    font-size: 16px;
    border: 1px solid #e2e8f0;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    text-align: center;
    font-size: 12px;
    padding-top: 2px;
}

.close-mobile {
    text-align: left;
    font-size: 18px;
    justify-self: flex-start;
    padding-right: 40px;
    padding-bottom: 10px;
}

.close,
.close-mobile>span {
    cursor: pointer;
}

.close span:hover {
    color: red;
}

.modal_header_mobile {
    display: flex;
    align-items: center;
}

.modal-header {
    display: flex;
    /* / flex-direction: row-reverse;/ align-items: center; */
    justify-content: space-between;
    padding: 24px;
    padding-bottom: 10px;
}

.header-info>h1 {
    font-size: 19px;
    font-weight: 600;
    text-align: center;
    padding-top: 5px;
    /* / padding-left: 15px;/ */
}

.header-info {
    display: flex;
    align-items: center;
    justify-content: center;
}

.icon {
    color: #fff;
    background-color: #22c45e;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 1px solid #22c45e;
    font-size: 25px;
    display: grid;
    place-items: center;
    padding: 2px;
    margin-right: 15px;
}

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
</style>

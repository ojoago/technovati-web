<template>
    <div>
        <teleport to="body">
            <Transition enter-active-class="transition ease-out duration-2000 transform" enter-from-class="opacity-0"
                enter-to-class="opacity-100" leave-active-class="transition ease-in duration-2000 transform"
                leave-from-class="opacity-100" leave-to-class="opacity-0">
                <div>
                    <div class="modal_background" @click="close"></div>
                    <div class="modal_container ">
                        <div class="inner_container">
                            <Transition name="slide-fade">
                                <div v-if="1 == 3" class="modal_card_mobile">
                                    <div class="modal_header modal_header_mobile">
                                        <div class="close_mobile">
                                            <span @click="close"><i icon="fa-solid fa-arrow-left"></i></span>
                                        </div>
                                        <h1>{{ title }}</h1>
                                        <p>{{ subtitle }}</p>
                                    </div>
                                    <hr v-if="!row" />
                                    <div class="modal_body">
                                        <slot></slot>
                                    </div>
                                </div>
                                <div class="modal_card" :class="w" v-else>
                                    <div class="modal_header">
                                        <div class="header_info">
                                            <div v-if="icon" class="modal_icon">
                                                <i :class="icon"></i>
                                            </div>
                                            <div>
                                                <h1 class="font-bold">{{ title }}</h1>
                                                <p class="flex-col">{{ subtitle }}</p>
                                            </div>
                                        </div>
                                        <div class="close">
                                            <span @click="close">X</span>
                                        </div>
                                    </div>
                                    <div class="modal_body">
                                        <slot></slot>
                                    </div>
                                    <!-- <div class="modal_footer">
                                    <button @click="submit">Submit</button>
                                    <button @click="close">Cancel</button>
                                </div> -->
                                </div>
                            </Transition>
                        </div>
                    </div>
                </div>
            </Transition>
        </teleport>
    </div>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";
defineProps({
    title: String,
    subtitle: String,
    w: String,
    icon: String,
});
const emit = defineEmits(["close"]);
const close = () => emit("close");
</script>

<style scoped>
.modal_background {
    height: 100vh;
    width: 100vw;
    background-color: #f7f8f9;
    opacity: 0.5;
    position: fixed;
    top: 0;
    z-index: 200;
}

.modal_container {
    position: absolute;
    top: 0;
}

.inner_container {
    display: grid;
    place-items: center;
    width: 100vw;
    height: 100vh;
}

.modal_card {
    /* / width: 40%;/ max-height: 90%; */
    background-color: #fff;
    border-radius: 10px;
    /* / padding: 10px;/ box-shadow: 0px 198px 119px rgba(0, 0, 0, 0.05); */
    z-index: 9999;
    overflow-y: scroll;
    position: relative;
}

.modal-card {
    scrollbar-width: thin;
}

.modal_card::-webkit-scrollbar {
    width: 8px !important;
}

.modal_card_mobile {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 10px;
    padding: 10px;
    /* / box-shadow: 0px 198px 119px rgba(0, 0, 0, 0.05);/ z-index: 400; */
}

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

.close_mobile {
    text-align: left;
    font-size: 18px;
    justify-self: flex-start;
    padding-right: 40px;
    padding-bottom: 10px;
}

.close,
.close_mobile>span {
    cursor: pointer;
}

.close span:hover {
    color: red;
}

.modal_header_mobile {
    display: flex;
    align-items: center;
}

.modal_header {
    display: flex;
    /* / flex-direction: row-reverse;/ align-items: center; */
    justify-content: space-between;
    padding: 24px;
    padding-bottom: 10px;
}

.header_info>h1 {
    font-size: 19px;
    font-weight: 600;
    text-align: center;
    padding-top: 5px;
    /* / padding-left: 15px;/ */
}

.header_info {
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal_icon {
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
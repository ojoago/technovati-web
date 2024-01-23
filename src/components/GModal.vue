<!-- Modal.vue -->
<template>
    <div v-if="false" class="modal-overlay">
        <div class="modal">
            <span class="close" @click="closeModal">&times;</span>
            <!-- Modal content goes here -->
            123456
            <div>123456789876543</div>
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
// import { ref } from 'vue';

// const showModal = ref(false)
// const openModal = () => {
//     showModal.value = true;
// }
// export default {
//     data() {
//         return {
//             showModal: false,
//         };
//     },
//     methods: {
//         openModal() {
//             this.showModal = true;
//         },
//         closeModal() {
//             this.showModal = false;
//         },
//     },
// };


</script>

<style scoped>
/* Add your modal styling here */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    background: white;
    padding: 20px;
    max-width: 80%;
    max-height: 80%;
    overflow-y: auto;
    border-radius: 5px;
    position: relative;
}

.close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 20px;
}
</style>

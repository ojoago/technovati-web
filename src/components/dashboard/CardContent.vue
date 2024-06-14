<template>
    <div>
        <div class="cad">
            <div class="item-card">
                <div class="name">{{ title }}</div>
                <div class="amount">₦ {{ amount }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
    
defineProps({
    data: Object,
    title: String,
    amount: {
        type: Number,
        default: 0
    },
});
</script>

<style scoped>

.cad{
    display: block;
}
.item-card{
    display: flex;
    justify-content: space-between;
}


</style>
<template>
    <div>
        <div class="range">
            <span class="small">Min:{{ min }}</span>
            <span class="small">Max:{{ max}}</span>
        </div>
        <input @input="$emit('update:modelValue', $event.target.value)" v-bind:disabled="disable" type="range"
            step="0.5" :min="min" :max="max" :value="score" class="slider" :class="slider">
        <p>Score: {{ score }}</p>

    </div>
</template>

<script setup>
import { defineProps,  } from "vue";

defineProps({
    slider:{
        type:String, 
        default:'slider'
    } , 
    score: {
        type: Number,
        default: 0
    },
    min: {
        type: Number,
        default: 0
    },
    max: {
        type: Number,
        default: 0
    },
    disable:{
        type:Boolean,
        default:false
    }
   
});



</script>

<style scoped>



.range{
    display: flex;
    justify-content: space-between;
}

.slider,.success,danger {
    -webkit-appearance: none;
    width: 100%;
    height: 15px;
    border-radius: 5px;
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
}

.slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #272346;
    cursor: pointer;
}

.slider::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #272346;
    cursor: pointer;
}

.success::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: green;
    cursor: pointer;
}

.success::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: green;
    cursor: pointer;
}

.danger::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #272346;
    cursor: pointer;
}

.danger::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #272346;
    cursor: pointer;
}


</style>
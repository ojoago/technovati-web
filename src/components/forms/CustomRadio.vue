<template>
    <div>

        <div class="switch-field">
            <!-- option one  -->
            <div v-if="checked==1">
                <input @input="$emit('update:modelValue', $event.target.value)" type="radio" :id="`radio${name}`"
                    :name="`switch${name}`" :value="value1" checked  />
                <label for="radio-one">{{ label1 }}</label>
            </div>
            <div v-else>
                <input @input="$emit('update:modelValue', $event.target.value)" type="radio" :id="`radio${name}`"
                    :name="`switch${name}`" :value="value1"  />
                <label for="radio-one">{{ label1 }}</label>
            </div>
            <!-- option 1 end here  -->

            <!-- option 2  -->
            <div v-if="checked==0">
                <input @input="$emit('update:modelValue', $event.target.value)" type="radio" :id="`radio${name}`"
                    :name="`switch${name}`" :value="value2" checked  />
                <label for="radio-two">{{ label2 }}</label>
            </div>
            <div v-else>
                <input @input="$emit('update:modelValue', $event.target.value)" type="radio" :id="`radio${name}`"
                    :name="`switch${name}`" :value="value2"  />
                <label for="radio-two">{{ label2 }}</label>
            </div>
            <!-- option 2 end here  -->

        </div>
        <!-- <div class="switch-field">
            <input v-model="entry.debit_amount" type="radio" id="radio-one" name="switch-one" value="cr" checked />
            <label for="radio-one">Credit</label>
            <input v-model="entry.debit_amount" type="radio" id="radio-two" name="switch-one" value="dr" />
            <label for="radio-two">Debit</label>
        </div> -->

    </div>
</template>

<script setup>
import { defineProps, } from "vue";

defineProps({
    name: {
        type: String,
        default: '1'
    },
    value1: {
        type: String,
        default: '1'
    },
    value2: {
        type: String,
        default: '0'
    },
    label1: {
        type: String,
        default: 'On'
    },
    
    label2: {
        type: String,
        default: 'Off'
    },
    
    checked: {
        type: Number,
        default: 1
    }

});



</script>

<style scoped>
.switch-field {
    display: flex;
    /* margin-bottom: 36px; */
    overflow: hidden;
}

.switch-field input {
    position: absolute !important;
    clip: rect(0, 0, 0, 0);
    height: 1px;
    width: 1px;
    border: 0;
    overflow: hidden;
}


.switch-field label {
    background-color: #e4e4e4;
    color: rgba(0, 0, 0, 0.6);
    font-size: 14px;
    line-height: 1;
    text-align: center;
    padding: 8px 16px;
    margin-right: -1px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px rgba(255, 255, 255, 0.1);
    transition: all 0.1s ease-in-out;
}

.switch-field label:hover {
    cursor: pointer;
}

.switch-field input:checked+label {
    background-color: #a5dc86;
    box-shadow: none;
}

.switch-field label:first-of-type {
    border-radius: 4px 0 0 4px;
}

.switch-field label:last-of-type {
    border-radius: 0 4px 4px 0;
}

</style>
<template>
    <div class="switch-field">
        <label v-if="checked==1">
            <input @input="$emit('update:modelValue', $event.target.value)" type="radio" :id="`radio${name}`"
                    :name="`switch${name}`" :value="value1" checked  />
                    {{ label1 }}
        </label>
        <label v-else>
            <input @input="$emit('update:modelValue', $event.target.value)" type="radio" :id="`radio${name}`"
                    :name="`switch${name}`" :value="value1"  />
                    {{ label1 }}
        </label>

        <label v-if="checked==0">
            <input @input="$emit('update:modelValue', $event.target.value)" type="radio" :id="`radio${name}`"
                    :name="`switch${name}`" :value="value2" checked  />{{ label2 }}
        </label>
        <label v-else>
            <input @input="$emit('update:modelValue', $event.target.value)" type="radio" :id="`radio${name}`"
                    :name="`switch${name}`" :value="value2"  />{{ label2 }}
        </label>
    </div>
</template>

<script setup>
import { defineProps } from "vue";

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
    },

    // readonly: {
    //     type: Boolean,
    //     default: false
    // }

});

</script>

<style  scoped>

* {margin: 0; box-sizing: border-box;}
body { font: 16px/1 sans-serif;}

.switch-field {
    display: flex;
    /* margin-bottom: 36px; */
    overflow: hidden;
}

label:has([type=radio]) {
  /* display: inline-flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid #aaa;
  padding: .5rem;
  border-radius: 3rem;
  transition: background-color 0.3s; */

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

label:has([type=radio]:not(:disabled)) {
  cursor: pointer;
}

[type=radio] {
  appearance: none;
  width: .2rem;
  height: .2rem;
  flex: 0 0 auto;
  border: inherit;
  border-radius: inherit;
}

label:has([type=radio]:checked) {
  border-color: #14bf8b;
  background-color: #14bf8b;
  color: #fff;
}

[type=radio]:checked {
  border-color: transparent;
    background-color: #a5dc86;

}
</style>
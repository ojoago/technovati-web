<template>
  <router-view></router-view>
  <spinner-loader></spinner-loader>
  <!-- <VueSlider /> -->
</template>

<script setup>
import SpinnerLoader from './components/SpinnerLoader.vue'

// import { Tooltip } from 'bootstrap/dist/js/bootstrap.esm.min.js'
// import { Tooltip } from "bootstrap";

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Select2 from 'vue3-select2-component';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import 'bootstrap-icons/font/bootstrap-icons.css'
import './theme/core.css';

// import { Tooltip } from "bootstrap";
createApp(App).use(router).use(store).use(Select2).mount('#app')
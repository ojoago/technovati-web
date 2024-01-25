<template>
    <div>
        <side-bar></side-bar> 
        <section class="page-section">
            <auth-header @logout="logout()"></auth-header>
            <div id="main">
                <router-view></router-view>
            </div>
        </section>
    </div>
</template>

<script setup>
import router from "@/router";
import store from "@/store";
import { onMounted } from "vue";
import AuthHeader from "./AuthHeader.vue";
import SideBar from "./SideBar.vue";

onMounted(() => {
    
    let arrow = document.querySelectorAll(".arrow");
    for (let i = 0; i < arrow.length; i++) {
        arrow[i].addEventListener("click", (e) => {
            // console.log(e);
            let arrowParent = e.target.parentElement.parentElement;
            // console.log(arrowParent);
            arrowParent.classList.toggle("showMenu");
        })
        // const element = array[i];
    }
    let sidebar = document.querySelector('.sidebar')
    let sidebarBtn = document.querySelector('.toggleMenu')
    // console.log(sidebarBtn);
    sidebarBtn.addEventListener('click', () => {
        sidebar.classList.toggle('close')
    })
   
})


function logout() {
    store.commit('setSpinner', true)
    store.dispatch('logout').then(() => {
        store.commit('setSpinner', false)
        router.push({ name: 'SignIn' })
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e.response);
        alert('weting be this')
    })
}

</script>

<style scoped>

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: sans-serif;
}
</style>
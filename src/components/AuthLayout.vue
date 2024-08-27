<template>
    <div>
        <auth-header @logout="logout()"></auth-header>
        <side-bar></side-bar> 
        <section class="page-section">
            <div id="main">
                <router-view></router-view>
            </div>
            <!-- this is footer -->
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
    
    // let arrow = document.querySelectorAll(".arrow");
    // for (let i = 0; i < arrow.length; i++) {
    //     arrow[i].addEventListener("click", (e) => {
    //         // console.log(e);
    //         let arrowParent = e.target.parentElement.parentElement;
    //         // console.log(arrowParent);
    //         arrowParent.classList.toggle("showMenu");
    //     })
    //     // const element = array[i];
    // }
    let sidebar = document.querySelector('#sidebar')
    let sidebarBtn = document.querySelector('.toggleMenu')
    // console.log(sidebarBtn);
    sidebarBtn.addEventListener('click', () => {
        sidebar.classList.toggle('close')
    })
   
})


function logout() {
    store.dispatch('logout').then(() => {
        router.push({ name: 'SignIn' })
    }).catch(e => {
        console.log(e.response);
        localStorage.clear()
        router.push({ name: 'SignIn' })
    })

}

// author log out 

var TIMEOUT_PERIOD = 1200000; // log user out after 20 minutes of in activity
var logoutTimer;

// Function to reset the logout timer
function resetIdleTimer() {
    // Clear the existing timer
    clearTimeout(logoutTimer);
    // Set a new timer
    logoutTimer = setTimeout(logout, TIMEOUT_PERIOD);
}
// Event listeners for user activity
window.onload = resetIdleTimer;
document.onmousemove = resetIdleTimer;
document.onkeydown = resetIdleTimer;
document.onclick = resetIdleTimer;
document.onscroll = resetIdleTimer;


</script>

<style scoped>

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: sans-serif;
}
</style>
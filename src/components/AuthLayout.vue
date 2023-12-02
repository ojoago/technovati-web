<template>
    <div>
       
         <!-- ======= Header ======= -->
         <header id="header" class="header fixed-top d-flex align-items-center">

             <div class="d-flex align-items-center justify-content-between">
            
                 <a href="#" class="logo">
                
                     <span class="d-none d-lg-block ellipsis-text nav-brand" id="storeName">Technovati</span>
                 </a>
                 <!-- <i class="bi bi-list toggle-sidebar-btn"></i> -->
            
             </div><!-- End Logo -->

             <nav class="header-nav ms-auto">
                 <ul class="d-flex align-items-center">
                       <!-- <span class="d-none d-lg-block ellipsis-text" id="storeName">{{ storeName }}</span> -->
  
                     <!-- <li class="nav-item d-block d-lg-none">
                     <a class="nav-link nav-icon search-bar-toggle " href="#">
                         <i class="bi bi-search"></i>
                     </a>
                 </li> -->

                     <li class="nav-item dropdown">
                         <a class="nav-link nav-icon pointer" id="loadNotifications" data-bs-toggle="dropdown">
                             <i class="bi bi-bell"></i>
                             <span class="badge bg-primary badge-number" id="badge-number">0</span>
                         </a>
                         <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications" id="notifications">
                         </ul>
                     </li>


                     <li class="nav-item dropdown pe-3">

                         <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                             <span class="d-none d-md-block dropdown-toggle ps-2">{{ username }}</span>
                         </a><!-- End Profile Iamge Icon -->

                         <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                             <li class="dropdown-header">
                                 <h6 class="ellipsis-text">getAuthFullname()</h6>
                                 <!-- <span>Web Designer</span> -->
                             </li>
                             <li>
                                 <hr class="dropdown-divider">
                             </li>
                             <li>
                                 <a class="dropdown-item d-flex align-items-center pointer" data-bs-toggle="modal" data-bs-target="#updatePwd">
                                     <i class="bi bi-lock-fill"></i>
                                     <span>Update Password</span>
                                 </a>
                             </li>
                             <li>
                                 <a class="dropdown-item d-flex align-items-center pointer" id="updateAccount">
                                     <i class="bi bi-file-earmark-person-fill"></i>
                                     <span>Update Account</span>
                                 </a>
                             </li>
                             <!-- <li>
                             <a class="dropdown-item d-flex align-items-center" href="users-profile.html">
                                 <i class="bi bi-gear"></i>
                                 <span>Account Settings</span>
                             </a>
                         </li> -->
                             <li>
                                 <hr class="dropdown-divider">
                             </li>

                             <li>
                                 <a class="dropdown-item d-flex align-items-center bg-danger pointer" @click="logout">
                                     <i class="bi bi-box-arrow-right"></i><span>Logout</span>
                                 </a>
                             </li>

                         </ul><!-- End Profile Dropdown Items -->
                     </li><!-- End Profile Nav -->

                 </ul>
             </nav><!-- End Icons Navigation -->
         </header><!-- End Header -->
        <!-- ======= Sidebar ======= -->
          <SideBar/>
        <main class="main" id="main">
            <router-view></router-view>
        </main>
    </div>
</template>

<script setup>
import router from "@/router";
import store from "@/store";
import SideBar from "./SideBar.vue";

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

body {
    margin: 0;
    padding: 0;
}

oml-bg-danger {
    background: #c74c3c !important;
}

.header {
    /* position: fixed;
    padding-left: 15px;
    width: 100%;
    height: 30px;
    color: #fff;
    display: inline-block;
    text-align: center;
    background-image: linear-gradient(to bottom, #aa0707, #720505);
    background-repeat: repeat-x;
    width: 100%;
    display: block;
     */
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background-color: #fff;
    height: 65px;
    padding: 10px 5px;
    box-shadow: 0px 10px 30px 0px rgba(82, 63, 105, 0.05);
    display: flex;
    align-items: center;
    justify-content: space-between !important;
}

.header > nav{
	display: flex;
    /* align-items: center; */
    justify-content: space-between !important;
}

.btnBox {
    border-radius: 1px !important;
}

.navbar-brand {
    /* top: -50 !important; */
    color: #666060;
    margin: 0;
    font-size: 22px;
    font-weight: 700;
    float: left !important;
    text-decoration: none;
}

.navbar-brand>a {
    color: #776c6c;
    text-decoration: none;
}

.navbar-brand>a:hover {
    color: #fff;
    text-decoration: none;
}

#sidebar-toggle {
    display: none;
}

/* log out link */
#logout {
    color: #110F0F;
    text-decoration: none;
    margin-left: 10px;
    font-weight: bolder;
    text-transform: uppercase;
}

#logout:hover {
    background: #D414BD;
    color: #fff;
    padding: 7px;
}


/* header stop here  */

/* main  */
#main{
    margin-left: 90px;
	transition: all 0.3s;
    padding-top: 67px;
}
#sidebar:hover ~ #main{
    margin-left: 250px !important;
}
</style>
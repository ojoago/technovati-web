<template>
    <div>
        <div class="header">
                    <i class="bi bi-list toggleMenu"></i>
                    <span class="text">Drop Down Sidebar </span>
                    <nav class="header-nav ms-auto">
                     <ul class="d-flex align-items-center">

                         <li class="nav-item dropdown">
                             <a class="nav-link nav-icon pointer" href="#">
                                 <span class="badge bg-danger">Help</span>
                             </a>

                         </li>
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
                                 <!-- <img src="{{asset('themes/img/profile-img.jpg')}}" alt="Profile" class="rounded-circle"> -->
                                 <span class="d-none d-md-block dropdown-toggle ps-2">{{username}} </span>
                             </a><!-- End Profile Iamge Icon -->

                             <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                                 <li class="dropdown-header">
                                     <h6 class="ellipsis-text">getAuthFullname</h6>
                                     <!-- <span>Web Designer</span> -->
                                 </li>
                                
                                 <li>
                                     <hr class="dropdown-divider">
                                 </li>
                             
                                 <li>
                                    <a class="dropdown-item align-items-center pointer">
                                             <i class="bi bi-person"></i>
                                             <span>profile</span>
                                         </a>
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
                                 <li>
                                     <hr class="dropdown-divider">
                                 </li>
                             
                                 <li>
                                     <a class="dropdown-item d-flex align-items-center bg-danger pointer" @click="$emit('logout')">
                                         <i class="bi bi-box-arrow-right"></i><span>Sign Out</span>
                                     </a>
                                 </li>

                             </ul><!-- End Profile Dropdown Items -->
                         </li><!-- End Profile Nav -->

                     </ul>
                 </nav><!-- End Icons Navigation -->
                </div>
    </div>
</template>

<script setup>
    import {  defineEmits } from "vue";
    import store from "@/store";
    defineEmits(['logout'])


const username = store?.state?.user?.data?.username;
</script>

<style scoped>

</style>
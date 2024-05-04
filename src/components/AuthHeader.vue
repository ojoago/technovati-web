<template>
    <div>
        <div class="header">
            <div class="brand-details">
                <i class="bi bi-list toggleMenu pointer"></i>
                <!-- <span class="brand-name">Optimal</span> -->
                <span class="brand-name">Technovati</span>
            </div>

            <!-- <span class="text">Drop Down Sidebar </span> -->
            <nav class="header-nav ms-auto">
                <ul class="d-flex align-items-center">

                    <li class="nav-item dropdown">
                        <a class="nav-link nav-icon pointer" id="loadNotifications" data-bs-toggle="dropdown">
                            <i class="bi bi-bell"></i>
                            <span class="badge bg-primary badge-number" id="badge-number">0</span>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications"
                            id="notifications">
                        </ul>
                    </li>

                    <li class="nav-item dropdown pe-3">
                        <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#"
                            data-bs-toggle="dropdown">
                            
                            <span
                                class="dnone d-md-block uppercase-text dropdown-toggle ps-2 ellipsis-text">{{username}}
                            </span>
                        </a><!-- End Profile Iamge Icon -->

                        <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">

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
                                <a class="dropdown-item d-flex align-items-center pointer" data-bs-toggle="modal"
                                    data-bs-target="#updatePwd">
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
                                <a class="dropdown-item d-flex align-items-center bg-danger pointer text-white"
                                    @click="$emit('logout')">
                                    <i class="bi bi-box-arrow-right text-white mr-1"></i> <span class="ml-1"> Sign Out</span>
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
    import {  defineEmits,computed } from "vue";
    import store from "@/store";
    defineEmits(['logout'])
    const username = computed(() => store?.state?.user?.data?.username);
 
</script>

<style scoped>
    ul li{
        text-decoration: none;
        list-style: none;
    }
</style>
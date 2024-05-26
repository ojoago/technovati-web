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
                            <!-- <i class="bi bi-bell"></i> -->
                            <span class="badge bg-dark badge-number" id="badge-number">0</span>
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
                                <a class="dropdown-item align-items-center pointer" @click="staffDetail">
                                    <i class="bi bi-person"></i>
                                    <span>profile</span>
                                </a>
                            </li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li>
                                <a class="dropdown-item d-flex align-items-center pointer" @click="toggleModal=true">
                                    <i class="bi bi-lock-fill"></i>
                                    <span>Update Password</span>
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
        <o-modal :isOpen="toggleModal" modal-class="modal-xs" title="Update Password" @submit="updatePassword" @modal-close="closeModal">
            <template #content>
                <form >
                    <div class="row">

                        <div class="col-md-12">
                            <label class="form-label">Old Password *</label>
                            <input type="password" v-model="password.old" class="form-control form-control-sm"
                                placeholder="">
                            <p class="text-danger " v-if="error?.old">{{ error?.old[0] }} </p>
                        </div>
                        <div class="col-md-12">
                            <label class="form-label">New Password *</label>
                            <input type="password" step="0.1" v-model="password.new" class="form-control form-control-sm"
                                placeholder="Minimum of 6 character">
                            <p class="text-danger " v-if="error?.new">{{ error?.new[0] }} </p>
                        </div>
                        <div class="col-md-12">
                            <label class="form-label">Confirm Password *</label>
                            <input type="password" v-model="password.password_confirmation" class="form-control form-control-sm"
                                placeholder="">
                            <p class="text-danger " v-if="error?.password_confirmation">{{ error?.password_confirmation[0] }} </p>
                        </div>
                    </div>
                </form>
            </template>
        </o-modal>
    </div>
</template>

<script setup>
    import {  defineEmits,computed, ref } from "vue";
    import store from "@/store";
    import OModal from "@/components/OModal.vue";
import { useRouter } from 'vue-router';
    
    const router = useRouter()
    let query = {}
    router.push({ query: query })
    defineEmits(['logout'])
    const username = computed(() => store?.state?.user?.data?.username);
    
    const password = ref({new:'',old:'',password_confirmation:''})
    const toggleModal = ref(false)
    const closeModal = () => {
        toggleModal.value = false;
    };

    function staffDetail() {
        let data = store?.state?.user?.data 
        localStorage.setItem('TVATI_STAFF_DETAIL', JSON.stringify(data, null, 2))
        router.push({ path: 'staff-detail', query: { staff: data.pid } })
    }

    const error = ref({})
    const updatePassword =() =>{
        error.value = []
    store.dispatch('postMethod', { url: '/update-password', param: password.value }).then((data) => {
        if (data?.status == 422) {
            error.value = data.data
        } else if (data?.status == 201) {
            password.value ={new:'',old:'',password_confirmation:''}
            toggleModal.value = false
        }
    })
    }
</script>

<style scoped>
    ul li{
        text-decoration: none;
        list-style: none;
    }
</style>
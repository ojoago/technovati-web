<template>
    <div>

            <div class="container mt-2">
                <div class="row">
                    <div class="col-md-6">
                        <AttendanceComponent />
                    </div>
                    <div class="col-md-6">
                        <Qal :data="eventData" title="Events" />


                    </div>

                </div>

                <div class="row my-2">
                    <!-- col begin  -->
                    <div class="col-md-4">
                        <!-- card begin  -->
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Pending Request</h5>

                                <div class="d-flex align-items-center">
                                    <div
                                        class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                        <i class="bi bi-cart"></i>
                                    </div>
                                    <div class="ps-3">
                                        <h6 class="h4">{{datas.request}}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- card end  -->

                    </div>
                    <!-- col end  -->
                    <!-- col begin  -->
                    <div class="col-md-4">
                        <!-- card begin  -->
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Raw Material</h5>

                                <div class="d-flex align-items-center">
                                    <div
                                        class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                        <i class="bi bi-cart"></i>
                                    </div>
                                    <div class="ps-3">
                                        <h6 class="h4">{{ datas.raw}}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- card end  -->

                    </div>
                    <!-- col end  -->
                    <!-- col begin  -->
                    <div class="col-md-4">
                        <!-- card begin  -->
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Stock Items</h5>

                                <div class="d-flex align-items-center">
                                    <div
                                        class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                        <i class="bi bi-cart"></i>
                                    </div>
                                    <div class="ps-3">
                                        <h6 class="h4">{{ datas.items}}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- card end  -->

                    </div>
                    <!-- col end  -->

                </div>

                <div class="row my-2">
                    <!-- col begin  -->
                    <div class="col-md-4">
                        <!-- card begin  -->
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Customers</h5>

                                <div class="d-flex align-items-center">
                                    <div
                                        class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                        <i class="bi bi-cart"></i>
                                    </div>
                                    <div class="ps-3">
                                        <h6 class="h4">{{datas.customers}}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- card end  -->
                    </div>
                    <!-- col end  -->
                    <!-- col begin  -->
                    <div class="col-md-4">
                        <!-- card begin  -->
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Suppliers</h5>

                                <div class="d-flex align-items-center">
                                    <div
                                        class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                        <i class="bi bi-cart"></i>
                                    </div>
                                    <div class="ps-3">
                                        <h6 class="h4">{{ datas.suppliers}}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- card end  -->

                    </div>
                    <!-- col end  -->
                    <!-- col begin  -->
                    <div class="col-md-4">
                        <!-- card begin  -->
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">consignment</h5>

                                <div class="d-flex align-items-center">
                                    <div
                                        class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                        <i class="bi bi-cart"></i>
                                    </div>
                                    <div class="ps-3">
                                        <h6 class="h4">{{ datas.consignment}}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- card end  -->

                    </div>
                    <!-- col end  -->

                </div>

            </div>

        {{ datas }}
        suppliers
        <br>
        customer
        <hr>
        item head count

        <hr>
        pending request
        <hr>

        raw material
        <hr>
    </div>

</template>

<script setup>


import store from "@/store";
import { onMounted, ref } from "vue";
import AttendanceComponent from '@/components/shift/AttendanceComponent.vue';
import Qal from '@/components/dashboard/CalComponent.vue'

const eventData = ref([])

const datas = ref({})
const staffAssembled = () => {
    store.dispatch('getMethod', { url: '/load-store-dashboard' }).then((data) => {
        if (data?.status == 200) {
            datas.value = data.data;
        }
    })
}



onMounted(() => {
    staffAssembled()
})


// load-store-dashboard
</script>

<style scoped>

</style>
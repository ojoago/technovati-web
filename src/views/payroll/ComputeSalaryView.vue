<template>
    <div>
        <div class="container mt-2">

            <div class="card">
                <div class="card-header"><h3 class="mx-4">Compute Salary</h3></div>
                <div class="card-body">
                    <ul class="nav nav-tabs d-flex" id="myTabjustified" role="tablist">
                        <li class="nav-item flex-fill" role="presentation">
                            <button class="nav-link w-100 active" id="salary-tab" data-bs-toggle="tab"
                                data-bs-target="#salary" type="button" role="tab" aria-controls="next"
                                aria-selected="false">Salaries</button>
                        </li>
                        <li class="nav-item flex-fill" role="presentation">
                            <button class="nav-link w-100 " id="compute-tab" data-bs-toggle="tab"
                                data-bs-target="#compute" type="button" role="tab" aria-selected="true">Compute Salary
                            </button>
                        </li>


                        <li class="nav-item flex-fill" role="presentation">
                            <button class="nav-link w-100" id="next-tab" data-bs-toggle="tab" data-bs-target="#config"
                                type="button" role="tab" aria-controls="next"
                                aria-selected="false">Configuartion</button>
                        </li>

                    </ul>
                    <div class="tab-content pt-2" id="myTabjustifiedContent">
                        <div class="tab-pane fade show active" id="salary" role="tabpanel" aria-labelledby="salary-tab">

                            <Salary />
                        </div>

                        <div class="tab-pane fade" id="compute" role="tabpanel">
                            <Compute />
                            

                        </div>


                        <div class="tab-pane fade" id="config" role="tabpanel" aria-labelledby="salary-tab">

                            <Config />
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

// import PaginationLinks from "@/components/PaginationLinks.vue";
import Salary from '@/components/salary/SalaryComponent.vue'
import Config from '@/components/salary/ConfigComponent.vue'
import Compute from '@/components/salary/ComputeComponent.vue'





// function nextPage(link) {
//     alert()
//     if (!link.url || link.active) {
//         return;
//     }
//     alert(link.url)
// }

</script>

<style scoped></style>
<template>
    <div>
        <div class="container my-2">
            
            <div class="card">
                <div class="card-body">

                 <div class="table-responsive">
                    {{ details }}
                </div>
                </div>
            </div>
            
        </div>

   


    </div>
</template>

<script setup>
import { ref , onMounted } from "vue";
// import store from "@/store";

// import { useRouter } from 'vue-router';

// const router = useRouter()
// let query = {}
// router.push({ query: query })

const details = ref({});




onMounted(() => {
    let rqs = localStorage.getItem('TVATI_TRV_RQS_DETAIL') ? JSON.parse(localStorage.getItem('TVATI_TRV_RQS_DETAIL')) : 'null'
    console.log(rqs);
    details.value = rqs;
});





</script>

<style scoped>

</style>
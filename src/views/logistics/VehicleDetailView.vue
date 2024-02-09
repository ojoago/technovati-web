<template>
    <div>
        <!-- {{ staff }} -->
        <div class="container">
            {{ vehicle }}
           

        </div>
    </div>
</template>

<script setup>
import store from "@/store";
import { onMounted, ref } from "vue";
// import { useRoute, useRouter } from 'vue-router';

const vehicle = ref({});
const detail = ref({});
const staff_pid = ref(null);


onMounted(() => {
    vehicle.value = localStorage.getItem('TVATI_VEHICLE_DETAIL') ? JSON.parse(localStorage.getItem('TVATI_VEHICLE_DETAIL')) : 'null'
    console.log(vehicle);
    if (vehicle.value != 'null') {
        staff_pid.value = vehicle.value.pid
    }
    loadStaffDetail()
});


function loadStaffDetail() {
    store.commit('setSpinner', true)
    store.dispatch('getMethod', { url: '/ataff-detail/' + staff_pid.value }).then(({ data }) => {
        detail.value = data;
        store.commit('setSpinner', false)

    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
        alert('weting be this')
    })
}



</script>

<style scoped>
body {
    margin: 20px 160px;
}

.flex-container,
.flex-row {
    display: flex;
    justify-content: space-between;
}

.text-content {
    flex-basis: 60%;
    text-align: center;
}

.text-content>.h4,
.text-content>.h3 {
    margin-bottom: 1px;
}

.text-content>p {
    margin: 1px;
    font-size: small;
}

.logo-image {
    width: 100px !important;
    border-radius: 15px;
}

.logo-image>img {
    width: 100%;
}

.flex-row {
    /* height: 200px; */
    justify-content: space-between;
}

.personal-detail,
.flex-col {
    flex-basis: 40%;
    margin: 3px;
    /* justify-content: space-between; */
}

.student-img {
    flex-basis: 15%;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    border: 1px solid #000;
    max-height: 200px;
}

.student-img>img {
    width: 100%;
    height: 100%;
}
</style>
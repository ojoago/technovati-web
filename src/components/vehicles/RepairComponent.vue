<template>
    <div>
        <button class="btn btn-sm btn-primary m-1" @click="openModal">Add New</button>
        <div class="table-responsive" v-if="repairs">
            <table class="table-hover table-stripped table-bordered table">
                <thead>
                    <tr>
                        <th>SN</th>
                        <th>Amount </th>
                        <th>Date</th>
                        <th>Details</th>
                        <th> <i class="bi bi-gear-fill"></i> </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, loop) in repairs" :key="loop">
                        <td>{{ loop + 1 }}</td>
                        <td>{{ item.amount }}</td>
                        <td>{{ item.day }} </td>
                        <td>{{ item?.details }} </td>
                        <td> <span class="bi bi-pen-fill pointer" @click="editRepair(item)"></span> </td>
                    </tr>
                </tbody>
            </table>

        </div>
        <div v-else class="text-center text-uppercase">No Record yet</div>


        <!-- modal  -->
        <o-modal :isOpen="repairModal" modal-class="modal-lg" title="Add Repair Details" @submit="addRepair"
            @modal-close="closeModal">
            <template #content>
                <form id="assignForm">
                    <div class="row">
                        
                        <div class="col-md-6">
                            <label class="form-label">Date *</label>
                            <input type="date" v-model="repair.date" class="form-control form-control-sm">
                            <p class="text-danger " v-if="t_error?.date">{{ t_error?.date[0] }} </p>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Amount *</label>
                            <input type="text" v-model="repair.amount" class="form-control form-control-sm"
                                placeholder="Enter amount">
                            <p class="text-danger " v-if="t_error?.amount">{{ t_error?.amount[0] }} </p>
                        </div>
                        <div class="col-md-12">
                            <label class="form-label">Repair Details *</label>
                            <textarea type="date" v-model="repair.details" class="form-control form-control-sm"></textarea>
                            <p class="text-danger " v-if="t_error?.details">{{ t_error?.details[0] }} </p>
                        </div>
                    </div>
                </form>
            </template>

        </o-modal>
    </div>
</template>

<script setup>
     
import store from "@/store";
import { onMounted, ref } from "vue";
// import { useRoute, useRouter } from 'vue-router';
import OModal from "@/components/OModal.vue";

const repairModal = ref(false)

const openModal =()=>{
    repairModal.value = true
    resetAttr()
}
const closeModal = () => {
    repairModal.value = false;
    resetAttr()
};
let dtl 
onMounted(() => {
    dtl = localStorage.getItem('TVATI_VEHICLE_DETAIL') ? JSON.parse(localStorage.getItem('TVATI_VEHICLE_DETAIL')) : 'null'
    if (dtl != 'null') {
        repair.value.vehicle_pid = dtl?.pid;
        // loadVehiclerePairs(dtl?.pid)
    }
    const disableTab = document.querySelector('#repair-tab');
    disableTab.addEventListener('click',()=>{
        loadVehiclerePairs(repair.value.vehicle_pid)
    })
});

const repairs = ref({})
function loadVehiclerePairs(pid) {
    store.dispatch('getMethod', { url: '/load-vehicle-repairs/' + pid }).then(({ data }) => {
        repairs.value = data
    })
}

const repair = ref({
    vehicle_pid: '',
    date: '',
    amount: '',
    details: '',
})

const resetAttr = ()=> {
    repair.value = {
        vehicle_pid: dtl?.pid,
        date: '',
        amount: '',
        details: '',
    }
}

const editRepair = (data) =>{
    repair.value = {
        vehicle_pid: data.vehicle_pid,
        date: data.date,
        amount: data.amount,
        details: data.details,
        id: data.id ,
    }
    repairModal.value = true
}



const t_error = ref({})
function addRepair() {
    t_error.value = []
    store.dispatch('postMethod', { url: '/add-repair', param: repair.value }).then((data) => {
        if (data?.status == 422) {
            t_error.value = data.data
        } else if (data?.status == 201) {
            loadVehiclerePairs(repairs.value.vehicle_pid)
            closeModal();
        }
    }).catch(e => {
        console.log(e);
    })

}

</script>

<style scoped>

</style>
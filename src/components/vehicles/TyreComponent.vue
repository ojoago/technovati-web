<template>
    <div>
        <button class="btn btn-sm btn-primary m-1" @click="tyreModal=true">Add New</button>
        <div class="table-responsive" v-if="tyres">
            <table class="table-hover table-stripped table-bordered table">
                <thead>
                    <tr>
                        <th>SN</th>
                        <th>Side </th>
                        <th>Brand</th>
                        <th>date purchased</th>
                        <th>date manufactured</th>
                        <th>expiring date</th>
                        <th>type</th>
                        <th> <i class="bi bi-gear-fill"></i> </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, loop) in tyres" :key="loop">
                        <td>{{ loop + 1 }}</td>
                        <td>{{ item.side }}</td>
                        <td>{{ item.brand }} </td>
                        <td>{{ item.date_purchased }} </td>
                        <td>{{ item.date_manufactured }} </td>
                        <td>{{ item.expiring_date }} </td>
                        <td>{{ item?.type }} </td>
                        <td>
                            <div class="dropdown">
                                <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                    data-bs-toggle="dropdown">
                                    <i class="bi bi-tools"></i>
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item pointer " @click="replaceTyre(item.pid)">Replace</a></li>
                                    <li><a class="dropdown-item pointer bg-warning" @click="editTyre(item)">Edit</a></li>
                                    <li><a class="dropdown-item pointer text-danger" @click="deleteTyre(item.pid)">Delete</a></li>
                                </ul>
                            </div>
                        </td>

                    </tr>
                </tbody>
            </table>

        </div>
        <div v-else class="text-center text-uppercase">No Record yet</div>


        <!-- modal  -->
        <o-modal :isOpen="tyreModal" modal-class="modal-lg" title="Add Tyre to Vehicle" @submit="addTyre"
            @modal-close="closeModal">
            <template #content>
                <form id="assignForm">
                    <div class="row">
                        <div class="col-md-6">
                            <label class="form-label">Side *</label>
                            <select v-model="tyre.side" class="form-control form-control-sm">
                                <option value="" selected>Make Selection </option>
                                <option>Front Right</option>
                                <option>Front Left</option>
                                <option>Back Right</option>
                                <option>Back Left</option>
                                <option>Spare</option>
                            </select>
                            <p class="text-danger" v-if="t_error?.side">{{ t_error?.side[0] }} </p>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Brand *</label>
                            <input type="text" v-model="tyre.brand" class="form-control form-control-sm"
                                placeholder="Mechelin">
                            <p class="text-danger " v-if="t_error?.brand">{{ t_error?.brand[0] }} </p>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Type *</label>
                            <input type="text" v-model="tyre.type" class="form-control form-control-sm"
                                placeholder="Enter type">
                            <p class="text-danger " v-if="t_error?.type">{{ t_error?.type[0] }} </p>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Date Purchased *</label>
                            <input type="date" v-model="tyre.date_purchased" class="form-control form-control-sm">
                            <p class="text-danger " v-if="t_error?.date_purchased">{{ t_error?.date_purchased[0] }} </p>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Date Manufactured *</label>
                            <input type="date" v-model="tyre.date_manufactured" class="form-control form-control-sm">
                            <p class="text-danger " v-if="t_error?.date_manufactured">{{ t_error?.date_manufactured[0]
                                }} </p>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Expiring Date *</label>
                            <input type="date" v-model="tyre.expiring_date" class="form-control form-control-sm">
                            <p class="text-danger " v-if="t_error?.expiring_date">{{ t_error?.expiring_date[0] }} </p>
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

const tyreModal = ref(false)

const closeModal = () => {
    tyreModal.value = false;
};

onMounted(() => {
    let dtl = localStorage.getItem('TVATI_VEHICLE_DETAIL') ? JSON.parse(localStorage.getItem('TVATI_VEHICLE_DETAIL')) : 'null'
    if (dtl != 'null') {
        tyre.value.vehicle_pid = dtl?.pid;
        loadVehicleTyres(dtl?.pid)
    }
});

const tyres = ref({})
function loadVehicleTyres(pid) {
    store.dispatch('getMethod', { url: '/load-vehicle-tyres/' + pid }).then(({ data }) => {
        tyres.value = data
    })
}

const tyre = ref({
    vehicle_pid: '',
    side: '',
    date_purchased: '',
    date_manufactured: '',
    expiring_date: '',
    brand: '',
    type: ''
})

const editTyre = (data) =>{
    tyre.value = {
        vehicle_pid: data.vehicle_pid,
        side: data.side,
        date_purchased: data.date_purchased,
        date_manufactured: data.date_manufactured,
        expiring_date: data.expiring_date,
        brand: data.brand,
        type: data.type ,
        id: data.id ,
    }
    tyreModal.value = true
}
const t_error = ref({})
function addTyre() {
    t_error.value = []
    store.dispatch('postMethod', { url: '/add-tyre', param: tyre.value }).then((data) => {
        if (data?.status == 422) {
            t_error.value = data.data
        } else if (data?.status == 201) {
            let form = document.querySelector('#assignForm');
            form.reset();
            loadVehicleTyres(tyre.value.vehicle_pid)
        }
    }).catch(e => {
        console.log(e);
    })

}

</script>

<style scoped>

</style>
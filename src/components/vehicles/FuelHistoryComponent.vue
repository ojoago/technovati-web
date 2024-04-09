<template>
    <div>
        <button class="btn btn-sm btn-primary m-1" @click="toggleModal = true">Add New</button>

        <div class="table-responsive" v-if="histories">
            <table class="table-hover table-stripped table-bordered table">
                <thead>
                    <tr>
                        <th>SN</th>
                        <th>Date </th>
                        <th>amount</th>
                        <th>Company</th>
                        <th>liters</th>
                        <!-- <th>Date Change</th> -->
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, loop) in histories" :key="loop">
                        <td>{{ loop + 1 }}</td>
                        <td>{{ item.date }}</td>
                        <td>{{ item.amount }} </td>
                        <td>{{ item.company }} </td>
                        <td>{{ item.liter }} </td>
                        <!-- <td>{{ item.brand }} </td> -->
                        <!-- <td>{{ item.created_at }} </td> -->

                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else class="text-center text-uppercase">No Record Yet</div>
        <o-modal :isOpen="toggleModal" modal-class="modal-xs" title="Add Fuel" @submit="topFuel" @modal-close="closeModal">
            <template #content>
                <form id="assignForm">
                    <div class="row">

                        <div class="col-md-12">
                            <label class="form-label">Amount *</label>
                            <input type="text" v-model="fuel.amount" class="form-control form-control-sm"
                                placeholder="e.g 6000">
                            <p class="text-danger " v-if="f_error?.amount">{{ f_error?.amount[0] }} </p>
                        </div>
                        <div class="col-md-12">
                            <label class="form-label">Liters *</label>
                            <input type="number" step="0.1" v-model="fuel.liter" class="form-control form-control-sm"
                                placeholder="e.g 30">
                            <p class="text-danger " v-if="f_error?.liter">{{ f_error?.liter[0] }} </p>
                        </div>
                        <div class="col-md-12">
                            <label class="form-label">Date *</label>
                            <input type="date" v-model="fuel.date" class="form-control form-control-sm"
                                placeholder="e.g 6000">
                            <p class="text-danger " v-if="f_error?.date">{{ f_error?.date[0] }} </p>
                        </div>
                        <div class="col-md-12">
                            <label class="form-label">Company *</label>
                            <input type="text" v-model="fuel.company" class="form-control form-control-sm"
                                placeholder="e.g Ya-man">
                            <p class="text-danger " v-if="f_error?.company">{{ f_error?.company[0] }} </p>
                        </div>
                        <div class="col-md-12">
                            <label class="form-label">Purchased By</label>
                            <Select2 v-model="fuel.purcased_by" :options="userDrop" :settings="{ width: '100%' }" />
                            <p class="text-danger " v-if="f_error?.purcased_by">{{ f_error?.purcased_by[0] }} </p>
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
import OModal from "@/components/OModal.vue";
import Select2 from 'vue3-select2-component';

const closeModal = () => {
    toggleModal.value = false;
};
const toggleModal = ref(false)

onMounted(() => {
    let dtl = localStorage.getItem('TVATI_VEHICLE_DETAIL') ? JSON.parse(localStorage.getItem('TVATI_VEHICLE_DETAIL')) : 'null'
    if (dtl != 'null') {
        fuel.value.vehicle_pid = dtl?.pid; 
        loadVehicleTyreHistory(dtl?.pid)
    }
});

const histories = ref({})
function loadVehicleTyreHistory(pid) {
    store.dispatch('getMethod', { url: '/load-vehicle-fuel-history/' + pid }).then(({ data }) => {
        histories.value = data
    })
}

const fuel = ref({
    vehicle_pid: '',
    date: '',
    amount: '',
    liter: '',
    company: '',
    purcased_by: ''
});

const f_error = ref({})
function topFuel() {
    f_error.value = []
    store.dispatch('postMethod', { url: '/add-fuel', param: fuel.value }).then((data) => {
        if (data.status == 422) {
            f_error.value = data.data
        } else if (data.status == 201) {
            let form = document.querySelector('#assignForm');
            loadVehicleTyreHistory(fuel.value.vehicle_pid)
            form.reset();
        }
    })

}

const userDrop = ref({});
function dropdownDept() {
    store.dispatch('loadDropdown', 'users').then(({ data }) => {
        userDrop.value = data;
    })
}
dropdownDept()

</script>

<style scoped>

</style>
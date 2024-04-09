<template>
    <div>
        <button class="btn btn-sm btn-primary m-1" @click="toggleModal = true">Add New</button>

        <div class="table-responsive" v-if="histories">
            <table class="table-hover table-stripped table-bordered table">
                <thead>
                    <tr>
                        <th>SN</th>
                        <th>date </th>
                        <th>amount</th>
                        <th>Brand</th>
                        <!-- <th>Date Recorded</th> -->
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, loop) in histories" :key="loop">
                        <td>{{ loop + 1 }}</td>
                        <td>{{ item.date }}</td>
                        <td>{{ item.amount }} </td>
                        <td>{{ item.brand }} </td>
                        <!-- <td>{{ item.created_at }} </td> -->
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else class="text-center text-uppercase">No Record Yet</div>


        <o-modal :isOpen="toggleModal" modal-class="modal-sm" title="Change Oil" @submit="changeOil"
            @modal-close="closeModal">
            <template #content>
                <form id="assignForm">
                    <div class="row">

                        <div class="col-md-12">
                            <label class="form-label">Amount *</label>
                            <input type="text" v-model="oil.amount" class="form-control form-control-sm"
                                placeholder="e.g 6000">
                            <p class="text-danger " v-if="o_error?.amount">{{ o_error?.amount[0] }} </p>
                        </div>
                        <div class="col-md-12">
                            <label class="form-label">Brand *</label>
                            <input type="text" v-model="oil.brand" class="form-control form-control-sm"
                                placeholder="e.g Ammasco">
                            <p class="text-danger " v-if="o_error?.brand">{{ o_error?.brand[0] }} </p>
                        </div>
                        <div class="col-md-12">
                            <label class="form-label">Date *</label>
                            <input type="date" v-model="oil.date" class="form-control form-control-sm">
                            <p class="text-danger " v-if="o_error?.date">{{ o_error?.date[0] }} </p>
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

const closeModal = () => {
    toggleModal.value = false;
};
const toggleModal = ref(false)

onMounted(() => {
    let dtl = localStorage.getItem('TVATI_VEHICLE_DETAIL') ? JSON.parse(localStorage.getItem('TVATI_VEHICLE_DETAIL')) : 'null'
    if (dtl != 'null') {
        oil.value.vehicle_pid = dtl?.pid; 
        loadVehicleOilHistory(dtl?.pid)
    }
});

const histories = ref({})
function loadVehicleOilHistory(pid) {
    store.dispatch('getMethod', { url: '/load-vehicle-oil-history/' + pid }).then(({ data }) => {
        histories.value = data
    })
}

const oil = ref({
    'vehicle_pid': '',
    'date': '',
    'amount': '',
    'brand': ''
})

const o_error = ref({})
function changeOil() {
    o_error.value = []
    store.dispatch('postMethod', { url: '/change-oil', param: oil.value }).then((data) => {
        if (data.status == 422) {
            o_error.value = data.data
        } else if (data.status == 201) {
            let form = document.querySelector('#assignForm');
            loadVehicleOilHistory(oil.value.vehicle_pid)
            form.reset();
        }
    }).catch(e => {
        console.log(e);
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
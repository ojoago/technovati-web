<template>
    <div>
        <div class="container mt-2">
                    <div class="card">
                        <div class="card-body">
                            <fieldset class="border rounded-3 p-2 m-1">
                                <legend class="float-none w-auto px-2">Add Raw Material</legend>
                                <form id="rForm">
                                    <div class="row">
                                         <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="form-label">Item</label>
                                                    <Select2 v-model="raw.material_pid" :options="items" :settings="{ width: '100%' }"  />
                                                    <p class="text-danger " v-if="errors?.material_pid">{{ errors?.material_pid[0] }}</p>
                                                </div>
                                            </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="form-label">manufactured date</label>
                                                <input type="date" v-model="raw.manufactured_date" class="form-control">
                                                <p class="text-danger " v-if="errors?.manufactured_date">{{ errors?.manufactured_date[0] }}</p>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="form-label">expiring date</label>
                                                <input type="date" v-model="raw.expiring_date" class="form-control" >
                                                <p class="text-danger " v-if="errors?.expiring_date">{{ errors?.expiring_date[0] }}</p>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label class="form-label">Date Supplied</label>
                                                <input type="date" v-model="raw.date_supplied" class="form-control" >
                                                <p class="text-danger " v-if="errors?.date_supplied">{{ errors?.date_supplied[0] }}</p>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label">Consignment Number</label>
                                                    <input type="text" v-model="raw.consignment_number" class="form-control" placeholder="e.g china001">
                                                    <p class="text-danger " v-if="errors?.consignment_number">{{ errors?.consignment_number[0] }}</p>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label">Unit Cost</label>
                                                    <input type="number" v-model="raw.unit_cost" class="form-control" placeholder="e.g 50000">
                                                    <p class="text-danger " v-if="errors?.unit_cost">{{ errors?.unit_cost[0] }}</p>
                                                </div>
                                            </div>
                                       
                                         <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label">Quantity</label>
                                                    <input type="number" v-model="raw.quantity" class="form-control" placeholder="e.g 99999.0"> 
                                                    <p class="text-danger " v-if="errors?.quantity">{{ errors?.quantity[0] }}</p>
                                                </div>
                                            </div>
                                    </div>
                                    <button type="button" class="btn btn-success btn-sm mt-2" @click="addMaterial">Submit</button>
                                </form>

                            </fieldset>
                        </div>
                    </div>
                </div>
    </div>
</template>

<script setup>
import store from "@/store";
import { ref } from "vue";
import Select2 from 'vue3-select2-component';
const errors = ref({});

const raw = ref({
    manufactured_date: '', 
    expiring_date: '' , 
    date_supplied: '' , 
    consignment_number: '' ,
    unit_cost: '' , 
    quantity: '' , 
    material_pid: '' , 
});


function addMaterial() {
    errors.value = []
    store.dispatch('postMethod', { url: '/add-material-quantity', param: raw.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data
        } else if (data?.status == 201) {
            let form = document.querySelector('#rForm');
            form.reset()
        }
    })
}

const items = ref({});

function dropdownSupplier() {
    store.dispatch('loadDropdown', 'raw-materials').then(({ data }) => {
        items.value = data;
    })
}
dropdownSupplier()


</script>

<style scoped></style>
<template>
    <div>
        <div class="container mt-2">
           
                    <div class="card">
                        <div class="card-body">
                            <fieldset class="border rounded-3 p-2 m-1">
                                <legend class="float-none w-auto px-2">Add Raw Material</legend>
                                <form id="rForm">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="form-label">Name</label>
                                                <input type="text" v-model="raw.name" class="form-control"
                                                    placeholder="e.g box">
                                                <p class="text-danger " v-if="errors?.name">{{ errors?.name[0] }}</p>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="form-label">model</label>
                                                <input type="text" v-model="raw.model" class="form-control" placeholder="e.g 20121212">
                                                <p class="text-danger " v-if="errors?.model">{{ errors?.model[0] }}</p>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">description</label>
                                                <textarea type="text" v-model="raw.description" class="form-control" placeholder="e.g this is from japan"></textarea>
                                                <p class="text-danger " v-if="errors?.description">{{ errors?.description[0] }}</p>
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
                                                <label class="form-label">date supplied</label>
                                                <input type="date" v-model="raw.date_supplied" class="form-control" >
                                                <p class="text-danger " v-if="errors?.date_supplied">{{ errors?.date_supplied[0] }}</p>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label">consignment number</label>
                                                    <input type="text" v-model="raw.consignment_number" class="form-control" placeholder="e.g china001">
                                                    <p class="text-danger " v-if="errors?.consignment_number">{{ errors?.consignment_number[0] }}</p>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label">unit cost</label>
                                                    <input type="number" v-model="raw.unit_cost" class="form-control" placeholder="e.g 50000">
                                                    <p class="text-danger " v-if="errors?.unit_cost">{{ errors?.unit_cost[0] }}</p>
                                                </div>
                                            </div>
                                        
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label">Unit</label>
                                                     <select v-model="raw.unit" class="form-control" >
                                                        <option value="" selected>Select Unit</option>
                                                        <option v-for="(unit, i) in units" :key="i">{{ unit }}</option>
                                                    </select>
                                                    <p class="text-danger " v-if="errors?.unit">{{ errors?.unit[0] }}</p>
                                                </div>
                                            </div>
                                         <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="form-label">quantity</label>
                                                    <input type="number" v-model="raw.quantity" class="form-control" placeholder="e.g 99999.0"> 
                                                    <p class="text-danger " v-if="errors?.quantity">{{ errors?.quantity[0] }}</p>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="form-label">manufacturer</label>
                                                    <Select2 v-model="raw.manufacturer" :options="suppliers" :settings="{width:'100%'}"  />
                                                    <p class="text-danger " v-if="errors?.manufacturer">{{ errors?.manufacturer[0] }}</p>
                                                </div>
                                            </div>
                                        
                                       
        
                                    </div>
                                    <button type="button" class="btn btn-success btn-sm mt-2" @click="createCustomer">Submit</button>
                                </form>

                            </fieldset>
                        </div>
                    </div>
                </div>
          
    </div>
</template>

<script setup>
import axiosClient from "@/axios";
import store from "@/store";
import { ref } from "vue";
import Select2 from 'vue3-select2-component';

const units = store.state.units;
const errors = ref({});
const suppliers = ref({});

const raw = ref({
    name: '', 
    model: '' , 
    description : '' , 
    manufactured_date: '', 
    expiring_date: '' , 
    date_supplied: '' , 
    consignment_number: '' ,
    unit_cost: '' , 
    unit: '' , 
    quantity: '' , 
    manufacturer: '' , 
});



function createCustomer() {
    store.commit('setSpinner', true)
    errors.value = []
    return axiosClient.post('/create-material', raw.value)
        .then(({ data }) => {
            if (data.status == 201) {
                errors.value = []
                store.commit('notify', { message: data.message })
                console.log(data.data);
                store.commit('setSpinner', false)
                let form = document.querySelector('#rForm');
                form.reset();
            } else if (data.status == 422) {
                errors.value = data.data;
                store.commit('setSpinner', false)

                store.commit('notify', { message: data.message, type: 'warninig' })
            } else {
                store.commit('notify', { message: data.message, type: 'danger' })
                store.commit('setSpinner', false)
            }
            return data;
    })
}

function dropdownSupplier() {
    store.dispatch('loadDropdown', 'suppliers').then(({ data }) => {
        suppliers.value = data;
    }).catch(e => {
        console.log(e);
        alert('Something Went Wrong')
    })
}
dropdownSupplier()




</script>

<style scoped></style>
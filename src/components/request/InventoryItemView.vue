<template>
    <div>
        <div class="container mt-2">
            <div class="row">
                <div class="col-md-7">
                     <fieldset class="border rounded-3 p-2 m-1">
                        <legend class="float-none w-auto px-2 h5">Items</legend>
                            <select class="form-control" @change="stetStorePid($event)">
                                <option disabled selected>Select Store</option>
                                <option v-for="sec in stores" :key="sec.id" :value="sec.id">{{ sec.text }}</option>
                            </select>
                            <input type="text" class="mt-1 form-control form-control-sm" placeholder="search Item">
                            <div class="table-responsive">
                                <table class="table-hover table-stripped table-bordered table">
                                    <thead>
                                        <tr>
                                            <th width="5%">SN</th>
                                            <th>Name</th>
                                            <!-- <th>Model</th> -->
                                            <th>Quantity</th>
                                            <!-- <th>Description</th> -->
                                            <th align="center"> <i class="bi bi-gear-fill"></i> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, loop) in items?.data" :key="loop">
                                            <td>{{ loop + 1 }}</td>
                                            <td>{{ item.name }}</td>
                                            <!-- <td>{{ item.model }} </td> -->
                                            <td>{{ item?.quantity  }} {{ item.unit }}</td>
                                            <td>
                                                <button v-if="item?.quantity > 0" @click="addItem(item)" type="button"
                                                    class="btn btn-primary btn-sm">
                                                    <i class="bi bi-plus"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                    </fieldset>
                   
                </div>
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-body">
                            
                            <fieldset class="border rounded-3 p-2 m-1">
                                <legend class="float-none w-auto px-2 h5">Request Items</legend>
                                <form id="itemForm" v-if="request.items.length">

                                    <fieldset class="border rounded-3 p-2 m-1">
                                        <div class="col-md-12" v-for="(item, loop) in request.items" :key="loop">
                                            <label class="form-label">{{ item.name }} </label>
                                            <div class="input-group">
                                                <span class="bg-light p-1">#{{ item.qnt }}</span>
                                                <input type="number" step="0.1" @change="compareQnt(item)" v-model="item.quantity" class="form-control" placeholder="e.g 15">
                                                <button type="button" class="btn btn-danger btn-sm" @click="removeitem(loop)"> <i class="bi bi-patch-minus"></i> </button>
                                            </div>
                                            <p class="text-danger " v-if="errors[`quantity${loop}`]">{{ errors[`quantity${loop}`] }} </p>
                                        </div>
                                    </fieldset>

                                    <div class="row">
                                        <div class="col-md-12">
                                            <label class="form-label">Comment</label>
                                            <textarea type="text" v-model="request.comment"
                                                class="form-control form-control-sm" placeholder="e.g UIU"></textarea>
                                            <p class="text-danger " v-if="errors?.comment">{{ errors?.comment }} </p>
                                        </div>
                                        <div class="col-md-12">
                                            <label class="form-label">Receiver</label>
                                            <Select2 v-model="request.receiver" :options="userDrop" :settings="{ width: '100%' }" />
                                            <p class="text-danger " v-if="errors?.receiver">{{ errors?.receiver }} </p>
                                        </div>
                                    </div>

                                    <div class="float-end">
                                        <button type="button" class="btn btn-success btn-sm mt-2"
                                            @click="requestMaterial">Submit</button>
                                    </div>
                                </form>

                            </fieldset>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { formatError } from "@/composables/formatError";
import store from "@/store";
import { ref } from "vue";
import Select2 from 'vue3-select2-component';

const { transformValidationErrors } = formatError()

const errors = ref({});
const items = ref({});
const store_pid = ref({})

const request = ref({
    receiver: '',
    comment: '',
    store_pid: store_pid,
    items: [],
});

const resetAttr = ()=>{
    request.value = {
        receiver: '',
        comment: '',
        store_pid: store_pid,
        items: [],
    }
}
const stetStorePid = (event) => {
    store_pid.value = event.target.value;
    loadItem(event.target.value)
}

const addItem = (item) => {
    var index = request.value.items.findIndex(x => x.pid == item.pid)
    if (index === -1) {
        request.value.items.push({
            pid: item.pid,
            quantity: 1,
            qnt: item?.quantity,
            name: item.name,
        })
    } else {
        if (request.value.items[index].quantity < item?.quantity) {
            request.value.items[index].quantity++
        } else {
            store.commit('notify', { message: `Quantity remaining is : ${request.value.items[index].quantity}`, type: 'warning' })
        }
    }
}
const compareQnt = (item) => {
    if(item.quantity > item.qnt ) {
        var index = request.value.items.findIndex(x => x.pid == item.pid)
        request.value.items[index].quantity = item.qnt
        store.commit('notify', { message: `Quantity remaining is : ${item.qnt}`, type: 'warning' })
    } 
}


const removeitem = (i) => {
    request.value.items.splice(i, 1);
}


function requestMaterial() {
    errors.value = []
    store.dispatch('postMethod', { url: '/request-items', param: request.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = transformValidationErrors(data.data) 
        } else if (data?.status == 201) {
            loadItem(store_pid.value)
            resetAttr()
        }
    })
}
function loadItem(pid) {
    store.dispatch('getMethod', { url: '/load-cr-out-items/'+pid }).then((data) => {
        if (data?.status == 200) {
            items.value = data.data;
        }else{
            items.value = {}
        }
    })
}

if (request.value.items) {
    loadStateRes()
}

const userDrop = ref([]);

function loadStateRes() {
    store.dispatch('loadDropdown', 'users').then(({ data }) => {
        userDrop.value = data;
    })
}
const stores = ref([]);

function loadStores() {
    store.dispatch('loadDropdown', 'stores').then(({ data }) => {
        stores.value = data;
    })
}
loadStores()


</script>

<style scoped></style>
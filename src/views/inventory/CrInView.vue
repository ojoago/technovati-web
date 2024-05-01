<template>
    <div>
        <div class="container mt-2">
            <div class="row">
                <div class="col-md-7">
                    <div class="card">
                        <div class="card-header">Receiving Items to Inventory</div>
                        <div class="card-body">
                            <input type="text" class=" form-control form-control-sm" placeholder="search Item">
                            <div class="table-responsive">
                                <table class="table-hover table-stripped table-bordered table">
                                    <thead>
                                        <tr>
                                            <th>SN</th>
                                            <th>Name</th>
                                            <!-- <th>Model</th> -->
                                            <th>Quantity</th>
                                            <!-- <th>Description</th> -->
                                            <th align="center"> <i class="bi bi-pencil-fill"></i> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, loop) in items?.data" :key="loop">
                                            <td>{{ loop + 1 }}</td>
                                            <td>{{ item.name }}</td>
                                            <!-- <td>{{ item.model }} </td> -->
                                            <td>{{ item.item?.quantity }} {{ item.unit }}</td>
                                            <td>
                                                <button @click="addItem(item)" type="button"
                                                    class="btn btn-primary btn-sm">
                                                    <i class="bi bi-plus"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
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
                                                <input type="number" v-model="item.quantity" class="form-control"
                                                    placeholder="e.g ABU Zaria">
                                                <button type="button" class="btn btn-danger btn-sm"
                                                    @click="removeitem(loop)"> <i class="bi bi-file-minus-fill"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </fieldset>

                                    <div class="row">
                                        <div class="col-md-12">
                                            <label class="form-label">Comment</label>
                                            <textarea type="text" v-model="request.comment"
                                                class="form-control form-control-sm" placeholder="e.g UIU"></textarea>
                                            <p class="text-danger " v-if="errors?.comment">{{ errors?.comment[0] }} </p>
                                        </div>
                                        <div class="col-md-12">
                                            <label class="form-label">Receiver</label>
                                            <Select2 v-model="request.reciver" :options="users"
                                                :settings="{ width: '100%' }" />
                                            <p class="text-danger " v-if="errors?.reciver">{{ errors?.reciver[0] }} </p>
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
import store from "@/store";
import { ref } from "vue";
import Select2 from 'vue3-select2-component';

const errors = ref({});
const items = ref({});

const request = ref({
    reciver: '',
    comment: '',
    store_pid: '04430511J207011I90N211FR73A5',
    items: [],
});

const addItem = (item) => {
    var index = request.value.items.findIndex(x => x.pid == item.pid)
    if (index === -1) {
        request.value.items.push({
            pid: item.pid,
            quantity: 1,
            name: item.name,
        })
    } else {
        if (request.value.items[index].quantity < item.quantity) {
            request.value.items[index].quantity++
        } else {
            store.commit('notify', { message: `quantity remaining is : ${request.value.items[index].quantity}`, type: 'warninig' })
        }
    }
}
const removeitem = (i) => {
    // let len = request.value.items.length;
    // if (len === 1) {
    //     store.commit('notify', { message: 'Qualification requires at least one instituion', type: 'warning' })
    //     return;
    // }

    request.value.items.splice(i, 1);
}


function requestMaterial() {
    errors.value = []
    store.dispatch('postMethod', { url: '/item-cr-in', param: request.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data
        } else if (data?.status == 201) {
            let form = document.querySelector('#itemForm');
            form.reset();
            loadItem()
        }
    })
}
loadItem()
function loadItem() {
    store.dispatch('getMethod', { url: '/load-cr-in-items' }).then((data) => {
        store.commit('setSpinner', false)
        if (data?.status == 200) {
            items.value = data.data;
        }
    })
}

const users = ref({})
function dropdownSupplier() {
    store.dispatch('loadDropdown', 'users').then(({ data }) => {
        users.value = data;
    }).catch(e => {
        console.log(e);
        alert('Something Went Wrong')
    })
}
dropdownSupplier()


</script>

<style scoped></style>
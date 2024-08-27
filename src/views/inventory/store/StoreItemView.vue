<template>
    <div>
        <div class="container mt-2">

            <div class="card">
                <div class="card-header">

                    <div class="row">
                        <div class="col-md-6">
                            Company Items
                        </div>
                        <div class="col-md-6">
                            <select class="form-control" @change="loadItem($event.target.value)">
                                <option disabled selected>Make Selection</option>
                                <template v-for="sec in stores" :key="sec.id">
                                    <option v-if="stores.length==1" selected :value="sec.id">{{ sec.text }} </option>
                                    <option v-else :value="sec.id">{{ sec.text }} </option>
                                </template>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="card-body">

                    <div class="table-responsive">
                        <table class="table-hover table-stripped table-bordered table">
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Name</th>
                                    <!-- <th>Unit</th> -->
                                    <th>Quantity</th>
                                    <th>Description</th>
                                    <th> <i class="bi bi-gear-fill"></i> </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, loop) in items?.data" :key="loop">
                                    <td>{{ loop + 1 }}</td>
                                    <td>{{ item?.item?.name }}</td>
                                    <!-- <td></td> -->
                                    <td>{{ item?.quantity }} {{ item?.item?.unit }}</td>
                                    <td>{{ item?.item?.description }}</td>
                                    <td>
                                        <button @click="moveDamage(item)" class="btn btn-sm btn-danger"> <i
                                                class="bi bi-eject"></i> </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="flex justify-center mt-4">
                            <nav class="relative justify-center rounded-md shadow pagination">
                                <pagination-links v-for="(link, i) of items.links" :link="link" :key="i"
                                    @next="nextPage(link)"></pagination-links>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <o-modal :isOpen="toggleModal" modal-class="modal-md" title="Remove damaged Quantity" @submit="removeDamageItem"
            @modal-close="closeModal">
            <template #content>
                <form id="anForm">
                    <div class="row">
                        <div class="col-md-12">
                            <label class="form-label">Quantity</label>
                            <input type="number" step="0.1" class="form-control form-control-sm" placeholder="Enter Quantity Damaged"
                                v-model="dmgForm.quantity">
                            <p class="text-danger " v-if="errors?.quantity">{{ errors?.quantity[0] }} </p>
                        </div>
                        <div class="col-md-12">
                            <label class="form-label">Date</label>
                            <input type="date" class="form-control form-control-sm" v-model="dmgForm.date">
                            <p class="text-danger " v-if="errors?.date">{{ errors?.date[0] }} </p>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="form-label">Note</label>
                                <textarea type="text" v-model="dmgForm.note" class="form-control" placeholder="e.g "></textarea>
                                <p class="text-danger " v-if="errors?.note">{{ errors?.note[0] }} </p>
                            </div>
                        </div>

                    </div>

                </form>
            </template>

        </o-modal>
    </div>
</template>

<script setup>
import store from "@/store";
import { ref } from "vue";
import PaginationLinks from "@/components/PaginationLinks.vue";
import OModal from "@/components/OModal.vue";


const toggleModal = ref(false);
const items = ref({});
const stoe_pid = ref(null)
 
function loadItem(pid) {
    stoe_pid.value = pid;
    store.dispatch('getMethod', { url: '/load-store-items/' + pid }).then((data) => {
        if (data?.status == 200) {
            items.value = data.data;
        }else{
            items.value = []
        }
    }).catch(e => {
        console.log(e);
    })
}

const closeModal = () => {
    toggleModal.value = false;
    resetAttr()
};

const resetAttr = () => {
    dmgForm.value = {
        quantity: '',
        inventroy_pid: '',
        note: '',
        date: '',
    }
}

const dmgForm = ref({
    quantity: '',
    inventroy_pid: '',
    note: '',
    date: '',
})

function moveDamage(item){
    toggleModal.value = true;
    dmgForm.value = {
        quantity:item.quantity ,
        inventroy_pid:item.pid ,
    }
}

const errors = ref({})
const removeDamageItem = () =>{
    errors.value = []
    store.dispatch('postMethod', { url: '/remove-damage-item', param: dmgForm.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data
        } else if (data?.status == 201) {
            resetAttr()
            loadItem(stoe_pid.value)
            toggleModal.value = false;

        }
    })
}

const stores = ref({})
function dropdownSection() {
    store.dispatch('loadDropdown', 'stores').then(({ data }) => {
        if(data.length==1){
            loadItem(data[0].id)
        }
        stores.value = data;
    }).catch(e => {
        console.log(e);
    })
}
dropdownSection()

function nextPage(link) {
    if (!link.url || link.active) {
        return;
    }
     store.dispatch('getMethod', { url: link.url }).then((data) => {
        if (data?.status == 200) {
            items.value = data.data;
        }else{
            items.value = []
        }
    }).catch(e => {
        console.log(e);
    })
}

</script>

<style scoped></style>
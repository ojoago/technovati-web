<template>
    <div>
        <o-modal :isOpen="props.budgetModal" modal-class="modal-sm" title="Add Request Budget com " @submit="addRequestBudget">
                    <template #content>
                        <form id="requestForm">
                            <template v-for="(item, loop) in budget.items" :key="loop">
                                        
                                    <fieldset class="border rounded-3 p-2 m-1">
                                        <div class="row">
                                              <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="form-label">Budget Item <span class="text-danger">*</span></label>
                                                    <input type="text" v-model="item.budget" class="form-control form-control-sm" placeholder="e.g feeding">
                                                    <!-- <p class="text-danger " v-if="errors?.title">{{ errors?.title[0] }}</p> -->
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="form-label">Amount <span class="text-danger">*</span></label>
                                                    <div class="input-group">
                                                        <input type="number" step="0.1" v-model="item.amount" class="form-control form-control-sm">
                                                        <button type="button" class="btn btn-danger btn-sm" @click="removeQualification(loop)"> <i class="bi bi-patch-minus"></i> </button>
                                                    </div>
                                                    <!-- <p class="text-danger " v-if="errors?.destination">{{ errors?.destination[0] }}   </p> -->
                                                </div>
                                            </div>
                                        </div>
                                    
                                    </fieldset>
                                </template>
                                <div class="float-end p-2">
                                    <button type="button" class="btn btn-success btn-sm mt-2" @click="addQualification"> <i class="bi bi-plus"></i> </button>
                                </div>
                           
                        </form>
                    </template>
        
            </o-modal>
    </div>
</template>

<script setup>
import OModal from "@/components/OModal.vue";
import store from "@/store";
import { ref } from "vue";
const props = defineProps({
    // isOpen: Boolean,
    requestPid: String ,
    budgetModal: Boolean,
});
// const emit = defineEmits(["modal-close"]);

// const closeModal = () => {
//     // props.budgetModal = false
//     // expenseModal.value = false;
// };
// request budget 
const budget = ref({
    travel_pid: props.requestPid,
    items: [{
        budget: '',
        amount: '',
    }]
});
const addQualification = () => {
    budget.value.items.push({
        budget: '',
        amount: '',
    })
}
const removeQualification = (i) => {
    let len = budget.value.items.length;
    if (len === 1) {
        store.commit('notify', { message: 'One Item is required to proceed ', type: 'warning' })
        return;
    }
    budget.value.items.splice(i, 1);
}
const errors = ref({});
function addRequestBudget() {
    store.dispatch('postMethod', { url: '/add-travel-request-budget', param: budget.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data
        } else if (data?.status == 201) {
            let form = document.querySelector('#requestForm');
            form.reset()
        }
    })
}



</script>

<style scoped>

</style>
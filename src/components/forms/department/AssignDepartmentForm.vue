<template>
    <div>
        <form  >
            <div class="row">
                 <div class="col-md-12">
                    <div class="form-group">
                        <label class="form-label">Department <span class="text-danger">*</span></label>
                        <select v-model="dept.department_pid" class="form-control form-control-sm" @change="loadSubDept($event)">
                            <option value="" selected>Select Department</option>
                            <option v-for="dp in departments" :key="dp.id" :value="dp.id" >{{ dp.text }}</option>
                        </select>
                        <p class="text-danger " v-if="errors?.department_pid">{{ errors?.department_pid[0] }}</p>
                    </div>
                </div>

                <div class="col-md-12">
                    <div class="form-group">
                        <label class="form-label">Sub Department </label>
                        <Select2 v-model="dept.sub_department" :options="sub" :settings="{ width: '100%' }"  />
                        <p class="text-danger " v-if="errors?.sub_department">{{ errors?.sub_department[0] }}</p>
                    </div>
                </div>
            </div>
            <button type="button" class="btn btn-success btn-sm mt-2" @click="assignDepartment">Submit</button>

        </form>
    </div>
</template>

<script setup>
import store from "@/store";
import { ref } from "vue";
import Select2 from 'vue3-select2-component';

const props = defineProps({
    user_pid: String,
});
const dept = ref({
    user_pid: props.user_pid ,
    sub_department: '' ,
    department_pid: '' ,
}) 
const errors = ref({})
function assignDepartment() {
    errors.value = []
    store.dispatch('postMethod', { url: '/assign-department', param: dept.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data;
        } 
    })
} 
const departments = ref([]);
function dropdownDpet() {
    store.dispatch('loadDropdown', 'departments').then(({ data }) => {
        departments.value = data;
    }).catch(e => {
        console.log(e);
    })
}

dropdownDpet()

const sub = ref([]);
function loadSubDept(event) {
    store.dispatch('loadDropdown', 'sub-departments/' + event.target.value).then(({ data }) => {
        sub.value = data;
    }).catch(e => {
        console.log(e);
    })
}
</script>

<style scoped>

</style>
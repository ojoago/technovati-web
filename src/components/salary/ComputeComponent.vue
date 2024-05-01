<template>
    <div>
        <div class="table-responsive">
            <table class="table-hover table-stripped table-bordered table">
                <thead>
                    <tr>
                        <th>SN</th>
                        <th>Staff Id</th>
                        <th>Names </th>
                        <th>Department</th>
                        <th>Basic Salary</th>
                        <th>
                            <i class="bi bi-gear-fill mr-1"></i>
                            <input type="checkbox">
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(data, loop) in salaries" :key="loop">
                        <td>{{ loop + 1 }}</td>
                        <td>{{ data.staff_id }}</td>
                        <td>{{ data.fullname }} </td>
                        <td>{{ data.department }}</td>
                        <td>{{ data.amount }}</td>
                        <td>
                            <input v-model="checked" type="checkbox" :value="data.pid">
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="4"></td>
                        <td>total </td>
                        <td> <button class="btn btn-sm btn-primary" @click="computeSalary">Compute</button>
                        </td>
                    </tr>
                </tfoot>
            </table>

        </div>
    </div>
</template>

<script setup>
import store from "@/store";
import { ref } from "vue";

const checked = ref([])
const salaries = ref({})

function loadStaffSalary() {
    store.dispatch('getMethod', { url: '/load-staff-salary' }).then((data) => {
        if (data?.status == 200) {
            salaries.value = data.data;
        }
    }).catch(e => {
        console.log(e);
    })
}

function computeSalary() {

    store.dispatch('postMethod', { url: '/compute-salary', param: checked.value }).then((data) => {
        if (data?.status == 201) {
            console.log(123);
        }
        // store.commit('setSpinner', false)
    })
}

loadStaffSalary()


</script>

<style scoped>

</style>
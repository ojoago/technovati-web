<template>
    <div>
        <fieldset class="border rounded-3 p-2 m-1">
                                            <legend class="float-none w-auto px-2">Create Department</legend>
                                            <form >
                                                {{ data }}
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label class="form-label">Department</label>
                                                            <input type="text" v-model="dept.department" class="form-control" placeholder="Name of department">
                                                            <p class="text-danger " v-if="errors?.department">{{ errors?.department[0] }}</p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label class="form-label">Description</label>
                                                            <textarea type="text" v-model="dept.description" class="form-control" placeholder="Name of department"></textarea>
                                                            <p class="text-danger " v-if="errors?.description">{{ errors?.description[0] }}</p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label class="form-label">Head of Department</label>
                                                            <Select2 v-model="dept.head" :options="users" :settings="{ width: '100%' }"  />

                                                            <p class="text-danger " v-if="errors?.head">{{ errors?.head[0] }}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button type="button" class="btn btn-success btn-sm mt-2" @click="createDepartment">Submit</button>
                                            </form>
                                        </fieldset>
    </div>
</template>

<script setup>
    import store from "@/store";
    import { onMounted, ref , defineProps } from "vue";
    import Select2 from 'vue3-select2-component';
// import { defineProps } from "vue";
 const props = defineProps({
    data: Object,
});
// console.log(data);
const errors = ref({});


function createDepartment() {
    errors.value = []
    store.dispatch('postMethod', { url: '/create-department', param: dept.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data
        } else if (data?.status == 201) {
            dept.value = {};
        }
    }).catch(e => {
        console.log(e);
    })
}
const dept = ref({})
onMounted(()=>{
    dept.value = props.data.clone();
})


const users = ref([]);
function dropdownAllow() {
    store.dispatch('loadDropdown', 'hod').then(({ data }) => {
        users.value = data;
    }).catch(e => {
        console.log(e);
    })
}
dropdownAllow()

const deptDrop = ref([]);
function dropdownDepts() {
    store.dispatch('loadDropdown', 'departments').then(({ data }) => {
        deptDrop.value = data;
    }).catch(e => {
        console.log(e);
    })
}
dropdownDepts()

</script>

<style scoped>

</style>
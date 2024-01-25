<template>
    <div>
        <fieldset class="border rounded-3 p-2 m-1">
                                    <legend class="float-none w-auto px-2">Next Of Kin</legend>
                                    <form >
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="form-label">Fullname <span class="text-danger">*</span></label>
                                                    <input type="text" v-model="next.fullname" class="form-control form-control-sm" placeholder="e.g Prof Umar Momoh">
                                                    <p class="text-danger " v-if="errors?.fullname">{{ errors?.fullname[0] }}</p>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label class="form-label">Email</label>
                                                    <input type="text" v-model="next.email" class="form-control form-control-sm" placeholder="e.g name@technovati.com.ng ">
                                                    <p class="text-danger " v-if="errors?.email">{{ errors?.email[0] }}</p>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label">Phone Number <span class="text-danger">*</span></label>
                                                    <input type="text" v-model="next.gsm" maxlength="11" class="form-control form-control-sm" placeholder="e.g 080xxxxxxxx">
                                                    <p class="text-danger " v-if="errors?.gsm">{{ errors?.gsm[0] }}</p>
                                                </div>
                                            </div>
                                       
                                            <!-- <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label">Gender <span class="text-danger">*</span></label>
                                                    <input type="text" v-model="next.gender" class="form-control form-control-sm" placeholder="e.g Aminu">
                                                    <p class="text-danger " v-if="errors?.gender">{{ errors?.gender[0] }}</p>
                                                </div>
                                            </div> -->
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label">religion <span class="text-danger">*</span></label>
                                                    <input type="text" v-model="next.religion" class="form-control form-control-sm" placeholder="e.g Sanusi ">
                                                    <p class="text-danger " v-if="errors?.religion">{{ errors?.religion[0] }}</p>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label">relationship</label>
                                                    <input type="text" v-model="next.relationship" class="form-control form-control-sm" placeholder="null">
                                                    <p class="text-danger " v-if="errors?.relationship">{{ errors?.relationship[0] }}</p>
                                                </div>
                                            </div>
                                        </div>
        
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label class="form-label">Address <span class="text-danger">*</span></label>
                                                    <textarea v-model="next.address" class="form-control form-control-sm" placeholder="e.g aminu@technovati.com.ng"></textarea>
                                                    <p class="text-danger " v-if="errors?.address">{{ errors?.address[0] }}</p>
                                                </div>
                                            </div>
                                        
                                        </div>

                                        <button type="button" class="btn btn-success btn-sm mt-2" @click="staffNextofKin">Submit</button>
                                    </form>
                            </fieldset>
    </div>
</template>

<script setup>
    import store from "@/store";
    import { ref,onMounted } from "vue";
const errors = ref({});


    const next = ref({
    'fullname': '',
    'gsm': '',
    'email': '',
    'gender': '',
    'religion': '',
    'relationship': '',
    'address': '',
    'user_pid': '',

});
let query = {}
function staffNextofKin() {
    store.commit('setSpinner', true)
    store.dispatch('postMethod', { url: '/add-next-of-kin', param: next.value }).then((data) => {
        store.commit('setSpinner', false)
        if (data.status == 422) {
            errors.value = data.data;
        } else if (data.status == 201) {
            query = { tab: 'qualification-tab', 'id': data?.data?.user_pid }
            localStorage.setItem('TVATI_ONBOARD_TAB', JSON.stringify(query, null, 2))
            errors.value = []
            next.value = [];
            switchTab()
        }
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
        alert('weting be this')
    })
}
const emit = defineEmits(['currentTab'])

function switchTab() {
    emit('currentTab')
}

onMounted(() => {
    let q = localStorage.getItem('TVATI_ONBOARD_TAB') ? JSON.parse(localStorage.getItem('TVATI_ONBOARD_TAB')) : 'null'
    if (q != 'null') {
        next.value.user_pid = q.id
    }
})

</script>

<style scoped>

</style>
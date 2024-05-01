<template>
    <div>
        <fieldset class="border rounded-3 p-2 m-1">
            <legend class="float-none w-auto px-2">Next Of Kin</legend>
            <form id="nextForm">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="form-label">Fullname <span class="text-danger">*</span></label>
                            <input type="text" v-model="next.fullname" class="form-control form-control-sm"
                                placeholder="e.g Prof Umar Momoh">
                            <p class="text-danger " v-if="errors?.fullname">{{ errors?.fullname[0] }}</p>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="form-label">Email</label>
                            <input type="text" v-model="next.email" class="form-control form-control-sm"
                                placeholder="e.g name@technovati.com.ng ">
                            <p class="text-danger " v-if="errors?.email">{{ errors?.email[0] }}</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">Phone Number <span class="text-danger">*</span></label>
                            <input type="text" v-model="next.gsm" maxlength="11" class="form-control form-control-sm"
                                placeholder="e.g 080xxxxxxxx">
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
                            <select v-model="next.religion" class="form-control form-control-sm">
                                <option value="" selected>Select Religion</option>
                                <option>Muslim</option>
                                <option>Christain</option>
                                <option>Other</option>
                            </select>
                            <p class="text-danger " v-if="errors?.religion">{{ errors?.religion[0] }}</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-label">relationship<span class="text-danger">*</span></label>
                            <input type="text" v-model="next.relationship" class="form-control form-control-sm"
                                placeholder="null">
                            <p class="text-danger " v-if="errors?.relationship">{{ errors?.relationship[0] }}</p>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="form-label">Address <span class="text-danger">*</span></label>
                            <textarea v-model="next.address" class="form-control form-control-sm"
                                placeholder="e.g somewhere in africa"></textarea>
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
    const props = defineProps({
        user_pid: String,
    });
    const errors = ref({});

    const next = ref({
    'fullname': '',
    'gsm': '',
    'email': '',
    'gender': '',
    'religion': '',
    'relationship': '',
    'address': '',
    'user_pid': props.user_pid,

});
let query = {}
function staffNextofKin() {
    errors.value = []
    let str = localStorage.getItem('TVATI_ONBOARD_TAB') ? JSON.parse(localStorage.getItem('TVATI_ONBOARD_TAB')) : 'null'
    next.value.user_pid = str.id;
    store.dispatch('postMethod', { url: '/add-next-of-kin', param: next.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data;
        } else if (data?.status == 201) {
            query = { tab: 'qualification-tab', 'id': data?.data?.user_pid }
            localStorage.setItem('TVATI_ONBOARD_TAB', JSON.stringify(query, null, 2))
            errors.value = []
            let form = document.querySelector('#nextForm')
            form.reset()
            switchTab()
        }
    })
}
const emit = defineEmits(['currentTab'])

function switchTab() {
    emit('currentTab')
}

onMounted(() => {
    let q = localStorage.getItem('TVATI_ONBOARD_TAB') ? JSON.parse(localStorage.getItem('TVATI_ONBOARD_TAB')) : 'null'
    let tsk = localStorage.getItem('TVATI_EDIT_STAFF') ? JSON.parse(localStorage.getItem('TVATI_EDIT_STAFF')) : 'null'
    if (q != 'null') {
        next.value.user_pid = q.id
    }
    if (tsk != 'null') {
        if (tsk.action == 'edit') {
            loadNextOfKin(tsk?.staff?.pid)
        }
    }
})


const loadNextOfKin = (pid) => {
    store.dispatch('getMethod', { url: '/load-next-of-kin/' + pid }).then((data) => {
        if (data?.status == 200) {
            next.value = data.data;
        }
    })
}
</script>

<style scoped>

</style>
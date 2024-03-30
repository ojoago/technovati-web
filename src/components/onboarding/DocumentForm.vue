<template>
    <div>
        <fieldset class="border rounded-3 p-2 m-1">
            <legend class="float-none w-auto px-2">Documents Upload</legend>
            <form>
                <fieldset class="border rounded-3">
                    <template v-for="(inst, loop) in documents.items" :key="loop">

                        <fieldset class="border rounded-3 p-2 m-1">
                            <div class="row">
                                <div class="float-end">
                                    <button type="button" class="btn btn-danger btn-sm" @click="removeQualification(loop)">
                                        <i class="bi bi-patch-minus"></i> </button>
                                </div>
                            </div>
                            <!-- {{ q_errors+'.'+loop }} -->
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label">Name <span class="text-danger">*</span></label>
                                        <input type="text" v-model="inst.name" maxlength="250"
                                            class="form-control form-control-sm" placeholder="e.g WAEC">
                                        <!-- <p class="text-danger " v-if="q_errors?.institutions?.institution">{{ 'q_errors?.institutions?[loop]?.institution[loop]' }}</p> -->
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label">File<span class="text-danger">*</span></label>
                                        <input type="file" class="form-control form-control-sm" id="image" @change="handleImageChange" accept="image/*,.pdf" required />

                                        <!-- <p class="text-danger " v-if="q_errors?.institutions?.institution">{{ 'q_errors?.institutions?[loop]?.institution[loop]' }}</p> -->
                                    </div>
                                </div>

                            </div>

                           
                        </fieldset>
                    </template>
                    <div class="float-end p-2">
                        <button type="button" class="btn btn-success btn-sm mt-2" @click="addQualification"> <i class="bi bi-plus"></i> </button>
                    </div>
                </fieldset>

                <button type="button" class="btn btn-success btn-sm mt-2" @click="staffQualification">Submit</button>
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

const q_errors = ref({});

const documents = ref({
    items: [{
        name:'',
    }],
    media:[],
    user_pid: props.user_pid,
});
const addQualification = () => {
    documents.value.items.push({
        name: ''
    })
}
const removeQualification = (i) => {
    let len = documents.value.items.length;
    if (len === 1) {
        store.commit('notify', { message: 'one document is required to proceed', type: 'warning' })
        return;
    }
    documents.value.items.splice(i, 1);
    documents.value.media.splice(i, 1);
}
let query = {}
function staffQualification() {
    let str = localStorage.getItem('TVATI_ONBOARD_TAB') ? JSON.parse(localStorage.getItem('TVATI_ONBOARD_TAB')) : 'null'
    documents.value.user_pid = str.id;
    store.dispatch('postMethod', { url: '/add-documents', param: documents.value }).then((data) => {
        if (data.status == 422) {
            q_errors.value = data.data;
        } else if (data.status == 201) {
            q_errors.value = []
            documents.value = [];
            query = { tab: 'personal-tab' }
            localStorage.setItem('TVATI_ONBOARD_TAB', JSON.stringify(query, null, 2))
            switchTab()
        }
    })
}
const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        var ext = file['name'].substring(file['name'].lastIndexOf('.') + 1);
        if (!['png', 'jpeg', 'jpg','pdf'].includes(ext)) {
            event.target.value = null;
            store.commit('notify', { message: 'Only Image/pdf is allowed', type: 'warning' })
            return;
        }
         if (file.size > 1024 * 1024) {
           event.target.value = null;
            store.commit('notify', { message: 'File cannot be more 1MB', type: 'warning' })
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            documents.value.media.push(reader.result)
        };
        reader.readAsDataURL(file);
    }
}

const emit = defineEmits(['currentTab'])

function switchTab() {
    emit('currentTab')
}
onMounted(() => {
    let q = localStorage.getItem('TVATI_ONBOARD_TAB') ? JSON.parse(localStorage.getItem('TVATI_ONBOARD_TAB')) : 'null'
    if (q != 'null') {
        documents.value.user_pid = q.id
    }
    let tsk = localStorage.getItem('TVATI_EDIT_STAFF') ? JSON.parse(localStorage.getItem('TVATI_EDIT_STAFF')) : 'null'
    if (tsk != 'null') {
        if (tsk.action == 'edit') {
            loadDocuments(tsk?.staff?.pid)
        }
    }
})


const loadDocuments = (pid) => {
    store.dispatch('getMethod', { url: '/load-documents/' + pid }).then((data) => {
        if (data?.status == 200) {
            documents.value.items = data?.data;
        }
    })
}
</script>

<style scoped></style>
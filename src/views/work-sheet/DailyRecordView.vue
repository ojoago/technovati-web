<template>
    <div>
        <div class="container mt-2">

            <div class="card">
                <div class="card-header h3">Daily Record</div>
                <div class="card-body">
                    <button class="btn btn-sm btn-primary m-2" @click="openDeviceModal">Add Device</button>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="table-responsive">
                                <table class="table-hover table-stripped table-bordered table">
                                    <thead>
                                        <tr>
                                            <th>TEAM</th>
                                            <th>TEAM lead</th>
                                            <th>Member</th>
                                            <th> <i class="bi bi-gear"></i> </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(team, loop) in team_data.data" :key="loop">
                                            <td>{{ team.team }}</td>
                                            <td>{{ team?.lead?.username }}</td>
                                            <td>{{ team.teams_count }}</td>
                                            <td>
                                                <i class="bi bi-forward pointer" @click="loadTeamMember(team)"></i>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>

                        </div>
                        <div class="col-md-6">
                            <fieldset class="border rounded-3 p-2 m-1" v-if="members.length">
                                <legend class="float-none w-auto px-2 h5">{{ team.team }} Members</legend>
                                <form id="workForm">
                                    <fieldset class="border rounded-3 p-2 m-1">
                                        <p class="text-danger " v-if="errors?.team_lead">{{ errors?.team_lead[0] }}</p>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group mb-3">
                                                    
                                                    <select class="form-control form-control-sm" v-model="work.device">
                                                            <option selected value="">Select Activity</option>
                                                            <option v-for="item in deviceDrop" :key="item.id"   >
                                                                {{ item.text }}
                                                            </option>
                                                    </select>
                                                    <p class="text-danger " v-if="errors?.device">{{ errors?.device[0]}}
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="col-md-6">

                                                <div class="form-group">
                                                    <input type="date" v-model="work.date"
                                                        class="form-control form-control-sm" placeholder="e.g 10">
                                                    <p class="text-danger " v-if="errors?.date">{{ errors?.date[0] }}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12" v-for="(member, loop) in members" :key="loop">
                                            <label class="form-label">{{ member.type == 2 ? member.casual.username :
                                                member.user.username }} {{ member.type == 2 ? member.casual.staff_id :
                                                member.user.staff_id }} </label>
                                            <div class="input-group">
                                                <input type="number" v-model="record[member.pid]"
                                                    class="form-control form-control-sm" placeholder="e.g 10">
                                            </div>
                                        </div>
                                    </fieldset>
                                    <div class="float-end">
                                        <button type="button" class="btn btn-success btn-sm mt-2"
                                            @click="submitWorkSheet">Submit</button>
                                    </div>
                                </form>

                            </fieldset>

                        </div>
                    </div>

                </div>
            </div>
        </div>

        <o-modal :isOpen="deviceModal" :modal-class="xs" title="Create Activity " @submit="createActivity"
            @modal-close="closeModal">
            <template #content>
                <form id="deviceForm">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="form-label">Activity</label>
                                <input type="text" v-model="device.activity" class="form-control"
                                    placeholder="e.g activity A">
                                <p class="text-danger " v-if="errors?.activity">{{ errors?.activity[0] }}</p>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label class="form-label">Description</label>
                                <textarea type="text" v-model="device.description" class="form-control"
                                    placeholder="describe the device"></textarea>
                                <p class="text-danger " v-if="errors?.description">{{ errors?.description[0] }}</p>
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
import OModal from "@/components/OModal.vue";

const xs = 'modal-xs';
const deviceModal = ref(false)
const openDeviceModal = () => {
    deviceModal.value = true;
};

const closeModal = () => {
    deviceModal.value = false;
};

const errors = ref({});
// const Device_data = ref({});
const device = ref({
    activity: '',
    description: '',
});

const activeRole = ref(null)


function createActivity() {
    errors.value = []
    let form = document.querySelector('#deviceForm');
    store.dispatch('postMethod', { url: '/create-activity', param: device.value, form: form }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data
        } else if (data?.status == 201) {
            dropdownDevice()
        }
    })
}

activeRole.value = store?.state?.activeRole


const team_data = ref({})
function loadTeam() {
    store.dispatch('getMethod', { url: '/load-team/'+activeRole.value }).then((data) => {
        if (data?.status == 200) {
            team_data.value = data.data;
        }
    })

}
loadTeam()

const members = ref({})

const team = ref({})
function loadTeamMember(data) {
    team.value = data;
    work.value.team_lead = data?.lead?.pid;
    work.value.team_pid = data?.pid;
    members.value = {}
    store.dispatch('getMethod', { url: '/load-team-member/' + data?.pid }).then((data) => {
        if (data?.status == 200) {
            members.value = data.data;
        }
    })

}


const work = ref({
    team_pid: '',
    team_lead: '',
    device: '',
    date: '',
    record: []
})

const resetAttr = () => {
    work.value = {
        team_pid: '',
        team_lead: '',
        device: '',
        date: '',
        record: []
    }
    record.value = {};
}
const record = ref({})
function submitWorkSheet() {
    work.value.record.push(record.value);
    errors.value = '';
    store.dispatch('postMethod', { url: 'submit-work-sheet', param: work.value }).then((data) => {
        if (data?.status == 422) {
            errors.value = data.data
        }else if(data?.status ==201){
            resetAttr()
        }
    }).catch(e => {
        console.log(e);
    })

}


const userDrop = ref({});
function dropdownUser() {
    store.dispatch('loadDropdown', 'users').then(({ data }) => {
        userDrop.value = data;
    }).catch(e => {
        console.log(e);
    })
}
dropdownUser()
const deviceDrop = ref({});
function dropdownDevice() {
    store.dispatch('loadDropdown', 'device').then(({ data }) => {
        deviceDrop.value = data;
    }).catch(e => {
        console.log(e);
    })
}
dropdownDevice()



</script>

<style scoped></style>
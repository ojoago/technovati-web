<template>
    <div>
         <fieldset class="border rounded-3 p-2 m-1">
            <legend class="float-none w-auto px-2">Shift Holidays</legend>
            <button class="btn btn-sm btn-primary m-2" @click="openHModal">Add Holiday</button>
                <Qalendar :events="events" :config="config" />
        </fieldset>

            <o-modal :isOpen="hModal" :modal-class="xs" title="Add Holiday to Shift" @submit="markShiftHoliday" @modal-close="closeModal" >
                <template #content>
                    <form id="formHoliday">
                        <div class="row">
                            <div class="col-md-12">
                                    <label for="">Shift</label>
                                    <div class="form-group">
                                        <select class="form-control"  v-model="holiday.shift_pid">
                                            <option value="" selected>Select Shift</option>
                                            <option v-for="sec in shiftDrop" :key="sec.pid" :value="sec.pid">{{ sec.shift }}</option>
                                        </select>
                                        <p class="text-danger " v-if="b_errors?.shift_pid">{{ b_errors?.shift_pid[0] }}</p>
                                    </div>
                                </div>
                            <div class="col-md-12">
                                <label for="">Tittle</label>
                                <div class="form-group">
                                    <input class="form-control" maxlength="30"  v-model="holiday.tittle" placeholder="e.g burnout break">
                                    <p class="text-danger " v-if="b_errors?.tittle">{{ b_errors?.holiday[0] }}</p>
                                </div>
                            </div>
                            
                            <div class="col-md-12">
                                <label for="">Start</label>
                                    <div class="form-group">
                                        <input type="date" class="form-control" v-model="holiday.start">
                                        <p class="text-danger " v-if="b_errors?.start">{{ b_errors?.start[0] }}</p>
                                    </div>
                            </div>
                                <div class="col-md-12">
                                <label for="">End</label>
                                    <div class="form-group">
                                        <input type="date" class="form-control" v-model="holiday.end">
                                        <p class="text-danger " v-if="b_errors?.end">{{ b_errors?.end[0] }}</p>
                                    </div>
                            </div>
                            <div class="col-md-12">
                                <label for="">Note</label>
                                <div class="form-group">
                                    <textarea class="form-control" maxlength="30"  v-model="holiday.note" placeholder="e.g burnout note"></textarea>
                                    <p class="text-danger " v-if="b_errors?.note">{{ b_errors?.note[0] }}</p>
                                </div>
                            </div>
                    
                    
                        </div>
                    </form>
                </template>
        
            </o-modal>

    </div>
</template>

<script setup>
import { Qalendar } from "qalendar";
import { ref } from "vue";
import store from "@/store";
import OModal from "@/components/OModal.vue";

const hModal = ref(false)

const openHModal = () => {
    hModal.value = true;
};
const closeModal = () => {
    hModal.value = false;
};


const b_errors = ref({});
const holiday = ref({
    shif_pid: '',
    tittle: '',
    note: '',
    start: '',
    end: '',
});
function markShiftHoliday() {
    b_errors.value = []
    store.dispatch('postMethod', { param: holiday.value, url: 'mark-shift-holiday' }).then((data) => {
        if (data.status == 422) {
            b_errors.value = data.data
        } else if (data.status == 201) {
            b_errors.value = []
            let form = document.querySelector('#formHoliday')
            form.reset()
        }
    })
}

//
loadShiftHolidays()
const events = ref([]);
function loadShiftHolidays() {
    store.commit('setSpinner', true)
    store.dispatch('getMethod', { url: '/load-shift-holidays' }).then((data) => {
        if (data.status == 200) {
            data.data.forEach( (el) => {
                events.value.push({
                    title: el.tittle,
                    with: el.shift.shift,
                    time: { start: el.start, end: el.end },
                    color: "blue",
                    isEditable: true,
                    id: el.id,
                    description: el.note
                })
            });
            console.log(events.value);
            // data.data.
        }
        store.commit('setSpinner', false)
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
    })
}

// const events = ref([
//     // ...
//     {
//         title: "Advanced algebra",
//         with: "Chandler Bing",
//         time: { start: "2024-02-12", end: "2024-02-16" },
//         color: "yellow",
//         isEditable: true,
//         id: "753944708f0f",
//         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores assumenda corporis doloremque et expedita molestias necessitatibus quam quas temporibus veritatis. Deserunt excepturi illum nobis perferendis praesentium repudiandae saepe sapiente voluptatem!"
//     },
//     {
//         title: "Ralph on holiday",
//         with: "Rachel Greene",
//         time: { start: "2024-02-17", end: "2024-02-17" },
//         color: "green",
//         isEditable: true,
//         id: "5602b6f589fc"
//     }
//     // ...
// ])
  const  config = ref({
    // see configuration section
    // defaultMode: 'month',
})

const shiftDrop = ref({});
function dropdownShifts() {
    store.dispatch('loadDropdown', 'shifts').then(({ data }) => {
        shiftDrop.value = data;
    }).catch(e => {
        console.log(e);
        alert('Something Went Wrong')
    })
}
dropdownShifts()
</script>

<style scoped>
    @import "qalendar/dist/style.css";
</style>
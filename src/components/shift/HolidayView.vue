<template>
    <div>
        <fieldset class="border rounded-3 p-1 m-1">
            <legend class="float-none w-auto px-1">Shift Holidays</legend>
            <button class="btn btn-sm btn-primary m-1" @click="openHModal">Add Holiday</button>
    <vue-cal
      :selected-date="currentDate"
      :time-from="9 * 60"
      :disable-views="['years', 'year']"
      active-view="month"
      hide-weekends
      events-on-month-view="short"
      :events="events"
      style="height: 600px">
    </vue-cal>
        </fieldset>

            <o-modal :isOpen="hModal" modal-class="modal-xs" title="Add Holiday to Shift" @submit="markShiftHoliday" @modal-close="closeModal" >
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
// import { Qalendar } from "qalendar";
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
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
const currentDate = ref({})
const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

// This arrangement can be altered based on how we want the date's format to appear.
currentDate.value = `${year}-${month}-${day}`;

const b_errors = ref({});
const holiday = ref({
    shif_pid: '',
    tittle: '',
    note: '',
    start: '',
    end: '',
});
const resetAttr = () =>{
    holiday.value = {
        shif_pid: '',
        tittle: '',
        note: '',
        start: '',
        end: '',
    }
}
function markShiftHoliday() {
    b_errors.value = []
    store.dispatch('postMethod', { param: holiday.value, url: 'mark-shift-holiday' }).then((data) => {
        if (data?.status == 422) {
            b_errors.value = data.data
        } else if (data?.status == 201) {
            loadShiftHolidays()
            resetAttr()
        }
    })
}

//
loadShiftHolidays()
const events = ref([]);

function loadShiftHolidays() {
    store.dispatch('getMethod', { url: '/load-shift-holidays' }).then((data) => {
        if (data?.status == 200) {
            data.data.forEach( (el) => {
                events.value.push({
                    title: el.tittle,
                    start: el.start,
                    end: el.end ,
                    class: 'blue-event',
                    // id: el.id,
                    content:  `<i class="bi bi-alarm">${el.shift.shift} ${el.note}</i>`,
                    // contentFull: 'My shopping list is rather long:<br><ul><li>Avocados</li><li>Tomatoes</li><li>Potatoes</li><li>Mangoes</li></ul>'
                })
            });
            // console.log(events.value);
            // data.data.
        }
    })
}


const shiftDrop = ref({});
function dropdownShifts() {
    store.dispatch('loadDropdown', 'shifts').then(({ data }) => {
        shiftDrop.value = data;
    })
}
dropdownShifts()
</script>

<style scoped>
    @import "qalendar/dist/style.css";
    .vuecal--month-view .vuecal__cell {height: 80px;}

.vuecal--month-view .vuecal__cell-content {
  justify-content: flex-start;
  height: 100%;
  align-items: flex-end;
}

.vuecal--month-view .vuecal__cell-date {padding: 4px;}
.vuecal--month-view .vuecal__no-event {display: none;}
</style>
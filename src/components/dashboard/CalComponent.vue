<template>
    <div>
        <div class="card">
            <!-- <div class="card-header"></div> -->
            <div class="card-body">
                <fieldset class="border shadow rounded-3 p-2 m-1">
                    <legend class="float-none w-auto px-1">Notifications</legend>
                    <vue-cal :selected-date="currentDate" :time-from="9 * 60"
                        :disable-views="['years', 'year', 'week', 'day']" active-view="month" hide-weekends
                        events-on-month-view="short" :events="events" style="height: auto">
                    </vue-cal>
                </fieldset>
            </div>
        </div>
    </div>
</template>

<script setup>
    import VueCal from 'vue-cal'
    import 'vue-cal/dist/vuecal.css'
    import { ref } from "vue";
    const props = defineProps({
    data: Object,

});
    // import store from "@/store";

const currentDate = ref({})
const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

// This arrangement can be altered based on how we want the date's format to appear.
currentDate.value = `${year}-${month}-${day}`;
const events = ref([])
props.data.forEach((el) => {
    events.value.push({
        title: el.tittle,
        start: el.start,
        end: el.end,
        class: 'blue-event',
        // id: el.id,
        content: `<i class="bi bi-alarm bg-dark">${el.shift.shift} ${el.note}</i>`,
        // contentFull: 'My shopping list is rather long:<br><ul><li>Avocados</li><li>Tomatoes</li><li>Potatoes</li><li>Mangoes</li></ul>'
    })
});

</script>

<style scoped>

 @import "qalendar/dist/style.css";

 .vuecal--month-view .vuecal__cell {
     height: 60px;
 }

 .vuecal--month-view .vuecal__cell-content {
     justify-content: flex-start;
     height: 100%;
     align-items: flex-end;
 }

 .vuecal--month-view .vuecal__cell-date {
     padding: 4px;
 }

 .vuecal--month-view .vuecal__no-event {
     display: none;
 }
</style>
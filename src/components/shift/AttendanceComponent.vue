<template>
    <div>
        <div class="attendance-card shadow">
             <h5 class="card-title h6 text-center">{{ date }} <span>| {{ time }}</span></h5>
             <div class="col-outer">
                <div class="col-inner">
                    Time in
                    <hr>
                    {{timeIn}}
                </div>
                <div class="col-inner">
                    time out
                    <hr>
                    {{timeOut}}
                </div>
             </div>
             <button @click="startCamera" v-if="clockBtn == false" class="btn btn-sm btn-primary actionBtn">Clock In</button>
             <button @click="clockOut" v-if="clockBtn== true" class="btn btn-sm btn-danger actionBtn">Clock Out</button>

        </div>

        <o-modal  :isOpen="toggleModal" modal-class="modal-sm" title="Take Attendance" @modal-close="closeModal">
            <template #content>
                <button @click="initCamera" class="btn btn-sm btn-success">Retake</button>
                <div class="container" v-if="startStream">
                    <video ref="video" width="250" v-if="stopStream" height="250" autoplay></video>
                    <button @click="captureImage" v-if="stopStream" class="btn btn-sm btn-success">Capture Image</button>
                    <canvas ref="canvas" width="250" height="250" style="display: none;"></canvas>
                    <img v-if="capturedImage" :src="capturedImage" alt="Captured Image" />

                    <p v-if="coordinates">Coordinates: {{ coordinates.latitude }}, {{ coordinates.longitude }}</p>
                    <p v-if="locationError">{{ locationError }}</p>
                </div>
            </template>
            <template #footer><div></div></template>
        </o-modal>
    </div>
</template>

<script setup>
import store from '@/store';
import OModal from '@/components/OModal.vue';

import { ref, onMounted } from 'vue'
const toggleModal = ref(false)

const date = ref(null);
date.value = new Date().toDateString();
const time = ref()
function timer() {
    time.value = new Date().toLocaleTimeString();
}
setInterval(() => timer(), 1000)
const timeIn = ref('--:--')
const timeOut = ref('--:--')
const clockBtn = ref(null)
const closeModal = () => {
    toggleModal.value = false;
    stopCamera()
};
const startCamera = () => {
    toggleModal.value = true;
    initCamera()
};
const video = ref(null);
const canvas = ref(null);
const capturedImage = ref(null);
const startStream = ref(false);
const stopStream = ref(true);
let stream = null;
const attendance = ref({})
const initCamera = async () => {
    try {
        startStream.value = true
        stopStream.value = true
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.value.srcObject = stream;
    } catch (error) {
        console.error('Error accessing webcam:', error);
    }
}
const captureImage = async () => {
    platform();
    agent();
    const context = canvas.value.getContext('2d');
    context.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);
    stopCamera()
    // Convert the canvas image to a data URL
    capturedImage.value = canvas.value.toDataURL('image/png');
    attendance.value.image = capturedImage;
    clockIn()
};

// Initialize the webcam when the component is mounted
// initCamera();

const platform = () => {
    const platform = navigator.platform;
    let pf;
    if (platform.toLowerCase().includes('win')) {
        pf = 'Windows';
    } else if (platform.toLowerCase().includes('mac')) {
        pf = 'macOS';
    } else if (platform.toLowerCase().includes('linux')) {
        pf = 'Linux';
    } else {
        pf = 'Unknown OS';
    }
    attendance.value.platform = pf
}

const agent = () => {
    const userAgent = navigator.userAgent;
    let brow;
    if (userAgent.includes('Chrome')) {
        brow = 'Google Chrome';
    } else if (userAgent.includes('Firefox')) {
        brow = 'Mozilla Firefox';
    } else if (userAgent.includes('Safari')) {
        brow = 'Apple Safari';
    } else if (userAgent.includes('Edge')) {
        brow = 'Microsoft Edge';
    } else if (userAgent.includes('Opera') || userAgent.includes('OPR/')) {
        brow = 'Opera';
    } else if (userAgent.includes('Brave')) {
        brow = 'Brave';
    } else {
        brow = 'Unknown Browser';
    }
    attendance.value.browser = brow
}



const stopCamera = () => {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
    stopStream.value = false
}

// coordinates
const coordinates = ref(null);
const locationError = ref(null);

onMounted(() => {

    getLocation()
})

const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                coordinates.value = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy,
                };
                // coordinates.value = position.coords
                attendance.value.coordinates = coordinates
                console.log(position);
            },
            (error) => {
                locationError.value = `Error getting location: ${error.message}`;
                attendance.value.coordinates = null;
            }, { enableHighAccuracy: true }
        );
    } else {
        attendance.value.coordinates = null;
        locationError.value = 'Geolocation is not supported by your browser.';
    }
};

function getLocationName(lat, lng) {
    // Replace 'YOUR_API_KEY' with your Google Maps API key
    const apiKey = 'YOUR_API_KEY';
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const locationName = data.results[0].formatted_address;
            document.getElementById('locationName').textContent = `Location Name: ${locationName}`;
        })
        .catch(error => {
            console.error('Error fetching location data:', error);
        });
}

// Example coordinates (replace with your actual coordinates)
const latitude = 37.7749;
const longitude = -122.4194;

getLocationName(latitude, longitude);


function clockIn() {
    store.dispatch('postMethod', { url: '/clock-in', param: attendance.value }).then((data) => {
        if (data?.status == 201) {
            clockBtn.value = false;
            timeIn.value = data?.data?.time_in;
            toggleModal.value = false;
        }
    });
}


const checkedInToday = () => {
//last-check-in
    store.dispatch('getMethod', { url: '/last-check-in' }).then((data) => {
        if (data?.status == 200) {
            clock(data?.data)
        }
    });
}
 onMounted(()=>{
    checkedInToday()
 })


const clockOut = () => {
    store.dispatch('putMethod', { url: '/clock-out',prompt:"are you sure you want to clock out?" }).then((data) => {
        if (data?.status == 201) {
            clock(data?.data)
        }
    });
}
const clock = (data) => {
    if (data == null) {
        clockBtn.value = false;
    } else {
        timeIn.value = data?.time_in;
        clockBtn.value = true;
        if (data.time_out != null) {
            timeOut.value = data?.time_out;
            clockBtn.value = null;
        }
    }
}



</script>

<style scoped>
    .attendance-card{
        max-width: 100%;
        padding: 5px;
        background-color: #f1f1f1;
        /* box-shadow: #f1f1f1; */
       /* box-shadow: inset 5em 1em #646363; */
    }
    .col-outer{
        display: flex;
        justify-content: space-between;
        padding: 5px;
        text-transform: uppercase;
    }
    .actionBtn{
        width: 100%;
    }
</style>
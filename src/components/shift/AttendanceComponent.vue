<template>
    <div>
        <button @click="startCamera" class="btn btn-sm btn-primary">Take</button>

        <o-modal  :isOpen="toggleModal" modal-class="modal-sm" title="Take Attendance" @submit="createShift" @modal-close="closeModal">
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
    takeAttendance()
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
                };
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


function takeAttendance() {
    store.commit('setSpinner', true)
    store.dispatch('postMethod', { url: '/take-attendance', param: attendance.value });
}
</script>

<style scoped></style>
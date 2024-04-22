<template>
    <div>
        <div class="card">
            <div class="card-body">
                <div class="details">
                    <div class="card card-item">
                        <div class="card-header">
                            <span class="badge bg-info p-1 m-1">
                                <small class="small">From {{ data.start }} to {{ data.to }} </small> </span>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">{{ data.title }}

                            </h5>
                            <small>Status: {{ data?.request_status }} </small> <br>
                            <span class="badge bg-dark p-1 m-1">
                                <i class="bi bi-person"></i> {{ data?.user?.username }}
                            </span>
                        </div>
                    </div>

                    <div class="card card-item">
                        <div class="card-header">
                            <p>{{ data?.department?.department }}</p>
                        </div>
                        <div class="card-body">
                            <p> Destination: {{ data.destination }}</p>

                            Crew
                            <hr>
                            <span v-for="em in data.crew" :key="em.pid" class="badge bg-dark p-1 m-1">
                                {{ em.text }}
                            </span>
                        </div>
                    </div>

                    <div class="card  card-item">
                        <div class="card-header">
                            Items
                        </div>
                        <div class="card-body">
                            <span class="badge bg-dark p-1 m-1">
                                {{ data.itinerary }}
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script setup>
 defineProps({
    data: Object,
   
});
</script>

<style scoped>

    .details{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

        .card-item {
            flex: 1 1 200px;
            /* Adjust as needed */
            /* background-color: #ccc; */
            margin: 10px;
            padding: 20px;
            box-sizing: border-box;
        }
    
        /* Media query for smaller screens */
        @media screen and (max-width: 768px) {
            .card-item {
                flex: 1 1 150px;
                /* Adjust flex properties for smaller screens */
            }
        }
    
        /* Media query for even smaller screens */
        @media screen and (max-width: 480px) {
            .details {
                    display: flex;
                    flex-direction: column;
                }
            .card-item {
                width:100%;
                /* Adjust flex properties for even smaller screens */
            }
        }

</style>
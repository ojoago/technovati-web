<template>
    <div>
     <div class="overlay" v-if="spin">
                <div calss="spinner">
                    <span class="loader"></span>
                    <!-- <div id="spinner-text">loging Out...</div> -->
                </div>
            </div>

            <div class="notification text-white" v-if="notification?.status" :class="`bg-${notification?.type}`">
             {{ notification?.message }}
            </div>
    </div>
</template>

<script setup>
    
    const notification = [];
    const spin = true;
</script>

<style scoped>


  

.spinner {
    display: block;
    margin-top:50% !important;
    margin-left:50% !important;
    float: center;
    width: 150px;
    background-color: black;
  }

 /* loader  */
        /* .loader {
            animation: rotate 1s infinite;
            height: 50px;
            width: 50px;
        }

        .loader:before,
        .loader:after {
            border-radius: 50%;
            content: "";
            display: block;
            height: 20px;
            width: 20px;
        }

        .loader:before {
            animation: ball1 1s infinite;
            background-color: #686060;
            box-shadow: 30px 0 0 #ff3d00;
            margin-bottom: 10px;
        }

        .loader:after {
            animation: ball2 1s infinite;
            background-color: #ff3d00;
            box-shadow: 30px 0 0 #f1ff;
        }

        @keyframes rotate {
            0% {
                transform: rotate(0deg) scale(0.8)
            }

            50% {
                transform: rotate(360deg) scale(1.2)
            }

            100% {
                transform: rotate(720deg) scale(0.8)
            }
        }

        @keyframes ball1 {
            0% {
                box-shadow: 30px 0 0 #ff3d00;
            }

            50% {
                box-shadow: 0 0 0 #ff3d00;
                margin-bottom: 0;
                transform: translate(15px, 15px);
            }

            100% {
                box-shadow: 30px 0 0 #ff3d00;
                margin-bottom: 10px;
            }
        }

        @keyframes ball2 {
            0% {
                box-shadow: 30px 0 0 #fff;
            }

            50% {
                box-shadow: 0 0 0 #3b3a3a;
                margin-top: -20px;
                transform: translate(15px, 15px);
            }

            100% {
                box-shadow: 30px 0 0 #4b4949;
                margin-top: 0;
            }
        } */
.loader {
  width: 48px;
  height: 48px;
  position: relative;
}
.loader::before , .loader::after{
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50% , -50%);
  width: 48em;
  height: 48em;
  background-image:
    radial-gradient(circle 10px, #6b6767 100%, transparent 0),
    radial-gradient(circle 10px, #6b6767 100%, transparent 0),
    radial-gradient(circle 10px, #6b6767 100%, transparent 0),
    radial-gradient(circle 10px, #6b6767 100%, transparent 0),
    radial-gradient(circle 10px, #6b6767 100%, transparent 0),
    radial-gradient(circle 10px, #6b6767 100%, transparent 0),
    radial-gradient(circle 10px, #6b6767 100%, transparent 0),
    radial-gradient(circle 10px, #6b6767 100%, transparent 0);
  background-position: 0em -18em, 0em 18em, 18em 0em, -18em 0em,
                       13em -13em, -13em -13em, 13em 13em, -13em 13em;
    background-repeat: no-repeat;
  font-size: 0.5px;
  border-radius: 50%;
  animation: blast 1s ease-in infinite;
}
.loader::after {
  font-size: 1px;
  background: #4b4747;
  animation: bounce 1s ease-in infinite;
}

@keyframes bounce {
  0% , 100%{ font-size: 0.75px }
  50% { font-size: 1.5px }
}
@keyframes blast {
  0% , 40% {
    font-size: 0.5px;
  }
  70% {
    opacity: 1;
    font-size: 4px;
  }
   100% {
     font-size: 6px;
    opacity: 0;
  }
}
    

</style>
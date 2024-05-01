<template>
    <div >
        <div class="card shadow">
            <!-- <h5 class="card-title h6 text-center"> Text</h5> -->
            <div class="card-header p-1"> <span class="text-ellipsis">{{title}}</span> </div>
            <div class="card-body p-2">
                <i class="icon" v-if="icon" :class="icon"></i>
                <i class="icon bi bi-list" v-else></i>
                <strong class="h3 count">{{ count }}</strong>
            </div>
            <div class="card-footer p-1">
                <label class="float-end" for=""><router-link :to="link" class="nav-link">
                        <i class="bi bi-chevron-double-right small"></i> Details </router-link></label>
            </div>
        </div>
    </div>
</template>

<script setup>
    
    defineProps({
        title:{type:String,default:'item'},
        count:{type:Number ,default:0},
        link:{type:String ,default:''},
        icon:{type:String ,default:''},
    })
</script>

<style scoped>
.card{
    min-height: 140px;
}

.card-body{
    display: flex;
        justify-content: space-between;
}

.count{
    overflow: hidden !important;
        text-overflow: ellipsis !important;
        white-space: nowrap !important;
        /* display: block !important; */
         position: sticky; 
    /* width: 100% !important; */
}
  .icon{
    background: #000; 
    border-radius: 10%;
    color:#fff;
    height: 30px;
    width: 30px;
    align-content: center;
    text-align: center;
    padding: auto;
    padding-top: 2px;
  }
</style>
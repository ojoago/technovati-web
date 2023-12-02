<template>
       <div >
        <section>
            <div class="header">
                <div class="header_left">
                    <div class="d-flex ">
                         <router-link to="/welcome" class="nav-link">
                            <span class="nav-brand"> Home </span>
                       </router-link>
                    </div>
                </div>
                <div class="float-end header_right">
                    <li class="nav-item" title="Item Request">
                     <router-link to="/sign-in" class="nav-link"><i class="bi bi-box-arrow-in-right"></i> Sign In</router-link>
                    </li>
                    <li class="nav-item" title="Item Request">
                     <router-link to="/sign-up" class="nav-link"><i class="bi bi-box-arrow-in-up"></i> Sign Up</router-link>
                    </li>
                     
                </div>
            </div>
     </section>
        <section>
                    <router-view></router-view>
        </section>
    </div>
</template>

<script setup>
    
</script>

<style scoped>
.header{
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
}
.nav-brand{
    text-transform: uppercase;
    text-decoration: none;
    color: #fff;
}
.header_right{
    display: inline-block;
    display: flex;
}
li{
    list-style: none;
    padding: 0 5px;
    color: #fff;
}
*{
    background: #000;
}
</style>
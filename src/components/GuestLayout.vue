<template>
       <div id="outer">
        <section>
            <div class="header_">
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


#outer {
    height: 100vh;
}

.header_{
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    height: 60px;
        display: flex;
        align-items: center;
        transition: all 0.5s;
        box-shadow: 0px 2px 20px rgba(1, 41, 112, 0.1);
        /* background-color: #fff; */
        width: 100%;
        /* position: fixed; */
        top: 0;
        z-index: 110;
        margin-bottom: 10px;
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
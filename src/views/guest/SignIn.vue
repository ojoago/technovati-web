<template>
    <div id="outer">
        <div class="form">
            <!-- <h1>Technovati</h1> -->
            <div class="ctainer">
                <div class="main">
                    <div class="content">
                        <h2>Sign In</h2>
                        <form  @submit.prevent="login">
                            <input type="text" v-model="user.email"  placeholder="Enter Email/Username/GSM">
                            <p class="text-danger " v-if="errors?.email">{{ errors?.email[0] }}</p>
                            <input type="password" v-model="user.password" name="" placeholder="Enter Password">
                            <p class="text-danger " v-if="errors?.password">{{ errors?.password[0] }}</p>
                            <button class="btn">Sign In</button>
                        </form>
                    </div>

                    <div class="form-img">
                        <img src="../../assets/images/logo.jpg" class="invite-img" alt="tv Logo" />
                    </div>
                </div> 
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import store from "../../store";
    import { useRouter } from 'vue-router';
    const router = useRouter()
    const user = {
        'email': '',
        'password': '',
        'remember': false
    }
    const errors = ref({})

    function login() {
        errors.value = [];
        store.dispatch('signIn', user).then((data) => {
            if(data?.status==422){
                errors.value = data.data;
                return false
            }
            let name = data?.data.roles[0];
            if(name =='staff'){
                name = 'Self'
            }
            name = name[0].toUpperCase() + name.substring(1)+'Dashboard'
            // alert(name)
            router.push({ name: name })
        }).catch(e => {
            store.commit('setSpinner', false)
            console.log(e);
        })
    }

</script>

<style scoped>
*{
    box-sizing: border-box;
    font-family: sans-serif;
    padding: 0;
    margin: 0;
    /* height: 100vh; */
}


.ctainer{
    height: 100%;
}

.form{
    position: relative;
    z-index: 0;
    background: #000;
    padding: 30px;
    justify-content: center;
    display: grid;
    /* grid-template-rows: 1fr auto 1fr; */
    align-items: center;
}


.ctainer{
    max-width: 700px;
    margin-top: 0 auto;
}


.form h1{
    text-align: center;
    font-size: 2.5rem;
    font-weight: 400;
    color: #fff;
    font-family: sans-serif;
    text-transform: uppercase;
}


.form h2{
    line-height: 40px;
    margin-bottom: 5px;
    font-size: 30px;
    font-weight: 500;
    text-align: center;
}


.form .main{
    position: relative;
    display: flex;
    margin: 30px 0;
}


.content{
    flex-basis: 50%;
    padding: 3em 3em;
    box-shadow: 2px 9px 49px -17px rgba(0, 0, 0, .1) ;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    background: #fff;
    margin: 2px;
}

.form-img{
    margin: 2px;
    flex-basis: 50%;
    background: #f0f4f8;
    background-size: cover;
    padding: 40px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    align-items: center;
    display: grid;
}


.form-img img{
    max-width: 100%;
}


.btn,button,input{
    border-radius: 35px;
}
.btn:hover,button:hover{
    color: #272346;
    transition: .5 ease;
}

/* 
.form form{
    margin: 30px 0;
} */

form input{
    outline: none;
    margin-bottom: 15px;
    font-stretch: 16px;
    color: #999;
    padding: 14px 20px;
    width: 100%;
    display: inline-block;
    box-sizing: border-box;
    border: none;
    background: #fcfcfc;
    transition: 0.3s ease;
    border: 1px solid #69275c;
}
form input:focus{
    background: transparent;
    border: 1px solid #69275c;
}

.form button{
    font-size: 18px;
    color: #fff;
    width: 100%;
    background: #69275c; 
    font-weight: 600;
    transition: .3 ease;
    padding: 14px 20px;
}



@media(max-width: 756px){
    .form .main{
        flex-direction: column;
    }

    .form form{
        margin-top: 30px;
        margin-bottom: 10px;
    }
    .form-img{
        /* border-radius: 0; */
        border-radius: 15px;
        /* border-bottom-right-radius: 8px; */
        order: 1;
        padding: 20px;
        justify-content: center;
        align-items: center;
        text-align: center !important;
    }


    .content{
        order: 2;
        border-radius: 20px;
        /* border-top-right-radius: 8px; */
    }
}


</style>
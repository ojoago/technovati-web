

<template>
    <div>
        <div class="form">
            <img src="../../assets/images/logo.jpg" class="invite-img" alt="tv Logo" />
            <div class="ctainer">
                <div class="main">
                    <div class="content">
                        <h2>Sign Up</h2>
                        <form action="">
                            <input type="text" name="" placeholder="enter email address">
                            <input type="text" name="" placeholder="enter username">
                            <input type="text" name="" placeholder="enter Phone Number">
                            <input type="text" name="" placeholder="enter password">
                            <button class="btn">Sign Up</button>

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

</script>

<style scoped>
* {
    box-sizing: border-box;
    font-family: sans-serif;
    padding: 0;
    margin: 0;
}

.form {
    position: relative;
    min-height: 100vh;
    z-index: 0;
    background: #000;
    padding: 30px;
    justify-content: center;
    display: grid;
    grid-template-rows: 1fr auto 1fr;
    align-items: center;
}

.ctainer {
    max-width: 700px;
    margin-top: 0 auto;
}

.form h1 {
    text-align: center;
    font-size: 2.5rem;
    font-weight: 400;
    color: #fff;
    font-family: sans-serif;
    text-transform: uppercase;
}

.form h2 {
    line-height: 40px;
    margin-bottom: 5px;
    font-size: 30px;
    font-weight: 500;
    text-align: center;
}

.form .main {
    position: relative;
    display: flex;
    margin: 30px 0;
}

.content {
    flex-basis: 50%;
    padding: 3em 3em;
    box-shadow: 2px 9px 49px -17px rgba(0, 0, 0, .1);
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    background: #fff;
}

.form-img {
    flex-basis: 50%;
    background: #f0f4f8;
    background-size: cover;
    padding: 40px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    align-items: center;
    display: grid;
}

.form-img img {
    max-width: 100%;
}

.btn,
button,
input {
    border-radius: 35px;
}

.btn:hover,
button:hover {
    color: #272346;
    transition: .5 ease;
}

.form form {
    margin: 30px 0;
}

form input {
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

form input:focus {
    background: transparent;
    border: 1px solid #69275c;
}

.form button {
    font-size: 18px;
    color: #fff;
    width: 100%;
    background: #69275c;
    font-weight: 600;
    transition: .3 ease;
    padding: 14px 20px;
}

@media(max-width: 756px) {
    .form .main {
        flex-direction: column;
    }

    .form form {
        margin-top: 30px;
        margin-bottom: 10px;
    }

    .form img {
        border-radius: 0;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        /* order: 1; */
    }

    .content {
        /* order: 2; */
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }
}</style>
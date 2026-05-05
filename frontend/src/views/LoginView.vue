<script setup>
    import LoginForm from "../components/LoginForm.vue"
    import NavBar from "../components/NavBar.vue";
</script>

<template>
    <div class="login-view">
        <LoginForm />
    </div>
    
</template>

<style scoped>
    .login-view {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: linear-gradient(135deg, #198754, #75997d);
    }
</style>
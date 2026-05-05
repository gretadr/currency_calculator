<script setup>
    import ConvertForm from "../components/ConvertForm.vue";
    import NavBar from "../components/NavBar.vue";
</script>

<template>
    <div class="converter-view">
        <ConvertForm />
    </div>
    
</template>

<style scoped>
    :global(body) {
        margin: 0 !important;
        padding: 0 !important;
    }
    .converter-view{
        position: fixed;
        top:0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #198754, #2d9d6f, #20c997, #0d6efd);
        background-size: 400% 400%;
        animation: gradientShift 15s ease infinite;
    }

    @keyframes gradientShift {
        0% {background-position: 0% 50%; }
        50% {background-position: 100% 50%; }
        100% {background-position: 0% 50%; }
    }
</style>
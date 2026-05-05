<script setup>
    import ListCurrencies from '../components/ListCurrencies.vue';
    import NavBar from "../components/NavBar.vue";
</script>
<template>
    <div class="admin-view">
        <div><ListCurrencies /></div>
    </div>
    
</template>

<style scoped>
    .admin-view {
        padding-top: 12vh;
    }
</style>
<script setup>

    import { ref, onMounted, watch } from "vue";
    import { useRouter, useRoute } from "vue-router";
    import { jwtDecode } from "jwt-decode";
    
    const router = useRouter() ;
    const route = useRoute() ;
    const username =ref("");

    //GET username from token if logged in
    function loadUsername() {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const decoded = jwtDecode(token);
                username.value = decoded.username;
            } catch {
                localStorage.removeItem("token");
                username.value=""
            }
        } else {
            username.value = "";
        }
    }
    
    //Run on initially
    onMounted(loadUsername);

    //Rerun when route changes
    watch(() => route.name, loadUsername);

    //Remove token and redirect to home page
    function logout () {
        localStorage.removeItem("token");
        username.value = "";
        router.push({ name: "home" });
    }

</script>

<template>
    <nav class="navbar">
        <div class="nav-links">
            <button class="btn btn-light" @click="router.push({ name: 'home'})">Home</button>
            <button v-if="route.name !== 'converter'" class="btn btn-light" @click="router.push({ name: 'converter'})">Currency Calculator</button>
            <button v-if="username && route.name !== 'admin'" class="btn btn-light" @click="router.push({ name: 'admin'})">Exchange Rate Manager</button>
        </div>

        <div class="nav-user">
            <span v-if="username" class="user-greeting">Hello {{ username }}</span>
            <button v-if="username" class="btn btn-outline-light" @click="logout">Logout</button>
            <button v-else-if="route.name !=='login'" class="btn btn-outline-light" @click="router.push({ name: 'login'})">Login</button>
        </div>

    </nav>
</template>

<style scoped>

    .navbar {
        z-index: 2;
        position: fixed;
        left: 0;
        top: 0;
        height: 12vh;
        width: 100vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
        background: rgba(24, 19, 19, 0.281);
        backdrop-filter: blur(10px);
    }

    .nav-links , .nav-user{
        display: flex;
        gap: 1rem;
        align-items: center;
    }

    .user-greeting {
        color: white;
        font-weight: 500;
    }
</style>
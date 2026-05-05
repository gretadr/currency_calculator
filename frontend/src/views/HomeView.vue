<script setup>
    import { useRouter } from "vue-router";
    import { ref, onMounted } from "vue";
    import { jwtDecode } from "jwt-decode";

    const router = useRouter();

    const username = ref("");

    //Take username from token if user is logged in
    onMounted(() => {
        const token = localStorage.getItem("token");
        
        if (token) {
            try {
                const decoded =jwtDecode(token);
                username.value = decoded.username;
            } catch {
                localStorage.removeItem("token");
            }
        }
    })


</script>

<template>
    <div class="home-container">
        <div class="content text-center">
            <h1 v-if="username" class="title">Hello, <span id="username">{{ username }}</span> ! Welcome Back!</h1>
            <h1 v-else class="title">Welcome to Currency Calculator! </h1>
            <p class="subtitle"> Convert currencies or manage exchange rates</p>
            <div class=" d-flex justify-content-center gap-3 mt-5">
                <button class="btn btn-light btn-lg px-4" @click="router.push({ name: 'converter'})">Currency Calculator</button>
                <button v-if="username" class="btn btn-outline-light btn-lg px-4" @click="router.push({ name: 'admin' })">Go to Exchange Rate Manager </button>
                <button v-else class="btn btn-outline-light btn-lg px-4" @click="router.push({ name: 'login' })">Login</button>
            </div>
        </div>

    </div>
</template>

<style scoped>

    .home-container {
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

    .content {
        animation: fadeInUp 1s ease-out;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .title {
        font-size: 3.5rem;
        font-weight: 700;
        color: white;
        letter-spacing: -1px;
        margin-bottom: 1rem;
        text-shadow: 0 2px 10px rgba(0,0,0,0.2);
    }

    .subtitle {
        font-size: 1.2rem;
        color: white;
        opacity: 0.95;
    }

    .btn {
        transition: all 0.3s ease;
    }

    .btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 16px rgba(0,0,0,0.2);
    }

    #username {
        color: #ffd700;
    }

</style>
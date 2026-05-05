<script setup>
    import { ref, watch } from "vue";
    import { useRouter } from "vue-router";
    import { login } from "../services/api.js";

    const router = useRouter();

    const username = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const loading = ref(false);

    //Handle login submission
    async function onSubmit() {
        try {
            loading.value = true;

            const data = await login(username.value, password.value);
            localStorage.setItem("token", data.token);
            router.push({ name: "admin"});
        } catch (err) {
            // console.error(err.response.data);
            errorMessage.value = err.response?.data?.error || "Login failed";
            username.value = "";
            password.value = "";
        } finally {
            loading.value = false;
        }
    }



</script>

<template>

    <div class="vh-100 d-flex align-items-center justify-content-center">
        <form  @submit.prevent="onSubmit">
            <h2 class="mb-4">Login</h2>
            <div class="mb-3">
                <!-- <label for="username" class="form-label">Username</label> -->
                <input type="text" class="form-control mt-2" id="username" placeholder="Username" required v-model.trim="username" @input="errorMessage=''">
            </div>
            <div class="mb-3">
                <!-- <label for="password" class="form-label">Password</label> -->
                <input type="password" class="form-control" id="password"  placeholder="Password" required v-model="password" @input="errorMessage=''">
                <small class="form-text text-danger" v-if="errorMessage"> {{ errorMessage }}</small>
            </div>
            <button type="submit" class="btn btn-success w-100 mt-3" :disabled="loading">{{ loading ? "Logging in..." : "Login" }}</button>
        </form>
    </div>
    
</template>

<style scoped>
    form {
        max-width: 600px;
        margin: 5rem auto;
        padding: 2rem;
        border: 1px solid #ddd;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        background-color: #fff;
    }
</style>

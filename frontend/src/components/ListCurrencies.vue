<script setup>
    import { ref, onMounted } from "vue";
    import { getRates, deleteRate } from "../services/api.js";
    import EditCurrency from "./EditCurrency.vue";
    import CreateCurrencyForm from "./CreateCurrencyForm.vue";

    const rates = ref([]);
    const message = ref("");
    const messageType = ref("");

    //Display a message in case of success or error
    function setMessage(text, type) {
        message.value = text;
        messageType.value = type;

        setTimeout(() => {
            message.value = "";
            messageType.value = "";
        }, 3000);
        
    }

    //Handle successful create from child component
    function handleCreated(msg) {
        setMessage(msg || "Created successfully", "success");
        getAllRates();
    }

    //Handle successful update from child componenr
    function handleUpdated(msg) {
        console.log("handleUpdated called with:", msg);
        setMessage(msg || "Updated successfully", "success");
        getAllRates();
    }

    //GET ALL exchange rates from API
    async function getAllRates () {
        try {
            const data = await getRates();
            rates.value = data
            // console.log(rates.value);
        } catch (err) {
            console.error(err.response?.data?.error || err?.message || "Server Error");
            setMessage(err.response?.data?.error || err?.message || "Server Error", "danger");
        }
    }

    //Delete a specific rate and update the list
    async function deleteSelectedRate (id) {
        try {
            const result = await deleteRate(id);
            // console.log(response);
            rates.value = rates.value.filter(rate => rate.id !== id );

            setMessage(result.message || "Deleted successfully", "success");
        } catch (err) {
            console.error(err.response?.data?.error || err?.message || "Server Error");
            setMessage(err.response?.data?.error || err?.message || "Server Error", "danger");

        }
    }

    onMounted(() => {
        getAllRates();
    });

</script>

<template>
    <div class="container ">
        <p v-if="message" :class="`message-bar text-${messageType}`">{{  message }}</p>
        <CreateCurrencyForm @rate-created="handleCreated"/>
        <div class="table-wrapper">
            <table class="table table-striped text-center table-hover">
                <thead>
                    <tr>
                        <th>From</th>
                        <th>To</th>
                        <th>Rate</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="rate in rates" :key="rate.id">
                        <td>{{ rate.from_currency }}</td>
                        <td>{{  rate.to_currency }}</td>
                        <td>{{ Number(rate.rate).toFixed(4) }}</td>
                        <td><EditCurrency :rate="rate" @rate-updated="handleUpdated" /> </td>
                        <td><button class="btn  btn-danger" @click="deleteSelectedRate(rate.id)">Delete</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
        

        
    </div>

</template>

<style scoped>

    .container {
        z-index: 1;
        height: 88vh;
        max-width: 100%;
        overflow-y: auto;
    }

    .table-wrapper {
        max-height: calc(88vh - 5rem);
        overflow-y: auto;
        margin-top: 1rem;
    }

    .table thead {
        position: sticky;
        top: 0;
        background: white;
        z-index: 4;
    }

    .message-bar {
        position: fixed;
        top: 12.5vh;
        left: 50%;
        font-weight: 500;
        font-size: 1rem;
        transform: translateX(-50%);
        z-index: 100;
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        background: white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        min-width: 300px;
        text-align: center;
    }

</style>
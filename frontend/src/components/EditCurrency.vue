<script setup>
    import { ref, watch} from "vue";
    import { updateRate } from "../services/api.js";

    //Receive object from parent component
    const props = defineProps({
        rate: Object
    });

    // Notify parent component when a rate is upadated
    const emit =defineEmits(["rate-updated"]);
    
    const passedRate = ref(Number(props.rate.rate).toFixed(4));

    const message = ref("");
    const messageType = ref("");

    // Sync local state when the parent rate changes
    watch(() => props.rate, (newRate) => {
        passedRate.value = Number(newRate.rate).toFixed(4);
    });

    //Clear message when user types
    watch(passedRate, () => {
        message.value = "";
        messageType.value = "";
    });

    // Send updated rate to the API
    async function updatePassedRate (id) {
        try {
            const response = await updateRate(id, Number(passedRate.value));
            emit("rate-updated", response.message || "Updated successfully");
        } catch (err) {
            console.error(err.response?.data?.error || "Update failed");
        }
    }

    //Reset value if user closes the modal without saving
    function resetRate() {
        passedRate.value = props.rate.rate;
    }

</script>

<template>
    <div>
        <!-- Button trigger modal -->
        <button type="button" class="edit-btn btn " data-bs-toggle="modal" :data-bs-target="`#id${rate.id}`">
        Edit
        </button>

        <!-- Modal -->
        <div class="modal fade" :id="`id${rate.id}`" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ rate.from_currency }} → {{ rate.to_currency }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="resetRate"></button>
                    </div>
                    <div class="modal-body">
                            <p v-if="message" :class="`text-${messageType}`">{{  message }}</p>
                            <input type="number" class="form-control" v-model="passedRate">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="resetRate">Close</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="updatePassedRate(rate.id)">Save changes</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>
    .edit-btn {
    background-color: #678e99; 
    border-color: #678e99;
    color: white;
    transition: all 0.3s ease;
    }

    .edit-btn:hover {
        background-color: #547883;
        border-color: #547883;
        color: white;
    }

</style>
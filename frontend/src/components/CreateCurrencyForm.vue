<script setup>
    import { ref, watch } from "vue";
    import { createRate } from "../services/api.js";

    //Notify parent component when a new rate is created
    const emit = defineEmits(["rate-created"]);

    const from =ref("");
    const to = ref("");
    const rate = ref(null);
    const errorMessage = ref("");
    
    //Clear error message when user types
    watch([from, to, rate], () => {
        errorMessage.value="";
    });

    //Send new rte to API
    async function onCreate() {
        try {
            const result = await createRate(from.value, to.value, Number(rate.value)) ;
            // console.log(result.data);    
            emit("rate-created", result.message);
            
            resetInputs();

            document.querySelector("#create-modal .btn-close")?.click();

        } catch (err) {
            console.error(err.response?.data?.error || "Unable to create");
            errorMessage.value = err.response?.data?.error || err.response?.data?.message || "Unable to create"; 
        }
    }

    //Reset form fields
    function resetInputs () {
        from.value ="";
        to.value = "";
        rate.value=null ;
        errorMessage.value ="";
    }

</script>

<template>
    <div>
        <!-- Button trigger modal -->
         <div class="sticky-bar">
            <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-primary create-btn mt-5 px-3 py-2" data-bs-toggle="modal" data-bs-target="#create-modal">
                New Exchange Rate
                </button>
            </div>
         </div>

        <!-- Modal -->
        <div class="modal fade" id="create-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Create Exchange Rate</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="resetInputs"></button>
                    </div>
                    <div class="modal-body">
                        <p v-if="errorMessage" class="text-danger">{{  errorMessage }}</p>
                        <div class="mb-3 d-flex align-items-center">
                            <label class="form-label me-3 mb-1">From</label>
                            <input type="text" class="form-control" placeholder="e.g EURO (EUR)" v-model="from">
                        </div>

                        <div class="mb-3 d-flex align-items-center">
                            <label class="form-label me-3 mb-1">To</label>
                            <input type="text" class="form-control" placeholder="e.g US DOLLAR (USD)" v-model="to">
                        </div>

                        <div class="mb-3 d-flex align-items-center">
                            <label class="form-label me-3 mb-1">Rate</label>
                            <input type="number" class="form-control" placeholder="0.00" step="0.0001" v-model="rate">
                        </div>
                        
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="resetInputs">Cancel</button>
                        <button type="button" class="btn btn-primary" @click="onCreate">Create</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>

    .form-label {
        min-width: 50px;
    }

    .create-btn {
        background-color: #295083;
        border-color: #295083;
        color: white;
        font-weight: 400;
        font-size: 1.1rem;
        padding: 0.5rem 1.5rem;
        transition: all 0.3s ease;
    }

    .create-btn:hover {
        background-color: #1f3d66;
        border-color: #1f3d66;
        color: white;
    }
    .sticky-bar {
    position: fixed;
    top: 2rem;
    left: 45%;
    z-index: 50;
}
</style>
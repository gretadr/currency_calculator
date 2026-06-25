<script setup>
    import { ref, onMounted, computed, watch, nextTick } from "vue";
    import { convertCurrency, getRates } from "../services/api.js";
    import Multiselect from "vue-multiselect";   //////////////////////
    import "vue-multiselect/dist/vue-multiselect.css";   ////////

    const from = ref("");
    const to = ref("");
    const amount = ref(100);
    const calculation =ref(0);
    const rates = ref([]);
    const errorMessage =  ref("");

    let timeout; 
    
    //Get the unique from_currency values for the first dropdown
    const uniqueFromCurrencies = computed(() => {
        const fromCurrencies = rates.value.map(rate => rate.from_currency);
        return[...new Set(fromCurrencies)];
    });

    //Get the available to_currency values based on selected from_currency
    const availableToCurrencies = computed(() => {
        return rates.value.filter(rate => rate.from_currency === from.value).map(rate=>rate.to_currency);
    });

    //Trigger conversion when from, to, or amount changes
    watch([from, to, amount], () => {
        if (from.value && to.value && amount.value>0) {
            // clear timeout in order not to make api call each time from, to or amount is changed.
            clearTimeout(timeout);

            timeout = setTimeout(()=> {
                getCalculation();
            }, 500);
        } else {
            calculation.value = 0;
        }
    });

    //Reset to if pair is invalid after from changes
    watch(from, () => {
        if (!isValid(from.value, to.value)) {
            to.value = "";
        }
    });

    //GET the current selected rate for display under the title
    const selectedRate = computed (() => {
        if(!from.value || !to.value) return null;
        const found = rates.value.find(rate => rate.from_currency === from.value && rate.to_currency === to.value );
        return found ? Number(found.rate).toFixed(4) : null;
    });

    //GET all rates from the API
    async function getAllRates() {
        try {
            const data = await getRates();  
            rates.value = data;
            // console.log(rates.value);      
        } catch (err) {
            console.error(err.response?.data?.error || "Server Error");
        }
    }

    //Call the convert API and update calculation
    async function getCalculation()  {
        try {
            errorMessage.value =""; 
            const data = await convertCurrency(from.value, to.value, amount.value);
            calculation.value = Number(data.result).toFixed(2);
            console.log(calculation.value);
            
        } catch (err) {
            console.error(err.response?.data?.error || "Conversion failed");
            // errorMessage.value = err.response?.data?.error || "Conversion failed";
            calculation.value=0;
        }
    }

    //Check if a currency pair exists in the rates list
    function isValid(from, to) {
        return rates.value.some(rate => rate.from_currency === from && rate.to_currency === to);
    }

    //Swap from and to  currencies if the reverse pair exists
    function swapCurrencies() {

        const newFrom = to.value;
        const newTo = from.value;

        from.value = newFrom;

        //Keep new to if the reverse pair exists
        if(isValid(newFrom, newTo)) {
            to.value = newTo;
        } else {
            to.value ="";
        }

    }

    //Load rates and set default currencies on load
    onMounted(async ()=> {
        await getAllRates();
        from.value = "EURO (EUR)";

        await nextTick();
        to.value = "US DOLLAR (USD)"
    });
    
    
</script>

<template>
    <div class="convert-card">
        <p v-if="errorMessage" class="text-danger text-center">{{ errorMessage }}</p>
        <h2 class="text-center mb-5 mt-2">Currency Calculator</h2>
        <small v-if="selectedRate" class="d-block text-center text-success mb-4">
            Exchange Rate: 1 {{ from }} = {{ selectedRate }} {{  to }}
        </small>

        <!-- Amount  and fromCurrency -->
        <div class="mb-3 mt-3">
            <label class="form-label">Amount</label>
            <div class="input-group">
                <input type="number" class="form-control form-control-lg" placeholder="0" v-model.number="amount">
                <!-- <select class="form-select form-select-lg currency-select" v-model="from">
                    <option disabled value="">Select</option>
                    <option v-for="currency in uniqueFromCurrencies" :key="currency" :value="currency">{{ currency }}</option>
                </select> -->
                <Multiselect
                    v-model="from"
                    :options="uniqueFromCurrencies"
                    placeholder="Select"
                    :searchable="true"
                    :allow-empty="false"
                    :show-no-results="false"
                    select-label=""
                    deselect-label=""
                    selected-label=""
                    class="currency-select"
                />
            </div>

        </div>


        <!-- Swap button -->
        <div class="text-center my-3">
            <button class="btn btn-success rounded-circle swap-btn" @click="swapCurrencies">⇅</button>
        </div>

        <!-- Converted to  and toCurrency -->
        <div class="mb-3">
            <label class="form-label">Converted to</label>
            <div class="input-group">
                <input type="text" class="form-control form-control-lg" readonly v-model="calculation" >
                <!-- <select class="form-select form-select-lg currency-select" v-model="to">
                    <option disabled value="">Select</option>
                    <option v-for="currency in availableToCurrencies" :key="currency" :value="currency">{{ currency }}</option>
                </select> -->
                <Multiselect
                    v-model="to"
                    :options="availableToCurrencies"
                    placeholder="Select"
                    :searchable="true"
                    :allow-empty="false"
                    :show-no-results="false"
                    select-label=""
                    deselect-label=""
                    selected-label=""
                    class="currency-select"
                />
            </div>

        </div>

    </div>
    
</template>

<style scoped>
    .convert-card {
        max-width: 600px;
        text-align: left;
        margin: 8rem auto 5rem auto;
        padding: 2rem;
        border: 1px solid #ddd;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        background-color: #fff;
    }

    .input-group > input {
        flex: 1 1 auto;
    }

    .input-group > .currency-select {
        flex: 0 0 250px;
    }

    .currency-select {
        /* max-width: 250px; */
        font-size:0.95rem;
        cursor: pointer;
        /* border-radius: 8px;
        background-color: #f8f9fa; */
    }

    .swap-btn {
        width: 50px;
        height: 50px;
        font-size: 1.2rem;  
    }

    input {
        border-radius: 8px;
    }

    .currency-select :deep(.multiselect) {
        /* width: 250px; */
        min-height: calc(3.5rem);
    }

    .currency-select :deep(.multiselect__tags) {
        min-height: calc(3.5rem);
        padding: 0.75rem 40px 0 0.75rem;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }

    .currency-select :deep(.multiselect__single) {
        font-size: 1.25rem;
        padding-top: 4px;
    }

    .currency-select :deep(.multiselect__content-wrapper) {
        min-width: 280px;
      
    }

</style>
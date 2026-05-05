<script setup>

  import { useRoute } from "vue-router";
  import { computed } from "vue";
  import NavBar from "./components/NavBar.vue"

  const route = useRoute();

  //Don't show navbar in home page
  const showNavBar = computed(() => route.name !== "home");

</script>


<template>

  <NavBar v-if="showNavBar" />

  <router-view />

</template>


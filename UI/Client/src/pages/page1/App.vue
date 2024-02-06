<!--
    Main Dashboard page application
-->
<template>
  <Navigation />
  <main class="container-fluid d-flex">
    <div class="container-fluid">
      Page 1......
    </div>
  </main>
</template>
<script setup lang="ts">
import Navigation from "@/components/Navigation.vue";
import {  ref,  } from "vue";
import { useI18n } from "vue-i18n";


/**
 * Localize function
 */
const { t } = useI18n();


</script>

<style>
body.overlay-active {
  overflow: hidden;
}
</style>

<style scoped>

</style>
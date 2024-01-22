<template>
  <v-app>
    <v-main>
      <TheHeader />
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import TheHeader from "./components/layout/TheHeader.vue";
</script>

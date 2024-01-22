<template>
  <v-app>
    <v-main>
      <TheHeader />
      <div class="w-75 mx-auto">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import TheHeader from "./components/layout/TheHeader.vue";
</script>

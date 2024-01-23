<template>
  <v-app>
    <TheHeader />

    <v-main>
      <v-container fluid>
        <div class="w-75 mx-auto">
          <router-view />
        </div>
      </v-container>
    </v-main>

    <TheFooter />
  </v-app>
</template>

<script lang="ts" setup>
import TheHeader from "./components/layout/TheHeader.vue";
import TheFooter from "./components/layout/TheFooter.vue";
</script>

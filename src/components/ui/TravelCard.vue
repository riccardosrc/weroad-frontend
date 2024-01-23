<template>
  <v-card class="rounded-xl">
    <v-img :src="travel.image" height="200" cover> </v-img>
    <v-card-text>
      <h2>{{ travel.name }}</h2>
      <v-container>
        <v-row justify="space-between" class="card-row">
          <h3>
            <v-icon>mdi-calendar</v-icon>
            {{ travel.days }} days
          </h3>
          <h3 v-if="travel.cheapestTour">From {{ travel.cheapestTour }}€</h3>
          <h3 v-else>N/A</h3>
        </v-row>
        <v-row justify="space-between" class="card-row">
          <v-btn w variant="text">Book Now</v-btn>
          <v-btn variant="flat" color="primary" :to="travelDetailRoute"
            >Details</v-btn
          >
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { Travel } from "@/types/models/travel.interface";
import { computed } from "vue";

const { travel } = defineProps<{ travel: Travel }>();
const travelDetailRoute = computed(() => `/travels/${travel.slug}`);
</script>

<style scoped>
.card-row {
  margin: 1rem auto 0rem auto;
}
</style>

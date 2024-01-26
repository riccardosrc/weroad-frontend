<template>
  <v-card class="rounded-xl" variant="outlined">
    <v-card-title>
      {{ tourDate(tour.startDate) }} - {{ tourDate(tour.endDate) }}
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row justify="space-between" align="center">
          <h3>
            {{ tour.travel.name }}
          </h3>
          <h3>{{ tour.travel.days }} Days / {{ tour.travel.nights }} Nights</h3>
          <h2 class="text-secondary text-decoration-underline">
            {{ tour.price }}€
          </h2>
          <v-btn color="secondary">Book Now</v-btn>
          <v-btn color="secondary" icon :to="tourConfigLink" v-if="isAdmin">
            <v-tooltip activator="parent" location="top"> Edit </v-tooltip>
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { Tour } from "@/types/models/tour.interface";
import { computed } from "vue";

const { tour } = defineProps<{ tour: Tour; isAdmin: boolean }>();

const tourDate = (date: Date) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

const tourConfigLink = computed(() => `/tours/${tour.id}/config`);
</script>

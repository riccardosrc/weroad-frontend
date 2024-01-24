<template>
  <h2 class="mb-4">Mood values</h2>
  <h3>Nature</h3>
  <v-slider
    thumb-label
    :step="1"
    :min="0"
    :max="100"
    v-model="form.nature"
    color="nature-mood"
  ></v-slider>
  <h3>Relax</h3>
  <v-slider
    thumb-label
    :step="1"
    :min="0"
    :max="100"
    v-model="form.relax"
    color="relax-mood"
  ></v-slider>
  <h3>History</h3>
  <v-slider
    thumb-label
    :step="1"
    :min="0"
    :max="100"
    v-model="form.history"
    color="history-mood"
  ></v-slider>
  <h3>Culture</h3>
  <v-slider
    thumb-label
    :step="1"
    :min="0"
    :max="100"
    v-model="form.culture"
    color="culture-mood"
  ></v-slider>
  <h3>Party</h3>
  <v-slider
    thumb-label
    :step="1"
    :min="0"
    :max="100"
    v-model="form.party"
    color="party-mood"
  ></v-slider>
</template>

<script setup lang="ts">
import { TravelMood } from "@/types/models/travel.interface";
import { toRef } from "vue";

const { mood } = defineProps<{ mood: Omit<TravelMood, "id"> }>();
const form = toRef(mood);
</script>

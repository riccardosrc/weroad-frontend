<template>
  <div class="d-flex flex-column align-center">
    <v-progress-circular
      :color="color"
      :model-value="value"
      :size="128"
      :width="12"
    >
      <v-icon :color="color" :size="60">{{ icon }}</v-icon>
    </v-progress-circular>
    <h3 :class="textColorClass">{{ label }}</h3>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface MoodIndicatorProps {
  icon: string;
  color: string;
  label: string;
  value: number;
}

const { icon, color, value, label } = defineProps<MoodIndicatorProps>();

const textColorClass = computed(() => `text-${color}`);
</script>

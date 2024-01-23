<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <div class="d-flex flex-column align-center">
        <v-icon color="secondary" v-if="icon" size="50">{{ icon }}</v-icon>
        <span class="text-subtitle-1 font-weight-light" v-if="text">{{
          text
        }}</span>
        <slot></slot>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
const { icon, text, title } = defineProps<{
  icon?: string;
  title: string;
  text?: string;
}>();
</script>

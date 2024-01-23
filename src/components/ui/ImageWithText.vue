<template>
  <v-img :src="image" alt="Image Alt Text" height="300" cover>
    <v-row class="text-overlay">
      <v-col>
        <span class="text-h4 font-weight-black">{{ text }}</span>
      </v-col>
    </v-row>
  </v-img>
</template>

<script setup lang="ts">
const { text, image } = defineProps<{ text: string; image: string }>();
</script>

<style scoped>
.text-overlay {
  position: absolute;
  margin-bottom: -1rem;
  margin-left: 0;
  bottom: 1rem;
  width: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
  text-align: start;
  padding: 1rem;
}

span {
  color: white;
}
</style>

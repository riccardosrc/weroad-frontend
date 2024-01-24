<template>
  <v-dialog v-model="isOpen" activator="parent" max-width="500">
    <v-card>
      <v-card-title class="headline">{{ title }}</v-card-title>
      <v-card-text>
        {{ message }}
      </v-card-text>
      <v-card-actions>
        <v-btn @click="closeDialog(false)">Cancel</v-btn>
        <v-btn color="error" @click="closeDialog(true)">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface ModalProps {
  title: string;
  message: string;
}

const { title, message } = defineProps<ModalProps>();
const emits = defineEmits<{ (e: "confirmatiom", value: boolean): void }>();

const isOpen = ref(false);

const closeDialog = (value: boolean) => {
  isOpen.value = false;
  emits("confirmatiom", value);
};
</script>

<template>
  <h1 class="mb-6">Travel Configuration</h1>

  <v-form @submit.prevent="onSave()" :disabled="loading || isSaved">
    <v-text-field
      variant="outlined"
      label="Slug"
      v-model="travelData.slug"
    ></v-text-field>
    <v-text-field
      variant="outlined"
      label="Name"
      v-model="travelData.name"
    ></v-text-field>
    <v-text-field
      variant="outlined"
      label="Descrtiption"
      v-model="travelData.description"
    ></v-text-field>
    <v-text-field
      variant="outlined"
      label="Image Url"
      v-model="travelData.image"
    ></v-text-field>
    <v-text-field
      variant="outlined"
      type="number"
      label="Days"
      v-model="travelData.days"
    ></v-text-field>
    <v-switch
      color="primary"
      label="Public"
      v-model="travelData.isPublic"
    ></v-switch>

    <h2 class="mb-4">Mood values</h2>
    <h3>Nature</h3>
    <v-slider
      thumb-label
      :step="1"
      :min="0"
      :max="100"
      v-model="travelData.mood.nature"
      color="nature-mood"
    ></v-slider>
    <h3>Relax</h3>
    <v-slider
      thumb-label
      :step="1"
      :min="0"
      :max="100"
      v-model="travelData.mood.relax"
      color="relax-mood"
    ></v-slider>
    <h3>History</h3>
    <v-slider
      thumb-label
      :step="1"
      :min="0"
      :max="100"
      v-model="travelData.mood.history"
      color="history-mood"
    ></v-slider>
    <h3>Culture</h3>
    <v-slider
      thumb-label
      :step="1"
      :min="0"
      :max="100"
      v-model="travelData.mood.culture"
      color="culture-mood"
    ></v-slider>
    <h3>Party</h3>
    <v-slider
      thumb-label
      :step="1"
      :min="0"
      :max="100"
      v-model="travelData.mood.party"
      color="party-mood"
    ></v-slider>

    <LoadingSpinner v-if="loading" />
    <v-alert v-if="error" color="error">{{ error.message }}</v-alert>
    <v-alert v-if="isSaved" type="success"
      >Travel saved successfully, you will be redirected in few seconds</v-alert
    >
    <v-container class="mt-6" v-if="loading || !isSaved">
      <v-row justify="end" class="ga-1">
        <v-btn type="button" variant="text" color="error" to="/travels"
          >Cancel</v-btn
        >
        <v-btn type="submit" color="secondary">Save</v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script setup lang="ts">
import { CreateTravelInput } from "@/types/dto/create-travel-input";
import { Travel } from "@/types/models/travel.interface";
import { CREATE_TRAVEL } from "@/graphql/mutations";
import { ref } from "vue";
import { PropertyWrapper } from "@/types/generics/property-wrapper.type";
import { useMutation } from "@vue/apollo-composable";
import { useRouter } from "vue-router";
import LoadingSpinner from "@/components/ui/LoadingSpinner.vue";
import { reactive } from "vue";

const router = useRouter();

const isSaved = ref(false);
const travelData = reactive<CreateTravelInput>({
  name: "",
  description: "",
  slug: "",
  image: "",
  isPublic: false,
  days: 1,
  mood: {
    culture: 0,
    history: 0,
    nature: 0,
    relax: 0,
    party: 0,
  },
});

const {
  mutate: createTravel,
  loading,
  error,
  onDone,
} = useMutation<PropertyWrapper<"createTravel", Travel>>(CREATE_TRAVEL, () => ({
  variables: {
    createTravelInput: { ...travelData, days: +travelData.days },
  },
}));

onDone(() => {
  setTimeout(() => {
    router.push("/travels");
  }, 3000);
});

const onSave = async () => {
  await createTravel();
  isSaved.value = true;
};
</script>

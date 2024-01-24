<template>
  <h1 class="mb-6">Travel Configuration</h1>

  <v-form @submit.prevent="onSave()" :disabled="loading || isSaved">
    <v-text-field
      :error-messages="formValidation.slug.$errors.map((e) => e.$message as string)"
      @input="formValidation.slug.$touch"
      @blur="formValidation.slug.$touch"
      variant="outlined"
      label="Slug"
      v-model="travelData.slug"
    ></v-text-field>
    <v-text-field
      :error-messages="formValidation.name.$errors.map((e) => e.$message as string)"
      @input="formValidation.name.$touch"
      @blur="formValidation.name.$touch"
      variant="outlined"
      label="Name"
      v-model="travelData.name"
    ></v-text-field>
    <v-textarea
      :error-messages="formValidation.description.$errors.map((e) => e.$message as string)"
      @input="formValidation.description.$touch"
      @blur="formValidation.description.$touch"
      variant="outlined"
      label="Descrtiption"
      v-model="travelData.description"
      :rows="3"
    ></v-textarea>
    <v-text-field
      :error-messages="formValidation.image.$errors.map((e) => e.$message as string)"
      @input="formValidation.image.$touch"
      @blur="formValidation.image.$touch"
      variant="outlined"
      label="Image Url"
      v-model="travelData.image"
    ></v-text-field>
    <v-text-field
      :error-messages="formValidation.days.$errors.map((e) => e.$message as string)"
      @input="formValidation.days.$touch"
      @blur="formValidation.days.$touch"
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

    <TravelMoodFields :mood="travelData.mood" />

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
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  url,
  integer,
  maxLength,
  helpers,
} from "@vuelidate/validators";
import TravelMoodFields from "@/components/ui/TravelMoodFields.vue";

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

const slugRule = helpers.withMessage(
  "Value must contains only letters, numbers or dashes (-)",
  helpers.regex(/^[a-zA-Z0-9-]+$/)
);
const formRules = {
  name: { required, maxLength: maxLength(255) },
  description: { required, maxLength: maxLength(255) },
  slug: {
    required,
    maxLength: maxLength(255),
    slugRule,
  },
  image: { required, url },
  days: { required, integer },
};

const formValidation = useVuelidate(formRules, travelData);

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
  if (formValidation.value.$invalid) {
    return;
  }
  await createTravel();
  isSaved.value = true;
};
</script>

<style scoped>
.v-text-field {
  margin-bottom: 0.5rem;
}
</style>

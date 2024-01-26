<template>
  <h1 class="mb-6">Tour Configuration</h1>

  <v-form
    @submit.prevent="onSave()"
    :disabled="isWaitingAction || isSaved"
    v-if="isInitialized"
  >
    <v-text-field
      variant="outlined"
      label="Travel"
      v-model="tourData.travelName"
      disabled
    ></v-text-field>
    <v-text-field
      :error-messages="formValidation.name.$errors.map((e) => e.$message as string)"
      @input="formValidation.name.$touch"
      @blur="formValidation.name.$touch"
      variant="outlined"
      label="Name"
      v-model="tourData.name"
      :disabled="!!tourId"
    ></v-text-field>
    <v-text-field
      :error-messages="formValidation.price.$errors.map((e) => e.$message as string)"
      @input="formValidation.price.$touch"
      @blur="formValidation.price.$touch"
      variant="outlined"
      type="number"
      label="Price"
      v-model="tourData.price"
    ></v-text-field>

    <v-date-picker
      elevation="12"
      color="primary"
      title="Start Date"
      class="mx-auto"
      v-model="tourData.startDate"
      :min="minDatePicker"
    ></v-date-picker>

    <LoadingSpinner v-if="isWaitingAction" />
    <v-alert v-if="error" color="error">{{ error.message }}</v-alert>
    <v-alert v-if="isSaved" type="success"
      >Tour saved successfully, you will be redirected in few seconds</v-alert
    >
    <v-container class="my-6" v-if="!isWaitingAction && !isSaved">
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
import { Tour } from "@/types/models/tour.interface";
import { CREATE_TOUR, UPDATE_TOUR } from "@/graphql/mutations";
import { GET_TOUR_BY_ID, GET_TRAVEL_BY_SLUG } from "@/graphql/queries";
import { ref } from "vue";
import { PropertyWrapper } from "@/types/generics/property-wrapper.type";
import { useLazyQuery, useMutation } from "@vue/apollo-composable";
import { useRouter } from "vue-router";
import LoadingSpinner from "@/components/ui/LoadingSpinner.vue";
import { reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, maxLength } from "@vuelidate/validators";
import { Utils } from "@/shared/utils";
import { onMounted } from "vue";
import { computed } from "vue";
import { Travel } from "@/types/models/travel.interface";

const router = useRouter();
const { tourId, travelSlug } = defineProps<{
  tourId?: string;
  travelSlug?: string;
}>();

const isSaved = ref(false);
const isInitialized = ref(false);
const tourData = reactive({
  name: "",
  price: 0,
  startDate: new Date(),
  travelId: "",
  travelName: "",
});

const minDatePicker = computed(() => Utils.dateToISO8601());

const formRules = {
  name: { required, maxLength: maxLength(255) },
  price: { required },
  startDate: { required },
  travelId: { required },
};
const formValidation = useVuelidate(formRules, tourData as any);

const { load: loadTour, onResult: onLoadedTour } = useLazyQuery<
  PropertyWrapper<"tour", Tour>
>(GET_TOUR_BY_ID, {
  id: tourId,
});

const { load: loadTravel, onResult: onLoadedTravel } = useLazyQuery<
  PropertyWrapper<"travelBySlug", Travel>
>(GET_TRAVEL_BY_SLUG, {
  slug: travelSlug,
});

onLoadedTour((tour) => {
  const { data } = tour;
  console.log(data);
  if (!data) {
    return;
  }
  tourData.name = data.tour.name;
  tourData.price = data.tour.price;
  tourData.startDate = new Date(data.tour.startDate);
  tourData.travelId = data.tour.travel.id;
  tourData.travelName = data.tour.travel.name;
  isInitialized.value = true;
});

onLoadedTravel((travel) => {
  const { data } = travel;
  console.log(data);
  if (!data) {
    return;
  }
  tourData.travelId = data.travelBySlug.id;
  tourData.travelName = data.travelBySlug.name;
  isInitialized.value = true;
});

const {
  mutate: createTour,
  loading: loadingCreate,
  error,
} = useMutation<PropertyWrapper<"createTour", Tour>>(CREATE_TOUR, () => ({
  variables: {
    createTourInput: {
      name: tourData.name,
      travelId: tourData.travelId,
      startDate: Utils.dateToISO8601(tourData.startDate),
      price: +tourData.price * 100,
    },
  },
}));

const { mutate: updateTour, loading: loadingUpdate } = useMutation<
  PropertyWrapper<"updateTour", Tour>
>(UPDATE_TOUR, () => ({
  variables: {
    id: tourId,
    updateTourInput: {
      startDate: Utils.dateToISO8601(tourData.startDate),
      price: +tourData.price * 100,
    },
  },
}));

const isWaitingAction = computed(
  () => loadingCreate.value || loadingUpdate.value
);

const onSave = async () => {
  if (formValidation.value.$invalid) {
    return;
  }
  if (tourId) {
    await updateTour();
  } else {
    await createTour();
  }
  isSaved.value = true;
  setTimeout(() => {
    router.push("/tours");
  }, 3000);
};

onMounted(async () => {
  if (tourId) {
    await loadTour();
  }
  if (travelSlug) {
    await loadTravel();
  }
});
</script>

<style scoped>
.v-text-field {
  margin-bottom: 0.5rem;
}
</style>

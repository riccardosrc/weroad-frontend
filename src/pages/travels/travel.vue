<template>
  <LoadingSpinner v-if="loading" />
  <div v-else-if="!error && travel" class="p-0">
    <ImageWithText
      :text="travel.name"
      :image="travel.image"
      class="rounded-b-xl"
    />

    <v-container class="mt-6">
      <v-row justify="space-around">
        <TravelInformationCard
          icon="mdi-calendar"
          title="First Departure"
          :text="firstAvailableDateLabel"
        />
        <TravelInformationCard
          icon="mdi-theme-light-dark"
          title="Days / Nights"
          :text="daysNightsLabel"
        />
        <TravelInformationCard
          title="Starting From"
          icon="mdi-currency-eur"
          :text="cheapestTourLabel"
        />
      </v-row>

      <v-row class="mt-6">
        <div>
          <h2>Travel Details</h2>
          <p>{{ travel.description }}</p>
        </div>
      </v-row>

      <v-row class="mt-6">
        <h2>Travel Mood</h2>
      </v-row>
      <v-row justify="space-around" class="mt-6">
        <MoodIndicator
          color="nature-mood"
          icon="mdi-image-filter-hdr"
          label="Nature"
          :value="travel.mood.nature"
        />
        <MoodIndicator
          color="relax-mood"
          icon="mdi-pool"
          label="Relax"
          :value="travel.mood.relax"
        />
        <MoodIndicator
          color="history-mood"
          icon="mdi-temple-buddhist"
          label="History"
          :value="travel.mood.history"
        />
        <MoodIndicator
          color="culture-mood"
          icon="mdi-library"
          label="Culture"
          :value="travel.mood.culture"
        />
        <MoodIndicator
          color="party-mood"
          icon="mdi-party-popper"
          label="Party"
          :value="travel.mood.party"
        />
      </v-row>

      <!-- Admin actions -->
      <v-row
        class="my-12 ga-1"
        justify="end"
        v-if="store.getters[authGetters.isAuth]"
      >
        <v-btn color="error" icon>
          <v-tooltip activator="parent" location="top"> Delete </v-tooltip>
          <v-icon>mdi-delete</v-icon>
          <ConfirmationDialog
            title="Delete Travel Confirmation"
            message="Are you sure you want delete this travel and all its associated tours?"
            @confirmatiom="onDeleteConfirmation"
          />
        </v-btn>
        <v-btn color="secondary" icon :to="newTourRoute">
          <v-tooltip activator="parent" location="top"> Add Tour </v-tooltip>
          <v-icon>mdi-calendar-plus</v-icon>
        </v-btn>
      </v-row>
    </v-container>
  </div>
  <v-alert v-else type="error">
    {{ error?.message }}
  </v-alert>
</template>

<script setup lang="ts">
import { Travel } from "@/types/models/travel.interface";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { ref } from "vue";
import { GET_TRAVEL_BY_SLUG } from "@/graphql/queries";
import LoadingSpinner from "@/components/ui/LoadingSpinner.vue";
import ConfirmationDialog from "@/components/ui/ConfirmationDialog.vue";
import { PropertyWrapper } from "@/types/generics/property-wrapper.type";
import ImageWithText from "@/components/ui/ImageWithText.vue";
import TravelInformationCard from "@/components/ui/TravelInformationCard.vue";
import { computed } from "vue";
import { useStore } from "vuex";
import { StoreState } from "@/store";
import { authGetters } from "@/store/modules/auth";
import { DELETE_TRAVEL } from "@/graphql/mutations";
import { useRouter } from "vue-router";
import MoodIndicator from "@/components/ui/MoodIndicator.vue";

const { slug } = defineProps<{ slug: string }>();
const travel = ref<Travel>();
const store = useStore<StoreState>();
const router = useRouter();

const { loading, error, onResult } = useQuery<
  PropertyWrapper<"travelBySlug", Travel>
>(GET_TRAVEL_BY_SLUG, { slug });

onResult(({ data }) => {
  console.log(data);
  travel.value = data?.travelBySlug ?? undefined;
});

const { mutate: deleteTravel } = useMutation(DELETE_TRAVEL, () => ({
  variables: {
    id: travel.value?.id,
  },
}));

const onDeleteConfirmation = async (confirm: boolean) => {
  if (!confirm) {
    return;
  }
  await deleteTravel();
  router.replace("/travels");
};

const daysNightsLabel = computed(() => {
  return `${travel.value?.days} / ${travel.value?.nights}`;
});

const firstAvailableDateLabel = computed(() => {
  return travel.value?.firstAvailableDate
    ? new Date(travel.value.firstAvailableDate).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      })
    : "N/A";
});

const cheapestTourLabel = computed(() => {
  return travel.value?.cheapestTour?.toString() ?? "N/A";
});

const newTourRoute = computed(() => `/travels/${travel.value?.slug}/add-tour`);
</script>

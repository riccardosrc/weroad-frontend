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
        <v-col>
          <h2>Travel Details</h2>
          <p>{{ travel.description }}</p>
        </v-col>
      </v-row>
      <v-row
        class="mt-6 ga-1"
        justify="end"
        v-if="store.getters[authGetters.isAuth]"
      >
        <v-btn color="error" icon>
          <v-tooltip activator="parent" location="top"> Delete </v-tooltip>
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn color="secondary" icon>
          <v-tooltip activator="parent" location="top"> Edit </v-tooltip>
          <v-icon>mdi-pencil</v-icon>
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
import { useQuery } from "@vue/apollo-composable";
import { ref } from "vue";
import { GET_TRAVEL_BY_SLUG } from "@/graphql/queries";
import LoadingSpinner from "@/components/ui/LoadingSpinner.vue";
import { PropertyWrapper } from "@/types/generics/property-wrapper.type";
import ImageWithText from "@/components/ui/ImageWithText.vue";
import TravelInformationCard from "@/components/ui/TravelInformationCard.vue";
import { computed } from "vue";
import { useStore } from "vuex";
import { StoreState } from "@/store";
import { authGetters } from "@/store/modules/auth";

const { slug } = defineProps<{ slug: string }>();
const travel = ref<Travel>();
const store = useStore<StoreState>();

const { loading, error, onResult } = useQuery<
  PropertyWrapper<"travelBySlug", Travel>
>(GET_TRAVEL_BY_SLUG, { slug });

onResult(({ data }) => {
  console.log(data);
  travel.value = data?.travelBySlug ?? undefined;
});

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
</script>

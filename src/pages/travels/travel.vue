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
          :text="
            new Date(travel.firstAvailableDate).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
            })
          "
        />
        <TravelInformationCard
          icon="mdi-theme-light-dark"
          title="Days / Nights"
          :text="daysNightsLabel"
        />
        <TravelInformationCard
          title="Starting From"
          icon="mdi-currency-eur"
          :text="travel.cheapestTour.toString()"
        />
      </v-row>
      <v-row class="mt-6">
        <v-col>
          <h2>Travel Details</h2>
          <p>{{ travel.description }}</p>
        </v-col>
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

const { slug } = defineProps<{ slug: string }>();
const travel = ref<Travel>();

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
</script>

<template>
  <v-container>
    <v-row justify="space-between" align="center">
      <div>
        <h1 class="mt-4">Available tours.</h1>
        <h2 class="mb-4">Book the best option for you.</h2>
      </div>
    </v-row>
  </v-container>
  <v-responsive>
    <LoadingSpinner v-if="loading" />
    <div v-else-if="tours.length > 0">
      <TourCard
        v-for="tour in tours"
        :tour="tour"
        :key="tour.id"
        class="my-4"
      />
      <v-pagination
        v-model="page"
        :length="totalPages"
        class="mt-4"
      ></v-pagination>
    </div>
    <h2 v-else>No tours available, please try later.</h2>
    <v-alert v-if="error" type="error">{{ error.message }}</v-alert>
  </v-responsive>
</template>

<script lang="ts" setup>
import { useQuery } from "@vue/apollo-composable";
import { GET_TOURS } from "@/graphql/queries";
import { PaginatedRes } from "@/types/generics/paginated-res.interface";
import { Tour } from "@/types/models/tour.interface";
import { ref } from "vue";
import { PropertyWrapper } from "@/types/generics/property-wrapper.type";
import TourCard from "@/components/ui/TourCard.vue";

type GetToursType = PropertyWrapper<"tours", PaginatedRes<Tour>>;

const tours = ref<Tour[]>([]);
const page = ref(1);
const totalPages = ref(0);
const pageSize = ref(5);

const { loading, error, onResult } = useQuery<GetToursType>(GET_TOURS, () => ({
  offset: (page.value - 1) * pageSize.value,
  limit: pageSize.value,
}));

onResult(({ data }) => {
  console.log(data);
  if (!data) {
    tours.value = [];
    totalPages.value = 0;
    return;
  }
  const { items, totalCount } = data.tours;
  totalPages.value = Math.ceil(totalCount / pageSize.value);
  tours.value = items;
});
</script>

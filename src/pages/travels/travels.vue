<template>
  <h1 class="mt-4">Explore our travels.</h1>
  <h2 class="mb-4">Live our experiences.</h2>
  <v-responsive>
    <LoadingSpinner v-if="loading" />
    <v-container v-else-if="travels.length > 0">
      <v-row justify="space-between">
        <v-col sm="4" v-for="travel in travels" :key="travel.id" class="g-1">
          <TravelCard :travel="travel"></TravelCard>
        </v-col>
      </v-row>
      <v-pagination
        v-model="page"
        :length="totalPages"
        class="mt-4"
      ></v-pagination>
    </v-container>
    <h2 v-else>No travels available, please try later.</h2>
    <v-alert v-if="error" type="error">{{ error.message }}</v-alert>
  </v-responsive>
</template>

<script lang="ts" setup>
import { useQuery } from "@vue/apollo-composable";
import { GET_TRAVELS } from "@/graphql/queries";
import { PaginatedRes } from "@/types/generics/paginated-res.interface";
import { Travel } from "@/types/models/travel.interface";
import { ref } from "vue";
import { watch } from "vue";
import { PropertyWrapper } from "@/types/generics/property-wrapper.type";

type GetTravelsType = PropertyWrapper<"travels", PaginatedRes<Travel>>;

const travels = ref<Travel[]>([]);
const page = ref(1);
const totalPages = ref(0);
const pageSize = ref(9);

const { result, loading, error } = useQuery<GetTravelsType>(
  GET_TRAVELS,
  () => ({
    offset: (page.value - 1) * pageSize.value,
    limit: pageSize.value,
  })
);

const setResults = () => {
  if (result.value) {
    console.log(result.value);
    const { items, totalCount } = result.value.travels;
    totalPages.value = Math.ceil(totalCount / pageSize.value);
    travels.value = items;
  }
};

watch(result, () => {
  setResults();
});
</script>
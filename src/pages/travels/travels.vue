<template>
  <v-container>
    <v-row justify="space-between" align="center">
      <div>
        <h1 class="mt-4">Explore our travels.</h1>
        <h2 class="mb-4">Live our experiences.</h2>
      </div>
      <v-btn
        color="secondary"
        icon
        to="/travels/config"
        v-if="store.getters[authGetters.isAuth]"
      >
        <v-tooltip activator="parent" location="top"> Add </v-tooltip>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>
  </v-container>
  <v-responsive>
    <LoadingSpinner v-if="loading" />
    <v-container v-else-if="travels.length > 0">
      <v-row justify="start">
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
import { PropertyWrapper } from "@/types/generics/property-wrapper.type";
import { useStore } from "vuex";
import { StoreState } from "@/store";
import { authGetters } from "@/store/modules/auth";

type GetTravelsType = PropertyWrapper<"travels", PaginatedRes<Travel>>;

const travels = ref<Travel[]>([]);
const page = ref(1);
const totalPages = ref(0);
const pageSize = ref(9);
const store = useStore<StoreState>();

const { loading, error, onResult } = useQuery<GetTravelsType>(
  GET_TRAVELS,
  () => ({
    offset: (page.value - 1) * pageSize.value,
    limit: pageSize.value,
  })
);

onResult(({ data }) => {
  console.log(data);
  if (!data) {
    travels.value = [];
    totalPages.value = 0;
    return;
  }
  const { items, totalCount } = data.travels;
  totalPages.value = Math.ceil(totalCount / pageSize.value);
  travels.value = items;
});
</script>

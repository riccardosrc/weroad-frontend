<template>
  <v-footer color="primary">
    <v-row justify="center" no-gutters>
      <v-btn color="white" variant="text" to="/login" v-if="!isAuth">
        Restricted Area
      </v-btn>
      <v-btn v-else color="white" variant="text" @click="onLogout()"
        >Logout</v-btn
      >
      <v-col class="text-center mt-4" cols="12">
        {{ new Date().getFullYear() }} — <strong>WeRoad</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script setup lang="ts">
import { StoreState } from "@/store";
import { authActions, authGetters } from "@/store/modules/auth";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore<StoreState>();
const router = useRouter();

const isAuth = computed(() => store.getters[authGetters.isAuth]);

const onLogout = async () => {
  await store.dispatch(authActions.logout);
  router.replace({ name: "travels" });
};
</script>

<style scoped>
footer {
  max-height: 6rem;
}
</style>

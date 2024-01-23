<template>
  <v-container>
    <v-row justify="center">
      <v-card
        :loading="loading"
        title="Access Restricted Area"
        width="400"
        class="mt-10"
      >
        <v-form @submit.prevent="onLogin()">
          <v-card-text>
            <v-text-field
              label="Email"
              variant="outlined"
              required
              autocomplete="email"
              type="email"
              v-model="credentials.email"
            ></v-text-field>
            <v-text-field
              label="Password"
              variant="outlined"
              required
              autocomplete="current-password"
              type="password"
              v-model="credentials.password"
            ></v-text-field>
            <v-alert v-if="error" type="error">{{ error.message }}</v-alert>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn variant="flat" color="primary" type="submit">Login</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { LOGIN } from "@/graphql/mutations";
import { LoginInput } from "@/types/dto/login-input";
import { LoginRes } from "@/types/models/login-res.interface";
import { PropertyWrapper } from "@/types/generics/property-wrapper.type";
import { authActions, authGetters } from "@/store/modules/auth";
import { StoreState } from "@/store";

const router = useRouter();
const store = useStore<StoreState>();

const credentials = reactive<LoginInput>({
  email: "",
  password: "",
});

const {
  mutate: login,
  loading,
  error,
} = useMutation<PropertyWrapper<"login", LoginRes>>(LOGIN, () => ({
  variables: {
    loginInput: credentials,
  },
}));

const redirectIfAlreadyAuth = () => {
  const isAuth = store.getters[authGetters.isAuth];
  if (isAuth) {
    router.replace("/");
  }
};

const onLogin = async () => {
  try {
    const result = await login();
    const accessToken = result?.data?.login.accessToken;
    console.log(accessToken);
    store.dispatch(authActions.login, accessToken);
    router.push("/");
  } catch {
    console.log(error.value);
    store.dispatch(authActions.logout);
  }
};

redirectIfAlreadyAuth();
</script>

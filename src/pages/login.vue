<template>
  <v-container>
    <v-row justify="center">
      <v-card
        :loading="loading"
        title="Access Restricted Area"
        width="400"
        class="mt-10"
      >
        <v-card-text>
          <v-text-field
            label="Email"
            variant="outlined"
            required
            v-model="credentials.email"
          ></v-text-field>
          <v-text-field
            label="Password"
            variant="outlined"
            required
            type="password"
            v-model="credentials.password"
          ></v-text-field>
          <v-alert v-if="error" type="error">{{ error.message }}</v-alert>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="flat" color="primary" @click="onLogin()">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { useRouter } from "vue-router";
import { LOGIN } from "@/graphql/mutations";
import { LoginInput } from "@/types/dto/login-input";
import { LoginRes } from "@/types/models/login-res.interface";

const router = useRouter();

const credentials = reactive<LoginInput>({
  email: "",
  password: "",
});

const {
  mutate: login,
  loading,
  error,
} = useMutation<LoginRes>(LOGIN, () => ({
  variables: {
    loginInput: credentials,
  },
}));

const onLogin = async () => {
  try {
    const result = await login();
    const accessToken = result?.data?.login.accessToken;
    console.log(accessToken);
    router.push("/");
  } catch {
    console.log(error.value);
  }
};
</script>

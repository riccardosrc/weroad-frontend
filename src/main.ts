/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";

// Components
import App from "./App.vue";

// Composables
import { createApp, h, provide } from "vue";

// GraphQL Apollo
import { ApolloClientSetup } from "./graphql/apollo-client";
import { DefaultApolloClient } from "@vue/apollo-composable";

const app = createApp({
  setup() {
    provide(DefaultApolloClient, ApolloClientSetup.init());
  },
  render: () => h(App),
});

registerPlugins(app);

app.mount("#app");

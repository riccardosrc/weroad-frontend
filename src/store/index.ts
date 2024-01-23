import { createStore, Module } from "vuex";
import { AuthState, authModule } from "./modules/auth";

export interface StoreState {
  auth: Module<AuthState, any>;
}

export default createStore<StoreState>({
  modules: {
    auth: authModule,
  },
});

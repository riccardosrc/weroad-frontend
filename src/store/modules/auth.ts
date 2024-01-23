import { Module, MutationTree, ActionTree } from "vuex";
import { jwtDecode } from "jwt-decode";

export interface AuthState {
  token: string | null;
}

export const authActions = {
  login: "auth/login",
  logout: "auth/logout",
};

export const authGetters = {
  isAuth: "auth/isAuth",
};

const ACCESS_TOKEN_KEY = "accessToken";

/**
 * get token from local storage and check its expiration
 * @returns token if valid
 */
const getCachedAccessToken = () => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (!token) {
    return null;
  }
  const isExpired = isTokenExpired(token);
  if (isExpired) {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    return null;
  }
  return token;
};

/**
 * check jwt token expiration
 * @param token token to verify
 * @returns expiration token state
 */
const isTokenExpired = (token: string) => {
  const { exp = 0 } = jwtDecode(token);
  const expirationDate = new Date(exp * 1000);
  return new Date() > expirationDate;
};

const state: AuthState = {
  token: getCachedAccessToken(),
};

const getters: MutationTree<AuthState> = {
  isAuth(state) {
    return !!state.token;
  },
};

const mutations: MutationTree<AuthState> = {
  setToken(state, token: string | null) {
    state.token = token;
  },
};

const actions: ActionTree<AuthState, any> = {
  login({ commit }, accessToken: string) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    commit("setToken", accessToken);
  },

  logout({ commit }) {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    commit("setToken", null);
  },
};

export const authModule: Module<AuthState, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

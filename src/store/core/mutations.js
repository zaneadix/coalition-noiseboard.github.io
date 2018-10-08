import Vue from "vue";

export const appDataLoaded = state => {
  Vue.set(state, "loadingAppData", false);
};

export const disableNoises = state => {
  Vue.set(state, "disableNoises", true);
};

export const enableNoises = state => {
  Vue.set(state, "disableNoises", false);
};

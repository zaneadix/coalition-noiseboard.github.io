import Vue from 'vue';

export const setNoises = (state, noises) => {
    Vue.set(state, 'noises', noises);
}
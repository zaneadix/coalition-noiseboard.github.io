import Vue from 'vue';

export const hydrate = (state, payload) => {
    for (let key of Object.keys(payload)) {
        Vue.set(state, key, Object.assign({}, state[key], payload[key]));
    }
}
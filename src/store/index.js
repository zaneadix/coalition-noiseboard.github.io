import Vue from 'vue';
import Vuex from 'vuex';
import find from 'lodash-es/find';

import coreModule from './core';
// import State from './state';

Vue.use(Vuex);

const actions = {
    ...coreModule.actions
};

const mutations = {
    ...coreModule.mutations
}

const store = new Vuex.Store({
    state: Object.assign(
        // new State(),
        {}
    ),
    actions,
    mutations
});

store.dispatch('hydrate');

export default store;
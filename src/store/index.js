import Vue from 'vue';
import Vuex from 'vuex';
import find from 'lodash-es/find';

import coreModule from './core';
import noisesModule from './noises';
// import State from './state';

Vue.use(Vuex);

const actions = {
    ...coreModule.actions,
    ...noisesModule.actions
};

const mutations = {
    ...coreModule.mutations,
    ...noisesModule.mutations
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
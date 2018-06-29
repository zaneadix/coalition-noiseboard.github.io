import Vue from 'vue';
import Vuex from 'vuex';
import find from 'lodash-es/find';

import coreModule from './core';
import noisesModule from './noises';
import boardsModule from './boards';

// import State from './state';

Vue.use(Vuex);

const actions = {
    ...coreModule.actions,
    ...noisesModule.actions,
    ...boardsModule.actions
};

const mutations = {
    ...coreModule.mutations,
    ...noisesModule.mutations,
    ...boardsModule.mutations
}

const store = new Vuex.Store({
    state: {
        ...coreModule.state,
        ...boardsModule.state,
        ...noisesModule.state
    },
    actions,
    mutations
});

store.dispatch('hydrate');

export default store;
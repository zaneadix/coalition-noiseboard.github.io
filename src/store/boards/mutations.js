import Vue from 'vue';

export const setBoards = (state, boards) => {
    Vue.set(state, 'boards', boards);
}
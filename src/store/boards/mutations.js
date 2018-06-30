import Vue from 'vue';
import findIndex from 'lodash/findIndex';

export const storeBoardsFile = (state, file) => {
    Vue.set(state, 'boardsFile', file);
}

export const setBoards = (state, boards) => {
    Vue.set(state, 'boards', boards);
}

export const assignNoiseToBoard = (state, { boardId, key, noise }) => {

    const index = findIndex(state.boards, board => {
        return board.id === boardId;
    })

    if (index >= 0) {
        Vue.set(
            state.boards[index].keys,
            key,
            noise
        );
    }
}

export const savingBoards = (state) => {
    state.savingBoards = true;
}
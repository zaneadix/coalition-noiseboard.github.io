import Vue from 'vue';
import findIndex from 'lodash/findIndex';

const getBoardIndex = (state, boardId) => {
    return findIndex(state.boards, board => {
        return board.id === boardId;
    })
}

export const storeBoardsFile = (state, file) => {
    Vue.set(state, 'boardsFile', file);
}

export const setBoards = (state, boards) => {
    Vue.set(state, 'boards', boards);
}

export const addBoard = (state, board) => {

    const update = [...state.boards, board].sort((a, b) => {
        return a > b;
    });

    Vue.set(state, 'boards', update);
    // Vue.set(state, 'dirty', true);
}

export const assignNoiseToBoard = (state, { boardId, key, noise }) => {

    const index = getBoardIndex(state, boardId);

    if (index >= 0) {
        Vue.set(
            state.boards[index].keys,
            key,
            noise
        );
        // Vue.set(state, 'dirty', true);
    }
}

export const unassignNoiseFromBoard = (state, { boardId, key }) => {

    const index = getBoardIndex(state, boardId);

    if (index >= 0) {
        Vue.delete(
            state.boards[index].keys,
            key
        );
        // Vue.set(state, 'dirty', true);
    }
}

export const savingBoards = (state) => {
    state.savingBoards = true;
}

export const boardsSaved = (state) => {
    state.savingBoards = false;
    // Vue.set(state, 'dirty', false);
}
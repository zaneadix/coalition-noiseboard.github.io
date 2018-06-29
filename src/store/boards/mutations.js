import Vue from 'vue';
import findIndex from 'lodash/findIndex';

export const setBoards = (state, boards) => {
    Vue.set(state, 'boards', boards);
}

export const assignNoiseToBoard = (state, { boardId, key, noise }) => {

    const index = findIndex(state.boards, board => {
        return board.id === boardId;
    })

    // console.log('MUTATION', boardId, key, noise);

    if (index >= 0) {
        Vue.set(
            state.boards[index].keys,
            key,
            noise
        );
    }
}

import find from 'lodash/find';
import map from 'lodash/map';
import { repo } from '../github';
import { Howl } from 'howler';
import { Board } from './models';
import { Noise } from '../noises/models';


export const parseBoardsFile = ({ commit, state }, tree) => {

    const file = find(tree, file => {
        return file.path === 'docs/data/boards.json';
    });

    if (file) {
        commit('storeBoardsFile', file);
    }
}


export const parseBoards = ({ commit, state }, boards) => {
    boards = map(boards, board => Board.fromData(board));
    console.log('BOARDS', boards);
    commit('setBoards', boards);
};


export const assignNoiseToBoard = ({ commit, state }, { boardId, key, name, source }) => {

    const noise = Object.assign(
        new Noise(),
        { name, source }
    );

    commit(
        'assignNoiseToBoard',
        {
            boardId,
            key,
            noise
        }
    )
}


export const saveBoards = ({ commit, state }) => {

    commit('savingBoards');

    const saveData = map(state.boards, board => board.saveData);
    const boardsFile = state.boardsFile;

    console.log('REPO', repo);

    repo.writeFile(
        'master',
        boardsFile.path,
        JSON.stringify(saveData),
        `saving boards lol`,
        {}
    ).then((response) => {
        console.log(response);
    });

    console.log('SAVE THESE', saveData);
}
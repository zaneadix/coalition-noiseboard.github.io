 
import find from 'lodash/find';
import map from 'lodash/map';
import mapKeys from 'lodash/mapKeys';
import firebase from 'firebase/app';
import { repo, firestore } from '../db';
import { Howl } from 'howler';
import { Board } from './models';
import { Noise } from '../noises/models';

const boardsRef = firestore.collection('boards'); 

export const parseBoards = ({ commit, state }, docs) => {

    const boards = map(docs, doc => {
        return Board.fromData(Object.assign(
            { id: doc.id, doc },
            doc.data()
        ));
    });

    commit('setBoards', boards);
};


export const createBoard = ({ commit, state }, name) => {
    
    const board = Board.fromData({ name });

    boardsRef
        .add({ name })
        .then((doc) => {
            commit('addBoard', Board.fromData({ name, id: doc.id }));
        })
}


export const assignNoiseToBoard = ({ commit, state }, { boardId, key, name, source }) => {

    const noise = Noise.fromData({ name, source });
    const update = {};
    update[key] = noise.saveData;
    
    boardsRef
        .doc(boardId)
        .set({ keys: update }, { merge: true })
        .then(() => {
            commit(
                'assignNoiseToBoard',
                { boardId, key, noise }
            )
        });
}

export const unassignNoiseFromBoard = ({ commit, state }, { boardId, key }) => {

    const update = {};
    update[`keys.${key}`] = firebase.firestore.FieldValue.delete();

    boardsRef
        .doc(boardId)
        .update(update)
        .then(() => {
            commit(
                'unassignNoiseFromBoard',
                { boardId, key }
            )
        });
}


// export const saveBoards = ({ commit, state }) => {

//     commit('savingBoards');

//     const saveData = map(state.boards, board => board.saveData);
//     const boardsFile = state.boardsFile;

//     repo.writeFile(
//         'master',
//         boardsFile.path,
//         JSON.stringify(saveData),
//         `saving boards lol`,
//         {}
//     ).then((response) => {
//         commit('boardsSaved');
//     });
// }
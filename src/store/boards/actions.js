import find from "lodash/find";
import findIndex from "lodash/findIndex";
import map from "lodash/map";
import mapKeys from "lodash/mapKeys";
import firebase from "firebase/app";
import { repo, firestore } from "../db";
import { Howl } from "howler";
import { Board } from "./models";
import { Noise } from "../noises/models";

const boardsRef = firestore.collection("boards");

export const parseBoards = ({ commit, state }, docs) => {
  const boards = map(docs, doc => {
    return Board.fromData(Object.assign({ id: doc.id, doc }, doc.data()));
  });

  commit("setBoards", boards);
};

export const createBoard = ({ commit, state }, name) => {
  const board = Board.fromData({ name });

  boardsRef.add({ name }).then(doc => {
    commit("addBoard", Board.fromData({ name, id: doc.id }));
  });
};

export const deleteBoard = ({ commit, state }, boardId) => {
  commit("deletingBoard", boardId);

  return boardsRef
    .doc(boardId)
    .delete()
    .then(response => {
      commit("boardDeleted", boardId);
      return { success: true };
    })
    .catch(error => {
      console.error("Delete failed", error);
    });
};

export const editBoardName = ({ commit, state }, { boardId, boardName }) => {
  commit("editingBoardName", boardId);

  return boardsRef
    .doc(boardId)
    .set({ name: boardName }, { merge: true })
    .then(response => {
      commit("boardNameEdited", { boardId, boardName });
      return { success: true };
    })
    .catch(error => {
      console.error("Board Name Edit Failed", error);
    });
};

export const assignNoiseToBoard = (
  { commit, state },
  { boardId, key, name, source }
) => {
  const noise = Noise.fromData({ name, source });
  const update = {};
  update[key] = noise.saveData;

  boardsRef
    .doc(boardId)
    .set({ keys: update }, { merge: true })
    .then(() => {
      commit("assignNoiseToBoard", { boardId, key, noise });
    });
};

export const unassignNoiseFromBoard = ({ commit, state }, { boardId, key }) => {
  const update = {};
  update[`keys.${key}`] = firebase.firestore.FieldValue.delete();

  boardsRef
    .doc(boardId)
    .update(update)
    .then(() => {
      commit("unassignNoiseFromBoard", { boardId, key });
    });
};

export const saveBoardNoiseSettings = (
  { commit, state },
  { boardId, key, name }
) => {
  const boardIndex = findIndex(state.boards, board => {
    return board.id === boardId;
  });

  const board = state.boards[boardIndex];
  const noise = board.keys[key];

  const update = {};
  update[`keys.${key}.name`] = name;
  update[`keys.${key}.defaults`] = noise.settings;

  boardsRef
    .doc(boardId)
    .update(update)
    .then(() => {
      commit("saveBoardNoiseSettings", {
        boardId,
        key,
        name,
        defaults: noise.settings
      });
    });
};

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

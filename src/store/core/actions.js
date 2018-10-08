import { repo, firestore } from "../db.js";

export const hydrate = ({ commit, dispatch, state }) => {
  Promise.all([
    firestore
      .collection("boards")
      .get()
      .then(querySnapshot => {
        dispatch("parseBoards", querySnapshot.docs);
        // commit('appDataLoaded');
      }),

    repo.getTree("master?recursive=1&path=archives").then(result => {
      dispatch("parseNoises", result.data.tree);
    })
  ]).then(() => {
    commit("appDataLoaded");
  });
};

export const disableNoises = ({ commit }) => commit("disableNoises");
export const enableNoises = ({ commit }) => commit("enableNoises");

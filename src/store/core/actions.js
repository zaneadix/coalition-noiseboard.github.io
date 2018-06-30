
import { repo } from '../github.js';

export const hydrate = ({ commit, dispatch, state }) => {

    //GET BOARDS
    const myRequest = new Request('/data/boards.json');
    fetch(myRequest)
        .then(response => {
            return response.json();
        })
        .then(boards => {
            dispatch('parseBoards', boards);
        });

    repo.getTree("master?recursive=1&path=archives")
        .then(result => {
            dispatch('parseNoises', result.data.tree);
            dispatch('parseBoardsFile', result.data.tree);
        });
};
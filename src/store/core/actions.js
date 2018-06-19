
import Github from 'github-api';

export const hydrate = ({ commit, dispatch, state }) => {

    //GET BOARDS
    const myRequest = new Request('/data/boards.json');
    fetch(myRequest)
        .then(response => {
            return response.json();
        })
        .then(boards => {
            console.log('FUCKING BOARDS', boards);
            dispatch('parseBoards', boards);
        });

    //GET NOISES
    const gh = new Github({
        token: 'd8_35_f6_70_90_a7_68_39_5a_9f_20_75_72_1d_cb_35_f2_62_ce_bd'.replace(/_/g, '') // NOT A TOKEN
    });
    const repo = gh.getRepo('zaneadix/coalition-noiseboard');

    repo.getTree("master?recursive=1&path=archives")
        .then(result => {
            dispatch('parseNoises', result.data.tree);
        });
};

import Github from 'github-api';

export const hydrate = ({ commit, dispatch, state }) => {

    const gh = new Github({
        token: '82a836d5221ca3637932c8cdc4ca76b8008fbc87' // NOT A TOKEN
    });
    const repo = gh.getRepo('zaneadix/coalition-noiseboard');

    repo.getTree("master?recursive=1&path=archives")
        .then(result => {
            dispatch('parseNoises', result.data.tree);
        })
};
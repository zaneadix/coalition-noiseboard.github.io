
import Github from 'github-api';

export const hydrate = ({ commit, dispatch, state }) => {

    const gh = new Github({
        username: 'zaneadix',
        password: 'octocat6'
    });
    const repo = gh.getRepo('zaneadix/coalition-noiseboard');

    repo.getTree("master?recursive=1&path=archives")
        .then(result => {
            dispatch('parseNoises', result.data.tree);
        })
};
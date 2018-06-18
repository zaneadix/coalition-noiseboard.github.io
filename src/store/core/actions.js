
import Github from 'github-api';

export const hydrate = ({ commit, dispatch, state }) => {

    const gh = new Github({
        token: '1c2c2866c1a174470f66d5fa5537ae744b622f88' //NOT A TOKEN
    });
    const repo = gh.getRepo('zaneadix/coalition-noiseboard');

    repo.getTree("master?recursive=1&path=archives")
        .then(result => {
            dispatch('parseNoises', result.data.tree);
        })
};
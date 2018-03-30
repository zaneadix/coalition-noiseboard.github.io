
import Github from 'github-api';

export const hydrate = ({ commit, state }) => {

    const gh = new Github({
        username: 'zaneadix',
        password: 'octocat6'
    });
    const repo = gh.getRepo('zaneadix/coalition-noiseboard');

    repo.getTree("master?recursive=1&path=archives").then(result => {
        console.log(result.data.tree);

        commit('hydrate', result.data.tree);
    })

    
    // load audiofile tree
    console.log('loading tree');


    commit('hydrate', {});
}
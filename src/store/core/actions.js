
import Github from 'github-api';

export const hydrate = ({ commit, state }) => {

    const gh = new Github();
    console.log(gh);

    const zaneadix = gh.getUser('zaneadix');
    const repo = gh.getRepo('zaneadix/zaneadix.github.io');



    console.log(zaneadix);
    console.log(repo);

    zaneadix.listRepos().then(result => {
        console.log(result);
    })

    repo.getTree("master?recursive=1&path=archives").then(result => {
        console.log(result.data.tree);
    })

    
    // load audiofile tree
    console.log('loading tree');


    commit('hydrate', {});
}
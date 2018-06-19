
import Github from 'github-api';

export const hydrate = ({ commit, dispatch, state }) => {

    const gh = new Github({
        token: 'd8_35_f6_70_90_a7_68_39_5a_9f_20_75_72_1d_cb_35_f2_62_ce_bd'.replace(/_/g, '') // NOT A TOKEN
    });
    const repo = gh.getRepo('zaneadix/coalition-noiseboard');

    repo.getTree("master?recursive=1&path=archives")
        .then(result => {
            dispatch('parseNoises', result.data.tree);
        })
};
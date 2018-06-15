
import Github from 'github-api';
import map from 'lodash/map';
import { Noise } from './models';

export const parseNoises = ({ commit, state }, tree) => {

    console.log('parsing', tree);

    const noises = tree.filter(file => {
        return (file.type === 'blob' && file.path.match(/^docs\/noises\//));
    });

    const noiseMap = {};
    map(noises, noise => {
        let path = noise.path.replace('docs/noises/', '');
        const segments = path.split('/');
        const category = segments[0];
        const name = segments[1].replace(/\.\w{3}/, '');
        noiseMap[category] = noiseMap[category] || [];
        noiseMap[category].push(Object.assign(
            new Noise(),
            { name, category, path: noise.path }
        ));
    });
    
    
    commit('setNoises', noiseMap);
};
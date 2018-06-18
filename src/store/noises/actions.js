
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
        let path = noise.path.replace('docs/', '');
        const segments = path.split('/');
        const category = segments[1];
        const name = segments[2].replace(/\.\w{3}/, '');
        noiseMap[category] = noiseMap[category] || [];
        noiseMap[category].push(Object.assign(
            new Noise(),
            { name, category, path: path }
        ));
    });
    
    
    commit('setNoises', noiseMap);
};
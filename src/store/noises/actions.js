
import map from 'lodash/map';
import { NoisePreview } from './models';

export const parseNoises = ({ commit, state }, tree) => {

    const noises = tree.filter(file => {
        return (file.type === 'blob' && file.path.match(/^docs\/noises\//));
    });

    const noiseMap = {};
    map(noises, noise => {
        const path = noise.path.replace('docs/', '');
        const segments = path.split('/');
        const category = segments[1];
        const name = segments[2].replace(/\.\w{3}/, '');
        noiseMap[category] = noiseMap[category] || [];
        noiseMap[category].push(NoisePreview.fromData({ name, category, source: `/${path}` }));
    });
    
    commit('setNoises', noiseMap);
};
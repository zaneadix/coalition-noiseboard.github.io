
import Github from 'github-api';
import find from 'lodash/find';
import { Board } from './models';

export const parseBoards = ({ commit, state }, boards) => {

    
    commit('setBoards', boards);


    // const noiseMap = {};
    // map(noises, noise => {
    //     let path = noise.path.replace('docs/noises/', '');
    //     const segments = path.split('/');
    //     const category = segments[0];
    //     const name = segments[1].replace(/\.\w{3}/, '');
    //     noiseMap[category] = noiseMap[category] || [];
    //     noiseMap[category].push(Object.assign(
    //         new Noise(),
    //         { name, category, path: noise.path }
    //     ));
    // });
    
    
    // commit('setNoises', noiseMap);
};
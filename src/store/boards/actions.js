
import find from 'lodash/find';
import { Howl } from 'howler';
import { Board } from './models';
import { Noise } from '../noises/models';

export const parseBoards = ({ commit, state }, boards) => {
    
    commit('setBoards', boards);
};

export const assignNoiseToBoard = ({commit, state}, { boardId, key, name, source }) => {

    console.log('ACTION', boardId, key, name, source);

    const noise = Object.assign(
        new Noise(),
        { name, source }
    );

    commit(
        'assignNoiseToBoard',
        {
            boardId,
            key,
            noise
        }
    )
}
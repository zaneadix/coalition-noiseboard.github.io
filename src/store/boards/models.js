
import mapKeys from 'lodash/mapKeys';
import { Noise } from '../noises/models';

export class Board {
    
    constructor () {
        this._name = '',
        this.id = '',
        this.keys = {
            '1': null,
            '2': null,
            '3': null,
            '4': null,
            '5': null,
            '6': null,
            '7': null,
            '8': null,
            '9': null,
            '0': null,
            a: null,
            b: null,
            c: null,
            d: null,
            e: null,
            f: null,
            g: null,
            h: null,
            i: null,
            j: null,
            k: null,
            l: null,
            m: null,
            n: null,
            o: null,
            p: null,
            q: null,
            r: null,
            s: null,
            t: null,
            u: null,
            v: null,
            w: null,
            x: null,
            y: null,
            z: null
        }
    }

    set name (name) {
        this.id = name.toLowerCase().replace(/\s/g, '_');
        this._name = name;
    }

    get name () {
        return this._name;
    }

    get saveData () {

        const keySaves = {};

        mapKeys(this.keys, (value, key) => {
            console.log(key, this.keys[key]);
            if (this.keys[key]) {
                keySaves[key] = this.keys[key].saveData;
            }
        });

        console.log('KEY SAVES', keySaves);

        return Object.assign(
            {},
            {
                name: this.name,
                id: this.id,
                keys: keySaves
            }
        );
    }

    static fromData (data) {

        const board = new Board();

        console.log('BOARD DATA', data);

        mapKeys(data.keys, (value, key) => {
            console.log(key);
            data.keys[key] = Noise.fromData(data.keys[key]);
        });

        data.keys = Object.assign(
            board.keys,
            data.keys
        );

        return Object.assign(
            new Board(),
            data
        );
    }
}
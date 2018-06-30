
import { Howl } from 'howler';

export class Noise {
    constructor () {
        this.name = '';
        this.defaults = {
            volume: 1,
            rate: 1,
            loop: false,
            autoplay: false
        };
        this.howl = null;
        this._source = null;
    }

    set source (src) {
        this.howl = new Howl(Object.assign(
            { src: [src] },
            this.defaults
        ))
        this._source = src;
    }

    get source () {
        return this._source;
    }

    get saveData () {
        console.log('GETTING SAVE DATA', {
                name: this.name,
                defaults: this.defaults,
                source: this.source
            });
        return Object.assign(
            {},
            {
                name: this.name,
                defaults: this.defaults,
                source: this.source
            }
        );
    }

    static fromData (data) {
        return Object.assign(
            new Noise(),
            data
        );
    }
}

export class NoisePreview {
    constructor () {
        this.name = '';
        this.category = '';
        this.source = '';
    }
}

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
    }

    set source (src) {
        this.howl = new Howl(Object.assign(
            { src: [src] },
            this.defaults
        ))

    }

    get source () {
        if (this.howl) {
            return this.howl.src;
        }
    }
}

export class NoisePreview {
    constructor () {
        this.name = '';
        this.category = '';
        this.source = '';
    }
}
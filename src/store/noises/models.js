
import Vue from 'vue';
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
        return  {
            name: this.name,
            defaults: this.defaults,
            source: this.source
        }
    }

    static fromData (data) {
        const noise = new Noise();
        const returnValue = Object.assign(noise, data);
        return returnValue
    }
}

export class NoisePreview {
    constructor () {
        this._name = '';
        this.category = '';
        this.source = '';
    }

    set name (name) {
        this._name = Vue.options.filters.title(name);
    }

    get name () {
        return this._name;
    }

    static fromData (data) {
        return Object.assign(
            new NoisePreview(),
            data
        )
    }
}
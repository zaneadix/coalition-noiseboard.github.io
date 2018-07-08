
import Vue from 'vue';
import { Howl } from 'howler';
import { NOISE_PLAY, STOP_ALL_NOISES } from '../../const';


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


export class Noise {

    constructor () {

        this.name = '';
        this._source = null;
        this.color = 'white';
        this.defaults = {
            globalStop: false,
            loop: false,
            rate: 1,
            solo: false,
            volume: 1,
        };


        this.howl = null;
        this.playbackPosition = 0;
        this.activeGlobalStop = null;
        this.playbackPercentages = {};

        document.addEventListener(STOP_ALL_NOISES, this.stop.bind(this));

        /**
         * settings duplicate defaults on init
         * making it easy to save adjusted settings
         * as defaults or reset to default state
         */
        this.settings = Object.assign({}, this.defaults);
        
    }

    play () {

        if (this.howl) {

            if (this.solo) {
                this.howl.stop();
            }

            const soundId = this.howl.play();
            this.playbackPercentages[soundId] = 0;
            requestAnimationFrame(this.step.bind(this, soundId));

            const playEvent = new CustomEvent(NOISE_PLAY, {
                detail: { noise: this } 
            });
            document.dispatchEvent(playEvent);
        }
    }

    stop () {
        if (this.howl) {
            this.howl.stop();
        }
    }

    step (soundId) {

        /**
         * Object assignments to help with 
         * state updates
         */

        if (this.howl && this.howl.playing(soundId)) {
            const playbackPosition = this.howl.seek(soundId);
            const update = {};
            update[soundId] = this.playbackPercentage(playbackPosition);
            this.playbackPercentages = Object.assign(
                {},
                this.playbackPercentages,
                update
            );

            requestAnimationFrame(this.step.bind(this, soundId));
        } else {

            delete this.playbackPercentages[soundId];
            this.playbackPercentages = Object.assign(
                {},
                this.playbackPercentages
            );
        }
    }

    globalStopHandler (event) {

        if (event.detail.noise !== this) {
            this.stop();
        }
    }

    playbackPercentage (playbackPosition) {
        return (playbackPosition / this.howl.duration()) * 100;
    }


    get source () {
        return this._source;
    }

    set source (src) {

        this.howl = new Howl(Object.assign(
            { src: [src] },
            this.defaults
        ));

        this._source = src;
    }

    
    /**
     * Should noise loop.
     */
    get loop () {
        return this.settings.loop;
    }

    set loop (value) {
        this.settings.loop = value;
        this.howl.loop(this.settings.loop);
    }


    /**
     * Should noise be reset if pressed again. (don't layer).
     */
    get solo () {
        return this.settings.solo;
    }

    set solo (value) {
        this.settings.solo = value;
    }


    /**
     * Stop playback if any other noise is played.
     */
    get globalStop () {
        return this.settings.globalStop;
    }

    set globalStop (value) {

        this.settings.globalStop = value;

        if (this.settings.globalStop) {

            this.activeGlobalStop = this.globalStopHandler.bind(this);
            document.addEventListener(NOISE_PLAY, this.activeGlobalStop);

        } else if (this.activeGlobalStop) {

            document.removeEventListener(NOISE_PLAY, this.activeGlobalStop);
        }
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
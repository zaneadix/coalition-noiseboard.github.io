
import Vue from 'vue';
import { Howl } from 'howler';
import { NOISE_PLAY, STOP_ALL_NOISES } from '../../const';
import findKey from 'lodash/findKey';

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
        this._defaults = {};

        this.howl = null;
        this.activeGlobalStop = null;
        this.playbackPosition = 0;
        this.playbackPercentages = {};
        this.settingsChanged = false;

        document.addEventListener(STOP_ALL_NOISES, this.stop.bind(this));

        this.defaults = {
            globalStop: false,
            loop: false,
            rate: 100,
            solo: false,
            volume: 100,
            color: 'white'
        };
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

    haveSettingsChanged (currentChangeKey) {

        if (!this.defaults[currentChangeKey]) {
            this.settingsChanged = true;
            return;
        }

        const changed = findKey(this.settings, (value, key) => {
            return this.settings[key] != this.defaults[key];
        });

        if (changed) {
            this.settingsChanged = true;
        } else {
            this.settingsChanged = false;
        }
    }


    get loading () {
        let loading = false;
        if (this.howl) {
            // console.log(this.howl.state());
            loading = (this.howl.state() === 'loading');
        }
        return loading;
    }


    get defaults () {
        return this._defaults;
    }

    set defaults (defaults) {
        this._defaults = Object.assign({}, this._defaults, defaults);
        this.settings = Object.assign({}, this.defaults);
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
     * Duh
     */ 
    get color () {
        return this.settings.color;
    }

    set color (color) {
        this.settings.color = color;
        this.haveSettingsChanged('color');
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
        this.haveSettingsChanged('loop');
    }


    /**
     * Should noise be reset if pressed again. (don't layer).
     */
    get solo () {
        return this.settings.solo;
    }

    set solo (value) {
        this.settings.solo = value;
        this.haveSettingsChanged('solo');
    }


     /**
     * Duh
     */
    get volume () {
        return this.settings.volume;
    }

    set volume (value) {
        this.settings.volume = value;
        this.howl.volume(this.settings.volume/100);
        this.haveSettingsChanged('volume');
    }

    /**
     * Playback Rate
     */
    get rate () {
        return this.settings.rate;
    }

    set rate (value) {
        this.settings.rate = value;
        this.howl.rate(this.settings.rate/100);
        this.haveSettingsChanged('rate');
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

        this.haveSettingsChanged('globalStop');
    }

    get saveData () {
        return  {
            name: this.name,
            defaults: this.settings,
            source: this.source
        }
    }

    static fromData (data) {
        
        const noise = new Noise();
        const returnValue = Object.assign(
            noise,
            data,
            data.defaults
        );


        return returnValue;
    }
}

<template>

    <div class="noise-editor container-fluid">
        <div class="row">
            <div class="col">

                <form class="form-inline noise-name-form">
                    <div class="input-group flex-grow-1" >
                        <div class="input-group-prepend">
                            <span class="input-group-text character" :class="[noise.color]">{{ character | title }}</span>
                        </div>
                        <input
                            type="text"
                            class="form-control"
                            v-model="noiseName">
                    </div>
                    <button class="icon-button">
                        <svg class="icon">
                            <use xlink:href="#icon-save"></use>
                        </svg>
                    </button>
                </form>

                <div class="form-group">
                    <label for="volume-setting">Volume ({{Math.floor(noise.volume)}})</label>
                    <input
                        type="range"
                        class="form-control-range"
                        id="volume-setting"
                        v-model="noise.volume">
                </div>

                <div class="form-group">
                    <label for="rate-setting">Playback Speed (x{{noise.rate/100}})</label>
                    <input
                        type="range"
                        class="form-control-range"
                        id="rate-setting"
                        max="400"
                        min="50"
                        v-model="noise.rate">
                </div>
            </div>

            <div class="col">

                <form>

                    <div class="form-check">
                        <input
                            name="loop-setting"
                            type="checkbox"
                            class="form-check-input"
                            v-model="noise.loop">
                        <label
                            for="loop-setting"
                            class="form-check-label">
                            Loop
                        </label>
                    </div>

                    <div class="form-check">
                        <input
                            name="solo-setting"
                            type="checkbox"
                            class="form-check-input"
                            v-model="noise.solo">
                        <label
                            for="solo-setting"
                            class="form-check-label">
                            Solo
                        </label>
                    </div>

                    <div class="form-check">
                        <input
                            name="global-stop-setting"
                            type="checkbox"
                            class="form-check-input"
                            v-model="noise.globalStop">
                        <label
                            for="global-stop-setting"
                            class="form-check-label">
                            Global Stop
                        </label>
                    </div>

                </form>

                <form>

                    <div class="form-check form-check-inline">

                        <label for="color-white" class="check-wrap white">
                            <input
                                class="form-check-input"
                                type="radio"
                                name="color-white"
                                id="color-white"
                                value="white"
                                v-model="noise.color">
                            <span></span>
                        </label>
                        
                        <label for="color-red" class="check-wrap red">
                            <input
                                class="form-check-input"
                                type="radio"
                                name="color-red"
                                id="color-red"
                                value="red"
                                v-model="noise.color">
                            <span></span>
                        </label>

                        <label for="color-orange" class="check-wrap orange">
                            <input
                                class="form-check-input"
                                type="radio"
                                name="color-orange"
                                id="color-orange"
                                value="orange"
                                v-model="noise.color">
                            <span></span>
                        </label>

                        <label for="color-yellow" class="check-wrap yellow">
                            <input
                                class="form-check-input"
                                type="radio"
                                name="color-yellow"
                                id="color-yellow"
                                value="yellow"
                                v-model="noise.color">
                            <span></span>
                        </label>

                        <label for="color-green" class="check-wrap green">
                            <input
                                class="form-check-input"
                                type="radio"
                                name="color-green"
                                id="color-green"
                                value="green"
                                v-model="noise.color">
                            <span></span>
                        </label>


                        <label for="color-turqoise" class="check-wrap turqoise">
                            <input
                                class="form-check-input"
                                type="radio"
                                name="color-turqoise"
                                id="color-turqoise"
                                value="turqoise"
                                v-model="noise.color">
                            <span></span>
                        </label>

                        <label for="color-blue" class="check-wrap blue">
                            <input
                                class="form-check-input"
                                type="radio"
                                name="color-blue"
                                id="color-blue"
                                value="blue"
                                v-model="noise.color">
                            <span></span>
                        </label>

                        <label for="color-royal" class="check-wrap royal">
                            <input
                                class="form-check-input"
                                type="radio"
                                name="color-royal"
                                id="color-royal"
                                value="royal"
                                v-model="noise.color">
                            <span></span>
                        </label>

                        <label for="color-purple" class="check-wrap purple">
                            <input
                                class="form-check-input"
                                type="radio"
                                name="color-purple"
                                id="color-purple"
                                value="purple"
                                v-model="noise.color">
                            <span></span>
                        </label>

                    </div>

                </form>

            </div>
            <div class="col">
                

                <button
                    class="btn btn-primary"
                    :disabled="!noise.settingsChanged"
                    v-on:click="$emit('save-settings', character)">
                    Save Settings
                </button>

            </div>
        </div>
    </div>

</template>

<script>
    
    export default {

        name: 'noise-editor',

        props: ['noise', 'character'],

        data: function () {
            return {
                settingsInitialized: false,
                // noiseSettings: null,
                noiseName: ''
            }
        },

        // watch: {
        //     noise: {
        //         deep: true,
        //         handler: function (newValue, oldValue) {
        //             if (this.settingsInitialized) {
        //                 this.noiseSettings
        //             }
        //         }
        //     }
        // },

        computed: {
            // ...mapState({
            //     board: function (state) {
            //         const id = this.$route.params.id;
            //         return find(state.boards, (board) => {
            //             return board.id === id;
            //         });
            //     }
            // })
        },

        methods: {
            // displayNoiseEditor: function (key) {
            //     console.log('display detail for noise at', key);

            //     this.clickedNoises.push(this.board.keys[key]);
            // }
            saveSettings: function () {

            }
         }
    }

</script>

<style lang="scss" scoped="true">

    @import '../styles/variables';
    
    .noise-editor {
        width: 80%;
        margin: auto auto 1rem;
        height: 240px;
        box-shadow: $standard-shadow;
        border: 1px solid $shadow;
        padding: 1rem;

        .noise-name-form {

            @mixin characterColor ($color) {
                // color: #FFF;
                background-color: lighten($color, 32%);
                // border-color: $color;
            }

            .character {
                font-weight: bold;
                color: $black;
                background-color: $white;
                &.red { @include characterColor($key-red); }
                &.orange { @include characterColor($key-orange); }
                &.yellow { @include characterColor($key-yellow); }
                &.green { @include characterColor($key-green) }
                &.turqoise { @include characterColor($key-turqoise) }
                &.blue { @include characterColor($key-blue) }
                &.royal { @include characterColor($key-royal) }
                &.purple { @include characterColor($key-purple) }
            }
        }

        // .character {
        //     display: block;
        //     position: absolute;
        //     color: $slate;
        //     content: '';
        //     top: 5px;
        //     left: 5px;
        //     font-size: 80%;
        //     line-height: 80%;
        //     opacity: 1;
        //     z-index: 1;
        //     text-align: center;
        // }

        .noise-name-form {
            align-items: space-between;
        }

        @mixin checkColor ($color) {
            & > span {
                background-color: lighten($color, 32%);
                border-color: $color;
            }
        }


        label.check-wrap {

            margin-right: .3rem;

            &:last-of-type {
                margin-right: 0;
            }


            & > span {
                content: '';
                display: inline-block;
                width: 1rem;
                height: 1rem;
                box-sizing: border-box;
                border: 1px solid;
                border-radius: 50%;
            }

            .form-check-input[type=radio] {

                display: none;

                &:checked ~ span {
                    border-width: .3rem;
                }
            }

            &.red {
                @include checkColor($key-red);
            }

            &.orange {
                @include checkColor($key-orange);
            }

            &.yellow {
                @include checkColor($key-yellow);
            }

            &.green {
                @include checkColor($key-green);
            }

            &.turqoise {
                @include checkColor($key-turqoise);
            }

            &.blue {
                @include checkColor($key-blue);
            }

            &.royal {
                @include checkColor($key-royal);
            }

            &.purple {
                @include checkColor($key-purple);
            }
        }
        
    }

</style>
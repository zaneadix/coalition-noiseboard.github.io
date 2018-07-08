
<template>

    <div class="key noise-key"
         v-bind:class="{ active: pressed }">
        <div class="key-body" v-on:click="checkClick()">
            
            <div
                class="playback-marker"
                v-for="percentage in playbackPercentages"
                :style="'width:' + percentage + '%'">
            </div>

            <span class="character">{{ character | title }}</span>

            <span v-if="noise" class="noise-name">{{ noise.name }}</span>
            <small v-else class="soft-text">empty</small>

        </div>
    </div>
    
</template>

<script>

    import { mapState, mapActions } from 'vuex';
    import { Howler } from 'howler';
    import { KEY_MAP } from '../const';
    
    export default {
        name: 'noise-key',
        
        props: [
            'character',
            'noise'
        ],

        data: function () {
            return {
                pressed: false,
                // playbackPosition: 0
                playbackPercentages: []
            }
        },

        watch: {
            noise: {
                deep: true,
                handler: function (newVal, oldVal) {
                    console.log(newVal, Object.values(newVal.playbackPercentages));
                    this.playbackPercentages = newVal.playbackPercentages;
                    // this.playbackPosition = newVal.playbackPercentage;
                }
            }
        },

        created: function () {
            document.addEventListener('keydown', this.checkPress);
            document.addEventListener('keyup', this.checkRelease);
        },

        destroyed: function () {
            document.removeEventListener('keydown', this.checkPress);
            document.removeEventListener('keyup', this.checkRelease);
        },

        methods: {

            checkClick: function () {
                if (this.noise) {
                    this.$emit('noise-clicked', this.character);
                }
            },

            checkPress: function (event) {

                const keyPressed = (event.keyCode === KEY_MAP[this.character]);
                const shift = event.shiftKey;

                if (keyPressed) {
                    this.pressed = true;
                }

                if (shift && this.pressed) {
                    this.stopNoise();
                } else if (this.pressed) {
                    this.playNoise();
                }
            },

            checkRelease: function (event) {
                if (event.keyCode === KEY_MAP[this.character]) {
                    this.pressed = false;
                }
            },

            playNoise: function () {
                if (this.noise) {
                    this.noise.play();
                }
            },

            stopNoise: function () {
                if (this.noise) {
                    this.noise.stop();
                }
            }
        }
    }

</script>


<style lang="scss" scoped="true">

    @import '../styles/variables';

    .key-body {

        .playback-marker {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            background-color: black;
            opacity: .05;
            z-index: 0;
        }
    }

</style>
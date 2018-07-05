
<template>

    <div class="key noise-key"
         v-bind:class="{ active: pressed }">
        <div class="key-body" v-on:click="checkClick()">
            <span class="character">{{ character | title }}</span>
            <span v-if="noise" class="noise-name">{{ noise.name }}</span>
            <small v-else class="soft-text">empty</small>
        </div>
    </div>
    
</template>

<script>

    import { mapState, mapActions } from 'vuex';
    
    export default {
        name: 'noise-key',
        
        props: [
            'character',
            'noise'
        ],

        data: function () {
            return {
                pressed: false
            }
        },

        created: function () {
            let pressed = this.pressed;
            window.addEventListener('keydown', this.checkPress);
            window.addEventListener('keyup', this.checkRelease);
        },

        methods: {
            checkClick: function () {
                if (this.noise) {
                    this.$emit('noise-clicked', this.character);
                }
            },
            checkPress: function (event) {
                if (event.key === this.character) {
                    this.pressed = true;
                }
                if (this.pressed) {
                    this.playNoise();
                }
            },
            checkRelease: function (event) {
                if (event.key === this.character) {
                    this.pressed = false;
                    console.log(event.key, 'RELEASED');
                }
            },
            playNoise: function (noise) {
                // var sound = new Howl({
                //     src: ['/noises/guns/gun2.wav'],
                //     autoplay: true,
                //     volume: 0.5,
                // });

                if (this.noise && this.noise.howl) {
                    this.noise.howl.play();
                }
            }
        }
    }

</script>


<style lang="scss" scoped="true">

    @import '../styles/variables';

</style>
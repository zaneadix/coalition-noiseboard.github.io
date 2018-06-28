
<template>

    <div class="key"
         v-bind:class="{ active: pressed }">
        <div class="key-body">
            <span class="character">{{ character.toUpperCase() }}</span>
            <span>{{pressed}}</span>
        </div>
    </div>
    
</template>

<script>

    import { mapState, mapActions } from 'vuex';
    
    export default {
        name: 'key',
        props: [
            'character'
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
            checkPress: function (event) {
                if (event.key === this.character) {
                    this.pressed = true;
                    console.log(event.key, 'PRESSED');
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
                var sound = new Howl({
                    src: ['/noises/guns/gun2.wav'],
                    autoplay: true,
                    volume: 0.5,
                });
            }
        }
    }

</script>


<style lang="scss" scoped="true">

    @import '../assets/variables';

</style>
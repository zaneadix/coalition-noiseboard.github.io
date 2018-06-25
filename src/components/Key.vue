
<template>
    
<!--     <div class="noise-inventory">
        <div class="noise-category" v-for="category in noiseCategories">
            <h1>{{ category }}</h1>
        </div>
    </div> -->

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


<style lang="scss">

    @import '../assets/variables';
    
    .key {
        height: 5rem;
        width: 6rem;
        margin-right: .5rem;
        padding: 0;
        border-radius: 3px;
        background-color: rgba(255,75,56,.1);

        &.active {
            padding: 2px;

            .key-body {
                // box-shadow: 3px 3px 6px rgba(255,75,56,.2), -3px 3px 6px rgba(255,75,56,.2);

                .character {
                    color: $orange;
                    font-weight: bold;
                }
            }
        }

        .key-body {
            display: flex;
            height: 100%;
            position: relative;
            background-color: #FFF;
            border-radius: 3px;
            box-shadow: 3px 3px 6px rgba(0,0,0,.1), -3px 3px 6px rgba(0,0,0,.1);
            align-items: center;
            justify-content: center;

            .character {
                display: block;
                position: absolute;
                content: '';
                top: 5px;
                left: 5px;
                font-size: 80%;
                line-height: 80%;
                opacity: 1;
                z-index: 1;
                text-align: center;
            }
        }
    }

</style>
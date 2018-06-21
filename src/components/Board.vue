
<template>
    
    <div class="board">
        <div v-if="board">
            <div class="header">
                <h1 class="name">{{ board.name }}</h1>
            </div>
            <div class="body container">
                <div class="keys">

                    <div class="key-row">
                        <Key character="0" v-bind:pressed="pressed"></Key>
                        <Key character="1" v-bind:pressed="pressed"></Key>
                        <Key character="2" v-bind:pressed="pressed"></Key>
                        <Key character="3" v-bind:pressed="pressed"></Key>
                        <Key character="4" v-bind:pressed="pressed"></Key>
                        <Key character="5" v-bind:pressed="pressed"></Key>
                        <Key character="6" v-bind:pressed="pressed"></Key>
                        <Key character="7" v-bind:pressed="pressed"></Key>
                        <Key character="8" v-bind:pressed="pressed"></Key>
                        <Key character="9" v-bind:pressed="pressed"></Key>
                    </div>

                    <div class="key-row">
                        <Key character="q" v-bind:pressed="pressed"></Key>
                        <Key character="w" v-bind:pressed="pressed"></Key>
                        <Key character="e" v-bind:pressed="pressed"></Key>
                        <Key character="r" v-bind:pressed="pressed"></Key>
                        <Key character="t" v-bind:pressed="pressed"></Key>
                        <Key character="y" v-bind:pressed="pressed"></Key>
                        <Key character="u" v-bind:pressed="pressed"></Key>
                        <Key character="i" v-bind:pressed="pressed"></Key>
                        <Key character="o" v-bind:pressed="pressed"></Key>
                        <Key character="p" v-bind:pressed="pressed"></Key>
                    </div>

                    <div class="key-row">
                        <Key character="a" v-bind:pressed="pressed"></Key>
                        <Key character="s" v-bind:pressed="pressed"></Key>
                        <Key character="d" v-bind:pressed="pressed"></Key>
                        <Key character="f" v-bind:pressed="pressed"></Key>
                        <Key character="g" v-bind:pressed="pressed"></Key>
                        <Key character="h" v-bind:pressed="pressed"></Key>
                        <Key character="j" v-bind:pressed="pressed"></Key>
                        <Key character="k" v-bind:pressed="pressed"></Key>
                        <Key character="l" v-bind:pressed="pressed"></Key>
                    </div>

                    <div class="key-row">
                        <Key character="z" v-bind:pressed="pressed"></Key>
                        <Key character="x" v-bind:pressed="pressed"></Key>
                        <Key character="c" v-bind:pressed="pressed"></Key>
                        <Key character="v" v-bind:pressed="pressed"></Key>
                        <Key character="b" v-bind:pressed="pressed"></Key>
                        <Key character="n" v-bind:pressed="pressed"></Key>
                        <Key character="m" v-bind:pressed="pressed"></Key>
                    </div>

                </div>
            </div>
            
        </div>
    </div>
    
</template>

<script>

    import { mapState, mapActions } from 'vuex';
    import { routerLink } from 'vue-router';
    import find from 'lodash/find';
    import { Howl } from 'howler';
    import Key from './Key.vue';
    
    export default {

        name: 'board',

        components: {
            Key
        },

        data: () => {
            return {
                pressed: ''
            }
        },

        created: function () {
            window.addEventListener('keydown', this.checkInput)
            window.addEventListener('keyup', function () {
                console.log('UP');
                this.pressed = '';
            })   
        },

        computed: {
            ...mapState({
                board: function (state) {
                    console.log(this.$route.params);

                    const id = this.$route.params.id;

                    return find(state.boards, (board) => {
                        return board.id === id;
                    });
                }

            })
        },

        methods: {
            // playNoise: function (noise) {
            //     var sound = new Howl({
            //         src: [noise.path],
            //         autoplay: true,
            //         volume: 1,
            //     });
            // }
            checkInput: function (event) {
                console.log('CLICKED', event.key);
                this.pressed = event.key;
                if (!this.board.keys[event.key]) {
                    var sound = new Howl({
                        src: ['/noises/guns/gun2.wav'],
                        autoplay: true,
                        volume: 0.5,
                    });
                }
            }
        }
    }

</script>


<style lang="scss">

    @import '../assets/variables';

    .header {
        height: 5rem;
        display: flex;
        justify-content: center;

        .name {
            text-align: center;
            margin-bottom: 0;
            margin-top: auto;
            font-size: 2rem;
            line-height: 2rem;

        }
    }

    .body {
        padding-top: 4rem;
    }

    .keys {
        .key-row {
            display: flex;
            justify-content: center;
            margin-bottom: .5rem;
        }
    }

</style>
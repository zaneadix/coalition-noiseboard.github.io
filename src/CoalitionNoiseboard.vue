
<template>
    <div id="coalition-noiseboard">

        <button
            class="save icon-button"
            :disabled="!dirty"
            v-bind:class="{ 'pulse': dirty }">
            <svg class="icon">
                <use xlink:href="#icon-save"></use>
            </svg>
        </button>

        <div class="sidebar">
            <div class="brand">
                <svg class="logo">
                    <use xlink:href="#icon-mask"></use>
                </svg>
                <span class="name">Coalition<br>Noiseboard</span>
            </div>

            <ul>
                <li>
                    <router-link :to="'/'">Noises</router-link>
                </li>
            </ul>
            <BoardsList></BoardsList>
        </div>
        
        <div class="content">
            <router-view></router-view>
        </div>
        
    </div>
</template>


<script>
    
    import { mapState, mapActions } from 'vuex';
    import NoiseInventory from './components/NoiseInventory.vue';
    import BoardsList from './components/BoardsList.vue';

    export default {

        name: 'coalition-noiseboard',

        components: {
            NoiseInventory,
            BoardsList
        },

        computed: {
            ...mapState({
                dirty: function (state) {
                    console.log('DIRTY', state.dirty);
                    return state.dirty;
                }
            })
        }
    }

</script>


<style lang="scss">

    @import './assets/global.scss';
    @import './assets/variables.scss';

    #coalition-noiseboard {

        @keyframes pulse_animation {
            0% { color: $blue; }
            50% { color: #42f47d; }
            100% { color: $blue; }
        }

        

        .save {
            position: absolute;
            top: 1rem;
            right: 1rem;

            &.pulse {
                svg {
                    animation-name: pulse_animation;
                    animation-duration: 1000ms;
                    // transform-origin: 70% 70%;
                    animation-iteration-count: infinite;
                    animation-timing-function: linear;
                }
            }

            svg {
                height: 2rem;
                width: 2rem;
            }
        }
    }

</style>

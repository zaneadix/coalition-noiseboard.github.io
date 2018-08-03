
<template>
    <div id="coalition-noiseboard">

        <div class="loading-cover" :class="{active: loading}">
            <h2>Loading Stuff</h2>
        </div>

        <div class="sidebar" :class="{ closed: sidebarClosed }">

            <button
                class="icon-button toggle-sidebar"
                v-on:click="sidebarClosed = !sidebarClosed">
                <svg class="icon">
                    <use :xlink:href="sidebarClosed ? '#icon-arrow-right-circle' : '#icon-arrow-left-circle'"></use>
                </svg>
            </button>

            <div class="brand">
                <svg class="logo">
                    <use xlink:href="#icon-mask"></use>
                </svg>
                <span class="name">Coalition<br>N<svg class="icon"><use xlink:href="#icon-radio"></use></svg>iseboard</span>
            </div>

            <ul>
                <li>
                    <router-link class-active="active" :to="'/'">Noises</router-link>
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

        data: function () {
            return {
                sidebarClosed: false
            }
        },

        computed: {
            ...mapState({
                loading: (state) => state.loadingAppData
            })
        },

        methods: {
            // ...mapActions(['saveBoards'])
        }
    }

</script>


<style lang="scss">

    @import './styles/global.scss';
    @import './styles/variables.scss';

    #coalition-noiseboard {

        display: flex;
        flex-grow: 1;
        overflow: hidden;
        height: 100vh;

        @keyframes fade_out_animation {
            0% { opacity: 1; }
            100% { opacity: 0; }
        }

        @keyframes pulse_animation {
            0% { color: $blue; }
            50% { color: #42f47d; }
            100% { color: $blue; }
        }

        .loading-cover {
            position: fixed;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            background-color: $white;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            display: none;

            &.active {
                display: flex;
            }
        }

        .sidebar {
            .brand {
                display: flex;
                padding-left: 1rem;
                // border-bottom: 1px solid $red; 
                margin-bottom: 1rem;
                align-items: center;
                height: 5rem;

                .logo {
                    height: 3rem;
                    width: 3rem;
                    margin-right: .5rem;
                    color: $orange;
                }

                .name {
                    font-size: 1.3rem;
                    line-height: 1.4rem;
                    font-weight: 600;

                    .icon {
                        color: $red;
                        vertical-align: bottom;
                        height: 1.2rem;
                        width: 1.2rem;
                    }
                }
            }
        }
    }

</style>

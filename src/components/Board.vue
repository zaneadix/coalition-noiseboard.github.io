
<template>
    
    <div class="board">
        <div v-if="board">
            <div class="header">
                <h1 class="name">{{ board.name }}</h1>
            </div>
            <div class="body container">
                <div class="keys">

                    <div class="key-row" v-for="(keySet, index) in keySets">
                        <Key v-for="key in keySet"
                             :key="key"
                             :character="key">
                        </Key>
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
                pressed: '',
                keySets: [
                    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
                    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
                    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
                    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
                ]
            }
        },

        computed: {
            ...mapState({
                board: function (state) {
                    const id = this.$route.params.id;
                    return find(state.boards, (board) => {
                        return board.id === id;
                    });
                }

            })
        },

        methods: {

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

            .key:last-child {
                margin-right: 0;
            }
        }
    }

</style>
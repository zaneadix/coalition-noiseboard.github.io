
<template>
    
    <div class="board">
        <div v-if="model">
            
            <div class="body container">
                <div class="keys">
                    
                    <div v-if="interactive">
                        <div class="key-row" v-for="(keySet, index) in keySets">
                            <Key v-for="key in keySet"
                                 :key="key"
                                 :character="key">
                            </Key>
                        </div>
                    </div>

                    <div v-else>
                        <div class="key-row" v-for="(keySet, index) in keySets">
                            <div class="assignment-key key" v-for="key in keySet">
                                <div class="key-body" v-on:click="$emit('set-to-key', key)">
                                    <span class="character">{{ key.toUpperCase() }}</span>
                                    <!-- <span>{{pressed}}</span> -->
                                </div>
                            </div>
                        </div>
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

        props: {
            model: {
                default: null
            },
            interactive: {
                default: false
            }
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
        }
    }

</script>


<style lang="scss" scoped="true">

    @import '../assets/variables';

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
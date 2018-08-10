
<template>
    
    <div class="board">
        <div v-if="model" class="body">
            <div class="keys">
                
                <div v-if="interactive">
                    <div class="key-row" v-for="(keySet, index) in keySets">
                        <NoiseKey
                            v-for="key in keySet"
                            :noise="model.keys[key]"
                            :key="key"
                            :character="key"
                            :off="off"
                            v-on:noise-clicked="$emit('noise-clicked', $event)">
                        </NoiseKey>
                    </div>
                </div>

                <div v-else>
                    <div class="key-row" v-for="(keySet, index) in keySets">
                        <AssignmentKey
                            v-for="key in keySet"
                            :noise="model.keys[key]"
                            :key="key"
                            :character="key"
                            v-on:assign="$emit('assign-noise', key)"
                            v-on:unassign="$emit('unassign-noise', key)">
                        </AssignmentKey>
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
    import NoiseKey from './NoiseKey.vue';
    import AssignmentKey from './AssignmentKey.vue';
    
    export default {

        name: 'board',

        components: {
            NoiseKey,
            AssignmentKey
        },

        props: {
            model: {
                default: null
            },
            interactive: {
                default: false
            },
            off: {
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

    @import '../styles/variables';

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